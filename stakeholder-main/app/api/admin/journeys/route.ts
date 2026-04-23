import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const journeys = await prisma.studentJourney.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                sprints: {
                    where: { status: "completed" },
                    select: { id: true }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        const formattedJourneys = journeys.map(j => ({
            id: j.id,
            userId: j.userId,
            userName: j.user.name,
            sector: j.sector,
            stage: j.stage,
            trlLevel: j.trlLevel,
            complianceScore: j.complianceScore,
            pilotReadiness: j.pilotReadiness,
            sprintsCompleted: j.sprints.length
        }));

        return NextResponse.json(formattedJourneys);
    } catch (error) {
        console.error("GET /api/admin/journeys error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

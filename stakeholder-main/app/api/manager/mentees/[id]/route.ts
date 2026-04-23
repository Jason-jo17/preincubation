import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const managerProfile = await prisma.managerProfile.findUnique({
            where: { userId: session.user.id }
        })

        if (!managerProfile) {
            return NextResponse.json({ error: "Manager profile not found" }, { status: 404 })
        }

        // Fetch the mentee exactly
        const mentee = await prisma.studentProfile.findUnique({
            where: { id: id, managerId: managerProfile.id },
            include: {
                user: { select: { id: true, name: true, email: true, avatar: true } },
                valuePropositions: true
            }
        })

        if (!mentee) {
            return NextResponse.json({ error: "Mentee not found or not allocated to you" }, { status: 404 })
        }

        // Fetch the associated student journey to get sprints, stakeholders, interactions
        const journey = await prisma.studentJourney.findUnique({
            where: { userId: mentee.user.id },
            include: {
                sprints: {
                    include: {
                        toolSubmissions: true
                    }
                }
            }
        })

        // Format the return matching useMentee specifications
        const detailData = {
            id: mentee.id,
            user: mentee.user,
            institution: mentee.institution,
            program: mentee.program,
            projectName: mentee.projectName,
            journeyId: journey?.id,
            _count: {
                stakeholders: 0,
                interactions: 0,
                valuePropositions: mentee.valuePropositions.length
            },
            stakeholders: [],
            interactions: [],
            valuePropositions: mentee.valuePropositions,
            sprints: journey?.sprints || []
        }

        return NextResponse.json(detailData)

    } catch (error: any) {
        console.error("Fetch Mentee Details Error:", error)
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Resetting all student progress
        await prisma.$transaction([
            prisma.taskProgress.deleteMany(),
            prisma.toolProgress.deleteMany(),
            prisma.stageProgress.deleteMany(),
            prisma.teamProgress.deleteMany(),
            // Optionally reset journeys if needed, but let's stick to progress
        ]);

        return NextResponse.json({ success: true, message: "All team progress has been reset." });
    } catch (error) {
        console.error("POST /api/admin/debug/reset-progress error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

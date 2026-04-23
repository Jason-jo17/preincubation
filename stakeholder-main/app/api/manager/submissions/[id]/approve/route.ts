import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { status, feedback, score, rubricChecks } = await req.json();

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // Map status
        let mapStatus = status
        if (status === 'approved') mapStatus = 'gate_passed'
        if (status === 'rejected') mapStatus = 'blocked'

        const updated = await prisma.sprintToolSubmission.update({
            where: { id },
            data: {
                status: mapStatus,
                managerScore: score !== undefined ? Number(score) : undefined,
                managerNotes: feedback ?? undefined,
                rubricChecks: rubricChecks ?? undefined,
                reviewedBy: session.user.id,
                reviewedAt: new Date()
            } as any
        });

        return NextResponse.json(updated);
    } catch (e: any) {
        console.error("Error updating submission:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

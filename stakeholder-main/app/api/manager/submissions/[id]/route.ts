import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        // Find the profile to get the user ID
        const profile = await prisma.studentProfile.findUnique({ where: { id } })
        if (!profile) return NextResponse.json([])
        
        // Find their journey
        const journey = await prisma.studentJourney.findUnique({
             where: { userId: profile.userId }
        })
        if (!journey) return NextResponse.json([])
        
        // Find sprint tool submissions for this journey
        const submissions = await prisma.sprintToolSubmission.findMany({
            where: {
                sprint: { journeyId: journey.id }
            },
            include: { sprint: true },
            orderBy: { submittedAt: 'desc' },
            take: 50
        });

        // Map status for the legacy UI if needed, but we now support new fields
        const mappedSubmissions = submissions.map(s => {
            let legacyStatus = s.status
            if (s.status === 'gate_passed') legacyStatus = 'approved'
            else if (s.status === 'blocked') legacyStatus = 'rejected'
            
            return {
                ...s,
                status: legacyStatus
            }
        })

        return NextResponse.json(mappedSubmissions);
    } catch (e: any) {
        console.error("Error fetching submissions:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Expert Review Dashboard aggregates from multiple sources
        const toolSubmissions = await prisma.sprintToolSubmission.findMany({
            where: { status: { in: ['submitted', 'gate_passed'] } },
            include: {
                sprint: {
                    include: {
                        journey: {
                            include: {
                                user: { select: { name: true, avatar: true, email: true } }
                            }
                        }
                    }
                }
            },
            orderBy: { submittedAt: 'desc' },
            take: 20
        })

        const crlEvidence = await prisma.cRLEvidence.findMany({
            where: { status: { in: ['submitted', 'under_review', 'approved'] } },
            include: {
                journey: {
                    include: {
                        user: { select: { name: true, avatar: true, email: true } }
                    }
                }
            },
            orderBy: { submittedAt: 'desc' },
            take: 20
        })

        const irlEvidence = await prisma.iRLEvidence.findMany({
            where: { status: { in: ['submitted', 'under_review', 'approved'] } },
            include: {
                journey: {
                    include: {
                        user: { select: { name: true, avatar: true, email: true } }
                    }
                }
            },
            orderBy: { submittedAt: 'desc' },
            take: 20
        })

        // Map all to a common format
        const allReviews = [
            ...toolSubmissions.map((s: any) => ({
                id: s.id,
                type: 'SprintToolSubmission',
                name: s.sprint.journey.user.name,
                project: s.sprint.journey.sector || 'Innovation Project',
                level: `Sprint ${s.sprint.sprintNumber}`,
                toolId: s.toolId,
                toolName: s.toolName,
                gateCheck: s.gateCheck,
                submittedData: s.submittedData,
                managerScore: s.managerScore,
                assessmentNotes: s.assessmentNotes,
                status: s.status,
                score: s.aiScore ?? s.managerScore ?? null,
                date: s.submittedAt ? s.submittedAt.toISOString() : s.createdAt.toISOString(),
                studentId: s.sprint.journey.userId
            })),
            ...crlEvidence.map((s: any) => ({
                id: s.id,
                type: 'CRLEvidence',
                name: s.journey.user.name,
                project: s.journey.sector || 'Commercialization Path',
                level: s.dimension,
                toolName: 'Commercial Evidence',
                status: s.status,
                score: s.aiScore,
                date: s.submittedAt ? s.submittedAt.toISOString() : s.createdAt.toISOString(),
                studentId: s.journey.userId,
                criterionScores: s.criterionScores,
                evidenceText: s.evidenceText,
                submittedData: { evidenceText: s.evidenceText, evidenceUrls: s.evidenceUrls }
            })),
            ...irlEvidence.map((s: any) => ({
                id: s.id,
                type: 'IRLEvidence',
                name: s.journey.user.name,
                project: s.journey.sector || 'Innovation Path',
                level: s.dimension,
                toolName: 'Innovation Evidence',
                status: s.status,
                score: s.aiScore,
                date: s.submittedAt ? s.submittedAt.toISOString() : s.createdAt.toISOString(),
                studentId: s.journey.userId,
                criterionScores: s.criterionScores,
                evidenceText: s.evidenceText,
                submittedData: { evidenceText: s.evidenceText, evidenceUrls: s.evidenceUrls }
            }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return NextResponse.json(allReviews)
    } catch (error: any) {
        console.error("Review GET Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

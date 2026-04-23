import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { initialiseSprints } from '@/lib/sprints-init'

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id || !session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        
        // 1. Ensure StudentProfile exists
        let profile = await prisma.studentProfile.findUnique({
            where: { userId: session.user.id }
        })

        if (!profile) {
            console.log(`Auto-creating StudentProfile for ${session.user.email}`)
            profile = await prisma.studentProfile.create({
                data: {
                    userId: session.user.id,
                    institution: 'General',
                    program: 'Innovation',
                    year: 2026,
                }
            })
        }

        // 2. Fetch Journey
        let journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
            include: {
                sprints: { 
                    include: { toolSubmissions: true },
                    orderBy: { sprintNumber: 'asc' }
                },
                user: { 
                    include: { 
                        studentProfile: {
                            include: {
                                manager: {
                                    include: {
                                        user: { select: { name: true, avatar: true, email: true } }
                                    }
                                }
                            }
                        },
                        interactionsAsInitiator: { take: 10, orderBy: { occurredAt: 'desc' } } 
                    } 
                },
                trlEvidences: {
                    take: 5,
                    orderBy: { submittedAt: 'desc' },
                },
                experiments: {
                    where: { status: 'completed' },
                    take: 5,
                },
                complianceTasks: {
                    where: { certificationStatus: { not: 'completed' } },
                    take: 5,
                },
                pilotApplications: {
                    where: { status: { in: ['applied', 'accepted', 'in_progress'] } },
                },
            },
        })

        if (!journey) {
            console.log(`Auto-creating StudentJourney for user: ${session.user.id}`)
            // Create default journey
            journey = await prisma.studentJourney.create({
                data: {
                    userId: session.user.id,
                    sector: 'deeptech',
                    stage: 'idea',
                    trlLevel: 1,
                    metrics: {
                        experiments_completed: 0,
                        partners_engaged: 0,
                        funding_raised: 0,
                    },
                    milestones: [],
                },
                include: {
                    sprints: { include: { toolSubmissions: true } },
                    user: { include: { studentProfile: true } }
                }
            }) as any

            // IMMEDIATELY Initialize Sprints so the first load has the roadmap
            if (journey) {
                try {
                    const initializedSprints = await initialiseSprints(journey.id)
                    journey.sprints = initializedSprints as any
                } catch (sprintErr) {
                    console.error("Failed to auto-initialize sprints:", sprintErr)
                    // We can still return the journey, just without sprints (roadmap will show error or reload)
                    journey.sprints = [] as any
                }
            }
        }

        return NextResponse.json(journey)
    } catch (error: any) {
        console.error('Journey fetch error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { sector, stage, trlLevel, metrics, blockers } = body

        const journey = await prisma.studentJourney.update({
            where: { userId: session.user.id },
            data: {
                ...(sector && { sector }),
                ...(stage && { stage }),
                ...(trlLevel && { trlLevel }),
                ...(metrics && { metrics }),
                ...(blockers && { blockers }),
            },
        })

        return NextResponse.json(journey)
    } catch (error: any) {
        console.error('Journey update error:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}

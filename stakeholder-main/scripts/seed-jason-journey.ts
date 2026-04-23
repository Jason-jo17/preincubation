import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const userId = 'cmkez1vay0042fkzf5x003d1' // Jason's ID
    console.log(`🌱 Seeding journey data for Jason (${userId})...`)

    // 1. Ensure StudentProfile exists
    const profile = await prisma.studentProfile.upsert({
        where: { userId },
        update: {
            institution: 'NITK Surathkal',
            projectName: 'AgriSense IoT',
            xp: 450,
            points: 120,
            level: 2,
            stage: 'Validation'
        } as any,
        create: {
            userId,
            institution: 'NITK Surathkal',
            projectName: 'AgriSense IoT',
            xp: 450,
            points: 120,
            level: 2,
            stage: 'Validation'
        } as any
    })

    // 2. Ensure StudentJourney exists
    const journey = await prisma.studentJourney.upsert({
        where: { userId },
        update: {
            sector: 'agritech',
            stage: 'validation',
            trlLevel: 3,
            loveabilityScore: 78,
            metrics: {
                experiments_completed: 5,
                partners_engaged: 3,
                funding_raised: 50000
            },
            weeklyReports: [
                {
                    week: 1,
                    summary: "Completed initial stakeholder empathy mapping.",
                    loveabilityScore: 65,
                    generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    week: 2,
                    summary: "Validated value proposition with 10 farmers.",
                    loveabilityScore: 78,
                    generatedAt: new Date().toISOString()
                }
            ]
        } as any,
        create: {
            userId,
            sector: 'agritech',
            stage: 'validation',
            trlLevel: 3,
            loveabilityScore: 78,
            metrics: {
                experiments_completed: 5,
                partners_engaged: 3,
                funding_raised: 50000
            },
            weeklyReports: [
                {
                    week: 1,
                    summary: "Completed initial stakeholder empathy mapping.",
                    loveabilityScore: 65,
                    generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                },
                {
                    week: 2,
                    summary: "Validated value proposition with 10 farmers.",
                    loveabilityScore: 78,
                    generatedAt: new Date().toISOString()
                }
            ],
            milestones: []
        } as any
    })

    // 3. Seed some Sprints
    console.log('🏃 Seeding sprints...')
    const sprint1 = await prisma.sprint.upsert({
        where: { id: 'sprint-1-jason' },
        update: { status: 'completed' },
        create: {
            id: 'sprint-1-jason',
            journeyId: journey.id,
            sprintNumber: 1,
            status: 'completed',
            name: "Purpose & Problem Framing",
            stageNumber: 1,
            weekRange: "0-1",
            trlGate: "TRL 1",
            crlIrlOutput: "Standard Output",
            startedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
    })

    const sprint2 = await prisma.sprint.upsert({
        where: { id: 'sprint-2-jason' },
        update: { status: 'active' },
        create: {
            id: 'sprint-2-jason',
            journeyId: journey.id,
            sprintNumber: 2,
            status: 'active',
            name: "Customer Validation",
            stageNumber: 1,
            weekRange: "2",
            trlGate: "TRL 2",
            crlIrlOutput: "Customer Feedback",
            startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            completedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    })

    console.log('✅ Journey and Sprint data seeded successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

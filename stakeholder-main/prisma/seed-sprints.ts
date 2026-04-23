import { PrismaClient } from '@prisma/client'
import { SPRINT_REGISTRY } from '../lib/sprint-registry'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding sprints...')

  // Fetch all existing journeys
  const journeys = await prisma.studentJourney.findMany()
  console.log(`Found ${journeys.length} journeys.`)

  for (const journey of journeys) {
    for (const def of SPRINT_REGISTRY) {
      const existing = await prisma.sprint.findUnique({
        where: { journeyId_sprintNumber: { journeyId: journey.id, sprintNumber: def.sprintNumber } }
      })

      if (!existing) {
        await prisma.sprint.create({
          data: {
            journeyId: journey.id,
            sprintNumber: def.sprintNumber,
            name: def.name,
            stageNumber: def.stageNumber,
            weekRange: def.weekRange,
            trlGate: def.trlGate,
            crlIrlOutput: def.crlIrlOutput,
            status: def.sprintNumber === 1 ? 'active' : 'locked',
            gateChecks: def.tools.map(t => ({ checkId: t.toolId, label: t.gateCheck, passed: false })),
            toolSubmissions: {
              create: def.tools.map(t => ({
                toolId: t.toolId,
                toolName: t.toolName,
                trlContribution: t.trlContribution,
                crlDimension: t.crlDimension,
                irlDimension: t.irlDimension,
                maxPercent: t.maxPercent,
                status: 'pending',
                gateCheck: t.gateCheck,
                isGateLevel: t.isGateLevel
              }))
            }
          }
        })
        console.log(`Created Sprint ${def.sprintNumber} for journey ${journey.id}`)
      }
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

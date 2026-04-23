import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding Sprint Templates...')

  const templates = [
    {
      name: 'Standard Propellant Sprint',
      sprintNumber: 1,
      weekRange: 'Weeks 1-2',
      trlGate: 'TRL 3: Analytical Proof of Concept',
      crlIrlOutput: 'CRL 1: Basic Principles Observed',
      tools: [
        { toolId: 'problem-def', toolName: 'Problem Definition', isGateLevel: false },
        { toolId: 'market-size', toolName: 'Market Sizing', isGateLevel: false },
        { toolId: 'trl-self-assessment', toolName: 'TRL Self-Assessment', isGateLevel: true }
      ]
    },
    {
      name: 'Deep Tech Acceleration',
      sprintNumber: 2,
      weekRange: 'Weeks 3-4',
      trlGate: 'TRL 4: Component Validation in Lab',
      crlIrlOutput: 'IRL 2: Technology Formulation',
      tools: [
        { toolId: 'competitor-analysis', toolName: 'Competitor Analysis', isGateLevel: false },
        { toolId: 'tech-roadmap', toolName: 'Technical Roadmap', isGateLevel: false },
        { toolId: 'lab-validation-report', toolName: 'Lab Validation', isGateLevel: true }
      ]
    }
  ]

  for (const t of templates) {
    await prisma.sprintTemplate.create({
      data: {
        name: t.name,
        sprintNumber: t.sprintNumber,
        weekRange: t.weekRange,
        trlGate: t.trlGate,
        crlIrlOutput: t.crlIrlOutput,
        tools: {
          create: t.tools
        }
      }
    })
  }

  console.log('Seed successful!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

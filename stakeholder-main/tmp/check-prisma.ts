import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
require('dotenv').config()

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
    console.error('DATABASE_URL is missing')
    process.exit(1)
}

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const keys = Object.keys(prisma).filter(k => !k.startsWith('$'))
    console.log('Available models:', keys.join(', '))

    if (keys.includes('sprintTemplate')) {
        console.log('SUCCESS: sprintTemplate is available')
    } else {
        console.log('FAILURE: sprintTemplate is missing from client')
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

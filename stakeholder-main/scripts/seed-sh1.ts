import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding specific stakeholder sh-1...')

    // Create a user for the stakeholder
    const user = await prisma.user.upsert({
        where: { email: 'rajesh@techsolutions.com' },
        update: {},
        create: {
            name: 'Rajesh Kumar',
            email: 'rajesh@techsolutions.com',
            role: 'STAKEHOLDER',
        }
    })

    // Create the stakeholder profile with ID sh-1
    await prisma.stakeholderProfile.upsert({
        where: { id: 'sh-1' },
        update: {
            userId: user.id,
            designation: 'Director',
            organization: 'Tech Solutions',
            district: 'Mangaluru',
            bio: 'Expert in technology implementations and strategic asset management.',
            expertise: ['Technology', 'Strategy'],
            verificationStatus: 'verified'
        },
        create: {
            id: 'sh-1',
            userId: user.id,
            designation: 'Director',
            organization: 'Tech Solutions',
            district: 'Mangaluru',
            bio: 'Expert in technology implementations and strategic asset management.',
            expertise: ['Technology', 'Strategy'],
            verificationStatus: 'verified',
            interestTags: ['Technology', 'Strategy']
        }
    })

    console.log('✅ Stakeholder sh-1 seeded successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

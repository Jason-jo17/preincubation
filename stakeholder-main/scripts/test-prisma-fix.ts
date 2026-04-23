import { prisma } from '../lib/prisma'

async function test() {
  try {
    console.log('Testing Prisma connection...')
    const userCount = await prisma.user.count()
    console.log(`Success! Found ${userCount} users.`)
    
    const firstUser = await prisma.user.findFirst()
    console.log('First user:', firstUser)
    
    process.exit(0)
  } catch (e) {
    console.error('Prisma connection failed:', e)
    process.exit(1)
  }
}

test()

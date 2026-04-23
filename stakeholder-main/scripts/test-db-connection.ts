import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Testing DB connection...")
  try {
    const userCount = await prisma.user.count()
    console.log("Connection successful! User count:", userCount)
    
    // Check SprintToolSubmission unique constraints indirectly
    const submissions = await prisma.sprintToolSubmission.findMany({ take: 1 })
    console.log("SprintToolSubmission model accessible.")
  } catch (e) {
    console.error("Connection failed:", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()

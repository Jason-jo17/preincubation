const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log("Adding columns to SprintToolSubmission...")
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "iterationName" TEXT;
    `)
    console.log("Added iterationName")
    
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "iterationNumber" INTEGER DEFAULT 1;
    `)
    console.log("Added iterationNumber")

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "isDraft" BOOLEAN DEFAULT false;
    `)
    console.log("Added isDraft")

    console.log("Database schema updated successfully.")
  } catch (error) {
    console.error("Schema update error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'student@demo.com' }
  })

  if (!user) {
    console.error("User student@demo.com not found")
    return
  }

  console.log("Found user:", user.id)

  try {
    const journey = await prisma.studentJourney.findUnique({
      where: { userId: user.id },
      include: {
        sprints: {
          include: {
            toolSubmissions: true
          }
        }
      }
    })

    if (!journey) {
      console.log("No journey found for user")
    } else {
      console.log("Journey found:", journey.id)
      console.log("Number of sprints:", journey.sprints.length)
      journey.sprints.forEach(s => {
        console.log(`Sprint ${s.sprintNumber}: ${s.toolSubmissions.length} submissions`)
      })
    }
  } catch (error) {
    console.error("Diagnostic error:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

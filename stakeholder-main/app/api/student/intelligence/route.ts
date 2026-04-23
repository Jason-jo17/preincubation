import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      select: {
        weeklyReports: true,
        loveabilityScore: true,
        lastIntelligenceSync: true
      }
    })

    const profile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        xp: true,
        points: true,
        level: true
      }
    })

    return NextResponse.json({
      intelligence: journey,
      gamification: profile
    })
    
  } catch (error) {
    console.error("Student Intelligence API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

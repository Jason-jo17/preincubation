import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { evaluateNudge } from "@/lib/nudge-agent"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id }
    })

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 })
    }

    const nudges = await prisma.nudgeEvent.findMany({
      where: { 
        journeyId: journey.id,
        dismissed: false
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(nudges)
  } catch (error: any) {
    console.error("Nudge GET Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { targetToolId } = await req.json()
    if (!targetToolId) {
      return NextResponse.json({ error: "Missing targetToolId" }, { status: 400 })
    }

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id }
    })

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 })
    }

    const result = await evaluateNudge(journey.id, targetToolId)
    return NextResponse.json(result)

  } catch (error: any) {
    console.error("Nudge API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

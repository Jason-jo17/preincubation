import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { SPRINT_REGISTRY } from "@/lib/sprint-registry"
import { initialiseSprints } from "@/lib/sprints-init"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: {
        sprints: {
          include: { toolSubmissions: true },
          orderBy: { sprintNumber: 'asc' }
        }
      }
    })

    if (!journey) {
      // Logic moved to handle journey auto-creation if possible, 
      // but for now let's keep it safe.
      return NextResponse.json({ error: "Journey not found" }, { status: 404 })
    }

    // Ensure all 9 sprints exist
    if (journey.sprints.length < SPRINT_REGISTRY.length) {
      const sprints = await initialiseSprints(journey.id)
      return NextResponse.json({ sprints: sprints || [] })
    }

    return NextResponse.json({ sprints: journey.sprints })
  } catch (error: any) {
    console.error("Sprint GET Error:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
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

    await initialiseSprints(journey.id)

    return NextResponse.json({ success: true, message: "Sprints re-initialized." })
  } catch (error: any) {
    console.error("Sprint Init Error:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}


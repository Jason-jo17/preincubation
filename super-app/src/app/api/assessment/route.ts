import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma" // Standard Prisma client instance
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    // If userId is provided, filter by it. Otherwise, return all (Admin/Mentor only)
    const where: any = {}
    if (userId) {
      where.userId = userId
    } else if ((session.user as any).role !== "ADMIN" && (session.user as any).role !== "MENTOR") {
      where.userId = (session.user as any).id
    }

    const assessments = await prisma.readinessAssessment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json(assessments)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { scores, levels, stage } = body

    const assessment = await prisma.readinessAssessment.create({
      data: {
        userId: (session.user as any).id,
        scores,
        levels,
        stage,
        peerScores: {},
        mentorScores: {},
        mentorNotes: {}
      }
    })

    return NextResponse.json(assessment, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

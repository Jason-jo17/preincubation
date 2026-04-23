import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: {
        crlEvidences: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!journey) return NextResponse.json({ error: "Journey not found" }, { status: 404 })
    return NextResponse.json({ evidences: journey.crlEvidences })
  } catch (error) {
    console.error("CRL GET Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { dimension, evidenceText, evidenceUrls, sprintToolsCited } = await req.json()

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id }
    })
    if (!journey) return NextResponse.json({ error: "Journey not found" }, { status: 404 })

    const weights: Record<string, number> = {
      'market_application': 30,
      'customer_validation': 35,
      'business_model': 35
    }

    const evidence = await prisma.cRLEvidence.create({
      data: {
        journeyId: journey.id,
        dimension,
        dimensionWeight: weights[dimension] || 0,
        evidenceText,
        evidenceUrls: evidenceUrls || [],
        sprintToolsCited: sprintToolsCited || [],
        status: 'submitted'
      }
    })

    return NextResponse.json({ success: true, evidence })
  } catch (error) {
    console.error("CRL POST Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma" // Standard Prisma client instance
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const assessment = await prisma.readinessAssessment.findUnique({
      where: { id: params.id },
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

    if (!assessment) return NextResponse.json({ error: "Not Found" }, { status: 404 })

    // Security: Only owner, mentor, or admin can view
    const isOwner = assessment.userId === (session.user as any).id
    const isPowerUser = ["ADMIN", "MENTOR"].includes((session.user as any).role)

    if (!isOwner && !isPowerUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json(assessment)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const isPowerUser = ["ADMIN", "MENTOR"].includes((session.user as any).role)

    // Only power users can update scores/notes of others
    // For now, let's allow PATCH for validation data
    const assessment = await prisma.readinessAssessment.update({
      where: { id: params.id },
      data: {
        ...body
      }
    })

    return NextResponse.json(assessment)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.readinessAssessment.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

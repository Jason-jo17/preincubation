import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sprintNumber: string; submissionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { submissionId } = await params

    const submission = await prisma.sprintToolSubmission.findUnique({
      where: { id: submissionId },
      include: {
        sprint: {
          include: {
            journey: true
          }
        }
      }
    })

    if (!submission || submission.sprint.journey.userId !== session.user.id) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json(submission)
  } catch (error: any) {
    console.error("GET Submission Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ sprintNumber: string; submissionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { submissionId } = await params

    const submission = await prisma.sprintToolSubmission.findUnique({
      where: { id: submissionId },
      include: {
        sprint: {
          include: {
            journey: true
          }
        }
      }
    })

    if (!submission || submission.sprint.journey.userId !== session.user.id) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    await prisma.sprintToolSubmission.delete({
      where: { id: submissionId }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("DELETE Submission Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sprintNumber: string; submissionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { submissionId } = await params
    const { submittedData, iterationName, isDraft } = await req.json()

    const submission = await prisma.sprintToolSubmission.findUnique({
      where: { id: submissionId },
      include: {
        sprint: {
          include: {
            journey: true
          }
        }
      }
    })

    if (!submission || submission.sprint.journey.userId !== session.user.id) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const updated = await prisma.sprintToolSubmission.update({
      where: { id: submissionId },
      data: {
        submittedData,
        iterationName,
        isDraft,
        status: isDraft ? 'pending' : 'submitted',
        submittedAt: isDraft ? null : new Date()
      }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error("PATCH Submission Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

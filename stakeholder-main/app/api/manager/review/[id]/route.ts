import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const { status, score, notes, type, rubricScores, rubricChecks } = body

    let updated

    if (type === 'SprintToolSubmission') {
      updated = await prisma.sprintToolSubmission.update({
        where: { id },
        data: {
          status: status === 'approved' ? 'gate_passed' : status === 'rejected' ? 'blocked' : 'submitted',
          managerScore: score !== undefined ? Number(score) : undefined,
          managerNotes: notes ?? undefined,
          rubricChecks: rubricChecks ?? undefined,
          reviewedBy: session.user.id,
          reviewedAt: new Date()
        } as any
      })
    } else if (type === 'CRLEvidence') {
      updated = await prisma.cRLEvidence.update({
        where: { id },
        data: {
          status,
          aiScore: score !== undefined ? score : undefined,
          criterionScores: rubricScores ?? undefined,
          assessmentNotes: notes ?? undefined,
        }
      })
    } else if (type === 'IRLEvidence') {
      updated = await prisma.iRLEvidence.update({
        where: { id },
        data: {
          status,
          aiScore: score !== undefined ? score : undefined,
          criterionScores: rubricScores ?? undefined,
          assessmentNotes: notes ?? undefined,
        }
      })
    } else {
      return NextResponse.json({ error: 'Invalid review type' }, { status: 400 })
    }

    return NextResponse.json(updated)
  } catch (error: any) {
    console.error('Review PATCH Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

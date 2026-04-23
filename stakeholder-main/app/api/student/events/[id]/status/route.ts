import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { status } = await req.json()  // 'registered' | 'attended' | 'won'

  if (!['registered', 'attended', 'won'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const journey = await prisma.studentJourney.findUnique({
    where: { userId: session.user.id }
  })
  if (!journey) return NextResponse.json({ error: 'Journey not found' }, { status: 404 })

  const event = await prisma.pitchingEvent.findUnique({ where: { id } })
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })

  // Update the event attendance status
  await prisma.pitchingEvent.update({
    where: { id },
    data: {
      attendanceStatus: status,
      attendingJourneyId: journey.id
    }
  })

  // If status is 'won' → auto-create a TRLEvidence entry as supporting proof
  if (status === 'won') {
    await prisma.tRLEvidence.create({
      data: {
        journeyId: journey.id,
        trlLevel: journey.trlLevel,
        evidenceType: 'competition_win',
        evidenceText: `Won "${event.title}" — ${event.type} held on ${event.eventDate.toDateString()} at ${event.location}. ${event.description || ''}`.trim(),
        evidenceUrl: event.registrationUrl ?? undefined,
        status: 'submitted'
      }
    })
  }

  return NextResponse.json({ success: true, status })
}

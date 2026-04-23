import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TRL_EVENT_MAP } from '@/lib/sprint-registry'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const journey = await prisma.studentJourney.findUnique({
    where: { userId: session.user.id }
  })
  if (!journey) return NextResponse.json({ error: 'Journey not found' }, { status: 404 })

  const trl = journey.trlLevel  // 1–9

  // Find events that cover this TRL level, upcoming, open for registration
  const events = await prisma.pitchingEvent.findMany({
    where: {
      trlMin: { lte: trl },
      trlMax: { gte: trl },
      status: { in: ['upcoming', 'open'] },
      eventDate: { gte: new Date() }
    },
    orderBy: { eventDate: 'asc' },
    take: 3
  })

  return NextResponse.json({
    trl,
    trlContext: TRL_EVENT_MAP[trl],   // { type, why, monetary } — for display
    events
  })
}

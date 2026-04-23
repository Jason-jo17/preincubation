import { NextRequest, NextResponse } from 'next/server';
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sectorId = params.id.toLowerCase();

  // Aggregate sessions from ALL companies in this sector
  const sectorSessions = MOSI_SESSIONS.filter(s => s.sector_id === sectorId);

  return NextResponse.json(sectorSessions);
}

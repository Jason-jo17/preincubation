import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Mock interest creation
  return NextResponse.json({
    id: `int-${Math.random().toString(36).substr(2, 9)}`,
    status: 'interested',
    automation_need_id: params.id
  });
}

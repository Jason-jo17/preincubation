import { NextRequest, NextResponse } from 'next/server';

// Mock student profile for demo
const MOCK_STUDENTS: Record<string, any> = {
  'talent-1': {
    id: 'talent-1',
    name: 'Jason G',
    email: 'jason@buildforx.in',
    rank: 'Elite Builder',
    level: 14,
    total_points: 1250,
    progress: 65,
    badges: ['Fast Responder', 'Precision Model', 'Industry First', 'Aerospace Certified'],
    applications: [
      {
        id: 'sub-1',
        title: 'EdgeAI CV Inspector',
        prd: 'AI Visual Defect Detection for Die Casting',
        status: 'Evaluation',
        date: '2 hrs ago'
      },
      {
        id: 'sub-2',
        title: 'Predictive Spindle Sentinel',
        prd: 'Predictive Maintenance for Precision Lathes',
        status: 'Shortlisted',
        date: '3 days ago'
      }
    ]
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const student = MOCK_STUDENTS[params.id];
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
  return NextResponse.json(student);
}

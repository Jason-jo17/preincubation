import { NextResponse } from 'next/server';
import { NAGPUR_NEXT_PRDS } from '@/lib/demo-data/prds';

// This endpoint returns published PRD challenges. 
export async function GET() {
  try {
    // In demo mode, prioritize local high-fidelity Nagpur NEXT PRDs
    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      return NextResponse.json(NAGPUR_NEXT_PRDS);
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      const res = await fetch(`${backendUrl}/api/buildforx/prds?status=published`, {
        next: { revalidate: 60 }
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(Array.isArray(data) ? data : []);
      }
    }
  } catch {
    // fall through
  }
  
  // Final fallback to Nagpur NEXT
  return NextResponse.json(NAGPUR_NEXT_PRDS);
}

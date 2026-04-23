import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions';

/**
 * GET /api/mosi/feed/[id]
 * Fetches discovery intel logs for a specific company or sector.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

    // Canonical mapping for Aequs (if needed for Supabase)
    const targetCompanyId = (id === 'ceed-1' || id === 'aeq-001')
      ? 'a2e10480-1000-41d4-a7ae-446655440001' 
      : id;

    if (isDemoMode) {
      // Filter sessions for matching IDs
      const sessions = MOSI_SESSIONS.filter(s => 
        s.companyId === id || 
        s.companyId === targetCompanyId ||
        s.sector_id === id // Also support sector-based feed here for fallback
      );
      return NextResponse.json(sessions);
    }

    // Try Supabase first
    const { data: dbSessions, error } = await supabase
      .from('mosi_sessions')
      .select('*, opportunities:mosi_opportunities(*)')
      .eq('company_id', targetCompanyId)
      .order('created_at', { ascending: false });

    if (!error && dbSessions && dbSessions.length > 0) {
      return NextResponse.json(dbSessions);
    }

    // Fallback to Demo Data if no DB records
    const fallback = MOSI_SESSIONS.filter(s => s.companyId === id || s.companyId === targetCompanyId);
    return NextResponse.json(fallback);
    
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

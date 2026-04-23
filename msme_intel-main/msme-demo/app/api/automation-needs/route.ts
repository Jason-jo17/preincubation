import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEMO_AUTOMATION_NEEDS } from '@/lib/demo-data/automation-needs';

export async function GET(req: NextRequest) {
  try {
    const { data: needs, error } = await supabase
      .from('sector_automation_needs')
      .select(`
        *,
        sector:sectors(name)
      `)
      .order('created_at', { ascending: false });

    if (!error && needs && needs.length > 0) {
      return NextResponse.json(needs);
    }

    // Fallback to rich local demo data when DB is unavailable or empty
    console.warn('[automation-needs] Using demo fallback data');
    return NextResponse.json(DEMO_AUTOMATION_NEEDS);
  } catch (error: any) {
    // Always return demo data so the UI never shows an empty state
    return NextResponse.json(DEMO_AUTOMATION_NEEDS);
  }
}

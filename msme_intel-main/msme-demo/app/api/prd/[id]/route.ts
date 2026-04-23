import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { NAGPUR_NEXT_PRDS } from '@/lib/demo-data/prds';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Support both ID and Slug for flexibility in Demo Mode
    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !process.env.SUPABASE_URL) {
      const prd = NAGPUR_NEXT_PRDS.find(p => p.id === id || p.slug === id);
      if (prd) {
        return NextResponse.json(prd);
      }
    }

    const { data: prd, error } = await supabase
      .from('buildforx_prds')
      .select(`
        *,
        company:companies(*),
        sector:sectors(*)
      `)
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (error) {
      // Local demo fallback for specific Nagpur NEXT IDs
      const localFallback = NAGPUR_NEXT_PRDS.find(p => p.id === id || p.slug === id);
      if (localFallback) {
         return NextResponse.json(localFallback);
      }
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(prd);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

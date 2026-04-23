import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEMO_STAKEHOLDERS } from '@/lib/demo-data/stakeholders';

export async function GET(
  req: NextRequest,
  { params }: { params: { company_id: string } }
) {
  try {
    const { company_id } = params;

    // Direct mapping for demo and canonical IDs
    const targetCompanyId = (company_id === 'ceed-1' || company_id === 'aeq-001' || company_id === 'a2e10480-1000-41d4-a7ae-446655440001')
      ? 'a2e10480-1000-41d4-a7ae-446655440001' 
      : company_id;

    const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || true;

    // Use local demo data for Aequs if in demo mode
    if (isDemo && targetCompanyId === 'a2e10480-1000-41d4-a7ae-446655440001') {
      return NextResponse.json(DEMO_STAKEHOLDERS);
    }

    const { data: stakeholders, error } = await supabase
      .from('mosi_stakeholders')
      .select('*')
      .eq('company_id', targetCompanyId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(stakeholders || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

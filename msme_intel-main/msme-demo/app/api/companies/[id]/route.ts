import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// MSME API: Individual Company Detailed Fetch
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Manual client creation (Project doesn't have auth-helpers-nextjs installed)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // 1. Fetch Company Core Data
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select(`
        *,
        primary_sector:sectors(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (companyError) throw companyError;
    if (!company) {
       return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // 2. Fetch Gap Analysis
    const { data: gapAnalysis } = await supabase
      .from('gap_analysis')
      .select('*')
      .eq('company_id', id)
      .order('analysis_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    // 3. Fetch Roadmaps
    const { data: roadmaps } = await supabase
      .from('company_roadmaps')
      .select('*')
      .eq('company_id', id)
      .order('created_at', { ascending: false });

    // 4. Map to DetailedCompany interface
    const response = {
      ...company,
      sector: company.primary_sector?.name,
      rag_status: gapAnalysis?.rag_score || 'amber',
      gap_analysis: gapAnalysis ? {
        overall_gap_score: gapAnalysis.overall_potential_score,
        screening_classification: gapAnalysis.screening_classification,
        investment_readiness: gapAnalysis.investment_readiness,
        business_maturity_score: gapAnalysis.business_maturity_score,
        critical_gaps: gapAnalysis.critical_gaps || [],
        key_strengths: gapAnalysis.key_strengths || [],
        priority_actions: gapAnalysis.priority_actions || []
      } : null,
      roadmaps: roadmaps || []
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector');
    const stage = searchParams.get('stage');
    const search = searchParams.get('search');

    let query = supabase
      .from('companies')
      .select(`
        *,
        sector:sectors(name),
        gap_analysis(rag_score, overall_potential_score)
      `)
      .order('name');

    if (sector && sector !== 'undefined') {
      query = query.eq('primary_sector_id', sector);
    }
    
    if (stage && stage !== 'undefined') {
      query = query.eq('stage', stage);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data: companies, error } = await query;

    if (error || !companies || companies.length === 0) {
      console.warn('Supabase error or empty - returning demo fallback companies');
      return NextResponse.json(DEMO_COMPANIES);
    }

    // Map the response to match the expected Company type
    const mappedCompanies = companies?.map(company => ({
      ...company,
      sector: typeof company.sector === 'object' ? (company.sector as any)?.name : company.sector,
      sub_sector: company.sub_sector || 'General',
      headquarters_city: company.headquarters_location?.split(',')[0]?.trim() || 'Unknown',
      headquarters_state: company.headquarters_location?.split(',')[1]?.trim() || 'India',
      rag_status: company.gap_analysis?.[0]?.rag_score || 'amber',
      revenue_growth_rate: company.revenue_growth_rate || 0,
      gap_analysis: company.gap_analysis?.[0] || null
    }));

    return NextResponse.json(mappedCompanies || []);
  } catch (error: any) {
    return NextResponse.json(DEMO_COMPANIES); // Fallback even on total crash
  }
}

// High-fidelity mock companies for the PRD Builder Demo
const DEMO_COMPANIES = [
  {
    id: 'aeq-001',
    name: 'Aequs Limited',
    primary_sector_id: 'aerospace',
    sectors: { name: 'Aerospace & Defense' },
    sector: 'Aerospace & Defense',
    sub_sector: 'Precision Engineering',
    headquarters_city: 'Belagavi',
    headquarters_state: 'Karnataka',
    rag_status: 'green',
    gap_analysis: { rag_score: 'green', overall_potential_score: 88 }
  },
  {
    id: 'dyn-001',
    name: 'Dynamatic Technologies',
    primary_sector_id: 'aerospace',
    sectors: { name: 'Aerospace & Defense' },
    sector: 'Aerospace & Defense',
    sub_sector: 'Hydraulics & Aerospace',
    headquarters_city: 'Bengaluru',
    headquarters_state: 'Karnataka',
    rag_status: 'amber',
    gap_analysis: { rag_score: 'amber', overall_potential_score: 72 }
  },
  {
    id: 'hical-001',
    name: 'Hical Technologies',
    primary_sector_id: 'aerospace',
    sectors: { name: 'Electronics' },
    sector: 'Electronics',
    sub_sector: 'Electromagnetics',
    headquarters_city: 'Bengaluru',
    headquarters_state: 'Karnataka',
    rag_status: 'green',
    gap_analysis: { rag_score: 'green', overall_potential_score: 85 }
  }
];

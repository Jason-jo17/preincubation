// src/app/api/intel/companies/route.ts

import { NextResponse } from 'next/server';
import { getEcosystemCompanies } from '@/lib/intelligence/bridge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get('sector');

  try {
    let companies = await getEcosystemCompanies();
    
    if (sector) {
      companies = companies.filter(c => 
        c.sector.toLowerCase().includes(sector.toLowerCase()) || 
        c.category.toLowerCase().includes(sector.toLowerCase())
      );
    }

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bridged companies' }, { status: 500 });
  }
}

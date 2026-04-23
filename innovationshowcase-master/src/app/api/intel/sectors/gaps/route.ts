// src/app/api/intel/sectors/gaps/route.ts

import { NextResponse } from 'next/server';
import { getSectorGapsFromSeed } from '@/lib/intelligence/bridge';

export async function GET(request: Request) {
  try {
    const gaps = await getSectorGapsFromSeed();
    return NextResponse.json(gaps);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bridged sector gaps' }, { status: 500 });
  }
}

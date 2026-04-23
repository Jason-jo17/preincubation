import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { data: prds, error } = await supabase
      .from('buildforx_prds')
      .select(`
        *,
        company:companies(name),
        sector:sectors(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
           // Handle common error where model expects app router NextResponse but maybe I'm using NextRequest from 'next/request'
           // Actually in app router it's 'next/server'
    }

    return Response.json(prds || []);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

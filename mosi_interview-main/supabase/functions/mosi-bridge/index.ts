/// <reference lib="deno.ns" />
import "@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { session_data, opportunities } = await req.json()

    // Initialize Supabase Client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Syncing session for stakeholder: ${session_data.stakeholder_id}`)

    // 1. Upsert Session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .upsert({
        id: session_data.id,
        stakeholder_id: session_data.stakeholder_id,
        status: session_data.status || 'Published',
        summary: session_data.summary,
        transcript: session_data.transcript || [],
        duration: session_data.duration || 0,
        audio_settings: session_data.audio_settings || { audio: true, video: true }
      })
      .select()
      .single()

    if (sessionError) throw sessionError

    // 2. Upsert Opportunities
    if (opportunities && opportunities.length > 0) {
      console.log(`Syncing ${opportunities.length} opportunities...`)
      const { error: oppsError } = await supabase
        .from('opportunities')
        .upsert(
          opportunities.map((opp: any) => ({
            ...opp,
            session_id: session.id, // Linking to the session
          }))
        )
      
      if (oppsError) throw oppsError
    }

    return new Response(
      JSON.stringify({ 
        message: 'Intelligence Bridge Sync Successful', 
        sessionId: session.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error: any) {
    console.error('Bridge Sync Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

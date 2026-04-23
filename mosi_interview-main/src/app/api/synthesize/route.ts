import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/lib/supabase-server';

interface SynthesisOpportunity {
  id?: string
  title: string
  description: string
  tag: 'Core' | 'Efficiency' | 'Expansion' | 'Disrupt'
  problem_clarity?: number
  budget_score?: number
  origin?: string
  activelySeeking?: boolean
  skillset?: string[]
  toolset?: string[]
  mindset?: string[]
  assessment_matrix?: {
    clarity: number
    awareness: number
    attempts: number
    intensity: number
  }
  timestamp?: number
}

interface SynthesisResult {
  summary?: string
  opportunities?: SynthesisOpportunity[]
  stakeholder_sentiment?: string
  next_steps?: string[]
}

interface StakeholderInput {
  id?: string
  name?: string
  role?: string
  company?: string
  company_id?: string
  sector?: string
}

const openai = new OpenAI({
  apiKey: (process?.env?.OPENAI_API_KEY as string) || '',
});

// Export config for Next.js to parse the body natively
export const maxDuration = 300; // Allow enough time for transcription

async function transcribeWithElevenLabs(audioBuffer: Buffer): Promise<string> {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY not configured in .env.local');
  }

  const formData = new FormData();
  // Using Uint8Array to avoid Node Buffer/Blob compatibility issues in TS
  const blob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/webm' });
  formData.append('file', blob, 'recording.webm');
  formData.append('model_id', 'scribe_v1'); 

  console.log('Transcribing with ElevenLabs...');
  const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs Transcription failed: ${errorText}`);
  }

  const data = await response.json();
  console.log('Transcription successful with ElevenLabs.');
  return data.text || '';
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    let transcriptText = '';
    let opportunities: any[] = [];
    let stakeholder: any = {};

    if (contentType.includes('multipart/form-data')) {
      console.log('Receiving direct multipart/form-data upload...');
      const formData = await req.formData();
      const rawOpp = formData.get('opportunities') as string;
      const rawStakeholder = formData.get('stakeholder') as string;
      
      opportunities = rawOpp ? JSON.parse(rawOpp) : [];
      stakeholder = rawStakeholder ? JSON.parse(rawStakeholder) : {};
      
      const audioFile = formData.get('audioFile') as File | null;
      
      if (audioFile) {
        console.log('Transcribing local File object with ElevenLabs Scribe...');
        const arrayBuffer = await audioFile.arrayBuffer();
        transcriptText = await transcribeWithElevenLabs(Buffer.from(arrayBuffer));
      }
    } else {
      console.log('Receiving JSON request...');
      const body = await req.json();
      opportunities = body.opportunities || [];
      stakeholder = body.stakeholder || {};
      const recordingUrl = body.recordingUrl;
      
      if (recordingUrl) {
        let fetchUrl = recordingUrl;
        let arrayBuffer: ArrayBuffer | null = null;
        
        console.log('Fetching audio from URL:', fetchUrl);
        
        try {
          const audioResponse = await fetch(fetchUrl);
          if (!audioResponse.ok) throw new Error('Bad status');
          arrayBuffer = await audioResponse.arrayBuffer();
        } catch (primaryErr: any) {
          console.log('Primary fetch failed, attempting Docker fallback routing...', primaryErr.message);
          const fallbackUrl = fetchUrl.includes('127.0.0.1') 
            ? fetchUrl.replace('127.0.0.1', 'localhost') 
            : fetchUrl.replace('localhost', '127.0.0.1');
            
          const fallbackResponse = await fetch(fallbackUrl);
          if (!fallbackResponse.ok) throw new Error('Fallback URL also failed.');
          arrayBuffer = await fallbackResponse.arrayBuffer();
        }

        if (arrayBuffer) {
           transcriptText = await transcribeWithElevenLabs(Buffer.from(arrayBuffer));
        }
      }
    }

    // --- SYNTHESIS BLOCK (Senior CEED Strategist) ---
    if (!transcriptText || transcriptText.includes("No transcription generated")) {
      return NextResponse.json({ summary: transcriptText, transcript: transcriptText });
    }

    console.log('Synthesizing strategic insights with OpenAI GPT-4o...');
    
    const systemPrompt = `
## ROLE: Senior Business Transformation Consultant & CEED Strategist

You are an expert at extracting high-stakes business opportunities from raw interview dialogues. Your goal is to analyze the provided transcript and synthesize it into the **CEED Framework** (Core, Efficiency, Expansion, Disruption).

## OBJECTIVE
Identify specific, actionable "Opportunities" mentioned or implied by the stakeholder. Each opportunity must be backed by evidence (quotes) and mapped to a strategic quadrant.

## CEED FRAMEWORK DEFINITIONS
1. CORE: Strengthening existing products, stabilizing current revenue. "Do what we do, but better."
2. EFFICIENCY: Operational automation, cost reduction. "Reduce waste and friction."
3. EXPANSION: Geographic diversification, new customer segments. "Take what we have to new places."
4. DISRUPTION: Radical innovation, industry-altering technology (e.g., GenAI). "Rewrite the rules."

## RUBRIC FOR SCORING (1-4)
- Clarity: 1 = Vague pain; 2 = Identified problem; 3 = Clear requirement; 4 = Technical specification readiness.
- Budget: 1 = No mention; 2 = Interest in ROI; 3 = Allocation exists; 4 = High-priority funded project.
- Intensity: How much "pain" or "urgency" is behind the need.

## INSTRUCTIONS
1. Be Forensic: Only extract opportunities where there is actual "Evidence" in the dialogue.
2. Tag Intelligently: Manual errors -> Efficiency. EV market entry -> Expansion.
3. Normalize: Tags MUST be "Core", "Efficiency", "Expansion", or "Disrupt".
4. Language: professional, concise, data-driven.
`;

    const userPrompt = `
STAKEHOLDER CONTEXT:
${JSON.stringify(stakeholder, null, 2)}

EXISTING OPPORTUNITY LOGS (Manually captured):
${JSON.stringify(opportunities, null, 2)}

TRANSCRIPT:
${transcriptText}

Analyze the transcript and provide a full synthesis in the requested JSON format.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
    });

    const synthesisResult: SynthesisResult = JSON.parse(
      completion.choices[0].message.content || '{}'
    );

    // --- MSME BRIDGE TRIGGER ---
    const supabaseClient = await createClient();
    
    if (synthesisResult.opportunities && synthesisResult.opportunities.length > 0) {
      console.log('🔗 Triggering Supabase Intelligence Bridge...');
      try {
        const session_data = {
          id: crypto.randomUUID(), 
          stakeholder_id: (stakeholder as StakeholderInput).id || crypto.randomUUID(),
          company_id: (stakeholder as StakeholderInput).company_id || 'ceed-1', // Default for demo if not found
          status: 'Published',
          summary: synthesisResult.summary,
          duration: 1200,
          audio_settings: { audio: true, video: true },
          transcript: transcriptText
        };

        const opportunities_to_sync = synthesisResult.opportunities.map((opp: SynthesisOpportunity) => ({
          ...opp,
          id: crypto.randomUUID(),
          session_id: session_data.id,
          timestamp: 0,
          assessment_matrix: opp.assessment_matrix || { clarity: 2, awareness: 2, attempts: 2, intensity: 2 }
        }));

        // Invoke the Supabase Edge Function
        const { data: bridgeResponse, error: bridgeError } = await supabaseClient.functions.invoke('mosi-bridge', {
          body: { 
            session_data, 
            opportunities: opportunities_to_sync 
          }
        });

        if (bridgeError) throw bridgeError;
        console.log('✅ Bridge Sync Success:', bridgeResponse);
        
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown bridge error';
        console.error('MSME Bridge Trigger failed:', errorMessage);
      }
    }

    return NextResponse.json({ 
      summary: synthesisResult.summary || transcriptText, 
      transcript: transcriptText,
      opportunities: synthesisResult.opportunities || [],
      sentiment: synthesisResult.stakeholder_sentiment || 'Neutral',
      nextSteps: synthesisResult.next_steps || []
    });

  } catch (error: any) {
    console.error('Synthesis/Transcription API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process session.' }, { status: 500 });
  }
}



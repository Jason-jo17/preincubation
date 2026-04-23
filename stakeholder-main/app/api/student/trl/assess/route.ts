import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getAiClient } from '@/lib/ai-service'
import { Type } from "@google/genai"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const ai = await getAiClient()

        const body = await req.json()
        const { evidenceId, trlLevel, evidenceText, evidenceType } = body

        // AI assessment
        const systemPrompt = `You are an expert in Technology Readiness Levels (TRL 1-9). Assess if the provided evidence supports the claimed TRL level. Return JSON only: { "score": 0-100, "recommendations": ["rec1", "rec2", "rec3"] }`
        const userPrompt = `TRL Level: ${trlLevel}, Evidence Type: ${evidenceType}, Evidence: ${evidenceText}`

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["score", "recommendations"]
                }
            }
        })

        if (!response.text) throw new Error("No response from AI")
        const assessment = JSON.parse(response.text)

        // Update evidence with AI score
        const updated = await (prisma as any).tRLEvidence.update({
            where: { id: evidenceId },
            data: {
                aiScore: assessment.score,
                aiRecommendations: assessment.recommendations,
                status: assessment.score >= 70 ? 'approved' : 'under_review',
            },
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error('Assessment error:', error)
        // Fallback logic
        return NextResponse.json({ error: 'AI Service Unavailable', status: 500 })
    }
}

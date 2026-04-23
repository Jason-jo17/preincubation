import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { getAiClient, getApiKey } from "@/lib/ai-service"
import { Type } from "@google/genai"
import { getBandForTRL, computeCRLTotal, computeIRLTotal, CONFLICT_PRIORITY } from "@/lib/sprint-registry"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
            include: {
              sprints: { include: { toolSubmissions: true } },
              crlEvidences: { orderBy: { createdAt: 'desc' }, take: 10 },
              irlEvidences: { orderBy: { createdAt: 'desc' }, take: 10 },
              nudgeEvents: { orderBy: { createdAt: 'desc' }, take: 5 }
          }
      })

        if (!journey) return NextResponse.json({ error: "Journey not found" }, { status: 404 })

        // 1. Calculate Scores and Context
        const activeSprint = journey.sprints?.find((s: any) => s.status === 'active' || s.status === 'in_progress')
        const latestFeedback = activeSprint?.toolSubmissions?.find((s: any) => (s.submittedData as any)?.mentorFeedback)?.submittedData as any
        const mentorFeedbackString = latestFeedback?.mentorFeedback || null

        // Basic map of latest dimension scores
        const crlLatest: Record<string, number> = {}
        journey.crlEvidences.forEach((e: any) => {
            if (e.passed && !crlLatest[e.dimension]) crlLatest[e.dimension] = e.aiScore || 0;
        })
        const irlLatest: Record<string, number> = {}
        journey.irlEvidences.forEach((e: any) => {
            if (e.passed && !irlLatest[e.dimension]) irlLatest[e.dimension] = e.aiScore || 0;
        })

        const crlTotal = computeCRLTotal(crlLatest)
        const irlTotal = computeIRLTotal(irlLatest)

        // 2. Identify Alignment & Conflicts
        const band = getBandForTRL(journey.trlLevel)
        let conflictAlert = null
        const conflicts = []

        if (band) {
            if (band.overCRLSignal && crlTotal > band.crlMax) conflicts.push(band.overCRLSignal)
            if (band.underCRLSignal && crlTotal < band.crlMin) conflicts.push(band.underCRLSignal)
            if (band.criticalIRLThreshold && irlTotal < band.criticalIRLThreshold) {
                conflicts.push(`CRITICAL: IRL (${irlTotal}%) is below required threshold (${band.criticalIRLThreshold}%) for TRL ${journey.trlLevel}`)
            }
        }

        // Process CONFLICT_PRIORITY (simulated data context for checks)
        const ctx = {
            trlStuckDays: 0,
            crlGapPercent: band ? Math.max(0, band.crlMin - crlTotal) : 0,
            irlGapPercent: band ? Math.max(0, band.irlMin - irlTotal) : 0,
            mentorFlagHoursAgo: 999,
            toolsRemainingInStage: activeSprint ? 4 : 0,
            inactiveDays: 0
        }

        for (const rule of CONFLICT_PRIORITY) {
            if (rule.check(ctx)) {
                conflictAlert = { rank: rule.rank, condition: rule.condition, response: rule.response }
                break
            }
        }

        // 3. Generate Actions with Gemini
        let aiOutput = { 
            recommendations: [], 
            strategicPath: { nextStage: "Data Collection", reasoning: "Complete more tools to unlock AI strategic insights." } 
        }

        try {
            // Check if API key is available first
            const apiKey = await getApiKey()
            if (!apiKey) {
                console.warn("Recommendations API: Missing API Key, skipping AI generation.")
            } else {
                const ai = await getAiClient()
                const systemPrompt = `You are the InUnity Recommendation Engine. 
            Analyze the student's journey state and output:
            1. Exactly 3 prioritised actionable recommendations.
            2. A distinct Strategic Path forecasting the immediate next stage and why.
            Focus on advancing their current sprint (${activeSprint?.name || 'None'}) and resolving conflicts.

            Return JSON with:
            {
              "recommendations": [ { "title": "...", "description": "...", "actionUrl": "...", "priority": "HIGH"|"MEDIUM"|"LOW" } ],
              "strategicPath": { "nextStage": "...", "reasoning": "..." }
            }`

                const statePrompt = `TRL: ${journey.trlLevel}\nCRL Total: ${crlTotal}%\nIRL Total: ${irlTotal}%\nActive Sprint: ${activeSprint?.name}\nConflict Alert: ${conflictAlert?.condition || 'None'}\nOpen Conflicts: ${conflicts.filter(Boolean).join('; ')}`

                const response = await ai.models.generateContent({
                    model: 'gemini-2.0-flash',
                    contents: [
                        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + statePrompt }] }
                    ],
                    config: {
                        responseMimeType: 'application/json',
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                recommendations: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: { type: Type.STRING },
                                            description: { type: Type.STRING },
                                            actionUrl: { type: Type.STRING },
                                            priority: { type: Type.STRING }
                                        }
                                    }
                                },
                                strategicPath: {
                                    type: Type.OBJECT,
                                    properties: {
                                        nextStage: { type: Type.STRING },
                                        reasoning: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    }
                })

                if (response.text) {
                    aiOutput = JSON.parse(response.text)
                }
            }
        } catch (aiErr) {
            console.error("AI Generation Error (Fallback applied):", aiErr)
            // Fallback is already initialized
        }

        return NextResponse.json({
            success: true,
            context: {
                trl: journey.trlLevel,
                crl: crlTotal,
                irl: irlTotal,
                activeSprint: activeSprint?.sprintNumber,
                conflictAlert,
                conflicts: conflicts.filter(Boolean)
            },
            recommendations: aiOutput.recommendations,
            strategicPath: aiOutput.strategicPath,
            mentorFeedback: mentorFeedbackString
      })

    } catch (error: any) {
        console.error("Recommendations API Global Error:", error)
        // Fallback response instead of 500
        return NextResponse.json({ 
            success: false, 
            recommendations: [], 
            context: { trl: 1, crl: 0, irl: 0 },
            error: error.message || "Internal Server Error" 
        }, { status: 200 })
    }
}

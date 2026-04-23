import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getAiClient } from "@/lib/ai-service"
import { Type } from "@google/genai"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Initialize BYOK AI client
    const ai = await getAiClient()

    const resolvedParams = await params
    const evidenceId = resolvedParams.id
    console.log("[IRL ASSESSMENT] Starting for evidenceId:", evidenceId);

    const evidence = await prisma.iRLEvidence.findUnique({
      where: { id: evidenceId },
      include: { journey: true }
    })

    if (!evidence) {
      console.error("[IRL ASSESSMENT] Evidence not found:", evidenceId);
      return NextResponse.json({ error: "Evidence not found" }, { status: 404 })
    }

    if (evidence.journey.userId !== session.user.id) {
      console.error("[IRL ASSESSMENT] Unauthorized access by user:", session.user.id);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    if (evidence.evidenceText.length < 50) {
      console.log("[IRL ASSESSMENT] Evidence too short, auto-rejecting.");
      const updated = await prisma.iRLEvidence.update({
        where: { id: evidenceId },
        data: {
          status: 'rejected',
          autoRejectReason: 'Evidence text is too short to evaluate. Please provide more detail.',
          passed: false,
          aiScore: 0
        }
      })
      return NextResponse.json({ success: true, evidence: updated })
    }

    const systemPrompt = `You are an Innovation Readiness Level (IRL) expert.
    Assess the provided evidence for dimension: ${evidence.dimension}.
    
    CRITICAL: If the evidence provided is too vague, generic, or lacks specific details to be evaluated meaningfully (e.g., "I did research", "We talked to people" without specific findings), set "isInsufficientData" to true and provide clear guidance on what specific details are missing.

    Return a structured JSON evaluation:
    {
      "isInsufficientData": boolean,
      "score": number (0-100),
      "criterionScores": { "quality": number, "sourcing": number, "specificity": number, "integrity": number },
      "notes": string,
      "improvementGuidance": string
    }`;

    const prompt = `Evidence Text:\n${evidence.evidenceText}\n\nEvidence URLs:\n${JSON.stringify(evidence.evidenceUrls)}\n\nJourney Sector: ${evidence.journey.sector}`;

    console.log("[IRL ASSESSMENT] Calling AI with prompt length:", (systemPrompt + prompt).length);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isInsufficientData: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            criterionScores: {
              type: Type.OBJECT,
              properties: {
                quality: { type: Type.INTEGER },
                sourcing: { type: Type.INTEGER },
                specificity: { type: Type.INTEGER },
                integrity: { type: Type.INTEGER }
              }
            },
            notes: { type: Type.STRING },
            improvementGuidance: { type: Type.STRING }
          },
          required: ["isInsufficientData", "score", "criterionScores", "notes", "improvementGuidance"]
        }
      }
    })

    if (!response.text) {
      console.error("[IRL ASSESSMENT] Empty response from AI");
      throw new Error("No response from AI")
    }

    console.log("[IRL ASSESSMENT] AI Response received:", response.text);
    const result = JSON.parse(response.text)

    // Auto-approve rule: score >= 65 is passing
    const passed = result.score >= 65 && !result.isInsufficientData

    let weightedScore = null
    if (passed) {
      weightedScore = Math.round(result.score * (evidence.dimensionWeight / 100))
    }

    console.log("[IRL ASSESSMENT] Updating database with status:", result.isInsufficientData ? 'insufficient' : (passed ? 'approved' : 'rejected'));

    const updated = await prisma.iRLEvidence.update({
      where: { id: evidenceId },
      data: {
        status: result.isInsufficientData ? 'rejected' : (passed ? 'approved' : 'rejected'),
        aiScore: result.score,
        criterionScores: result.criterionScores,
        assessmentNotes: result.isInsufficientData ? `INSUFFICIENT DATA: ${result.notes}` : result.notes,
        improvementGuidance: result.improvementGuidance,
        passed,
        weightedScore,
        reviewedAt: new Date()
      }
    })

    console.log("[IRL ASSESSMENT] Completed successfully for evidenceId:", evidenceId);
    return NextResponse.json({ success: true, evidence: updated })

  } catch (error) {
    console.error("[IRL ASSESSMENT] ERROR:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

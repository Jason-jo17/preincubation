import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getAiClient } from "@/lib/ai-service"
import { Type } from "@google/genai"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Initialize BYOK AI client
    const ai = await getAiClient()

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: { problemStatement: true }
    })

    if (!journey) return NextResponse.json({ error: "Journey not found" }, { status: 404 })

    // 1. Hard Filter Stakeholders
    const stakeholders = await prisma.stakeholderProfile.findMany({
      where: {
        tags: { has: journey.sector }
      },
      take: 20 // limit for AI scoring
    })

    if (stakeholders.length === 0) {
      return NextResponse.json({ matches: [] })
    }

    // 2. NLP Alignment using Gemini
    const systemPrompt = `You are a Stakeholder Matching AI.
    Compare the student's problem statement with the given list of stakeholder profiles.
    Return an alignment score (0-100) and a 1-sentence 'why' for each stakeholder.
    Format your response as a JSON object: { matches: [{ stakeholderId, score, rationale }] }`

    const studentContext = `
Student Sector: ${journey.sector}
Student Stage: ${journey.stage}
Problem Title: ${journey.problemStatement?.title || 'Unknown'}
Problem Description: ${journey.problemStatement?.description || 'Unknown'}
    `

    const stakeholderContext = stakeholders.map(s =>
      `\nID: ${s.id}\nName: User#${s.userId}\nDesignation: ${s.designation}\nTags: ${s.tags.join(', ')}\nOrganization: ${s.organization || 'Independent'}`
    ).join('\n---\n')

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + studentContext + '\n\nSTAKEHOLDERS:\n' + stakeholderContext }] }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stakeholderId: { type: Type.STRING },
                  score: { type: Type.INTEGER },
                  rationale: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    })

    if (!response.text) throw new Error("AI generated no stakeholders")
    const aiOutput = JSON.parse(response.text)

    // 3. Merge profiles with scores, filter score > 60, sort descending
    const matchedProfiles = aiOutput.matches
      .filter((m: any) => m.score > 60)
      .map((m: any) => {
        const profile = stakeholders.find(s => s.id === m.stakeholderId)
        return {
          ...profile,
          alignmentScore: m.score,
          matchRationale: m.rationale
        }
      })
      .filter((p: any) => p.userId) // ensure profile was found
      .sort((a: any, b: any) => b.alignmentScore - a.alignmentScore)

    return NextResponse.json({ matches: matchedProfiles })

  } catch (error) {
    console.error("Stakeholder Match API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

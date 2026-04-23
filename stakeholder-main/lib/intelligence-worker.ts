import { prisma } from "./prisma"
import { getAiClient } from "./ai-service"
import { Type } from "@google/genai"

/**
 * Intelligence Worker Service
 * Handles weekly summaries, loveability scores, and trend detection.
 */

export async function processUserIntelligence(userId: string) {
  const ai = await getAiClient()
  
  // 1. Fetch relevant data for the last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const journey = await prisma.studentJourney.findUnique({
    where: { userId },
    include: {
      sprints: {
        include: {
          toolSubmissions: {
            where: { updatedAt: { gte: sevenDaysAgo } }
          }
        }
      },
      nudgeEvents: {
        where: { createdAt: { gte: sevenDaysAgo } }
      }
    }
  })
  
  const interactions = await prisma.interaction.findMany({
    where: {
      initiatorId: userId,
      occurredAt: { gte: sevenDaysAgo }
    }
  })
  
  if (!journey) return { error: "Journey not found" }

  // 2. Generate Weekly Summary & Loveability Assessment
  const toolOutputs = journey.sprints.flatMap(s => 
    s.toolSubmissions.map(ts => ({
      tool: ts.toolName,
      data: ts.submittedData
    }))
  )
  
  const interactionData = interactions.map(i => ({
    type: i.type,
    notes: i.notes,
    sentiment: i.sentiment,
    topics: i.topics
  }))

  const systemPrompt = `You are the InUnity Intelligence Worker.
  Analyze the student's progress and interaction data for the week.
  
  Weekly Summary Goals:
  1. Highlight core accomplishments.
  2. Identify critical stalls or blockers.
  3. Suggest high-level strategic focus.
  
  Loveability Goals:
  1. Evaluate "Passion" (indicated by interaction volume, notes detail, and proactive tool use).
  2. Evaluate "Problem Fit" (alignment between student's proposed solution and customer pain points).
  3. Output a 0-100 score.
  
  Return JSON:
  {
    "summary": { "accomplishments": [], "blockers": [], "nextSteps": "..." },
    "loveability": { "score": number, "reasoning": "..." },
    "trends": [ { "topic": "...", "sentiment": "...", "impact": "..." } ]
  }`

  const userPrompt = `
  User Tool Outputs: ${JSON.stringify(toolOutputs)}
  User Interactions: ${JSON.stringify(interactionData)}
  Nudges Triggered: ${JSON.stringify(journey.nudgeEvents)}
  `

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [{ role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.OBJECT,
            properties: {
              accomplishments: { type: Type.ARRAY, items: { type: Type.STRING } },
              blockers: { type: Type.ARRAY, items: { type: Type.STRING } },
              nextSteps: { type: Type.STRING }
            }
          },
          loveability: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              reasoning: { type: Type.STRING }
            }
          },
          trends: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topic: { type: Type.STRING },
                sentiment: { type: Type.STRING },
                impact: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  })

  if (!response.text) throw new Error("AI generated no intelligence data")
  const data = JSON.parse(response.text)

  // 3. Update Database
  const existingReports = Array.isArray(journey.weeklyReports) ? journey.weeklyReports : []
  const newReport = {
    weekStarting: sevenDaysAgo.toISOString(),
    generatedAt: new Date().toISOString(),
    ...data.summary,
    trends: data.trends,
    loveabilityReasoning: data.loveability.reasoning
  }

  await prisma.studentJourney.update({
    where: { id: journey.id },
    data: {
      weeklyReports: [...existingReports, newReport].slice(-10), // Keep last 10
      loveabilityScore: data.loveability.score,
      lastIntelligenceSync: new Date()
    }
  })

  // 4. Auto-Tag Stakeholders & Detect Sector Trends
  if (interactions.length > 0) {
    await autoTagStakeholders(interactions)
  }

  return { success: true, data: newReport, loveability: data.loveability }
}

async function autoTagStakeholders(interactions: any[]) {
    // Basic tag extraction from interaction topics
    for (const interaction of interactions) {
        if (!interaction.stakeholderId || !interaction.topics || interaction.topics.length === 0) continue;
        
        const stake = await prisma.stakeholderProfile.findUnique({
            where: { id: interaction.stakeholderId },
            select: { id: true, interestTags: true }
        })
        
        if (!stake) continue;
        
        const newTags = Array.from(new Set([...stake.interestTags, ...interaction.topics]))
        await prisma.stakeholderProfile.update({
            where: { id: stake.id },
            data: { interestTags: newTags }
        })
    }
}

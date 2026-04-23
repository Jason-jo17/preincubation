import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getAiClient } from "@/lib/ai-service"
import { Type } from "@google/genai"
import { SPRINT_REGISTRY } from "@/lib/sprint-registry"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        // Initialize BYOK AI client
        const ai = await getAiClient()

        // Extract any special context provided by the manager (optional)
        const body = await req.json().catch(() => ({}))
        const { focusArea = "General Discovery", targetTRL = "2-3" } = body

        // Extract available tools from the registry to give Gemini the exact valid tool IDs and Names
        const availableTools = Array.from(new Set(
            SPRINT_REGISTRY.flatMap(s => s.tools.map(t => ({ id: t.toolId, name: t.toolName })))
        )).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)

        const toolsJsonStr = JSON.stringify(availableTools, null, 2)
        
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                success: true,
                sprintConfig: {
                    name: "AI Generated Sprint (Mock)",
                    weekRange: "Week 1-3",
                    tools: [
                        { toolId: "innovator_profile", toolName: "Innovator Profile", isGateLevel: false, trlContribution: "TRL +0" },
                        { toolId: "problem_stakeholder_matrix", toolName: "Problem Stakeholder Matrix", isGateLevel: false, trlContribution: "TRL +1" },
                        { toolId: "perceived_value", toolName: "Perceived Value", isGateLevel: true, trlContribution: "TRL +1" }
                    ]
                }
            })
        }

        const systemPrompt = `You are an expert Startup Incubation Curriculum Designer for the InUnity Platform.
You are assisting a Mentor in designing a high-impact "Sprint Pattern" for a student cohort.
Your objective is to propose a structured sprint. 
Context provided by Mentor:
- Focus Area: ${focusArea}
- Target TRL Stage: ${targetTRL}

Available Tools (You MUST ONLY select from these valid tool IDs):
${toolsJsonStr}

Return a cohesive Sprint Plan in exactly the required JSON schema.`

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { role: 'user', parts: [{ text: systemPrompt }] }
            ],
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "A catchy, professional name for this sprint (e.g. 'Customer Discovery & Alignment')" },
                        weekRange: { type: Type.STRING, description: "e.g. 'Week 2-4'" },
                        tools: {
                            type: Type.ARRAY,
                            description: "Select 3 to 6 valid tools that create a logical progression.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    toolId: { type: Type.STRING },
                                    toolName: { type: Type.STRING },
                                    isGateLevel: { type: Type.BOOLEAN, description: "Mark exactly 1 or 2 critical review steps as true." },
                                    trlContribution: { type: Type.STRING, description: "e.g. 'TRL +1'" }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!response.text) throw new Error("AI generated no recommendations")
        const sprintConfig = JSON.parse(response.text)

        return NextResponse.json({ success: true, sprintConfig })

    } catch (error: any) {
        console.error("Sprint Suggester API Error:", error)
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
    }
}

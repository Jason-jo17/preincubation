import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getAiClient } from "@/lib/ai-service"
import { Type } from "@google/genai"
import { getRubricForTool } from "@/lib/tool-rubric"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const ai = await getAiClient()
    const resolvedParams = await params
    const submissionId = resolvedParams.id
    
    const submission = await prisma.sprintToolSubmission.findUnique({
      where: { id: submissionId },
      include: {
          sprint: {
              include: {
                  journey: true
              }
          }
      }
    })

    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 })

    const rubric = getRubricForTool(submission.toolId)
    const submittedData = submission.submittedData as any

    const systemPrompt = `You are an expert startup mentor and innovation judge.
    Assess the provided tool submission for the tool: ${submission.toolName}.
    
    Rubric Criteria:
    ${rubric.map((c: any) => `- ${c.label}: ${c.description}`).join('\n')}
    
    Gate Check Requirements:
    ${submission.gateCheck}
    
    Return a structured JSON evaluation:
    {
      "score": number (0-100),
      "notes": string (brief summary of findings),
      "feedback": string (specific guidance for the student),
      "criteriaPass": boolean[] (mapping to the rubric criteria above)
    }`;

    const prompt = `Submitted Data:\n${JSON.stringify(submittedData, null, 2)}\n\nProject Sector: ${submission.sprint.journey.sector}`;

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
            score: { type: Type.INTEGER },
            notes: { type: Type.STRING },
            feedback: { type: Type.STRING },
            criteriaPass: { 
                type: Type.ARRAY,
                items: { type: Type.BOOLEAN }
            }
          },
          required: ["score", "notes", "feedback", "criteriaPass"]
        }
      }
    })

    if (!response.text) throw new Error("No response from AI")
    const result = JSON.parse(response.text)

    const updated = await prisma.sprintToolSubmission.update({
      where: { id: submissionId },
      data: {
        aiScore: result.score,
        assessmentNotes: result.notes + "\n\nFEEDBACK: " + result.feedback,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ success: true, aiResult: result, submission: updated })

  } catch (error) {
    console.error("[AI TOOL ASSESSMENT] ERROR:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAiClient } from "@/lib/ai-service";
import { Type } from "@google/genai";
import { subDays } from "date-fns";

/**
 * AI Research Report Generation API.
 * Synthesizes platform data into strategic research reports.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Auth Guard
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Body
    const body = await req.json();
    const { reportType, districts, sectorIds, researchQuestions, title } = body;

    if (!reportType || !title) {
      return NextResponse.json({ error: "Missing required fields: reportType, title" }, { status: 400 });
    }

    // 3. Data Gathering context
    const ninetyDaysAgo = subDays(new Date(), 90);

    // Fetch relevant data in parallel
    const [stakeholders, problems, solutions, interactions] = await Promise.all([
      prisma.stakeholderProfile.findMany({
        where: {
          OR: [
            { district: { in: districts || [] } },
            { sectors: { some: { id: { in: sectorIds || [] } } } }
          ]
        },
        select: {
          id: true,
          designation: true,
          organization: true,
          district: true,
          sectors: { select: { name: true } },
          bio: true
        },
        take: 50
      }),
      prisma.problemStatement.findMany({
        where: {
          sectors: { some: { id: { in: sectorIds || [] } } }
        },
        select: {
          title: true,
          description: true,
          severity: true,
          domain: true
        },
        take: 20
      }),
      prisma.solution.findMany({
        where: {
          sectors: { some: { id: { in: sectorIds || [] } } }
        },
        select: {
          title: true,
          description: true,
          status: true
        },
        take: 20
      }),
      prisma.interaction.findMany({
        where: {
          occurredAt: { gte: ninetyDaysAgo },
          stakeholder: {
            sectors: { some: { id: { in: sectorIds || [] } } }
          }
        },
        select: {
          type: true,
          summary: true,
          topics: true,
          occurredAt: true
        },
        take: 30
      })
    ]);

    // 4. Build Context String
    const context = `
REPORT SPECIFICATIONS:
Type: ${reportType}
Districts: ${districts?.join(", ") || "All"}
Sectors: ${sectorIds?.join(", ") || "All"}
Research Questions: ${researchQuestions?.join(". ") || "General analysis"}

PLATFORM DATA:
Stakeholders (${stakeholders.length}): 
${stakeholders.map(s => `- ${s.designation} at ${s.organization || 'N/A'} (${s.district})`).join("\n")}

Problems Identified (${problems.length}):
${problems.map(p => `- [${p.severity}] ${p.title}: ${p.description}`).join("\n")}

Potential Solutions (${solutions.length}):
${solutions.map(s => `- [${s.status}] ${s.title}`).join("\n")}

Recent Interactions (${interactions.length}):
${interactions.map(i => `- ${i.type} on ${i.occurredAt.toDateString()}: ${i.summary || 'No summary available'}`).join("\n")}
    `;

    // 5. Call AI
    const ai = await getAiClient();
    const systemPrompt = `You are a strategic research analyst. Based on the provided platform data, generate a comprehensive, data-driven research report. 
    Ensure the Analysis section connects the problems identified with stakeholder feedback and potential solutions.
    Recommendations should be actionable and prioritized.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Use 2.0-flash as 2.5 was not found in env
      contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\n" + context }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING },
            introduction: { type: Type.STRING },
            findings: { type: Type.STRING },
            analysis: { type: Type.STRING },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            conclusions: { type: Type.STRING },
            keyFindings: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["executiveSummary", "introduction", "findings", "analysis", "recommendations", "conclusions", "keyFindings"]
        }
      }
    });

    if (!result.text) throw new Error("AI failed to generate report content");
    const aiData = JSON.parse(result.text);

    // 6. Save Report
    const report = await prisma.researchReport.create({
      data: {
        title,
        reportType,
        status: "published",
        scope: { districts, sectorIds, researchQuestions },
        districts: districts || [],
        researchQuestions: researchQuestions || [],
        executiveSummary: aiData.executiveSummary,
        introduction: aiData.introduction,
        findings: aiData.findings,
        analysis: aiData.analysis,
        recommendations: aiData.recommendations,
        conclusions: aiData.conclusions,
        keyFindings: aiData.keyFindings,
        generatedByAI: true,
        aiModel: "gemini-2.0-flash",
        createdBy: session.user.id
      }
    });

    return NextResponse.json({ id: report.id, title: report.title });

  } catch (error: any) {
    console.error("Report generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate research report", details: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAiClient } from "@/lib/ai-service";
import { Type } from "@google/genai";

/**
 * AI-powered transcript processing route.
 * Handles summary generation, insight extraction, and vector embeddings for RAG.
 * Uses unified @google/genai SDK syntax.
 */
export async function POST(req: NextRequest) {
  let transcriptId: string | undefined;

  try {
    const body = await req.json();
    transcriptId = body.transcriptId;

    if (!transcriptId) {
      return NextResponse.json({ error: "Transcript ID is required" }, { status: 400 });
    }

    // 1. Fetch transcript
    const transcript = await prisma.transcript.findUnique({
      where: { id: transcriptId }
    });

    if (!transcript) {
      return NextResponse.json({ error: "Transcript not found" }, { status: 404 });
    }

    if (!transcript.rawText) {
      return NextResponse.json({ error: "Transcript has no raw text to process" }, { status: 400 });
    }

    // 2. Set status to processing
    await prisma.transcript.update({
      where: { id: transcriptId },
      data: { processingStatus: "processing" }
    });

    // 3. Initialize Gemini
    const ai = await getAiClient();
    
    // 4. Generate structured content
    console.log("Generating content with gemini-2.0-flash...");
    const systemPrompt = `Analyze the following interview transcript and provide a structured summary (3 paragraphs), key points, topics, action items, strategic insights, and notable quotes.`;
    const userPrompt = `Transcript:\n${transcript.rawText}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            topics: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            insights: { type: Type.ARRAY, items: { type: Type.STRING } },
            quotes: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["summary", "keyPoints", "topics", "actionItems", "insights", "quotes"]
        }
      }
    });

    if (!result.text) throw new Error("No response from AI");
    const aiData = JSON.parse(result.text);

    // 5. Chunking and Embeddings
    const words = transcript.rawText.split(/\s+/);
    const chunkSize = 400; // ~500 tokens
    const chunks: string[] = [];
    
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    // Process embeddings
    console.log(`Generating embeddings for ${chunks.length} chunks...`);
    const embeddingRows: any[] = [];
    for (let i = 0; i < chunks.length; i++) {
        const embedResult = await ai.models.embedContent({
            model: "text-embedding-004",
            contents: [{
                parts: [{ text: chunks[i] }]
            }]
        });

        if (embedResult.embeddings?.[0]?.values) {
            embeddingRows.push({
                transcriptId,
                sourceId: transcriptId!,
                sourceType: "transcript",
                text: chunks[i],
                embedding: embedResult.embeddings[0].values,
                chunkIndex: i,
                metadata: {
                  title: transcript.title,
                  recordedDate: transcript.recordedDate?.toISOString()
                }
            });
        }
    }

    // 6. Save to Database in transaction
    const updatedTranscript = await prisma.$transaction(async (tx) => {
      // Clear old embeddings
      await tx.vectorEmbedding.deleteMany({
        where: { transcriptId }
      });

      // Insert new embeddings
      if (embeddingRows.length > 0) {
        await tx.vectorEmbedding.createMany({
          data: embeddingRows
        });
      }

      // Update transcript
      return await tx.transcript.update({
        where: { id: transcriptId },
        data: {
          summary: aiData.summary,
          keyPoints: aiData.keyPoints,
          topics: aiData.topics,
          actionItems: aiData.actionItems,
          insights: aiData.insights,
          quotes: aiData.quotes,
          processingStatus: "completed",
          updatedAt: new Date()
        }
      });
    });

    return NextResponse.json(updatedTranscript);

  } catch (error: any) {
    console.error("Transcript processing error:", error);

    if (transcriptId) {
      await prisma.transcript.update({
        where: { id: transcriptId },
        data: { 
          processingStatus: "failed",
          processingError: error.message || "Unknown error during AI processing"
        }
      }).catch(console.error);
    }

    return NextResponse.json(
      { error: "Failed to process transcript", details: error.message },
      { status: 500 }
    );
  }
}

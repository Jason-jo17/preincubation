import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAiClient } from "@/lib/ai-service";
import { pinecone } from "@/lib/ai/pinecone";

export const dynamic = "force-dynamic";

/**
 * AI Chat API for Stakeholders.
 * Implements RAG using Gemini (Embeddings + Chat) and Pinecone.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Auth Guard
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // 2. Parse Body
    const { stakeholderId, messages } = await req.json();
    if (!stakeholderId || !messages || !messages.length) {
      return new Response(JSON.stringify({ error: "Missing stakeholderId or messages" }), { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    // 3. Get Stakeholder Context from DB
    const stakeholder = await prisma.stakeholderProfile.findUnique({
      where: { id: stakeholderId },
      include: {
        user: true,
        sectors: true,
        problemStatements: true
      }
    });

    if (!stakeholder) {
      return new Response(JSON.stringify({ error: "Stakeholder not found" }), { status: 404 });
    }

    // 4. Initialize AI Client
    const ai = await getAiClient();
    const indexName = process.env.PINECONE_INDEX || "stakeholder-directory";
    const index = pinecone.Index(indexName);

    // 5. Generate Query Embedding
    const embedResult = await ai.models.embedContent({
      model: "text-embedding-004",
      contents: [{ parts: [{ text: lastUserMessage }] }]
    });

    const queryVector = embedResult.embeddings?.[0]?.values;
    let context = "";

    if (queryVector) {
      // 6. Query Pinecone for relevant chunks
      const queryResponse = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
        filter: { stakeholderId: { $eq: stakeholderId } }
      });

      if (queryResponse.matches?.length) {
        context = queryResponse.matches
          .map((m: any) => `[Interaction/Transcript Chunk]: ${m.metadata?.text || ""}`)
          .join("\n\n");
      }
    }

    // fallback context if Pinecone is empty
    if (!context) {
      context = `Bio: ${stakeholder.bio || "N/A"}\nDesignation: ${stakeholder.designation}\nOrganization: ${stakeholder.organization || "N/A"}`;
    }

    // 7. System Instructions
    const systemInstruction = `You are an AI assistant for the stakeholder ${stakeholder.user.name}.
Your goal is to answer questions about their profile, interactions, and transcripts strictly using the provided context.
Answer based on interactions and transcripts found in the context.

STAKEHOLDER PROFILE:
- Designation: ${stakeholder.designation}
- Organization: ${stakeholder.organization || "N/A"}
- Sectors: ${stakeholder.sectors.map(s => s.name).join(", ")}
- Problems: ${stakeholder.problemStatements.map(p => p.title).join(", ")}

RESEARCH CONTEXT (TRANSCRIPTS & INTERACTIONS):
${context}

If the information is not in the context, use the stakeholder's basic profile fields.
If you don't know the answer, say you don't have enough information about this specific stakeholder.`;

    // 8. Map history and stream
    const contents = messages.map((m: any, idx: number) => {
      let text = m.content;
      if (idx === 0 && m.role !== "assistant") {
        text = systemInstruction + "\n\n" + text;
      }
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text }]
      };
    });

    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // @ts-ignore - SDK may yield chunk.text directly or via parts
            const text = chunk.text || chunk.candidates?.[0]?.content?.parts?.[0]?.text || "";
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        }
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error: any) {
    console.error("AI Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500 }
    );
  }
}

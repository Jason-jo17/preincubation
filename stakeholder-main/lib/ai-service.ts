import { prisma } from "./prisma";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Get a configured GoogleGenAI instance for the current user.
 * Supports BYOK (Bring Your Own Key) stored in the User model.
 */
export async function getAiClient() {
  const session = await getServerSession(authOptions);
  let apiKey = process.env.GEMINI_API_KEY || (process.env.OPENAI_API_KEY?.startsWith('AIzaSy') ? process.env.OPENAI_API_KEY : undefined);

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { apiKey: true }
    });

    if (user?.apiKey) {
      apiKey = user.apiKey;
    }
  }

  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please set it in your profile.");
  }

  return new GoogleGenAI({ apiKey });
}

/**
 * Get the API Key itself if needed for other services.
 */
export async function getApiKey() {
    const session = await getServerSession(authOptions);
    let apiKey = process.env.GEMINI_API_KEY || (process.env.OPENAI_API_KEY?.startsWith('AIzaSy') ? process.env.OPENAI_API_KEY : undefined);
    
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { apiKey: true }
      });
  
      if (user?.apiKey) {
        apiKey = user.apiKey;
      }
    }
    return apiKey;
}

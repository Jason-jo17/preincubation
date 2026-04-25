"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function saveInteraction(data: {
  stakeholder: string;
  role?: string;
  type: string;
  summary: string;
  sentiment?: string;
  insights?: number;
  date?: Date;
}) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) throw new Error("Unauthorized");

    const interaction = await prisma.interaction.create({
      data: {
        userId,
        stakeholder: data.stakeholder,
        role: data.role,
        type: data.type,
        summary: data.summary,
        sentiment: data.sentiment,
        insights: data.insights || 0,
        date: data.date || new Date(),
      },
    });

    revalidatePath("/student/interactions");
    return { success: true, data: interaction };
  } catch (error: any) {
    console.error("Error saving interaction:", error);
    return { success: false, error: error.message };
  }
}

export async function getInteractions() {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) throw new Error("Unauthorized");

    const interactions = await prisma.interaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return { success: true, data: interactions };
  } catch (error: any) {
    console.error("Error fetching interactions:", error);
    return { success: false, error: error.message };
  }
}

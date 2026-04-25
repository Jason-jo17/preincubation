"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function saveReadinessAssessment(data: {
  scores: any;
  levels: any;
  stage?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id || "guest_user";
    const assessment = await prisma.readinessAssessment.create({
      data: {
        userId,
        scores: data.scores,
        levels: data.levels,
        stage: data.stage,
      },
    });

    revalidatePath("/student/roadmap");
    revalidatePath("/assessment");
    
    return { 
      success: true, 
      id: assessment.id, 
      message: "Venture Readiness Assessment saved successfully." 
    };
  } catch (error: any) {
    console.error("Error saving readiness assessment:", error);
    return { success: false, error: error.message };
  }
}

export async function getReadinessAssessment(id: string) {
  try {
    const assessment = await prisma.readinessAssessment.findUnique({
      where: { id },
    });
    return { success: true, data: assessment };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLatestReadinessAssessment(userIdParam?: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = userIdParam || (session?.user as any)?.id || "guest_user";

    const assessment = await prisma.readinessAssessment.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: assessment };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function getAllMentees() {
  try {
    const mentees = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
      include: {
        assessments: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        toolSubmissions: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        menteeProfile: true,
      },
    });

    // Also fetch ReadinessAssessments separately if needed, or join them
    // ReadinessAssessment model is separate from Assessment model in this schema
    const readinessAssessments = await prisma.readinessAssessment.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Map them together
    const menteesWithReadiness = mentees.map(mentee => {
      const latestReadiness = readinessAssessments.find(ra => ra.userId === mentee.id);
      return {
        ...mentee,
        latestReadiness
      };
    });

    return { success: true, data: menteesWithReadiness };
  } catch (error: any) {
    console.error("Error fetching all mentees:", error);
    return { success: false, error: error.message };
  }
}

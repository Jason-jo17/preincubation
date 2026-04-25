"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function saveReadinessAssessment(data: {
  scores: any;
  levels: any;
  stage?: string;
  peerScores?: any;
  mentorScores?: any;
  mentorNotes?: any;
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
        peerScores: data.peerScores || {},
        mentorScores: data.mentorScores || {},
        mentorNotes: data.mentorNotes || {},
      },
    });

    revalidatePath("/innovator/roadmap");
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

export async function updateReadinessAssessment(id: string, data: {
  scores?: any;
  levels?: any;
  stage?: string;
  peerScores?: any;
  mentorScores?: any;
  mentorNotes?: any;
}) {
  try {
    const assessment = await prisma.readinessAssessment.update({
      where: { id },
      data: {
        ...data,
      },
    });

    revalidatePath(`/assessment/${id}`);
    revalidatePath(`/assessment/${id}/validation`);
    revalidatePath(`/assessment/${id}/notes`);
    
    return { 
      success: true, 
      id: assessment.id, 
      message: "Venture Readiness Assessment updated successfully." 
    };
  } catch (error: any) {
    console.error("Error updating readiness assessment:", error);
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

export async function getAllReadinessAssessments(userIdParam?: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = userIdParam || (session?.user as any)?.id || "guest_user";

    const assessments = await prisma.readinessAssessment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: assessments };
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
      const latestReadiness = readinessAssessments.find((ra: any) => ra.userId === mentee.id);
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

export async function getMenteeById(userId: string) {
  try {
    const mentee = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        assessments: { orderBy: { createdAt: "desc" } },
        toolSubmissions: { orderBy: { createdAt: "desc" } },
        menteeProfile: {
          include: {
            sprintNodes: { orderBy: { sprintNumber: "asc" } },
          },
        },
        startupProfile: true,
      },
    });
    const latestReadiness = await prisma.readinessAssessment.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: mentee ? { ...mentee, latestReadiness } : null };
  } catch (error: any) {
    console.error("Error fetching mentee by id:", error);
    return { success: false, error: error.message };
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Saves or updates strategic tool data.
 */
export async function saveToolData(toolId: string, data: any, options?: any) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : "guest_user";
    
    // If submissionId is provided, update the existing record
    if (options?.submissionId) {
      const submission = await prisma.toolSubmission.update({
        where: { id: options.submissionId },
        data: {
          data,
          iteration: options?.iteration || 1,
        },
      });
      revalidatePath("/stakeholders/tools");
      return { success: true, submissionId: submission.id, message: "Strategic tool data updated." };
    }

    const submission = await prisma.toolSubmission.create({
      data: {
        userId,
        toolId,
        data,
        iteration: options?.iteration || 1,
      },
    });

    revalidatePath("/stakeholders/tools");
    return { success: true, submissionId: submission.id, message: "Strategic tool data saved." };
  } catch (error: any) {
    console.error("Error saving tool data:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Saves a Venture Readiness Diagnostic assessment.
 */
export async function saveAssessment(data: any, options?: any) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : "guest_user";
    
    const assessment = await prisma.assessment.create({
      data: {
        userId,
        type: "readiness",
        toolId: "venture_readiness",
        overallScore: data.overallScore || 0,
        pillarScores: data.pillarScores || {},
        data: data.responses || {},
      },
    });

    revalidatePath("/stakeholders/tools");
    return { success: true, assessmentId: assessment.id, message: "Readiness assessment completed and saved." };
  } catch (error: any) {
    console.error("Error saving assessment:", error);
    return { success: false, error: error.message };
  }
}

export async function getToolData(toolId: string, userIdParam?: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = userIdParam || (session?.user ? (session.user as any).id : "guest_user");
    
    const data = await prisma.toolSubmission.findFirst({
      where: {
        toolId,
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: data?.data || null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllStakeholders() {
  // This might need to call the stakeholders database
  // For now, return mock if stakeholders db is separate, or use prisma if shared
  try {
    const stakeholders = await prisma.user.findMany({
      where: {
        role: "STAKEHOLDER" as any, // Cast to any if UserRole mismatch between schemas
      },
    });
    return stakeholders;
  } catch (error) {
    console.error("Error fetching stakeholders:", error);
    return [];
  }
}

export async function deleteToolData(toolId: string, userIdParam?: string) {
  try {
    const session = await getServerSession(authOptions);
    const userId = userIdParam || (session?.user ? (session.user as any).id : "guest_user");

    await prisma.toolSubmission.deleteMany({
      where: {
        toolId,
        userId: userId,
      },
    });
    revalidatePath("/stakeholders/tools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

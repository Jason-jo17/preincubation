import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, name, email, organization, bio, profilerData } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Create or update the user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        role: role as any,
      },
      create: {
        email,
        name,
        role: role as any,
      },
    });

    // 2. If it's a student/innovator with profilerData, create the startup profile
    if (role === "STUDENT" && profilerData) {
      const overallScore = profilerData.overall_weighted_score || 0;
      const detectedStage = profilerData.detected_stage || "IDEA_STAGE";

      await prisma.startupProfile.upsert({
        where: { userId: user.id },
        update: {
          startupName: organization || profilerData.startupName || "Unknown",
          institution: organization,
          detectedStage,
          overallScore,
          profilerData: profilerData,
        },
        create: {
          userId: user.id,
          startupName: organization || profilerData.startupName || "Unknown",
          institution: organization,
          detectedStage,
          overallScore,
          profilerData: profilerData,
        },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json(
      { error: "Failed to process onboarding", details: error.message },
      { status: 500 }
    );
  }
}

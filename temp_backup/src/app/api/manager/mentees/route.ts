import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    // In a real app, we'd check if session.user.role === "MANAGER"
    
    const mentees = await prisma.menteeProfile.findMany({
      include: {
        user: {
          select: { name: true, email: true, avatar: true }
        },
        sprintNodes: {
          orderBy: { sprintNumber: "asc" }
        }
      }
    });
    
    return NextResponse.json(mentees);
  } catch (error) {
    console.error("Failed to fetch mentees:", error);
    return NextResponse.json({ error: "Failed to fetch mentees" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const session = await getServerSession();
    
    // Fetch reviews where the current user is either the reviewer or candidate
    const reviews = await prisma.review.findMany({
      include: {
        reviewer: { select: { name: true } },
        candidate: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const review = await prisma.review.create({
      data: {
        title: data.title,
        score: data.score,
        sentiment: data.sentiment,
        feedback: data.feedback,
        reviewerId: session.user.id,
        candidateId: data.candidateId,
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

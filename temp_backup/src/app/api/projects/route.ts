import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        shortDescription: data.shortDescription,
        sector: data.sector,
        creatorId: session.user.id,
        status: "DRAFT"
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

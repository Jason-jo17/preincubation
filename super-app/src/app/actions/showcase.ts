"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProjectStatus } from "@prisma/client";

export async function createProject(formData: {
  title: string;
  shortDescription: string;
  sector: string;
  creatorId: string;
}) {
  try {
    const slug = formData.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const project = await prisma.project.create({
      data: {
        title: formData.title,
        slug: `${slug}-${Math.random().toString(36).substring(2, 7)}`,
        shortDescription: formData.shortDescription,
        sector: formData.sector,
        creatorId: formData.creatorId,
        status: ProjectStatus.SUBMITTED,
      },
    });

    revalidatePath("/showcase");
    return { success: true, project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      include: {
        creator: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: {
        creator: {
          select: {
            name: true,
            avatar: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getAllUsers() {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        menteeProfile: true,
        startupProfile: true,
      },
    });

    return { success: true, data: users };
  } catch (error: any) {
    console.error("Error fetching all users:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserRole(userId: string, role: string) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
    });

    revalidatePath("/admin/users");
    return { success: true, data: user };
  } catch (error: any) {
    console.error("Error updating user role:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(userId: string) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
}

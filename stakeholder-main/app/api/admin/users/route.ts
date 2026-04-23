import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const role = searchParams.get("role");

        const users = await prisma.user.findMany({
            where: role ? { role: role as any } : {},
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                lastLoginAt: true
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("GET /api/admin/users error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

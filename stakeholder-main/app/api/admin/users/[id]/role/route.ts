import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { role } = body;

        if (!role) {
            return NextResponse.json({ error: "Role is required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role: role as any }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("PATCH /api/admin/users/[id]/role error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const { apiKey } = await req.json()

        // Optional: Basic validation of Gemini API Key format (usually starts with AIzaSy)
        if (apiKey && !apiKey.startsWith('AIzaSy')) {
            // We'll allow it but maybe warn or just proceed if the user knows what they are doing
            // For now, let's keep it flexible but secure
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { apiKey: apiKey || null }
        })

        return NextResponse.json({ 
            success: true, 
            message: "API Key updated successfully",
            hasKey: !!updatedUser.apiKey
        })

    } catch (error: any) {
        console.error('Settings API error:', error)
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
    }
}

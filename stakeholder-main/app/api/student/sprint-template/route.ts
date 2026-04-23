import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const templates = await prisma.sprintTemplate.findMany({
            include: {
                tools: true
            },
            orderBy: {
                sprintNumber: 'asc'
            }
        })
        return NextResponse.json(templates)
    } catch (error: any) {
        console.error("Failed to fetch sprint templates:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

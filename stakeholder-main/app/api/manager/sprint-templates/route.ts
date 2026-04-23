import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const templates = await prisma.sprintTemplate.findMany({
            include: { tools: true },
            orderBy: { sprintNumber: 'asc' }
        })

        return NextResponse.json(templates)
    } catch (error: any) {
        console.error("SprintTemplates GET Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { name, sprintNumber, weekRange, trlGate, crlIrlOutput, tools } = body

        const template = await prisma.sprintTemplate.create({
            data: {
                name,
                sprintNumber: parseInt(sprintNumber),
                weekRange,
                trlGate,
                crlIrlOutput,
                creatorId: session.user.id,
                tools: {
                    create: tools.map((t: any) => ({
                        toolId: t.toolId,
                        toolName: t.toolName,
                        isGateLevel: t.isGateLevel || false,
                        trlContribution: t.trlContribution
                    }))
                }
            },
            include: { tools: true }
        })

        return NextResponse.json(template)
    } catch (error: any) {
        console.error("SprintTemplates POST Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

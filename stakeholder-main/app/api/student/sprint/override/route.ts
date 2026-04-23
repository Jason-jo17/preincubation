import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { templateId } = body

        if (!templateId) {
            return NextResponse.json({ error: "templateId is required" }, { status: 400 })
        }

        const journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id }
        })

        if (!journey) {
            return NextResponse.json({ error: "Journey not found" }, { status: 404 })
        }

        // Fetch the template
        const template = await prisma.sprintTemplate.findUnique({
            where: { id: templateId },
            include: { tools: true }
        })

        if (!template) {
            return NextResponse.json({ error: "Sprint Template not found" }, { status: 404 })
        }

        const sprintNumber = template.sprintNumber;

        await prisma.$transaction(async (tx: any) => {
            const existingSprint = await tx.sprint.findUnique({
                where: { journeyId_sprintNumber: { journeyId: journey.id, sprintNumber } }
            })

            if (existingSprint) {
                // Delete all old submissions for this sprint to apply the new ones
                await tx.sprintToolSubmission.deleteMany({
                    where: { sprintId: existingSprint.id }
                })

                // Update the sprint definition
                await tx.sprint.update({
                    where: { id: existingSprint.id },
                    data: {
                        name: template.name,
                        weekRange: template.weekRange || `Week ${sprintNumber}`,
                        trlGate: template.trlGate || "Custom Mentor Path",
                        crlIrlOutput: template.crlIrlOutput || "Custom Assessment",
                        gateChecks: template.tools.map(t => ({ checkId: t.toolId, label: t.toolName, passed: false })),
                        toolSubmissions: {
                            create: template.tools.map(t => ({
                                toolId: t.toolId,
                                toolName: t.toolName,
                                trlContribution: t.trlContribution || '',
                                status: 'pending',
                                gateCheck: t.toolName, // Optional gateCheck name
                                isGateLevel: t.isGateLevel || false
                            }))
                        }
                    }
                })
            } else {
                // Create new sprint if it didn't exist
                await tx.sprint.create({
                    data: {
                        journeyId: journey.id,
                        sprintNumber,
                        name: template.name,
                        stageNumber: template.sprintNumber <= 3 ? 1 : template.sprintNumber <= 6 ? 2 : 3,
                        weekRange: template.weekRange || `Week ${sprintNumber}`,
                        trlGate: template.trlGate || "Custom Mentor Path",
                        crlIrlOutput: template.crlIrlOutput || "Custom Assessment",
                        status: sprintNumber === 1 ? 'active' : 'locked',
                        gateChecks: template.tools.map(t => ({ checkId: t.toolId, label: t.toolName, passed: false })),
                        toolSubmissions: {
                            create: template.tools.map(t => ({
                                toolId: t.toolId,
                                toolName: t.toolName,
                                trlContribution: t.trlContribution || '',
                                status: 'pending',
                                gateCheck: t.toolName,
                                isGateLevel: t.isGateLevel || false
                            }))
                        }
                    }
                })
            }
        })

        return NextResponse.json({ success: true, message: `Sprint ${template.sprintNumber} overridden.` })

    } catch (error: any) {
        console.error("Sprint Template Override Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

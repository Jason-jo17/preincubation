import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const managerProfile = await prisma.managerProfile.findUnique({
            where: { userId: session.user.id }
        })

        if (!managerProfile) {
            return NextResponse.json({ error: "Manager profile not found" }, { status: 404 })
        }

        const mentees = await prisma.studentProfile.findMany({
            where: { managerId: managerProfile.id },
            include: {
                user: { select: { id: true, name: true, email: true, avatar: true } },
                _count: {
                    select: { valuePropositions: true }
                }
            }
        })

        // Because we need stakeholders, interactions, we might need a separate query since they are linked differently
        // Wait, stakeholders are not directly on StudentProfile. They are on StudentProfile's User? No, on StudentJourney maybe? 
        // We will just return the profiles for now and mock the counts if needed, or query them properly.
        
        // Fetch journeys for metrics
        const userIds = mentees.map((m: any) => m.user.id)
        const journeys = await prisma.studentJourney.findMany({
            where: { userId: { in: userIds } },
            include: {
                sprints: { include: { toolSubmissions: true } }
            }
        })

        const formattedMentees = mentees.map((mentee: any) => {
            const journey = journeys.find((j: any) => j.userId === mentee.user.id)
            let interactionsCount = 0
            
            // Simple mockup of counts based on what's available
            return {
                id: mentee.id,
                user: mentee.user,
                institution: mentee.institution || "Undefined Institution",
                program: mentee.program || "Undefined Program",
                projectName: mentee.projectName || "Undefined Project",
                journeyId: journey?.id,
                _count: {
                    stakeholders: 0, 
                    interactions: 0,
                    valuePropositions: mentee._count.valuePropositions
                }
            }
        })

        return NextResponse.json(formattedMentees)

    } catch (error: any) {
        console.error("Fetch Mentees Error:", error)
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const managerProfile = await prisma.managerProfile.findUnique({
            where: { userId: session.user.id }
        })

        if (!managerProfile) {
            return NextResponse.json({ error: "Manager profile not found" }, { status: 404 })
        }

        const body = await req.json()
        const { name, email, password, institution, program, projectName } = body

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user, profile, and journey in a transaction
        const newUser = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: "STUDENT"
                }
            })

            const studentProfile = await tx.studentProfile.create({
                data: {
                    userId: user.id,
                    managerId: managerProfile.id,
                    institution,
                    program,
                    projectName
                }
            })

            const journey = await tx.studentJourney.create({
                data: {
                    userId: user.id,
                    sector: "technology",
                    stage: "idea",
                    metrics: {},
                    milestones: []
                }
            })

            return { user, studentProfile, journey }
        })

        return NextResponse.json({ success: true, mentee: newUser.studentProfile })

    } catch (error: any) {
        console.error("Create Mentee Error:", error)
        return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 })
    }
}

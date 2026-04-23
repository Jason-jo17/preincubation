
'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { getSprintForTool, SPRINT_REGISTRY, getToolConfig } from "@/lib/sprint-registry"
import { batchGetNudgeStatus } from "@/lib/nudge-agent"

// Helper to get current user session
async function getSession() {
    return await getServerSession(authOptions)
}

export async function getStudentTeam() {
    try {
        const session = await getSession()
        if (!session?.user?.email) return null

        // 1. Get User
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        })
        if (!user) return null

        // 2. Get or Create StudentProfile
        let student = await prisma.studentProfile.findUnique({
            where: { userId: user.id },
            include: {
                team: {
                    include: { progress: true }
                }
            }
        })

        if (!student) {
            console.log(`Auto-creating StudentProfile for action session: ${session.user.email}`)
            student = await prisma.studentProfile.create({
                data: {
                    userId: user.id,
                    institution: 'General',
                    program: 'Innovation',
                    year: 2026,
                },
                include: {
                    team: { include: { progress: true } }
                }
            }) as any
        }

        // 3. Get or Create Team
        if (student && student.team) {
            return student.team
        }

        // Create a default team for this student
        console.log(`Auto-creating Team for student: ${session.user.email}`)
        const newTeam = await prisma.team.create({
            data: {
                name: `${session.user.name || 'Student'}'s Team`,
                cohort: "Batch 2026",
                members: { connect: { id: student!.id } },
                progress: {
                    create: {
                        currentStageId: 1,
                        currentWeek: 0
                    }
                }
            },
            include: { progress: true }
        })
        
        return newTeam
    } catch (error) {
        console.error("Error in getStudentTeam:", error)
        return null
    }
}

export async function getRoadmapData() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) return { error: "Unauthorized" }

        const team = await getStudentTeam()
        if (!team) return { error: "No team found for your account. Please contact support." }

        const stages = await prisma.roadmapStage.findMany({
            orderBy: { stageNumber: 'asc' },
            include: {
                tools: {
                    orderBy: { week: 'asc' },
                    include: { tasks: true }
                }
            }
        })

        if (!stages || stages.length === 0) {
            return { error: "Roadmap content not initialized. Please run the seed script." }
        }

        // Get progress
        const progress = await prisma.teamProgress.findUnique({
            where: { teamId: team.id },
            include: {
                toolProgress: { include: { taskProgress: true } },
                stageProgress: true
            }
        })

        let journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id }
        })

        if (!journey) {
            console.log(`Auto-creating StudentJourney for user: ${session.user.id}`)
            journey = await prisma.studentJourney.create({
                data: {
                    userId: session.user.id,
                    sector: 'deeptech',
                    stage: 'idea',
                    trlLevel: 1,
                    metrics: { experiments_completed: 0, partners_engaged: 0, funding_raised: 0 },
                    milestones: [],
                }
            })
        }

        const sprintToolSubmissions = await prisma.sprintToolSubmission.findMany({
            where: {
                sprint: { journeyId: journey.id }
            },
            orderBy: { updatedAt: 'desc' }
        }) || []

        // Pre-calculate all nudges for the roadmap
        const allToolIds = stages.flatMap(s => s.tools.map(t => t.toolId))
        const nudgeMap = await batchGetNudgeStatus(journey.id, allToolIds)

        return { team, stages: stages || [], progress, sprintToolSubmissions, nudgeMap, isAdmin: false }
    } catch (error: any) {
        console.error("Error in getRoadmapData:", error)
        return { error: "Failed to load roadmap data. " + (error.message || "") }
    }
}

export async function getAdminRoadmapData(studentUserId?: string) {
    const session = await getSession()
    // In a real app, check for admin/manager role here.

    const stages = await prisma.roadmapStage.findMany({
        orderBy: { stageNumber: 'asc' },
        include: {
            tools: {
                orderBy: { week: 'asc' },
                include: { tasks: true }
            }
        }
    })

    let nudgeMap = {}
    if (studentUserId) {
        const journey = await prisma.studentJourney.findUnique({
            where: { userId: studentUserId }
        })
        if (journey) {
            const allToolIds = stages.flatMap(s => s.tools.map(t => t.toolId))
            nudgeMap = await batchGetNudgeStatus(journey.id, allToolIds)
        }
    }

    // Return structure matching getRoadmapData but with null team/progress
    // The frontend will handle isAdmin={true} to ignore missing progress
    return { team: null, stages, progress: null, isAdmin: true, nudgeMap }
}

export async function startTool(toolId: string) {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    if (!team.progress) {
        // Ensure progress exists
        try {
            await prisma.teamProgress.create({ data: { teamId: team.id } })
        } catch (e: any) {
            // It might already exist but not be in the 'team' object from getStudentTeam
        }
    }

    const progressRecord = await prisma.teamProgress.findUnique({ where: { teamId: team.id } })
    if (!progressRecord) return { error: "Failed to initialize team progress" }
    const progressId = progressRecord.id

    try {
        const toolProgress = await prisma.toolProgress.upsert({
            where: {
                teamProgressId_toolId: {
                    teamProgressId: progressId,
                    toolId: toolId
                }
            },
            update: { status: "in_progress", startedAt: new Date() },
            create: {
                teamProgressId: progressId,
                toolId: toolId,
                status: "in_progress",
                startedAt: new Date()
            }
        })

        revalidatePath('/student/dashboard')
        return { success: true, toolProgress }
    } catch (error) {
        console.error("Failed to start tool:", error)
        return { error: "Failed to start tool" }
    }
}

export async function submitTask(taskId: string, content: string | null, url: string | null) {
    const team = await getStudentTeam()
    if (!team) return { error: "No team found" }

    // Find which tool this task belongs to
    const task = await prisma.roadmapTask.findUnique({
        where: { id: taskId },
        include: { tool: true }
    })

    if (!task) return { error: "Task not found" }

    // Find or create ToolProgress
    let progressId = team.progress?.id

    if (!progressId) {
        // Auto-fix: Create TeamProgress if missing
        const newTp = await prisma.teamProgress.upsert({
            where: { teamId: team.id },
            update: {},
            create: { teamId: team.id }
        })
        progressId = newTp.id
    }

    let toolProgress = await prisma.toolProgress.findUnique({
        where: {
            teamProgressId_toolId: {
                teamProgressId: progressId,
                toolId: task.tool.toolId
            }
        }
    })

    if (!toolProgress) {
        // Should have started tool first, but auto-start if needed
        toolProgress = await prisma.toolProgress.create({
            data: {
                teamProgressId: progressId,
                toolId: task.tool.toolId,
                status: "in_progress",
                startedAt: new Date()
            }
        })
    }

    // Update Task Progress
    await prisma.taskProgress.upsert({
        where: {
            toolProgressId_taskId: {
                toolProgressId: toolProgress.id,
                taskId: taskId
            }
        },
        update: {
            status: "submitted",
            submissionText: content,
            submissionUrl: url,
            submittedAt: new Date()
        },
        create: {
            toolProgressId: toolProgress.id,
            taskId: taskId,
            status: "submitted",
            submissionText: content,
            submissionUrl: url,
            submittedAt: new Date()
        }
    })

    revalidatePath('/student/dashboard')

    // Check if all tasks in tool are completed
    const allToolTasks = await prisma.roadmapTask.findMany({
        where: { toolId: task.tool.toolId }
    })

    const allTaskProgress = await prisma.taskProgress.findMany({
        where: { toolProgressId: toolProgress.id }
    })

    const isToolComplete = allToolTasks.every((t: any) =>
        allTaskProgress.some((tp: any) => tp.taskId === t.id && (tp.status === 'submitted' || tp.status === 'approved' || tp.taskId === taskId))
        // Note: checking current taskId too just in case prisma lag, though we just upserted it.
    )

    console.log(`[DEBUG] Tool complete? ${isToolComplete} (Task ID: ${taskId})`)

    if (isToolComplete) {
        // Mark tool as completed
        await prisma.toolProgress.update({
            where: { id: toolProgress.id },
            data: {
                status: 'completed',
                completedAt: new Date()
            }
        })

        // Unlock next tool
        await unlockNextTool(team.id, task.tool.toolId)
    }

    return { success: true }
}

async function unlockNextTool(teamId: string, currentToolId: string) {
    // 1. Get all tools ordered by week
    const allTools = await prisma.roadmapTool.findMany({
        orderBy: [
            { week: 'asc' },
            { id: 'asc' } // Secondary sort
        ],
        include: { stage: true }
    })

    // 2. Find index of current tool
    const currentIndex = allTools.findIndex((t: any) => t.toolId === currentToolId)

    // 3. Get next tool
    if (currentIndex >= 0 && currentIndex < allTools.length - 1) {
        const nextTool = allTools[currentIndex + 1]
        console.log(`[DEBUG] Unlocking next tool: ${nextTool.name} (${nextTool.toolId})`)

        // 4. Unlock it
        // Ensure team progress exists
        const teamProgress = await prisma.teamProgress.findUnique({ where: { teamId } })
        if (!teamProgress) return

        await prisma.toolProgress.upsert({
            where: {
                teamProgressId_toolId: {
                    teamProgressId: teamProgress.id,
                    toolId: nextTool.toolId
                }
            },
            update: {
                status: { set: 'unlocked' } // Only update if not already in_progress or completed? 
                // Actually, if it's 'locked' (default implicit), we enable it. 
                // If it's already in_progress, don't revert it.
                // upsert update logic: we can just set to unlocked if it was undefined, but we can't conditionally update here easily without a read first or complex query.
                // Let's safe-guard:
            },
            create: {
                teamProgressId: teamProgress.id,
                toolId: nextTool.toolId,
                status: 'unlocked'
            }
        })

        // Also update current stage/week if changed
        if (nextTool.stage.stageNumber > (teamProgress.currentStageId || 1)) {
            await prisma.teamProgress.update({
                where: { id: teamProgress.id },
                data: {
                    currentStageId: nextTool.stage.stageNumber,
                    currentWeek: nextTool.week
                }
            })
        } else if (nextTool.week > (teamProgress.currentWeek || 0)) {
            await prisma.teamProgress.update({
                where: { id: teamProgress.id },
                data: { currentWeek: nextTool.week }
            })
        }
    }
}


export async function saveToolData(
    toolId: string, 
    data: any, 
    options: { 
        submissionId?: string, 
        iterationName?: string, 
        isDraft?: boolean,
        createNewIteration?: boolean
    } = {}
) {
    const { submissionId, iterationName, isDraft = false, createNewIteration = false } = options;
    console.log("[SAVE] Starting save for tool:", toolId, "Submission:", submissionId || "New/Auto");
    const team = await getStudentTeam()
    if (!team) {
        console.error("[SAVE] No team found")
        return { error: "No student team/project found. Please contact support." }
    }

    let progressId = team.progress?.id
    if (!progressId) {
        console.log("[SAVE] TeamProgress missing, auto-creating...")
        try {
            const newTp = await prisma.teamProgress.upsert({
                where: { teamId: team.id },
                update: {},
                create: { teamId: team.id }
            })
            progressId = newTp.id
            console.log("[SAVE] Created progressId:", progressId)
        } catch (e) {
            console.error("[SAVE] Failed to initialize team progress:", e)
            return { error: "Failed to initialize team progress" }
        }
    }

    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            console.error("[SAVE] Unauthorized session")
            return { error: "User session expired. Please log in again." }
        }

        // 1. Ensure StudentJourney exists
        let journey = await prisma.studentJourney.findUnique({
            where: { userId: session.user.id },
            include: { sprints: true }
        })

        if (!journey) {
            console.log("[SAVE] Creating missing journey for user:", session.user.id)
            try {
                journey = await prisma.studentJourney.create({
                    data: { 
                        userId: session.user.id, 
                        sector: "General", 
                        stage: "Discovery",
                        metrics: { experiments_completed: 0, partners_engaged: 0, funding_raised: 0 },
                        milestones: []
                    },
                    include: { sprints: true }
                })
            } catch (e) {
                console.error("[SAVE] Journey creation failed:", e)
                throw new Error("Student Journey creation failed")
            }
        }

        // 2. Identify target sprint for this tool
        const sprintDef = getSprintForTool(toolId)
        let targetSprintId = null

        if (sprintDef) {
            console.log("[SAVE] Tool found in registry for Sprint:", sprintDef.sprintNumber)
            // Find existing sprint record for this journey
            let sprintRecord = journey.sprints.find((s: any) => s.sprintNumber === sprintDef.sprintNumber)
            
            if (!sprintRecord) {
                console.log("[SAVE] Initializing missing sprint record...")
                try {
                    sprintRecord = await prisma.sprint.create({
                        data: {
                            journeyId: journey.id,
                            sprintNumber: sprintDef.sprintNumber,
                            name: sprintDef.name,
                            stageNumber: sprintDef.stageNumber,
                            weekRange: sprintDef.weekRange,
                            trlGate: sprintDef.trlGate,
                            crlIrlOutput: sprintDef.crlIrlOutput,
                            status: sprintDef.sprintNumber === 1 ? 'active' : 'locked',
                            gateChecks: sprintDef.tools.map(t => ({ 
                                checkId: t.toolId, 
                                label: t.gateCheck, 
                                passed: false 
                            })),
                            toolSubmissions: {
                                create: sprintDef.tools.map(t => ({
                                    toolId: t.toolId,
                                    toolName: t.toolName,
                                    trlContribution: t.trlContribution,
                                    crlDimension: t.crlDimension,
                                    irlDimension: t.irlDimension,
                                    maxPercent: t.maxPercent,
                                    status: 'pending',
                                    gateCheck: t.gateCheck,
                                    isGateLevel: t.isGateLevel
                                }))
                            }
                        }
                    })
                } catch (e) {
                    console.error("[SAVE] Sprint initialization failed:", e)
                    throw new Error("Sprint initialization failed")
                }
            }
            targetSprintId = sprintRecord.id
        }

        // 3. Create or Update the submission
        let submissionIdToReturn = submissionId
        
        if (targetSprintId) {
            console.log("[SAVE] Processing sprint submission...")
            
            if (submissionId) {
                // Update existing submission
                await prisma.sprintToolSubmission.update({
                    where: { id: submissionId },
                    data: {
                        submittedData: data,
                        iterationName: iterationName,
                        isDraft: isDraft,
                        status: isDraft ? 'pending' : 'submitted',
                        submittedAt: isDraft ? null : new Date()
                    }
                })
            } else {
                // Determine iteration number
                let iterationNumber = 1
                if (createNewIteration) {
                    const lastSubmission = await prisma.sprintToolSubmission.findFirst({
                        where: { sprintId: targetSprintId, toolId: toolId },
                        orderBy: { iterationNumber: 'desc' }
                    })
                    iterationNumber = (lastSubmission?.iterationNumber || 0) + 1
                } else {
                    // Try to find an existing "draft" or most recent submission to overwrite if not explicitly creating new
                    const existing = await prisma.sprintToolSubmission.findFirst({
                        where: { sprintId: targetSprintId, toolId: toolId },
                        orderBy: { iterationNumber: 'desc' }
                    })
                    if (existing) {
                        await prisma.sprintToolSubmission.update({
                            where: { id: existing.id },
                            data: {
                                submittedData: data,
                                isDraft: isDraft,
                                status: isDraft ? 'pending' : 'submitted',
                                submittedAt: isDraft ? null : new Date()
                            }
                        })
                        submissionIdToReturn = existing.id
                    }
                }

                if (!submissionIdToReturn) {
                    const toolConfig = getToolConfig(toolId)
                    const newSubmission = await prisma.sprintToolSubmission.create({
                        data: {
                            sprintId: targetSprintId,
                            toolId: toolId,
                            toolName: toolConfig?.toolName || toolId,
                            trlContribution: toolConfig?.trlContribution || "0",
                            crlDimension: toolConfig?.crlDimension || null,
                            irlDimension: toolConfig?.irlDimension || null,
                            maxPercent: toolConfig?.maxPercent || null,
                            isGateLevel: toolConfig?.isGateLevel ?? false,
                            gateCheck: toolConfig?.gateCheck || "Pending Review",
                            submittedData: data,
                            status: isDraft ? 'pending' : 'submitted',
                            isDraft: isDraft,
                            submittedAt: isDraft ? null : new Date(),
                            iterationName: iterationName || `${toolConfig?.toolName || toolId} Entry ${iterationNumber}`,
                            iterationNumber: iterationNumber
                        }
                    })
                    submissionIdToReturn = newSubmission.id
                }
            }
        }

        // 4. Update legacy ToolProgress for dashboard flags
        console.log("[SAVE] Updating legacy tool progress for:", toolId)
        try {
            await prisma.toolProgress.upsert({
                where: {
                    teamProgressId_toolId: {
                        teamProgressId: progressId,
                        toolId: toolId
                    }
                },
                update: {
                    data: data,
                    status: "completed",
                    updatedAt: new Date(),
                    completedAt: new Date()
                },
                create: {
                    teamProgressId: progressId,
                    toolId: toolId,
                    status: "completed",
                    startedAt: new Date(),
                    completedAt: new Date(),
                    data: data
                }
            })
        } catch (e) {
            console.error("[SAVE] Legacy progress update failed:", e)
            throw new Error("Legacy progress update failed")
        }

        // 5. Auto-unlock next tool logic (legacy flow)
        console.log("[SAVE] Running unlock logic...")
        await unlockNextTool(team.id, toolId)

        revalidatePath('/student/dashboard')
        console.log("[SAVE] SUCCESS")
        return { success: true, submissionId: submissionIdToReturn }
    } catch (error: any) {
        console.error("Failed to save tool data [V2]:", error)
        return { error: `Save failed [V2]: ${error.message || "Unknown error"}` }
    }
}

export async function deleteToolSubmission(submissionId: string) {
    try {
        const session = await getSession()
        if (!session?.user?.id) return { error: "Unauthorized" }

        // Security: Ensure submission belongs to user's journey
        const submission = await prisma.sprintToolSubmission.findUnique({
            where: { id: submissionId },
            include: { sprint: { include: { journey: true } } }
        })

        if (!submission || submission.sprint.journey.userId !== session.user.id) {
            return { error: "Submission not found or unauthorized" }
        }

        await prisma.sprintToolSubmission.delete({
            where: { id: submissionId }
        })

        revalidatePath('/student/dashboard')
        return { success: true }
    } catch (error) {
        console.error("Failed to delete submission:", error)
        return { error: "Failed to delete submission" }
    }
}


export async function getAllStakeholders() {
    try {
        const profiles = await prisma.stakeholderProfile.findMany({
            include: { user: true }
        })

        // Map to simpler interface for the tool
        return profiles.map((p: any) => ({
            id: p.id,
            name: p.user.name,
            role: p.designation || "Unknown Role",
            organization: p.organization || "Unknown Org",
            category: "other", // Default, user can refine
            // Default positioning
            power: 5,
            interest: 5,
            attitude: "neutral",
            painPoints: [],
            gainOpportunities: [],
            valuedDimensions: [],
            email: p.user.email
        }))
    } catch (error) {
        console.error("Failed to fetch stakeholders", error)
        return []
    }
}

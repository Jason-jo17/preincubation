import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getSprintByNumber, getToolConfig } from "@/lib/sprint-registry"
import { evaluateNudge } from "@/lib/nudge-agent"
import { awardXP } from "@/lib/gamification-engine"

export async function POST(req: NextRequest, { params }: { params: Promise<{ sprintNumber: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { 
      toolId, 
      submittedData, 
      submissionId, 
      iterationName, 
      isDraft = false, 
      createNewIteration = false,
      status,
      trl4Criteria
    } = await req.json()
    const resolvedParams = await params
    const sprintNumber = parseInt(resolvedParams.sprintNumber)

    const journey = await prisma.studentJourney.findUnique({
      where: { userId: session.user.id },
      include: {
        sprints: {
          where: { sprintNumber },
          include: { toolSubmissions: true }
        }
      }
    })

    if (!journey || journey.sprints.length === 0) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 })
    }

    const sprint = journey.sprints[0]

    // Handle manual completion signal
    if (status === 'completed') {
      const updateData: any = {
        status: 'completed',
        completedAt: new Date()
      }
      if (trl4Criteria) {
        updateData.trl4Criteria = trl4Criteria
      }

      await prisma.sprint.update({
        where: { id: sprint.id },
        data: updateData
      })

      // Unlock next
      const nextSprint = await prisma.sprint.findUnique({
        where: { journeyId_sprintNumber: { journeyId: journey.id, sprintNumber: sprintNumber + 1 } }
      })

      if (nextSprint) {
        await prisma.sprint.update({
          where: { id: nextSprint.id },
          data: { status: 'active', startedAt: new Date() }
        })
      }

      return NextResponse.json({ success: true, sprintCompleted: true, nextSprintUnlocked: !!nextSprint })
    }

    if (!toolId || !submittedData) {
      return NextResponse.json({ error: "Missing payload data" }, { status: 400 })
    }

    // Nudge Check: Ensure they aren't fully blocked from submitting
    const nudge = await evaluateNudge(journey.id, toolId)
    if (nudge.nudgeType === 'BLOCK') { // Only block if it's a hard BLOCK
      return NextResponse.json({ error: "Please complete previous steps first." }, { status: 400 })
    }

    // 2. Process submission (Create or Update)
    let finalSubmissionId = submissionId
    const toolConfig = getToolConfig(toolId)

    if (submissionId) {
      // Update specific submission
      await prisma.sprintToolSubmission.update({
        where: { id: submissionId },
        data: {
          submittedData,
          iterationName: iterationName,
          isDraft: isDraft,
          status: isDraft ? 'pending' : 'submitted',
          submittedAt: isDraft ? null : new Date()
        }
      })
    } else {
      // Logic from saveToolData
      let iterationNumber = 1
      if (createNewIteration) {
        const lastSubmission = await prisma.sprintToolSubmission.findFirst({
          where: { sprintId: sprint.id, toolId: toolId },
          orderBy: { iterationNumber: 'desc' }
        })
        iterationNumber = (lastSubmission?.iterationNumber || 0) + 1
      } else {
        // Find most recent iterate or draft to overwrite
        const existing = await prisma.sprintToolSubmission.findFirst({
          where: { sprintId: sprint.id, toolId: toolId },
          orderBy: { iterationNumber: 'desc' }
        })
        if (existing) {
          await prisma.sprintToolSubmission.update({
            where: { id: existing.id },
            data: {
              submittedData,
              isDraft,
              status: isDraft ? 'pending' : 'submitted',
              submittedAt: isDraft ? null : new Date()
            }
          })
          finalSubmissionId = existing.id
        }
      }

      if (!finalSubmissionId) {
        const newSub = await prisma.sprintToolSubmission.create({
          data: {
            sprintId: sprint.id,
            toolId: toolId,
            toolName: toolConfig?.toolName || toolId,
            trlContribution: toolConfig?.trlContribution || "0",
            submittedData: submittedData,
            status: isDraft ? 'pending' : 'submitted',
            isDraft: isDraft,
            submittedAt: isDraft ? null : new Date(),
            gateCheck: toolConfig?.gateCheck || "Pending Review",
            iterationName: iterationName || `${toolConfig?.toolName || toolId} Entry ${iterationNumber}`,
            iterationNumber: iterationNumber,
            isGateLevel: toolConfig?.isGateLevel ?? true
          }
        })
        finalSubmissionId = newSub.id
      }
    }

    // --- LEGACY SUPPORT: Sync with ToolProgress for dashboard flags & nudge agent ---
    try {
      const team = await prisma.team.findFirst({
        where: { members: { some: { userId: session.user.id } } },
        include: { progress: true }
      })
      
      let progressId = team?.progress?.id
      if (!progressId && team) {
        const newTp = await prisma.teamProgress.upsert({
          where: { teamId: team.id },
          update: {},
          create: { teamId: team.id }
        })
        progressId = newTp.id
      }

      if (progressId) {
        await prisma.toolProgress.upsert({
          where: {
            teamProgressId_toolId: {
              teamProgressId: progressId,
              toolId: toolId
            }
          },
          update: {
            data: submittedData,
            status: isDraft ? "in_progress" : "completed",
            updatedAt: new Date(),
            completedAt: isDraft ? null : new Date()
          },
          create: {
            teamProgressId: progressId,
            toolId: toolId,
            status: isDraft ? "in_progress" : "completed",
            startedAt: new Date(),
            completedAt: isDraft ? null : new Date(),
            data: submittedData
          }
        })
      }
    } catch (e) {
      console.warn("Legacy sync failed (non-critical):", e)
    }
    // ------------------------------------------------------------------------------

    // 3. Update Sprint Gate Checks array
    const gateChecks = Array.isArray(sprint.gateChecks) ? sprint.gateChecks : []
    const updatedChecks = gateChecks.map((check: any) => {
      if (check.checkId === toolId) {
        return { ...check, passed: true, confirmedAt: new Date().toISOString() }
      }
      return check
    })

    await prisma.sprint.update({
      where: { id: sprint.id },
      data: {
        gateChecks: updatedChecks,
        status: 'in_progress' // advance from active to in_progress if first submission
      }
    })

    // Award XP for tool submission
    if (!isDraft) {
      await awardXP(session.user.id, 'TOOL_SUBMISSION').catch(e => console.warn("XP awarding failed:", e))
    }

    // 4. Check if entire Sprint is complete
    const sprintDef = getSprintByNumber(sprintNumber)
    if (!sprintDef) throw new Error("Sprint def not found")

    // Sprint passes if ALL gate-level tools in this sprint have passed their checks
    const allGateLevelTools = sprintDef.tools.filter(t => t.isGateLevel)
    const missingChecks = allGateLevelTools.filter(gt => {
      const dbCheck = updatedChecks.find((c: any) => c.checkId === gt.toolId)
      return !dbCheck || !dbCheck.passed
    })

    if (missingChecks.length === 0) {
      // Sprint is complete!
      await prisma.sprint.update({
        where: { id: sprint.id },
        data: {
          status: 'completed',
          completedAt: new Date()
        }
      })

      // Unlock next sprint if it exists
      const nextSprint = await prisma.sprint.findUnique({
        where: { journeyId_sprintNumber: { journeyId: journey.id, sprintNumber: sprintNumber + 1 } }
      })

      if (nextSprint) {
        await prisma.sprint.update({
          where: { id: nextSprint.id },
          data: { status: 'active', startedAt: new Date() }
        })
      }

      // Update Journey TRL Level if this sprint unlocks a new TRL
      // Simplistic mapping for sprint completions
      let newTrl = journey.trlLevel
      if (sprintNumber === 3) newTrl = Math.max(newTrl, 2)
      if (sprintNumber === 6) newTrl = Math.max(newTrl, 3)
      if (sprintNumber === 9) newTrl = Math.max(newTrl, 4)

      if (newTrl > journey.trlLevel) {
        await prisma.studentJourney.update({
          where: { id: journey.id },
          data: { trlLevel: newTrl }
        })
      }

      return NextResponse.json({ success: true, sprintCompleted: true, nextSprintUnlocked: !!nextSprint })
    }

    return NextResponse.json({ success: true, sprintCompleted: false })

  } catch (error: any) {
    console.error("Sprint Submission Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

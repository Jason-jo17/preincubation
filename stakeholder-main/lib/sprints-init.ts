import { prisma } from "./prisma"
import { SPRINT_REGISTRY } from "./sprint-registry"

export async function initialiseSprints(journeyId: string) {
  return await prisma.$transaction(async (tx: any) => {
    const results = []
    
    for (const def of SPRINT_REGISTRY) {
      let sprint = await tx.sprint.findUnique({
        where: { journeyId_sprintNumber: { journeyId, sprintNumber: def.sprintNumber } },
        include: { toolSubmissions: true }
      })

      if (!sprint) {
        sprint = await tx.sprint.create({
          data: {
            journeyId,
            sprintNumber: def.sprintNumber,
            name: def.name,
            stageNumber: def.stageNumber,
            weekRange: def.weekRange,
            trlGate: def.trlGate,
            crlIrlOutput: def.crlIrlOutput,
            status: def.sprintNumber === 1 ? 'active' : 'locked',
            gateChecks: def.tools.map(t => ({ checkId: t.toolId, label: t.gateCheck, passed: false })),
            toolSubmissions: {
              create: def.tools.map(t => ({
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
          },
          include: { toolSubmissions: true }
        })
      } else {
        // Sprint exists, check if all tools from registry are present
        const existingToolIds = sprint.toolSubmissions.map((ts: any) => ts.toolId)
        const missingTools = def.tools.filter(t => !existingToolIds.includes(t.toolId))

        if (missingTools.length > 0) {
          console.log(`Adding ${missingTools.length} missing tools to Sprint ${def.sprintNumber} for Journey ${journeyId}`)
          await tx.sprintToolSubmission.createMany({
            data: missingTools.map(t => ({
              sprintId: sprint.id,
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
          })
          
          // Re-fetch to get updated submissions if needed by caller
          sprint = await tx.sprint.findUnique({
            where: { id: sprint.id },
            include: { toolSubmissions: true }
          })
        }
      }
      results.push(sprint)
    }
    return results
  })
}

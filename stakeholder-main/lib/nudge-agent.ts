import { prisma } from "./prisma"
import { getToolConfig, TOOL_PREREQUISITES, TOOL_ALIASES, getCanonicalId, getAliases } from "./sprint-registry"

export type NudgeResult =
  | { nudgeType: 'CLEAR'; hints?: any[] }
  | { nudgeType: 'WARN'; blockedByToolId: string; blockedByToolName: string; message: string; dismissible: boolean }
  | { nudgeType: 'BLOCK'; blockedByToolId: string; blockedByToolName: string; message: string; dismissible: boolean }
  | { nudgeType: 'FILL_GUIDE'; fillHints: any[]; dismissible: boolean }

// ── NUDGE RULE ENGINE (PURE LOGIC) ──────────────────────────────────
export async function calculateNudgeStatus(journeyId: string, currentToolId: string, preFetchedData?: {
    sprintSubmissions: any[],
    legacySubmissions: any[],
    teamProgressId?: string
}): Promise<NudgeResult> {
  const canonicalId = getCanonicalId(currentToolId)
  const prereqIds = TOOL_PREREQUISITES[canonicalId] || []
  if (prereqIds.length === 0) return { nudgeType: 'CLEAR' }

  // Expand prerequisite IDs to include all aliases
  const expandedPrereqIds = prereqIds.flatMap(pid => getAliases(pid))

  let sprintSubmissions, legacySubmissions: any[] = []

  if (preFetchedData) {
    sprintSubmissions = preFetchedData.sprintSubmissions.filter(s => expandedPrereqIds.includes(s.toolId))
    legacySubmissions = preFetchedData.legacySubmissions?.filter(s => expandedPrereqIds.includes(s.toolId)) || []
  } else {
    // Fallback to individual fetch if no pre-fetched data
    sprintSubmissions = await prisma.sprintToolSubmission.findMany({
        where: { sprint: { journeyId }, toolId: { in: expandedPrereqIds } },
        orderBy: { updatedAt: 'desc' }
    })

    const journey = await prisma.studentJourney.findUnique({ where: { id: journeyId }, select: { userId: true } })
    const student = await prisma.studentProfile.findUnique({ where: { userId: journey?.userId || '' }, select: { teamId: true } })
    const teamProgress = await prisma.teamProgress.findUnique({ where: { teamId: student?.teamId || '' }, select: { id: true } })
    
    if (teamProgress?.id) {
        legacySubmissions = await prisma.toolProgress.findMany({
            where: { teamProgressId: teamProgress.id, toolId: { in: expandedPrereqIds } },
            orderBy: { updatedAt: 'desc' }
        })
    }
  }

  // Merge them
  const mergedSubmissions = prereqIds.map((pid: string) => {
      const aliases = getAliases(pid)
      const sprintSub = sprintSubmissions.find((s: any) => aliases.includes(s.toolId))
      if (sprintSub) return { ...sprintSub, toolId: pid }

      const legacySub = legacySubmissions.find((s: any) => aliases.includes(s.toolId))
      if (legacySub) {
          return {
              toolId: pid,
              status: legacySub.status === 'completed' ? 'gate_passed' : legacySub.status,
              submittedData: legacySub.data
          }
      }
      return null
  }).filter(Boolean) as any[]

  // Check for strict BLOCK conditions
  for (const pid of prereqIds) {
    const sub = mergedSubmissions.find((s: any) => s.toolId === pid)
    const prereqConfig = getToolConfig(pid)
    const toolName = prereqConfig?.toolName || pid

    if (!sub || sub.status === 'pending' || sub.status === 'blocked') {
      return {
        nudgeType: 'BLOCK',
        blockedByToolId: pid,
        blockedByToolName: toolName,
        message: `Prerequisite Required: This tool works best when ${toolName} is completed first. Let's finish that up!`,
        dismissible: false
      }
    }

    if (sub.status === 'submitted' && prereqConfig?.isGateLevel) {
      return {
        nudgeType: 'WARN',
        blockedByToolId: pid,
        blockedByToolName: toolName,
        message: `${toolName} is submitted but requires minor gate fixes. You can proceed, but returning is advised.`,
        dismissible: true
      }
    }
  }

  // FILL_GUIDE condition
  const fillHints = buildFillHints(canonicalId, mergedSubmissions)
  if (fillHints.length > 0) {
    return {
      nudgeType: 'FILL_GUIDE',
      fillHints,
      dismissible: true
    }
  }

  return { nudgeType: 'CLEAR' }
}

/**
 * Side-effect version for individual API calls (logs the event)
 */
export async function evaluateNudge(journeyId: string, currentToolId: string): Promise<NudgeResult> {
  const result = await calculateNudgeStatus(journeyId, currentToolId)
  
  // Only log if it's not CLEAR
  if (result.nudgeType !== 'CLEAR') {
    const blockedById = (result as any).blockedByToolId || null
    const blockedByName = (result as any).blockedByToolName || null
    const hints = (result as any).fillHints || null
    
    const resultMessage = (result as any).message || (result.nudgeType === 'FILL_GUIDE' ? 'Suggestions available' : 'Action recommended')
    
    await logNudgeEvent(journeyId, currentToolId, result.nudgeType, blockedById, blockedByName, resultMessage, hints)
  }
  
  return result
}

/**
 * Batch calculation for Roadmap performance
 */
export async function batchGetNudgeStatus(journeyId: string, toolIds: string[]): Promise<Record<string, NudgeResult>> {
  // 1. Fetch ALL relevant data once
  const sprintSubmissions = await prisma.sprintToolSubmission.findMany({
      where: { sprint: { journeyId } },
      orderBy: { updatedAt: 'desc' }
  })

  const journey = await prisma.studentJourney.findUnique({ where: { id: journeyId }, select: { userId: true } })
  const student = await prisma.studentProfile.findUnique({ where: { userId: journey?.userId || '' }, select: { teamId: true } })
  const teamProgress = await prisma.teamProgress.findUnique({ where: { teamId: student?.teamId || '' }, select: { id: true } })
  
  let legacySubmissions: any[] = []
  if (teamProgress?.id) {
      legacySubmissions = await prisma.toolProgress.findMany({
          where: { teamProgressId: teamProgress.id },
          orderBy: { updatedAt: 'desc' }
      })
  }

  const dataContext = { sprintSubmissions, legacySubmissions, teamProgressId: teamProgress?.id }
  const nudgeMap: Record<string, NudgeResult> = {}

  // 2. Calculate for each tool in parallel (pure logic is fast)
  await Promise.all(toolIds.map(async (tid) => {
    nudgeMap[tid] = await calculateNudgeStatus(journeyId, tid, dataContext)
  }))

  return nudgeMap
}

// ── INTERNAL HELPERS ────────────────────────────────────────────────
async function logNudgeEvent(
  journeyId: string,
  targetToolId: string,
  nudgeType: string,
  blockedByToolId: string | null = null,
  blockedByToolName: string | null = null,
  message: string,
  fillHints?: any[]
) {
  const toolConfig = getToolConfig(getCanonicalId(targetToolId))

  await prisma.nudgeEvent.create({
    data: {
      journeyId,
      nudgeType,
      targetToolId,
      targetToolName: toolConfig?.toolName || targetToolId,
      blockedByToolId,
      blockedByToolName,
      message,
      fillHints: fillHints ? fillHints : undefined
    }
  })
}

function buildFillHints(currentToolId: string, submissions: any[]): any[] {
  const hints: any[] = []

  // Ensure currentToolId is canonical for the switch
  const canonicalId = getCanonicalId(currentToolId)

  const getSubData = (toolId: string) => {
    // We already normalized toolIds in mergedSubmissions to canonical form
    const sub = submissions.find(s => s.toolId === toolId)
    if (sub?.submittedData && typeof sub.submittedData === 'object') {
      return sub.submittedData as any
    }
    return null
  }

  // Helper to extract 5W1H category labels from Mind Map
  const getMindMapCategory = (mmData: any, categoryId: string): string[] => {
    if (!mmData?.nodes || !mmData?.edges) return []
    const childNodeIds = mmData.edges
      .filter((e: any) => e.source === categoryId)
      .map((e: any) => e.target)
    
    return mmData.nodes
      .filter((n: any) => childNodeIds.includes(n.id))
      .map((n: any) => n.data?.label)
      .filter(Boolean)
  }

  // Helper safely extracts strings or truncates deeply nested JSON strings
  const extractSnippet = (obj: any, key: string): string | null => {
    if (!obj || !obj[key]) return null
    return typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]).substring(0, 100) + '...'
  }

  switch (canonicalId) {
    case 'mind_map_5w1h': {
      const mtpData = getSubData('mtp_ikigai')
      const statement = mtpData?.mtp || mtpData?.statement
      if (statement) {
        hints.push({ fieldName: 'Why & What', hint: `From your MTP: "${statement}"`, sourceToolId: 'mtp_ikigai', sourceToolName: 'MTP / Ikigai Canvas' })
      }
      break
    }
    case 'business_examples': {
      const mm = getSubData('mind_map_5w1h')
      const whatList = getMindMapCategory(mm, 'what')
      if (whatList.length > 0) {
        hints.push({ fieldName: 'Industry Focus', hint: `Look for businesses solving: "${whatList[0]}"`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H Mind Map' })
      }
      break
    }
    case 'empathy_mapping': {
      const mm = getSubData('mind_map_5w1h')
      const whoList = getMindMapCategory(mm, 'who')
      const whatList = getMindMapCategory(mm, 'what')
      if (whoList.length > 0) hints.push({ fieldName: 'Target User', hint: `Remember your defined user: ${whoList.join(', ')}`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H' })
      if (whatList.length > 0) hints.push({ fieldName: 'Core Problem', hint: `Context: ${whatList[0]}`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H' })
      break
    }
    case 'seven_whys': {
      const mm = getSubData('mind_map_5w1h')
      const whyList = getMindMapCategory(mm, 'why')
      if (whyList.length > 0) hints.push({ fieldName: 'Starting Point', hint: `Your initial 'Why' was: ${whyList[0]}. Now dig 5 layers deeper.`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H' })
      break
    }
    case 'fishbone_diagram': {
      const whyData = getSubData('seven_whys')
      const rootCause = whyData?.rootCause || whyData?.content
      if (rootCause) hints.push({ fieldName: 'Main Bone', hint: `Base this on your 7-Why Root Cause: "${rootCause}"`, sourceToolId: 'seven_whys', sourceToolName: '7 Why Analysis' })
      break
    }
    case 'event_pattern': {
      hints.push({ fieldName: 'Triggers', hint: `Look at the sub-causes from your Fishbone diagram to identify recurring patterns.`, sourceToolId: 'fishbone_diagram', sourceToolName: 'Fishbone Diagram' })
      break
    }
    case 'stakeholder_mapping': {
      const mm = getSubData('mind_map_5w1h')
      const whoList = getMindMapCategory(mm, 'who')
      if (whoList.length > 0) hints.push({ fieldName: 'Primary Stakeholder', hint: `Start with: ${whoList[0]}`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H' })
      break
    }
    case 'interview_guide': {
      const sm = getSubData('stakeholder_mapping')
      hints.push({ fieldName: 'Interviewees', hint: `Tailor questions for the stakeholders you just mapped. Focus on finding their workarounds.`, sourceToolId: 'stakeholder_mapping', sourceToolName: 'Stakeholder Map' })
      break
    }
    case 'affinity_mapping': {
      const interview = getSubData('interview_summary')
      if (interview) {
          // Flatten interview summaries if multiple
          const summary = interview.content || (Array.isArray(interview) ? interview.map((i: any) => i.pain).join('. ') : null)
          if (summary) {
            hints.push({ fieldName: 'Synthesis Focus', hint: `Cluster the pain points and friction mentioned in your interview summaries: "${summary.substring(0, 100)}..."`, sourceToolId: 'interview_summary', sourceToolName: 'Interview Summary' })
          }
      }
      break
    }
    case 'persona_journey': {
      const affinity = getSubData('affinity_mapping')
      const sm = getSubData('stakeholder_mapping')
      if (affinity?.clusters?.length > 0) {
        const clusters = affinity.clusters.map((c: any) => c.label).join(', ')
        hints.push({ fieldName: 'Pains & Frustrations', hint: `Use your Affinity clusters as basis for persona pains: ${clusters}`, sourceToolId: 'affinity_mapping', sourceToolName: 'Affinity Map' })
      }
      if (sm?.stakeholders?.length > 0) {
        const names = sm.stakeholders.map((s: any) => s.name).join(', ')
        hints.push({ fieldName: 'Persona Identity', hint: `Create personas for your key stakeholders: ${names}`, sourceToolId: 'stakeholder_mapping', sourceToolName: 'Stakeholder Map' })
      }
      break
    }
    case 'errc_canvas': {
      const mm = getSubData('mind_map_5w1h')
      const whatList = getMindMapCategory(mm, 'what')
      if (whatList.length > 0) hints.push({ fieldName: 'Competition', hint: `Look at existing solutions for: "${whatList[0]}" to find what to Eliminate/Reduce.`, sourceToolId: 'mind_map_5w1h', sourceToolName: '5W1H' })
      break
    }
    case 'six_paths': {
      const errc = getSubData('errc_canvas')
      if (errc?.items?.length > 0) {
        const createItems = errc.items.filter((i: any) => i.quadrant === 'create').map((i: any) => i.name)
        if (createItems.length > 0) {
          hints.push({ fieldName: 'Path Discovery', hint: `Explore paths for your created factors: ${createItems.join(', ')}`, sourceToolId: 'errc_canvas', sourceToolName: 'ERRC Grid' })
        }
      }
      break
    }
    case 'vpc_builder': {
      const affinity = getSubData('affinity_mapping')
      const persona = getSubData('persona_journey')
      
      if (persona?.personas?.length > 0) {
        const frust = persona.personas[0]?.psychographics?.frustrations?.join(', ')
        if (frust) hints.push({ fieldName: 'Customer Profile', hint: `Base pains on persona frustrations: ${frust}`, sourceToolId: 'persona_journey', sourceToolName: 'Persona' })
      } else if (persona?.content) {
        hints.push({ fieldName: 'Customer Profile', hint: `Base Jobs/Pains/Gains on your Persona narrative.`, sourceToolId: 'persona_journey', sourceToolName: 'Persona' })
      }
      
      if (affinity?.clusters?.length > 0) {
        const clusters = affinity.clusters.map((c: any) => c.label).join(', ')
        hints.push({ fieldName: 'Pains', hint: `Inject exact clusters from your Affinity Map here: ${clusters}`, sourceToolId: 'affinity_mapping', sourceToolName: 'Affinity Map' })
      }
      break
    }
    case 'crazy8': {
      const vpc = getSubData('vpc_builder')
      if (vpc?.customerProfile?.pains?.length > 0) {
        const topPain = vpc.customerProfile.pains[0]?.text
        hints.push({ fieldName: 'Ideation Focus', hint: `Sketch solutions that directly target this Top Pain: "${topPain}"`, sourceToolId: 'vpc_builder', sourceToolName: 'VPC' })
      }
      break
    }
    case 'storyboarding': {
      const decision = getSubData('sprint_decision_matrix')
      const persona = getSubData('persona_journey')
      if (decision?.content) {
        hints.push({ fieldName: 'Core Action', hint: `Based on your selected solution: "${decision.content.substring(0, 50)}..."`, sourceToolId: 'sprint_decision_matrix', sourceToolName: 'Decision Matrix' })
      }
      if (persona?.journeys?.length > 0) {
        hints.push({ fieldName: 'User Flow', hint: `Align your frames with the steps in your Persona Journey Map.`, sourceToolId: 'persona_journey', sourceToolName: 'Journey Map' })
      }
      break
    }
    case 'prototyping_hub': {
      const storyboard = getSubData('storyboarding')
      if (storyboard?.frames?.length > 0) {
        hints.push({ fieldName: 'Core Loop', hint: `Ensure your prototype ONLY builds out the core user flow defined in your Storyboarding frames. Do not build non-core features.`, sourceToolId: 'storyboarding', sourceToolName: 'Storyboarding' })
      }
      break
    }
    case 'user_test_protocol': {
      const proto = getSubData('prototyping_hub')
      if (proto) {
        hints.push({ fieldName: 'Test Objective', hint: `Design tasks to validate the core user flow built in your prototype.`, sourceToolId: 'prototyping_hub', sourceToolName: 'Prototype Hub' })
      }
      break
    }
    case 'prototype_v2': {
      const feedback = getSubData('post_test_affinity')
      if (feedback?.clusters?.length > 0) {
        hints.push({ fieldName: 'Iteration Focus', hint: `Prioritise fixing these user friction points: ${feedback.clusters[0].label}`, sourceToolId: 'post_test_affinity', sourceToolName: 'User Test Feedback' })
      }
      break
    }
    case 'problem_stakeholder_matrix': {
      const sm = getSubData('stakeholder_mapping')
      if (sm?.stakeholders?.length > 0) {
        hints.push({ fieldName: 'Stakeholders', hint: `Evaluate the impact of your problem on: ${sm.stakeholders.map((s: any) => s.name).join(', ')}`, sourceToolId: 'stakeholder_mapping', sourceToolName: 'Stakeholder Map' })
      }
      break
    }
    case 'vpc_value_map': {
      const vpc = getSubData('vpc_builder')
      if (vpc?.customerProfile) {
        hints.push({ fieldName: 'Alignment', hint: `Map your relievers and creators to the pains and gains you identified in the profile.`, sourceToolId: 'vpc_builder', sourceToolName: 'VPC Customer Profile' })
      }
      break
    }
    case 'value_canvas': {
      const vpc = getSubData('vpc_builder')
      if (vpc?.customerProfile) {
        hints.push({ fieldName: 'Differentiation', hint: `Focus on how your Gain Creators uniquely satisfy the Customer Gains.`, sourceToolId: 'vpc_builder', sourceToolName: 'VPC' })
      }
      break
    }
    case 'crazy8': {
      const vpc = getSubData('vpc_builder')
      if (vpc?.customerProfile?.pains?.length > 0) {
        const topPain = vpc.customerProfile.pains[0]?.text
        hints.push({ fieldName: 'Ideation Focus', hint: `Sketch solutions that directly target this Top Pain: "${topPain}"`, sourceToolId: 'vpc_builder', sourceToolName: 'VPC' })
      }
      break
    }
    case 'innovation_tool': {
      const crazy = getSubData('crazy8')
      if (crazy?.votingResults?.length > 0) {
        const topPanelId = crazy.votingResults[0].panelId
        const topPanel = crazy.participants?.[0]?.panels?.find((p: any) => p.id === topPanelId)
        if (topPanel) {
          hints.push({ fieldName: 'Refinement', hint: `Apply TRIZ/SCAMPER to your top concept: "${topPanel.title}"`, sourceToolId: 'crazy8', sourceToolName: 'Crazy 8s' })
        }
      }
      break
    }
    case 'build_scope': {
      const decision = getSubData('sprint_decision_matrix')
      if (decision?.selectedSolution) {
        hints.push({ fieldName: 'Scope Foundation', hint: `Define requirements for: "${decision.selectedSolution}"`, sourceToolId: 'sprint_decision_matrix', sourceToolName: 'Decision Matrix' })
      }
      break
    }
    case 'lean_canvas': {
      const vpc = getSubData('vpc_builder')
      if (vpc?.customerProfile) {
        hints.push({ fieldName: 'Value Prop', hint: `Sync your 'Value Proposition' box with the Gains/Pains solved in your VPC.`, sourceToolId: 'vpc_builder', sourceToolName: 'VPC' })
      }
      break
    }
  }


  // Fallback generic hint if nothing specific was matched but there ARE prerequisites
  if (hints.length === 0 && submissions.length > 0) {
    const lastSub = submissions[submissions.length - 1]
    const toolName = lastSub.toolName || 'previous step'
    hints.push({ 
      fieldName: 'Contextual Pull', 
      hint: `Build upon the data you submitted in the ${toolName}.`, 
      sourceToolId: lastSub.toolId, 
      sourceToolName: toolName 
    })
  }

  return hints
}

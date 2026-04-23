// Maps each CRL/IRL dimension to the tool IDs that feed it
// Source of truth: lib/sprint-registry.ts crlDimension/irlDimension fields

export const DIMENSION_TOOLS: Record<string, string[]> = {
  // CRL
  market_application: [
    'mind_map_5w1h', 'business_examples', 'errc_canvas', 'six_paths'
  ],
  customer_validation: [
    'empathy_mapping', 'seven_whys', 'fishbone_diagram', 'event_pattern',
    'stakeholder_mapping', 'problem_stakeholder_matrix', 'interview_guide',
    'interview_summary', 'affinity_mapping', 'persona_journey',
    'prototyping_hub', 'user_test_protocol', 'user_testing',
    'post_test_affinity', 'perceived_value', 'prototype_v2', 'iteration_log',
    'retest_cycle'
  ],
  business_model: [
    'vpc_builder', 'vpc_value_map', 'value_canvas', 'crazy8',
    'innovation_tool', 'lean_canvas', 'cost_worksheet'
  ],
  // IRL
  pitch_capability: [
    'pitch_deck', 'storytelling'
  ],
  financial_modelling: [
    'lean_canvas', 'cost_worksheet', 'fund_utilisation'
  ],
  investor_engagement: [
    'pitch_deck', 'storytelling', 'bmc'
  ]
}

/**
 * Extracts the CRL/IRL-relevant summary from a tool's submittedData JSON.
 * Returns a structured string ready to be shown as pre-fill context.
 * Add new cases as new tools are added.
 */
export function extractToolContext(toolId: string, submittedData: any): string {
  if (!submittedData) return ''
  const d = typeof submittedData === 'string' ? JSON.parse(submittedData) : submittedData

  switch (toolId) {

    case 'mind_map_5w1h':
    case 'mind_mapping_5w1h': {
      const parts: string[] = []
      if (d.who)   parts.push(`Who is affected: ${d.who}`)
      if (d.what)  parts.push(`What the problem is: ${d.what}`)
      if (d.why)   parts.push(`Why it matters: ${d.why}`)
      if (d.how)   parts.push(`How it manifests: ${d.how}`)
      if (d.when)  parts.push(`When it occurs: ${d.when}`)
      if (d.where) parts.push(`Where it occurs: ${d.where}`)
      return parts.join('\n')
    }

    case 'errc_canvas': {
      const parts: string[] = []
      if (d.eliminate?.length)
        parts.push(`Eliminate (vs competitors): ${Array.isArray(d.eliminate) ? d.eliminate.join(', ') : d.eliminate}`)
      if (d.reduce?.length)
        parts.push(`Reduce: ${Array.isArray(d.reduce) ? d.reduce.join(', ') : d.reduce}`)
      if (d.raise?.length)
        parts.push(`Raise: ${Array.isArray(d.raise) ? d.raise.join(', ') : d.raise}`)
      if (d.create?.length)
        parts.push(`Create (new value): ${Array.isArray(d.create) ? d.create.join(', ') : d.create}`)
      if (d.competitors?.length)
        parts.push(`Competitors identified: ${Array.isArray(d.competitors) ? d.competitors.join(', ') : d.competitors}`)
      return parts.join('\n')
    }

    case 'six_paths': {
      const parts: string[] = []
      if (d.alternativeIndustries) parts.push(`Alternative industries: ${d.alternativeIndustries}`)
      if (d.strategicGroups)       parts.push(`Strategic groups: ${d.strategicGroups}`)
      if (d.buyerGroups)           parts.push(`Buyer groups: ${d.buyerGroups}`)
      if (d.complementaryProducts) parts.push(`Complementary products: ${d.complementaryProducts}`)
      if (d.functionalEmotional)   parts.push(`Functional/emotional orientation: ${d.functionalEmotional}`)
      if (d.timeOrientation)       parts.push(`Time orientation: ${d.timeOrientation}`)
      return parts.join('\n')
    }

    case 'empathy_mapping': {
      const parts: string[] = []
      if (d.says)   parts.push(`User says: ${d.says}`)
      if (d.thinks) parts.push(`User thinks: ${d.thinks}`)
      if (d.does)   parts.push(`User does: ${d.does}`)
      if (d.feels)  parts.push(`User feels: ${d.feels}`)
      if (d.pains)  parts.push(`Pains: ${d.pains}`)
      if (d.gains)  parts.push(`Gains: ${d.gains}`)
      return parts.join('\n')
    }

    case 'seven_whys': {
      const whys = d.whys || d.chain || []
      if (!whys.length) return ''
      const chain = Array.isArray(whys)
        ? whys.map((w: any, i: number) => `Why ${i+1}: ${typeof w === 'string' ? w : w.text || w.why || ''}`)
        : [String(whys)]
      if (d.rootCause) chain.push(`Root cause: ${d.rootCause}`)
      return chain.join('\n')
    }

    case 'fishbone_diagram': {
      const branches = d.branches || d.categories || []
      if (!branches.length) return ''
      const lines = Array.isArray(branches)
        ? branches.map((b: any) => {
            const name = b.name || b.category || b.label || ''
            const causes = Array.isArray(b.causes) ? b.causes.join(', ') :
                           Array.isArray(b.subCauses) ? b.subCauses.join(', ') : ''
            return `${name}: ${causes}`
          })
        : [String(branches)]
      return `Structural causes:\n${lines.join('\n')}`
    }

    case 'event_pattern': {
      const events = d.events || d.patterns || []
      if (!events.length) return ''
      const lines = Array.isArray(events)
        ? events.slice(0, 5).map((e: any) =>
            `Pattern: ${e.pattern || e.name || e.event || ''} — Trigger: ${e.trigger || ''} — Frequency: ${e.frequency || ''}`)
        : [String(events)]
      return `Recurring event patterns:\n${lines.join('\n')}`
    }

    case 'interview_summary': {
      const summaries = d.summaries || d.interviews || (Array.isArray(d) ? d : [])
      if (!summaries.length) return ''
      const lines = summaries.slice(0, 5).map((s: any) => {
        const role = s.role || s.stakeholderRole || ''
        const pain = s.pain || s.painInTheirWords || s.painStatement || ''
        const quote = s.quote || s.directQuote || ''
        const wtp = s.wtp || s.wtpSignal || s.willingness || ''
        return [
          `Interviewee (${role}):`,
          pain  ? `  Pain: ${pain}`   : '',
          quote ? `  Quote: "${quote}"` : '',
          wtp   ? `  WTP signal: ${wtp}` : '',
        ].filter(Boolean).join('\n')
      })
      return `Interview summaries (${summaries.length} total):\n${lines.join('\n\n')}`
    }

    case 'affinity_mapping': {
      const clusters = d.clusters || d.groups || []
      if (!clusters.length) return ''
      const lines = Array.isArray(clusters)
        ? clusters.map((c: any) => {
            const name = c.name || c.label || c.theme || ''
            const notes = Array.isArray(c.notes) ? c.notes.join(', ') :
                          Array.isArray(c.items) ? c.items.join(', ') : ''
            return `Cluster "${name}": ${notes}`
          })
        : [String(clusters)]
      return `Insight clusters:\n${lines.join('\n')}`
    }

    case 'persona_journey': {
      const parts: string[] = []
      if (d.persona) {
        const p = d.persona
        if (p.name)        parts.push(`Persona: ${p.name}`)
        if (p.role)        parts.push(`Role: ${p.role}`)
        if (p.frustrations) parts.push(`Frustrations: ${Array.isArray(p.frustrations) ? p.frustrations.join(', ') : p.frustrations}`)
        if (p.goals)       parts.push(`Goals: ${Array.isArray(p.goals) ? p.goals.join(', ') : p.goals}`)
      }
      if (d.journey?.stages?.length) {
        parts.push(`Journey stages: ${d.journey.stages.map((s: any) => s.name || s.stage || s).join(' → ')}`)
      }
      return parts.join('\n')
    }

    case 'vpc_builder':
    case 'vpc_value_map': {
      const parts: string[] = []
      // Customer profile (left side)
      if (d.customerJobs?.length)   parts.push(`Customer jobs: ${Array.isArray(d.customerJobs) ? d.customerJobs.join('; ') : d.customerJobs}`)
      if (d.pains?.length)          parts.push(`Customer pains: ${Array.isArray(d.pains) ? d.pains.join('; ') : d.pains}`)
      if (d.gains?.length)          parts.push(`Customer gains: ${Array.isArray(d.gains) ? d.gains.join('; ') : d.gains}`)
      // Value map (right side)
      if (d.painRelievers?.length)  parts.push(`Pain relievers: ${Array.isArray(d.painRelievers) ? d.painRelievers.join('; ') : d.painRelievers}`)
      if (d.gainCreators?.length)   parts.push(`Gain creators: ${Array.isArray(d.gainCreators) ? d.gainCreators.join('; ') : d.gainCreators}`)
      if (d.productsServices?.length) parts.push(`Products/services: ${Array.isArray(d.productsServices) ? d.productsServices.join('; ') : d.productsServices}`)
      return parts.join('\n')
    }

    case 'value_canvas': {
      const parts: string[] = []
      if (d.valueProposition) parts.push(`Value proposition: ${d.valueProposition}`)
      if (d.uniqueValue)      parts.push(`Unique value: ${d.uniqueValue}`)
      if (d.differentiation)  parts.push(`Differentiation: ${d.differentiation}`)
      return parts.join('\n')
    }

    case 'lean_canvas': {
      const parts: string[] = []
      if (d.problem)              parts.push(`Problem: ${d.problem}`)
      if (d.solution)             parts.push(`Solution: ${d.solution}`)
      if (d.uniqueValueProposition) parts.push(`UVP: ${d.uniqueValueProposition}`)
      if (d.customerSegments)     parts.push(`Customer segments: ${d.customerSegments}`)
      if (d.revenueStreams)        parts.push(`Revenue streams: ${d.revenueStreams}`)
      if (d.costStructure)        parts.push(`Cost structure: ${d.costStructure}`)
      if (d.keyMetrics)           parts.push(`Key metrics: ${d.keyMetrics}`)
      return parts.join('\n')
    }

    case 'cost_worksheet': {
      const items = d.items || d.costItems || []
      if (!items.length) return d.summary || ''
      const lines = Array.isArray(items)
        ? items.map((i: any) => `${i.item || i.name || ''}: ${i.amount || i.cost || ''} (${i.assumption || i.notes || ''})`)
        : []
      return `Cost assumptions:\n${lines.join('\n')}`
    }

    case 'prototyping_hub': {
      const parts: string[] = []
      if (d.projectName)   parts.push(`Prototype: ${d.projectName}`)
      if (d.description)   parts.push(`Description: ${d.description}`)
      if (d.trlLevel)      parts.push(`TRL level: ${d.trlLevel}`)
      if (d.demoUrl)       parts.push(`Demo URL: ${d.demoUrl}`)
      return parts.join('\n')
    }

    case 'user_testing': {
      const sessions = d.sessions || d.observations || []
      if (!sessions.length) return ''
      const lines = sessions.slice(0, 5).map((s: any) => {
        const user = s.userId || s.participantId || s.tester || `Session ${s.id || ''}`
        const friction = Array.isArray(s.frictionPoints) ? s.frictionPoints.join(', ') : s.friction || ''
        const completion = s.taskCompletion || s.completionRate || ''
        return `${user}: completion=${completion}, friction=[${friction}]`
      })
      return `User test sessions (${sessions.length}):\n${lines.join('\n')}`
    }

    case 'post_test_affinity': {
      const clusters = d.clusters || d.priorityFixes || []
      if (!clusters.length) return ''
      return `Post-test insight clusters:\n${clusters.map((c: any) =>
        `${c.name || c.theme || ''}: ${Array.isArray(c.items) ? c.items.join(', ') : c.notes || ''}`)
        .join('\n')}`
    }

    case 'perceived_value': {
      const parts: string[] = []
      if (d.topValueDrivers) parts.push(`Top value drivers: ${Array.isArray(d.topValueDrivers) ? d.topValueDrivers.join(', ') : d.topValueDrivers}`)
      if (d.willingnessToPay) parts.push(`WTP signals: ${d.willingnessToPay}`)
      if (d.competitiveDiff)  parts.push(`Competitive differentiation: ${d.competitiveDiff}`)
      return parts.join('\n')
    }

    case 'iteration_log': {
      const entries = d.entries || d.changes || []
      if (!entries.length) return ''
      return `Iteration log (${entries.length} changes):\n${entries.slice(0, 5).map((e: any) =>
        `- Changed: ${e.what || e.change || ''} | Why: ${e.why || e.reason || ''} | Triggered by: ${e.trigger || e.testRef || ''}`)
        .join('\n')}`
    }

    case 'pitch_deck': {
      const slides = d.slides || []
      if (!slides.length) return d.summary || ''
      return `Pitch deck slides:\n${slides.map((s: any) =>
        `[${s.title || s.name || ''}]: ${s.content || s.text || s.notes || ''}`)
        .join('\n')}`
    }

    default:
      // Generic fallback — stringify top-level string fields
      return Object.entries(d)
        .filter(([, v]) => typeof v === 'string' && v.length > 10)
        .slice(0, 5)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
  }
}

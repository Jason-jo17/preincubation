import { getToolConfig } from './sprint-registry'

export interface RubricCriterion {
  id: string
  label: string          // display label
  description: string    // what the manager is checking
  maxPoints: number
}

// Per-tool rubric criteria for SprintToolSubmission review.
// Each tool has 3 criteria (33pts each ≈ 100 total).
// Falls back to generic criteria if tool-specific ones aren't defined.
const TOOL_RUBRICS: Record<string, RubricCriterion[]> = {
  mtp_ikigai: [
    { id: 'completeness', label: 'MTP Completeness', description: 'Statement saved with ≥30 words covering mission, impact, and personal purpose', maxPoints: 34 },
    { id: 'clarity', label: 'Clarity of Purpose', description: 'The "massive transformative purpose" is specific — not generic (e.g. not "improve education" but names a specific mechanism)', maxPoints: 33 },
    { id: 'alignment', label: 'Problem Alignment', description: 'MTP connects logically to the problem domain the student has identified', maxPoints: 33 },
  ],
  mind_map_5w1h: [
    { id: 'all_fields', label: 'All 6 Fields Populated', description: 'Who, What, When, Where, Why, How — all present with substantive content (not one-word answers)', maxPoints: 40 },
    { id: 'specificity', label: 'Specificity', description: 'Named real user groups, real contexts, real root causes — no "everyone" or "people in general"', maxPoints: 30 },
    { id: 'linkage', label: 'Internal Consistency', description: 'Why and How answers logically link to the Who and What answers', maxPoints: 30 },
  ],
  empathy_mapping: [
    { id: 'quadrants', label: 'All 4 Quadrants Filled', description: 'Says / Thinks / Does / Feels — all 4 present with ≥2 entries each', maxPoints: 40 },
    { id: 'user_voice', label: 'User Voice Present', description: 'At least 1 direct quote or verbatim paraphrase attributed to a real user', maxPoints: 30 },
    { id: 'pains_gains', label: 'Pains & Gains Specific', description: 'Pains and Gains are distinct and concrete — not restating the problem statement', maxPoints: 30 },
  ],
  seven_whys: [
    { id: 'depth', label: 'Minimum 5 Why Layers', description: '5+ why layers completed, each one answering the previous', maxPoints: 40 },
    { id: 'root_cause', label: 'Root Cause Named', description: 'Final root cause is explicitly stated as a conclusion, not left open-ended', maxPoints: 30 },
    { id: 'non_circular', label: 'Non-Circular Reasoning', description: 'Why chain doesn\'t loop back to the original problem statement', maxPoints: 30 },
  ],
  fishbone_diagram: [
    { id: 'branches', label: '≥4 Cause Branches', description: '4 or more named cause categories present in the diagram', maxPoints: 34 },
    { id: 'sub_causes', label: '≥2 Sub-Causes per Branch', description: 'Each branch has at least 2 specific sub-causes, not just category labels', maxPoints: 33 },
    { id: 'evidence', label: 'Evidence-Grounded', description: 'Sub-causes reference real observations or data, not assumed causes', maxPoints: 33 },
  ],
  interview_summary: [
    { id: 'count', label: '5+ Interview Summaries', description: 'Minimum 5 interview summary entries saved', maxPoints: 30 },
    { id: 'structure', label: 'Structured Entries', description: 'Each entry contains: role, pain in their words, current workaround, WTP signal', maxPoints: 40 },
    { id: 'quotes', label: 'Direct Quotes', description: 'At least 3 summaries include a verbatim or attributed quote', maxPoints: 30 },
  ],
  affinity_mapping: [
    { id: 'clusters', label: '≥3 Insight Clusters', description: 'At least 3 named clusters with supporting notes from real interview data', maxPoints: 40 },
    { id: 'interview_sourced', label: 'Interview-Sourced', description: 'Cluster notes trace back to actual interview summaries, not assumed insights', maxPoints: 30 },
    { id: 'actionable', label: 'Actionable Insights', description: 'Each cluster concludes with an insight that could drive a design decision', maxPoints: 30 },
  ],
  vpc_builder: [
    { id: 'profile_complete', label: 'Customer Profile Complete', description: 'Jobs, Pains, and Gains sections all populated with ≥2 items each', maxPoints: 40 },
    { id: 'interview_linked', label: 'Interview-Linked', description: 'Pains/Gains directly reference language from interview summaries', maxPoints: 30 },
    { id: 'specificity', label: 'Specificity', description: 'No generic entries like "save time" without context of whose time and in what scenario', maxPoints: 30 },
  ],
  vpc_value_map: [
    { id: 'fit', label: 'Value Fit Achieved', description: 'Pain relievers map to at least 3 specific customer pains from the Profile', maxPoints: 40 },
    { id: 'gain_creators', label: 'Gain Creators Defined', description: 'Gain creators are distinct from pain relievers — they add positive value, not just fix negatives', maxPoints: 30 },
    { id: 'product_named', label: 'Product/Service Named', description: 'The products/services column names the actual solution, not just a category', maxPoints: 30 },
  ],
  errc_canvas: [
    { id: 'competitors_named', label: 'Competitors Named', description: '≥3 specific named competitors or alternatives identified', maxPoints: 30 },
    { id: 'all_quadrants', label: 'All 4 ERRC Quadrants', description: 'Eliminate / Reduce / Raise / Create — all 4 populated with substantive entries', maxPoints: 40 },
    { id: 'differentiation', label: 'Clear Differentiation', description: 'Create quadrant contains at least 1 genuinely new factor not present in competitors', maxPoints: 30 },
  ],
  lean_canvas: [
    { id: 'revenue_logic', label: 'Revenue Logic Present', description: 'Who pays + how much (price point) + why (value driver) all stated', maxPoints: 40 },
    { id: 'cost_items', label: 'Key Cost Items', description: '≥3 realistic cost items with estimated figures', maxPoints: 30 },
    { id: 'metrics', label: 'Key Metrics Defined', description: 'At least 2 specific measurable metrics that would indicate traction', maxPoints: 30 },
  ],
  prototyping_hub: [
    { id: 'demo_link', label: 'Demo Link Present', description: 'A working link to the prototype (Figma, no-code tool, hosted URL) is provided', maxPoints: 40 },
    { id: 'core_flow', label: 'Core Flow Implemented', description: 'Primary user journey is navigable in the prototype — not just static screens', maxPoints: 40 },
    { id: 'user_flow_named', label: 'User Flow Described', description: 'Description explains what the prototype demonstrates and for which user type', maxPoints: 20 },
  ],
  user_testing: [
    { id: 'session_count', label: '≥5 Test Sessions', description: '5 or more observation records present', maxPoints: 30 },
    { id: 'friction_logged', label: 'Friction Points Logged', description: 'Each session records specific friction points, not just "it went well"', maxPoints: 40 },
    { id: 'task_completion', label: 'Task Completion Tracked', description: 'Completion rate or success/failure logged per session', maxPoints: 30 },
  ],
}

// CRL/IRL evidence uses these 4 criteria (25pts each)
export const CRL_IRL_RUBRIC: RubricCriterion[] = [
  { id: 'quality', label: 'Evidence Quality', description: 'Evidence is specific, detailed, and would convince an external reviewer. Not vague or self-reported without backing.', maxPoints: 25 },
  { id: 'sourcing', label: 'Source Credibility', description: 'Claims are backed by cited data, named sources, or direct user quotes. Round numbers without methodology are penalised.', maxPoints: 25 },
  { id: 'specificity', label: 'Specificity', description: 'Evidence names real segments, real people, real numbers. Generic claims ("customers want this") score zero.', maxPoints: 25 },
  { id: 'integrity', label: 'Integrity Check', description: 'No signs of fabrication: dates are plausible, sample sizes are realistic, commitment signals are verifiable.', maxPoints: 25 },
]

// Generic 3-criterion fallback for tools not in TOOL_RUBRICS
const GENERIC_RUBRIC: RubricCriterion[] = [
  { id: 'completeness', label: 'Completeness', description: 'All required fields and sections are populated with substantive content', maxPoints: 40 },
  { id: 'quality', label: 'Quality of Thinking', description: 'Evidence of genuine analysis — not copied from brief or filled with placeholder text', maxPoints: 40 },
  { id: 'gate_check', label: 'Gate Check Passed', description: 'The specific gate check requirement for this tool is satisfied', maxPoints: 20 },
]

export function getRubricForTool(toolId: string): RubricCriterion[] {
  return TOOL_RUBRICS[toolId] || GENERIC_RUBRIC
}

export function scoreRubric(scores: Record<string, number>, criteria: RubricCriterion[]): number {
  const total = criteria.reduce((sum, c) => sum + c.maxPoints, 0)
  const earned = criteria.reduce((sum, c) => sum + Math.min(scores[c.id] || 0, c.maxPoints), 0)
  return Math.round((earned / total) * 100)
}

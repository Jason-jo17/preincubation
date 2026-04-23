// lib/sprint-registry.ts
// Source of truth for Stage Intelligence v7.1
// DO NOT add database calls here — pure config only

export type CRLDimension = 'market_application' | 'customer_validation' | 'business_model'
export type IRLDimension = 'pitch_capability' | 'financial_modelling' | 'investor_engagement'
export type NudgeType = 'BLOCK' | 'WARN' | 'FILL_GUIDE' | 'CLEAR'

export interface SprintTool {
  toolId: string
  toolName: string
  trlContribution: string
  trlLevels: number[]
  crlDimension?: CRLDimension
  irlDimension?: IRLDimension
  maxPercent?: number
  prerequisiteToolIds: string[]
  dataNeededFrom: string
  gateCheck: string        // the exact ★ gate check string
  isGateLevel: boolean     // sprint cannot complete without this tool passing
}

export interface SprintDefinition {
  sprintNumber: number
  name: string
  stageNumber: number
  weekRange: string
  trlGate: string
  crlIrlOutput: string
  microPhase: string
  completionGate: string   // human-readable summary of all gate checks required
  tools: SprintTool[]
}

export const SPRINT_REGISTRY: SprintDefinition[] = [
  // ── STAGE 1 ──────────────────────────────────────────────────────────
  {
    sprintNumber: 1,
    name: "Purpose & Problem Framing",
    stageNumber: 1,
    weekRange: "Week 0",
    trlGate: "TRL 1 Gate 1 prerequisite — problem identified, context documented",
    crlIrlOutput: "Market Application +10%, Innovator Foundation",
    microPhase: "Anchor personal motivation → frame the problem space → ensure the founder is solving a real problem for a real reason.",
    completionGate: "MTP saved ≥30 words + 5W1H all 6 fields populated + 3 scalable business examples documented",
    tools: [
      {
        toolId: "mtp_ikigai", toolName: "MTP / Ikigai Canvas",
        trlContribution: "TRL 1 — Problem identified",
        trlLevels: [1], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: [],
        dataNeededFrom: "None — first tool, entry point",
        gateCheck: "MTP statement saved with ≥30 words",
        isGateLevel: true
      },
      {
        toolId: "mind_map_5w1h", toolName: "5W1H Mind Map",
        trlContribution: "TRL 1 — Problem context documented",
        trlLevels: [1], crlDimension: "market_application", maxPercent: 10,
        prerequisiteToolIds: ["mtp_ikigai"],
        dataNeededFrom: "Why/What fields from MTP",
        gateCheck: "All 6 fields (Who/What/When/Where/Why/How) populated",
        isGateLevel: true
      },
      {
        toolId: "business_examples", toolName: "Abundant/Scalable Business Examples",
        trlContribution: "TRL 1 — Market awareness",
        trlLevels: [1], crlDimension: "market_application", maxPercent: 5,
        prerequisiteToolIds: ["mind_map_5w1h"],
        dataNeededFrom: "Problem context from 5W1H",
        gateCheck: "3 comparable scalable business examples documented with evidence",
        isGateLevel: false
      }
    ]
  },
  {
    sprintNumber: 2,
    name: "Root Cause Deep Dive",
    stageNumber: 1,
    weekRange: "Week 1",
    trlGate: "TRL 1 Gate 2 evidence — structural cause mapped, pattern evidence documented",
    crlIrlOutput: "Customer Validation +38% (empathy 10%, root cause 10%, systemic 10%, pattern 8%)",
    microPhase: "Establish why the problem exists at a structural level. Surface the real root cause before any solution thinking begins.",
    completionGate: "Empathy map all 4 quadrants filled + 7 Why ≥5 layers completed + Fish Bone ≥4 branches with ≥2 sub-causes + Event Pattern ≥3 recurring patterns",
    tools: [
      {
        toolId: "empathy_mapping", toolName: "Empathy Mapping",
        trlContribution: "TRL 1 — User reality documented",
        trlLevels: [1], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["mind_map_5w1h"],
        dataNeededFrom: "Who + What context from 5W1H",
        gateCheck: "All 4 quadrants filled; at least 1 direct user reference quoted",
        isGateLevel: true
      },
      {
        toolId: "seven_whys", toolName: "7 Why Analysis",
        trlContribution: "TRL 1 — Root cause traced",
        trlLevels: [1], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["mind_map_5w1h"],
        dataNeededFrom: "Problem statement from 5W1H",
        gateCheck: "Minimum 5 Why layers completed; final root cause explicitly named",
        isGateLevel: true
      },
      {
        toolId: "fishbone_diagram", toolName: "Fish Bone / Ishikawa",
        trlContribution: "TRL 1 — Structural cause mapped",
        trlLevels: [1], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["seven_whys"],
        dataNeededFrom: "Root cause chain from 7 Why",
        gateCheck: "≥4 cause branches with ≥2 sub-causes each",
        isGateLevel: true
      },
      {
        toolId: "event_pattern", toolName: "Event Pattern Template",
        trlContribution: "TRL 1 — Pattern evidence documented",
        trlLevels: [1], crlDimension: "customer_validation", maxPercent: 8,
        prerequisiteToolIds: ["fishbone_diagram"],
        dataNeededFrom: "Cause categories from Fish Bone",
        gateCheck: "At least 3 recurring event patterns identified with trigger + frequency",
        isGateLevel: true
      }
    ]
  },
  {
    sprintNumber: 3,
    name: "Stakeholder Discovery",
    stageNumber: 1,
    weekRange: "Week 2",
    trlGate: "TRL 1 → TRL 2 progression gate — primary research conducted, stakeholder reality verified",
    crlIrlOutput: "Customer Validation +32% (stakeholder ID 12%, interview prep, interviews 20% direct evidence)",
    microPhase: "Map who is affected, design interview approach, conduct minimum 5 real stakeholder conversations.",
    completionGate: "Stakeholder map ≥10 entries with role + stake + ≥10 interview questions bias-reviewed + 5 interview summaries each with name/role/pain/workaround/WTP signal",
    tools: [
      {
        toolId: "stakeholder_mapping", toolName: "Stakeholder Pursued Value Map",
        trlContribution: "TRL 1–2 — Stakeholder reality verified",
        trlLevels: [1, 2], crlDimension: "customer_validation", maxPercent: 12,
        prerequisiteToolIds: ["mind_map_5w1h"],
        dataNeededFrom: "Who (stakeholders) from 5W1H; What from problem statement",
        gateCheck: "≥10 stakeholders identified each with role + stake description",
        isGateLevel: true
      },
      {
        toolId: "problem_stakeholder_matrix", toolName: "Problem-Stakeholder Matrix",
        trlContribution: "TRL 1–2 — Stakeholder impact measured",
        trlLevels: [1, 2], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["stakeholder_mapping"],
        dataNeededFrom: "Identified stakeholders and platform problems from research",
        gateCheck: "Matrix fully mapped with reasoning and evidence for primary impacts",
        isGateLevel: true
      },
      {
        toolId: "interview_guide", toolName: "Interview Question Framing + Ethics Guide",
        trlContribution: "TRL 1–2 — Interview readiness",
        trlLevels: [1, 2], crlDimension: "customer_validation", maxPercent: 0,
        prerequisiteToolIds: ["stakeholder_mapping"],
        dataNeededFrom: "Stakeholder types + pain signals from mapping",
        gateCheck: "Min 10 open questions prepared; bias review checklist signed off",
        isGateLevel: true
      },
      {
        toolId: "interview_summary", toolName: "Interview Summary Templates (min 5)",
        trlContribution: "TRL 2 — Primary research conducted",
        trlLevels: [2], crlDimension: "customer_validation", maxPercent: 20,
        prerequisiteToolIds: ["interview_guide"],
        dataNeededFrom: "Question set from Interview Guide",
        gateCheck: "5 summaries each containing: name/ID, role, pain in their words, current workaround, WTP signal",
        isGateLevel: true
      }
    ]
  },
  // ── STAGE 2 ──────────────────────────────────────────────────────────
  {
    sprintNumber: 4,
    name: "Insight Translation",
    stageNumber: 2,
    weekRange: "Week 3A",
    trlGate: "TRL 2 Gate 1 prerequisite — insights synthesised, customer reality modelled",
    crlIrlOutput: "Customer Validation +35%, Business Model Viability +15%",
    microPhase: "Synthesise interview findings → build customer profile → establish what customers need before ideating any solution.",
    completionGate: "Affinity Map ≥3 clusters with interview quotes + Persona with demographics/3 pains/workarounds/journey stages + VPC left side filled with interview language (no assumptions)",
    tools: [
      {
        toolId: "affinity_mapping", toolName: "Affinity Mapping",
        trlContribution: "TRL 2 — Insights synthesised",
        trlLevels: [2], crlDimension: "customer_validation", maxPercent: 20,
        prerequisiteToolIds: ["interview_summary"],
        dataNeededFrom: "Pain points + quotes from all 5+ interview summaries",
        gateCheck: "≥3 insight clusters with supporting quotes from real interviews",
        isGateLevel: true
      },
      {
        toolId: "persona_journey", toolName: "User Persona & Journey Map",
        trlContribution: "TRL 2 — Customer reality modelled",
        trlLevels: [2], crlDimension: "customer_validation", maxPercent: 15,
        prerequisiteToolIds: ["affinity_mapping", "interview_summary"],
        dataNeededFrom: "Top pains from Affinity Map; who from Stakeholder Map",
        gateCheck: "Persona contains: demographics, top 3 pains, current workarounds, journey stages",
        isGateLevel: true
      },
      {
        toolId: "vpc_builder", toolName: "VPC — Customer Profile (left side)",
        trlContribution: "TRL 2 — Customer jobs/pains/gains mapped",
        trlLevels: [2], crlDimension: "business_model", maxPercent: 15,
        prerequisiteToolIds: ["affinity_mapping", "persona_journey"],
        dataNeededFrom: "Jobs/pains/gains from persona; pain clusters from Affinity Map",
        gateCheck: "All 3 sections (jobs/pains/gains) filled with language directly from interviews — no assumptions",
        isGateLevel: true
      }
    ]
  },
  {
    sprintNumber: 5,
    name: "Opportunity Mapping",
    stageNumber: 2,
    weekRange: "Week 3B",
    trlGate: "TRL 2 Gate 2 evidence — competitive landscape mapped, solution fit hypothesised",
    crlIrlOutput: "Market Application +30%, Business Model Viability +25%",
    microPhase: "Map competitive landscape → identify blue ocean space → validate solution differentiation angle BEFORE ideation begins.",
    completionGate: "ERRC ≥5 competitors all 4 quadrants filled + 6 Paths ≥2 explored with white space + VPC right side pain relievers + gain creators + Value Canvas both sides prerequisite met",
    tools: [
      {
        toolId: "errc_canvas", toolName: "ERRC Grid",
        trlContribution: "TRL 2 — Competitive landscape mapped",
        trlLevels: [2], crlDimension: "market_application", maxPercent: 15,
        prerequisiteToolIds: ["interview_summary", "mind_map_5w1h"],
        dataNeededFrom: "Competitor data from 5W1H; existing solutions from secondary research",
        gateCheck: "≥5 competitors entered; each of 4 quadrants (Eliminate/Reduce/Raise/Create) has ≥2 entries",
        isGateLevel: true
      },
      {
        toolId: "six_paths", toolName: "6 Paths Framework",
        trlContribution: "TRL 2 — Market boundary identified",
        trlLevels: [2], crlDimension: "market_application", maxPercent: 15,
        prerequisiteToolIds: ["errc_canvas"],
        dataNeededFrom: "E/R/R/C outputs from ERRC Grid",
        gateCheck: "≥2 paths explored with supporting evidence; white space explicitly identified",
        isGateLevel: true
      },
      {
        toolId: "vpc_value_map", toolName: "VPC — Value Map (right side)",
        trlContribution: "TRL 2 — Solution fit hypothesised",
        trlLevels: [2], crlDimension: "business_model", maxPercent: 15,
        prerequisiteToolIds: ["vpc_builder"],
        dataNeededFrom: "VPC left side complete (customer profile)",
        gateCheck: "Pain relievers + gain creators mapped; product/service description ≥30 words",
        isGateLevel: true
      },
      {
        toolId: "value_canvas", toolName: "Value Canvas",
        trlContribution: "TRL 2 — Value differentiation articulated",
        trlLevels: [2], crlDimension: "business_model", maxPercent: 10,
        prerequisiteToolIds: ["vpc_builder", "vpc_value_map"],
        dataNeededFrom: "Pain relievers + gain creators from VPC right side",
        gateCheck: "Both VPC sides complete before Value Canvas unlocks",
        isGateLevel: false
      }
    ]
  },
  {
    sprintNumber: 6,
    name: "Solution Direction & Storyboarding",
    stageNumber: 2,
    weekRange: "Week 4",
    trlGate: "TRL 2 → TRL 3 build gate — solution selected, build direction frozen",
    crlIrlOutput: "Business Model Viability +20%, build direction gates",
    microPhase: "Generate solution options → select one → lock build direction. Nothing goes into Stage 3 without a storyboard.",
    completionGate: "8 Crazy 8 concepts with top 3 shortlisted + ≥1 TRIZ contradiction OR ≥4 SCAMPER dimensions + Sprint Decision Matrix one solution selected + Storyboard ≥6 frames with user action + system response",
    tools: [
      {
        toolId: "crazy8", toolName: "Crazy 8 Ideation",
        trlContribution: "TRL 2–3 — Solution concepts generated",
        trlLevels: [2, 3], crlDimension: "business_model", maxPercent: 10,
        prerequisiteToolIds: ["vpc_builder", "vpc_value_map"],
        dataNeededFrom: "Value proposition fit from VPC; top pain from Affinity Map",
        gateCheck: "8 concepts sketched/written; top 3 shortlisted with rationale",
        isGateLevel: true
      },
      {
        toolId: "innovation_tool", toolName: "TRIZ / SCAMPER",
        trlContribution: "TRL 2–3 — Technical solution explored",
        trlLevels: [2, 3], crlDimension: "business_model", maxPercent: 10,
        prerequisiteToolIds: ["vpc_builder", "crazy8"],
        dataNeededFrom: "Solution concepts from Crazy 8; constraints from VPC",
        gateCheck: "≥1 contradiction resolved (TRIZ) OR ≥4 SCAMPER dimensions applied",
        isGateLevel: false
      },
      {
        toolId: "sprint_decision_matrix", toolName: "Sprint Decision Matrix",
        trlContribution: "TRL 2–3 — Build direction frozen",
        trlLevels: [2, 3], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: ["vpc_builder", "crazy8", "innovation_tool"],
        dataNeededFrom: "Solution concepts ranked; feasibility from VPC",
        gateCheck: "One solution selected; impact vs feasibility scored for top 3; decision rationale saved",
        isGateLevel: true
      },
      {
        toolId: "storyboarding", toolName: "Storyboarding",
        trlContribution: "TRL 2–3 — User flow mapped",
        trlLevels: [2, 3], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: ["sprint_decision_matrix"],
        dataNeededFrom: "Selected solution concept + user journey from persona",
        gateCheck: "≥6 storyboard frames; each frame has user action + system response; linked to prototype tool",
        isGateLevel: true
      }
    ]
  },
  // ── STAGE 3 ──────────────────────────────────────────────────────────
  {
    sprintNumber: 7,
    name: "Build Prototype v1",
    stageNumber: 3,
    weekRange: "Weeks 5–6",
    trlGate: "TRL 3 Gate 2 evidence — functional prototype exists, core user flow operational, demo-ready",
    crlIrlOutput: "Customer Validation +20%",
    microPhase: "Build the first functional prototype. Core user flow must be demonstrable. Build log must be started.",
    completionGate: "Core features listed and non-core deferred + Prototype core user flow functional + Internal demo recording saved + All storyboard frames covered",
    tools: [
      {
        toolId: "build_scope", toolName: "Build Scope Document",
        trlContribution: "TRL 3 — Build begins",
        trlLevels: [3], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: ["sprint_decision_matrix"],
        dataNeededFrom: "Selected solution from Sprint Decision Matrix",
        gateCheck: "Core features listed; non-core explicitly deferred; build tool selected (Figma/Bubble/n8n/Flutter/Tinkercad/GitHub)",
        isGateLevel: true
      },
      {
        toolId: "prototyping_hub", toolName: "No-Code Prototype",
        trlContribution: "TRL 3 — Functional prototype exists",
        trlLevels: [3, 4], crlDimension: "customer_validation", maxPercent: 20,
        prerequisiteToolIds: ["storyboarding", "sprint_decision_matrix"],
        dataNeededFrom: "User flow from storyboard; feature scope from sprint matrix",
        gateCheck: "Core user flow functional; internal demo completed; build log started",
        isGateLevel: true
      },
      {
        toolId: "internal_review", toolName: "Internal Review Checklist",
        trlContribution: "TRL 3 — Demo-ready",
        trlLevels: [3], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: ["prototyping_hub"],
        dataNeededFrom: "Core user flow from prototype",
        gateCheck: "All storyboard frames covered by prototype; demo recording link saved",
        isGateLevel: true
      }
    ]
  },
  {
    sprintNumber: 8,
    name: "User Testing Cycle",
    stageNumber: 3,
    weekRange: "Weeks 6–7",
    trlGate: "TRL 3–4 gate — user evidence collected, feedback synthesised, prioritised fix list created",
    crlIrlOutput: "Customer Validation +30%",
    microPhase: "Design test protocol → run 5 real user sessions → synthesise findings into prioritised fix list.",
    completionGate: "Test protocol with ≥5 tasks and success metrics + ≥5 sessions documented with reaction notes + Post-test affinity map with ≥3 clusters and prioritised fix list",
    tools: [
      {
        toolId: "user_test_protocol", toolName: "User Test Script / Protocol",
        trlContribution: "TRL 3–4 — Test readiness",
        trlLevels: [3, 4], crlDimension: "customer_validation", maxPercent: 0,
        prerequisiteToolIds: ["prototyping_hub"],
        dataNeededFrom: "Core user flow from prototype; success metrics from sprint matrix",
        gateCheck: "≥5 test tasks defined; success metrics set; observer role briefed",
        isGateLevel: true
      },
      {
        toolId: "user_testing", toolName: "Observation & Feedback Recording Forms",
        trlContribution: "TRL 3–4 — User evidence collected",
        trlLevels: [3, 4], crlDimension: "customer_validation", maxPercent: 20,
        prerequisiteToolIds: ["user_test_protocol", "prototyping_hub"],
        dataNeededFrom: "Test script from protocol; prototype link",
        gateCheck: "≥5 user test sessions documented each with reaction notes + friction points",
        isGateLevel: true
      },
      {
        toolId: "post_test_affinity", toolName: "Post-Test Affinity Map",
        trlContribution: "TRL 3–4 — Feedback synthesised",
        trlLevels: [3, 4], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["user_testing"],
        dataNeededFrom: "All observation notes + friction points from ≥5 sessions",
        gateCheck: "≥3 insight clusters from test results; prioritised fix list created",
        isGateLevel: true
      },
      {
        toolId: "perceived_value", toolName: "Stakeholder Perceived Value",
        trlContribution: "TRL 3–4 — Value metrics captured",
        trlLevels: [3, 4], crlDimension: "customer_validation", maxPercent: 10,
        prerequisiteToolIds: ["user_testing", "post_test_affinity"],
        dataNeededFrom: "Direct feedback and value drivers from testing",
        gateCheck: "Value score captured and metrics recorded for all dimensions",
        isGateLevel: false
      }
    ]
  },
  {
    sprintNumber: 9,
    name: "Iterate to TRL 4 + Scale Snapshot",
    stageNumber: 3,
    weekRange: "Weeks 7–8",
    trlGate: "TRL 4 LOCK — all 4 integration criteria must be met simultaneously",
    crlIrlOutput: "Customer Validation FULL 35%, Business Model Viability +30%, IRL Pitch Capability begins",
    microPhase: "Implement all high-priority fixes → retest → lock TRL 4 with all 4 system criteria. Then initiate business model, cost assumptions, and risk register.",
    completionGate: "Prototype v2 all high-priority fixes + Iteration Log with 'why' per change + ≥3 retest sessions showing improvement + Lean Canvas revenue logic + Cost worksheet ≥3 items + Risk Register ≥4 risks + ALL 4 TRL4 CRITERIA checked",
    tools: [
      {
        toolId: "prototype_v2", toolName: "Prototype v2 (iterated)",
        trlContribution: "TRL 4 — Integrated prototype",
        trlLevels: [4], crlDimension: "customer_validation", maxPercent: 15,
        prerequisiteToolIds: ["post_test_affinity"],
        dataNeededFrom: "Prioritised fix list from post-test affinity map",
        gateCheck: "All high-priority fixes implemented; v2 demo recording saved",
        isGateLevel: true
      },
      {
        toolId: "iteration_log", toolName: "Prototype Iteration Log",
        trlContribution: "TRL 4 — Iteration evidence",
        trlLevels: [4], crlDimension: "customer_validation", maxPercent: 15,
        prerequisiteToolIds: ["prototype_v2", "post_test_affinity"],
        dataNeededFrom: "What changed, why, which test triggered it",
        gateCheck: "Each change documented: what changed + why + which user test triggered it",
        isGateLevel: true
      },
      {
        toolId: "retest_cycle", toolName: "Second User Test Cycle (min 3)",
        trlContribution: "TRL 4 — Iteration validated",
        trlLevels: [4], crlDimension: "customer_validation", maxPercent: 0,
        prerequisiteToolIds: ["prototype_v2"],
        dataNeededFrom: "v2 prototype link; original friction points from first test cycle",
        gateCheck: "≥3 retest sessions showing improvement vs v1 on prioritised friction points",
        isGateLevel: true
      },
      {
        toolId: "lean_canvas", toolName: "Lean Canvas / Business Model Snapshot",
        trlContribution: "TRL 4 — Business feasibility initiated",
        trlLevels: [4], crlDimension: "business_model", maxPercent: 20,
        prerequisiteToolIds: ["prototype_v2", "user_testing"],
        dataNeededFrom: "Revenue signals from user tests; cost assumptions from build log",
        gateCheck: "Revenue logic + who pays + key cost items all entered",
        isGateLevel: true
      },
      {
        toolId: "cost_worksheet", toolName: "Cost Assumption Worksheet",
        trlContribution: "TRL 4 — Unit economics initiated",
        trlLevels: [4], crlDimension: "business_model", maxPercent: 10,
        prerequisiteToolIds: ["lean_canvas"],
        dataNeededFrom: "Revenue model from Lean Canvas",
        gateCheck: "≥3 cost items with estimated figures; assumptions explicitly stated",
        isGateLevel: true
      },
      {
        toolId: "risk_register", toolName: "Risk Register",
        trlContribution: "TRL 4 — Risk awareness documented",
        trlLevels: [4], crlDimension: undefined, maxPercent: undefined,
        prerequisiteToolIds: ["lean_canvas", "iteration_log"],
        dataNeededFrom: "Technical risks from iteration log; commercial risks from lean canvas",
        gateCheck: "≥4 risks identified (technical + commercial); mitigation noted for each",
        isGateLevel: false
      }
    ]
  }
]

// ── TRL 4 INTEGRATION THRESHOLD ─────────────────────────────────────
// ALL FOUR must be simultaneously true — checked as explicit checkboxes
export const TRL4_CRITERIA = [
  { id: "microservices", label: "All microservices are integrated and communicating seamlessly" },
  { id: "user_testing", label: "Initial user testing data is logged and tracked" },
  { id: "main_branch",  label: "Source code is pushed to the main Hub branch/repository" },
  { id: "deployment",   label: "The deployment environment is officially ready for a pilot launch" }
]

// ── TRL → EVENT TYPE MAPPING ─────────────────────────────────────────
export const TRL_EVENT_MAP: Record<number, { type: string; why: string; monetary: boolean }> = {
  1: { type: "Domain expert talks, problem workshops, research seminars", why: "Defining the problem — needs practitioners, not competitions", monetary: false },
  2: { type: "Ideation hackathons, design sprints, architecture reviews", why: "Building concept — technical mentors validate before any build", monetary: false },
  3: { type: "Prototype showcases, early-stage hackathons, innovation challenges", why: "Working core exists — needs technical validators and early user feedback", monetary: true },
  4: { type: "Seed funding competitions, accelerator programmes, pilot demos", why: "Integration proven — ready for capital and accelerator intake", monetary: true },
  5: { type: "Corporate pilot partnerships, validation grants, R&D collaborations", why: "Validated — needs operational testing environments", monetary: true },
  6: { type: "Industry conferences, investor showcases, government challenges", why: "Near-final system — needs visibility with decision-makers", monetary: true },
  7: { type: "Investor pitch competitions, venture showcases, scale-up programmes", why: "Full demo-ready — objective shifts to growth capital", monetary: true },
  8: { type: "Series-stage funding events, enterprise sales forums, trade shows", why: "Qualified — needs enterprise customers and distribution", monetary: true },
  9: { type: "Market expansion forums, ecosystem summits, post-launch accelerators", why: "Live in market — needs scaling support and international pathways", monetary: true }
}

// ── TRL ↔ CRL ↔ IRL ALIGNMENT BANDS ─────────────────────────────────
export const ALIGNMENT_BANDS = [
  { trlRange: [1,2], crlMin: 0,  crlMax: 20, irlMin: 0,  irlMax: 10,
    overCRLSignal: "CRL > 40% at TRL 1–2 → over-commercialised. Redirect to technical build first.",
    underCRLSignal: "CRL < 10% → minimal commercial thinking. Add customer outreach sprint.",
    criticalIRLThreshold: null },
  { trlRange: [3],   crlMin: 20, crlMax: 40, irlMin: 10, irlMax: 25,
    overCRLSignal: "CRL > 50% at TRL 3 → pitch-mode too early. Return to prototype validation.",
    underCRLSignal: "CRL < 20% → Sprint 8 (User Test Cycle) elevated.",
    criticalIRLThreshold: null },
  { trlRange: [4],   crlMin: 40, crlMax: 55, irlMin: 25, irlMax: 40,
    overCRLSignal: null,
    underCRLSignal: "All CRL dimensions must have ≥1 submission. IRL Pitch Capability draft expected.",
    criticalIRLThreshold: null },
  { trlRange: [5,6], crlMin: 55, crlMax: 70, irlMin: 40, irlMax: 60,
    overCRLSignal: null,
    underCRLSignal: "CRL < 55% → CRITICAL. IRL Financial Model must be submitted and assessed.",
    criticalIRLThreshold: null },
  { trlRange: [7,8], crlMin: 70, crlMax: 85, irlMin: 60, irlMax: 80,
    overCRLSignal: null,
    underCRLSignal: "IRL < 60% at TRL 7 = CRITICAL GAP. Pitch Capability pinned as Innovator Module 1.",
    criticalIRLThreshold: 60 },
  { trlRange: [9],   crlMin: 85, crlMax: 100, irlMin: 85, irlMax: 100,
    overCRLSignal: null,
    underCRLSignal: "Below 85% → flagged to manager; commercial infrastructure incomplete.",
    criticalIRLThreshold: 85 }
]

// ── CONFLICT RESOLUTION PRIORITY ─────────────────────────────────────
// Applied in rank order — first match wins
export const CONFLICT_PRIORITY = [
  { rank: 1, condition: "TRL stuck > 14 days",
    response: "Overrides ALL other engines. TRL Tracker + Sprint Engine pinned to dashboard top.",
    check: (j: any) => j.trlStuckDays > 14 },
  { rank: 2, condition: "CRL or IRL 15%+ below expected band",
    response: "Red alert at dashboard top. Relevant Innovator module pinned position 1 or 2. Mentor notified automatically.",
    check: (j: any) => j.crlGapPercent >= 15 || j.irlGapPercent >= 15 },
  { rank: 3, condition: "Mentor feedback flag < 48 hours old",
    response: "Flagged module pinned first in Innovator output.",
    check: (j: any) => j.mentorFlagHoursAgo < 48 },
  { rank: 4, condition: "Stage gate proximity — < 3 tools remaining",
    response: "Event and stakeholder recommendations deprioritised; tool completion takes precedence.",
    check: (j: any) => j.toolsRemainingInStage < 3 },
  { rank: 5, condition: "Student inactive > 7 days",
    response: "Re-engagement nudge: last in-progress tool + days remaining + one low-effort task completable in < 60 minutes.",
    check: (j: any) => j.inactiveDays > 7 }
]

// ── TOOL ID ALIASES ────────────────────────────────────────────────
export const TOOL_ALIASES: Record<string, string[]> = {
  'mind_map_5w1h': ['mind_mapping_5w1h', 'mind_map_5w1h'],
  'errc_canvas': ['errc_grid', 'errc_analysis', 'errc', 'errc_canvas'],
  'persona_journey': ['user_persona', 'persona_mapping', 'journey_map', 'user_persona_journey', 'persona_journey'],
  'vpc_builder': ['vpc', 'vpc_tool', 'vpu', 'value_proposition', 'vpc_builder'],
  'crazy8': ['crazy_8s', 'crazy_8', 'rapid_ideation', 'solution_design', 'crazy8'],
  'innovation_tool': ['innovation', 'systematic_innovation', 'triz', 'scamper', 'triz_scamper', 'innovation_builder', 'innovation_tool'],
  'interview_guide': ['interview_framework', 'interview_guide'],
  'mtp_ikigai': ['mtp_canvas', 'mtp_ikigai'],
  'storyboarding': ['storyboarding'],
  'prototyping_hub': ['prototype_builder', 'trl_tracker', 'prototyping_hub'],
  'user_testing': ['feedback_hub', 'usability_testing', 'feedback_recorder', 'feedback_recording', 'user_testing'],
  'pitch_deck': ['pitch_deck_builder', 'pitchdeck_builder', 'investor_deck', 'pitchdeck', 'pitch_deck'],
}

export function getCanonicalId(toolId: string): string {
  for (const [canonical, aliases] of Object.entries(TOOL_ALIASES)) {
    if (aliases.includes(toolId)) return canonical
  }
  return toolId
}

export function getAliases(toolId: string): string[] {
  const canonical = getCanonicalId(toolId)
  return TOOL_ALIASES[canonical] || [toolId]
}

// ── NUDGE AGENT PREREQUISITE MAP ─────────────────────────────────────
export const TOOL_PREREQUISITES: Record<string, string[]> = {}
SPRINT_REGISTRY.forEach(sprint =>
  sprint.tools.forEach(tool => {
    const cid = getCanonicalId(tool.toolId)
    TOOL_PREREQUISITES[cid] = tool.prerequisiteToolIds
  })
)

// ── HELPER FUNCTIONS ─────────────────────────────────────────────────

export function getSprintByNumber(n: number): SprintDefinition | undefined {
  return SPRINT_REGISTRY.find(s => s.sprintNumber === n)
}

export function getToolConfig(toolId: string): SprintTool | undefined {
  for (const sprint of SPRINT_REGISTRY) {
    const t = sprint.tools.find(t => t.toolId === toolId)
    if (t) return t
  }
}

export function getSprintForTool(toolId: string): SprintDefinition | undefined {
  return SPRINT_REGISTRY.find(s => s.tools.some(t => t.toolId === toolId))
}

export function getBandForTRL(trl: number) {
  return ALIGNMENT_BANDS.find(b => b.trlRange.includes(trl))
}

export function computeCRLTotal(scores: Record<string, number>): number {
  // weights: market_application=30, customer_validation=35, business_model=35
  const w = { market_application: 0.30, customer_validation: 0.35, business_model: 0.35 }
  return Math.round(
    (scores.market_application || 0) * w.market_application +
    (scores.customer_validation || 0) * w.customer_validation +
    (scores.business_model || 0) * w.business_model
  )
}

export function computeIRLTotal(scores: Record<string, number>): number {
  // weights: pitch_capability=40, financial_modelling=30, investor_engagement=30
  const w = { pitch_capability: 0.40, financial_modelling: 0.30, investor_engagement: 0.30 }
  return Math.round(
    (scores.pitch_capability || 0) * w.pitch_capability +
    (scores.financial_modelling || 0) * w.financial_modelling +
    (scores.investor_engagement || 0) * w.investor_engagement
  )
}

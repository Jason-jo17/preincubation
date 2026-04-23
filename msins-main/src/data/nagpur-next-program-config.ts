/**
 * Config-driven Nagpur NEXT program: phases → sprints → tasks.
 * Runtime state (status, comments, …) lives in `nagpur-next-cohort-store`.
 */

export const NAGPUR_NEXT_PROGRAM_ID = "nagpur-next" as const;
export const NAGPUR_NEXT_CYCLE_LABEL = "Apr–Jul 2026";

/** Innovator / primary team wired to shared store. */
export const NAGPUR_NEXT_INNOVATOR_TEAM_ID = "team-kiran-navitas";

export interface NagpurProgramTaskTemplate {
  id: string;
  name: string;
  subtitle: string;
  objective: string;
  resources?: NagpurProgramResource[];
  smeData?: NagpurProgramSme[];
}

export interface NagpurProgramResource {
  id: string;
  title: string;
  url: string;
  kind: "video" | "link" | "doc";
}

export interface NagpurProgramSme {
  id: string;
  name: string;
  role: string;
  contact?: string;
}

export interface NagpurProgramSprintTemplate {
  id: string;
  name: string;
  evidenceNote: string;
  tasks: NagpurProgramTaskTemplate[];
  resources?: NagpurProgramResource[];
  smeData?: NagpurProgramSme[];
}

export interface NagpurProgramPhaseTemplate {
  id: string;
  index: number;
  title: string;
  sprints: NagpurProgramSprintTemplate[];
}

export const TOOL_TEMPLATES: Omit<NagpurProgramTaskTemplate, "id">[] = [
  {
    name: "5W1H Analysis",
    subtitle: "Who, What, Where, When, Why, How",
    objective: "Deconstruct the problem by asking six fundamental questions to gain a 360-degree view of the challenge.",
  },
  {
    name: "Mind Map",
    subtitle: "Visual brainstorming",
    objective: "Map out the ecosystem, stakeholders, and related issues around the central challenge to find hidden connections.",
  },
  {
    name: "ERRC Grid",
    subtitle: "Eliminate, Reduce, Raise, Create",
    objective: "Apply Blue Ocean strategy by deciding which factors to drop or enhance to create unique value for the MSME.",
  },
  {
    name: "SCAMPER",
    subtitle: "Creative thinking hack",
    objective: "Iterate on existing solutions by Substituting, Combining, Adapting, Modifying, Putting to another use, Eliminating, and Reversing.",
  },
  {
    name: "PESTEL Analysis",
    subtitle: "Macro-environmental factor scan",
    objective: "Analyze Political, Economic, Social, Technological, Environmental, and Legal factors impacting the solution's viability.",
  },
  {
    name: "Feasibility Matrix",
    subtitle: "Impact vs. Difficulty scoring",
    objective: "Plot concepts on a 2x2 matrix to prioritize ideas that offer high impact with manageable implementation effort.",
  },
  {
    name: "Problem Reframing (HMW)",
    subtitle: "How Might We statements",
    objective: "Transform observed pain points into actionable innovation opportunities using speculative 'How Might We' questions.",
  }
];

export const NAGPUR_NEXT_PHASES: NagpurProgramPhaseTemplate[] = [
  {
    id: "nn-p1",
    index: 1,
    title: "Discovery & Problem Understanding",
    sprints: [
      {
        id: "nn-s1",
        name: "Sprint 1: Secondary Research",
        evidenceNote: "Attach desk research summaries, citations, and problem framing notes.",
        tasks: [
          {
            id: "nn-t-s1-1",
            name: "Industry scan",
            subtitle: "Lighting + UAS SAR landscape in India",
            objective: "Summarize suppliers, standards, and district adoption patterns relevant to coordinated fleet lighting.",
          },
          {
            id: "nn-t-s1-2",
            name: "Competitor study",
            subtitle: "Products, pricing, gaps",
            objective: "Benchmark portable illuminators and drone payloads against Navitas roadmaps.",
          },
          {
            id: "nn-t-s1-3",
            name: "User pain points",
            subtitle: "Pilots, command, maintenance",
            objective: "Document operational pains for night SAR with emphasis on shadows, comms, and fatigue.",
          },
          {
            id: "nn-t-s1-4",
            name: "Problem framing",
            subtitle: "HMW + success measures",
            objective: "Lock the challenge statement and measurable outcomes for Nagpur NEXT demo milestones.",
          },
        ],
      },
      {
        id: "nn-s2",
        name: "Sprint 2: Primary Research",
        evidenceNote: "Field notes, interview logs, survey charts, synthesis memo.",
        tasks: [
          {
            id: "nn-t-s2-1",
            name: "Stakeholder interviews",
            subtitle: "MSME + responders",
            objective: "Capture structured interviews with Navitas and district stakeholders on trial constraints.",
          },
          {
            id: "nn-t-s2-2",
            name: "Field visit",
            subtitle: "Nagpur integration bays",
            objective: "Validate payload handling, power, and safety pathways on-site with Mrs. Kulkarni’s team.",
          },
          {
            id: "nn-t-s2-3",
            name: "Survey",
            subtitle: "Operator quick-scan",
            objective: "Run a short survey on mission patterns and lighting gaps; chart top findings.",
          },
          {
            id: "nn-t-s2-4",
            name: "Insight synthesis",
            subtitle: "So-what for product",
            objective: "Consolidate primary research into decision-ready insights for validation sprints.",
          },
        ],
      },
    ],
  },
  {
    id: "nn-p2",
    index: 2,
    title: "Validation & Concepting",
    sprints: [
      {
        id: "nn-s3",
        name: "Sprint 3: Root Cause Analysis",
        evidenceNote: "Fishbone diagram, 5 Whys worksheet, opportunity map.",
        tasks: [
          {
            id: "nn-t-s3-1",
            name: "Fishbone",
            subtitle: "Causes of poor night coverage",
            objective: "Trace root causes across equipment, process, environment, and governance.",
          },
          {
            id: "nn-t-s3-2",
            name: "5 Why",
            subtitle: "Deep dive on top failure mode",
            objective: "Pressure-test the dominant failure mode until actionable levers appear.",
          },
          {
            id: "nn-t-s3-3",
            name: "Opportunity areas",
            subtitle: "Where to win",
            objective: "Prioritize opportunity spaces aligned with Navitas manufacturing and pilot envelope.",
          },
        ],
      },
      {
        id: "nn-s4",
        name: "Sprint 4: Ideation",
        evidenceNote: "Idea board, scoring sheet, feasibility matrix.",
        tasks: [
          {
            id: "nn-t-s4-1",
            name: "Idea generation",
            subtitle: "Breadth before selection",
            objective: "Produce divergent concepts for fleet coordination and adaptive lux control.",
          },
          {
            id: "nn-t-s4-2",
            name: "Concept scoring",
            subtitle: "Impact × feasibility",
            objective: "Score concepts against SAR outcomes, BOM risk, and MSME fit.",
          },
          {
            id: "nn-t-s4-3",
            name: "Feasibility matrix",
            subtitle: "Down-select",
            objective: "Lock the modular drone lighting architecture for prototype planning.",
          },
        ],
      },
    ],
  },
  {
    id: "nn-p3",
    index: 3,
    title: "Prototype Development",
    sprints: [
      {
        id: "nn-s5",
        name: "Sprint 5: Prototype Planning",
        evidenceNote: "BOM, CAD pack, resource plan with vendor notes.",
        tasks: [
          {
            id: "nn-t-s5-1",
            name: "BOM",
            subtitle: "Electrical + mechanical",
            objective: "Release a costed BOM with second-source options for LEDs and drivers.",
          },
          {
            id: "nn-t-s5-2",
            name: "CAD / Architecture",
            subtitle: "Payload + airframe interfaces",
            objective: "Publish CAD and logical architecture for bench build and Navitas review.",
          },
          {
            id: "nn-t-s5-3",
            name: "Resource plan",
            subtitle: "People, tools, timeline",
            objective: "Sequence fab, assembly, and test windows against mentor gates.",
          },
        ],
      },
      {
        id: "nn-s6",
        name: "Sprint 6: MVP Build",
        evidenceNote: "Upload build photos, test logs, iteration notes.",
        tasks: [
          {
            id: "nn-t-s6-1",
            name: "Prototype evidence upload",
            subtitle: "Bench + dark-room",
            objective: "Submit lux maps, thermal notes, and build evidence for mentor review.",
          },
          {
            id: "nn-t-s6-2",
            name: "Testing logs",
            subtitle: "Protocols + results",
            objective: "Maintain dated test logs covering formation commands and fail-safe cutovers.",
          },
          {
            id: "nn-t-s6-3",
            name: "Iterations",
            subtitle: "Closed-loop fixes",
            objective: "Document iteration cycles responding to mentor feedback before pilot readiness.",
          },
        ],
      },
    ],
  },
  {
    id: "nn-p4",
    index: 4,
    title: "Pilot Readiness",
    sprints: [
      {
        id: "nn-s7",
        name: "Sprint 7: Pilot Strategy",
        evidenceNote: "Pilot metrics deck, MSME implementation plan, cost-benefit sheet.",
        tasks: [
          {
            id: "nn-t-s7-1",
            name: "Pilot metrics",
            subtitle: "Coverage, time-to-find, safety",
            objective: "Define KPIs and collection plan for district rehearsal exercises.",
          },
          {
            id: "nn-t-s7-2",
            name: "MSME implementation plan",
            subtitle: "Navitas line + field",
            objective: "Align manufacturing, field service, and spare strategy with pilot scope.",
          },
          {
            id: "nn-t-s7-3",
            name: "Cost-benefit sheet",
            subtitle: "Units, savings, risk",
            objective: "Quantify benefits versus baseline sorties for governance review.",
          },
        ],
      },
      {
        id: "nn-s8",
        name: "Sprint 8: Pitch & Demo Day",
        evidenceNote: "Deck, video, impact sheet, jury Q&A pack.",
        tasks: [
          {
            id: "nn-t-s8-1",
            name: "Final deck",
            subtitle: "Story + evidence",
            objective: "Finalize the Nagpur NEXT demo narrative with Navitas co-branding.",
          },
          {
            id: "nn-t-s8-2",
            name: "Demo video",
            subtitle: "3–5 min capture",
            objective: "Produce a crisp demo video with safe night-flight staging.",
          },
          {
            id: "nn-t-s8-3",
            name: "Impact metrics",
            subtitle: "Before / after",
            objective: "Report impact metrics and lessons for scale-up.",
          },
          {
            id: "nn-t-s8-4",
            name: "Jury readiness",
            subtitle: "Q&A + contingencies",
            objective: "Prepare jury prompts, backups, and contingency flows for demo day.",
          },
        ],
      },
    ],
  },
];

/** Six-lane executive progress view (maps to UI spec). */
export const NAGPUR_NEXT_EXECUTION_LANES = [
  { id: "lane-discovery", label: "Discovery", sprintIds: ["nn-s1", "nn-s2"] as const },
  { id: "lane-validation", label: "Problem Validation", sprintIds: ["nn-s3"] as const },
  { id: "lane-ideation", label: "Ideation", sprintIds: ["nn-s4"] as const },
  { id: "lane-prototype", label: "Prototype", sprintIds: ["nn-s5", "nn-s6"] as const },
  { id: "lane-pilot", label: "Pilot Prep", sprintIds: ["nn-s7"] as const },
  { id: "lane-demo", label: "Demo Day", sprintIds: ["nn-s8"] as const },
] as const;

const ALL_TASK_IDS: string[] = [];
for (const ph of NAGPUR_NEXT_PHASES) {
  for (const sp of ph.sprints) {
    for (const t of sp.tasks) ALL_TASK_IDS.push(t.id);
  }
}

export const NAGPUR_NEXT_TASK_ID_ORDER = ALL_TASK_IDS;

export function getSprintOrderIndex(sprintId: string): number {
  const flat = NAGPUR_NEXT_PHASES.flatMap((p) => p.sprints);
  const i = flat.findIndex((s) => s.id === sprintId);
  return i;
}

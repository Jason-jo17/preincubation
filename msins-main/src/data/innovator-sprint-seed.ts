import type { AcceptedSprintContext } from "@/data/innovator-marketplace-hub";
import { innovatorProfile, innovatorSprint } from "@/data/innovator-workspace";

export const SPRINT_STAGE_LABELS = [
  "Discover",
  "Define",
  "Ideate",
  "Prototype",
  "Validate",
  "Pilot",
  "Closeout",
] as const;

export type SprintStageLabel = (typeof SPRINT_STAGE_LABELS)[number];

export type SprintKanbanColumn = "backlog" | "in_progress" | "review" | "done";

export type SprintTaskPriority = "P0" | "P1" | "P2";

export interface SprintTaskCheckItem {
  id: string;
  label: string;
  done: boolean;
}

export interface SprintTaskComment {
  id: string;
  author: string;
  body: string;
  at: string;
}

export interface SprintTask {
  id: string;
  title: string;
  priority: SprintTaskPriority;
  dueDate: string;
  owner: string;
  deliverable: string;
  column: SprintKanbanColumn;
  mandatory: boolean;
  objective: string;
  context: string;
  notesDraft: string;
  checklist: SprintTaskCheckItem[];
  comments: SprintTaskComment[];
  mentorFeedback: SprintTaskComment[];
}

export interface SprintBlocker {
  id: string;
  title: string;
  detail: string;
  resolved: boolean;
}

export interface SprintDeliverable {
  id: string;
  name: string;
  type: string;
}

export interface SprintProject {
  id: string;
  name: string;
  sponsor: string;
  sponsorType: "msme" | "cohort";
  currentStageIndex: number;
  weekCurrent: number;
  weekTotal: number;
  deadlineLabel: string;
  mentorName: string;
  overallProgressPct: number;
  tasks: Record<string, SprintTask>;
  columns: Record<SprintKanbanColumn, string[]>;
  blockers: SprintBlocker[];
  deliverables: SprintDeliverable[];
  stageGatePending: boolean;
  archived?: boolean;
  /** MSME marketplace / challenges list id for problem brief */
  linkedChallengeId?: string;
}

export interface InnovatorSprintStoreState {
  version: 1;
  activeSprintId: string;
  projects: Record<string, SprintProject>;
}

const COLS: SprintKanbanColumn[] = ["backlog", "in_progress", "review", "done"];

function emptyTask(
  partial: Omit<SprintTask, "notesDraft" | "checklist" | "comments" | "mentorFeedback"> &
    Partial<Pick<SprintTask, "notesDraft" | "checklist" | "comments" | "mentorFeedback">>,
): SprintTask {
  return {
    notesDraft: partial.notesDraft ?? "",
    checklist: partial.checklist ?? [],
    comments: partial.comments ?? [],
    mentorFeedback: partial.mentorFeedback ?? [],
    ...partial,
  } as SprintTask;
}

function buildProject(
  id: string,
  name: string,
  sponsor: string,
  sponsorType: "msme" | "cohort",
  stageIndex: number,
  weekCurrent: number,
  weekTotal: number,
  deadlineLabel: string,
  mentorName: string,
  progress: number,
  taskDefs: SprintTask[],
): SprintProject {
  const tasks: Record<string, SprintTask> = {};
  const columns: Record<SprintKanbanColumn, string[]> = {
    backlog: [],
    in_progress: [],
    review: [],
    done: [],
  };
  for (const t of taskDefs) {
    tasks[t.id] = t;
  }
  for (const c of COLS) {
    columns[c] = taskDefs.filter((t) => t.column === c).map((t) => t.id);
  }
  return {
    id,
    name,
    sponsor,
    sponsorType,
    currentStageIndex: stageIndex,
    weekCurrent,
    weekTotal,
    deadlineLabel,
    mentorName,
    overallProgressPct: progress,
    tasks,
    columns,
    blockers: [],
    deliverables: [],
    stageGatePending: false,
    archived: false,
  };
}

const mentorThread = (body: string): SprintTaskComment[] => [
  { id: "mf-1", author: "Dr Rao", body, at: "Apr 12, 4:12 PM" },
];

export function createEvCoolingSprintProject(): SprintProject {
  const taskDefs: SprintTask[] = [
    emptyTask({
      id: "ev-t1",
      title: "User Interviews",
      priority: "P1",
      dueDate: "Apr 02",
      owner: "Rahul S.",
      deliverable: "Interview Notes.pdf",
      column: "done",
      mandatory: true,
      objective: "Capture thermal pain points from pack integration and service teams.",
      context: "GreenDrive Chakan bay — two shift leads + warranty analyst.",
      checklist: [
        { id: "c1", label: "Schedule 6 sessions", done: true },
        { id: "c2", label: "Translate Marathi notes", done: true },
      ],
      mentorFeedback: mentorThread("Tighten questions around derating events in April heat."),
    }),
    emptyTask({
      id: "ev-t2",
      title: "Root Cause Mapping",
      priority: "P0",
      dueDate: "Apr 06",
      owner: "Rahul S.",
      deliverable: "RCA one-pager",
      column: "done",
      mandatory: true,
      objective: "Link ambient excursions to pack architecture and BOM constraints.",
      context: "Warranty logs + MIDC safety checklist excerpts.",
      checklist: [
        { id: "c1", label: "Fishbone draft", done: true },
        { id: "c2", label: "MSME sign-off", done: true },
      ],
      comments: [{ id: "cm-1", author: "GreenDrive PM", body: "Approved for prototype track.", at: "Apr 07" }],
    }),
    emptyTask({
      id: "ev-t3",
      title: "Concept Sketches",
      priority: "P1",
      dueDate: "Apr 14",
      owner: "Rahul S.",
      deliverable: "Sketch pack v2",
      column: "review",
      mandatory: true,
      objective: "Three cooling architecture options with trade-off table.",
      context: "Passive vs. active mini-loop vs. hybrid manifold.",
      checklist: [
        { id: "c1", label: "3 concepts", done: true },
        { id: "c2", label: "Trade-off matrix", done: false },
      ],
    }),
    emptyTask({
      id: "ev-t4",
      title: "CAD Model V1",
      priority: "P0",
      dueDate: "Apr 18",
      owner: "Rahul S.",
      deliverable: "CAD_v1.step",
      column: "in_progress",
      mandatory: true,
      objective: "Pack-integrated manifold CAD with envelope constraints.",
      context: "OEM envelope DXF + cell spacing table.",
      checklist: [
        { id: "c1", label: "Solid model", done: false },
        { id: "c2", label: "Mass properties", done: false },
      ],
      mentorFeedback: mentorThread("Add fillet relief near busbar tunnel before CFD handoff."),
    }),
    emptyTask({
      id: "ev-t5",
      title: "BOM Estimate",
      priority: "P2",
      dueDate: "Apr 22",
      owner: "Rahul S.",
      deliverable: "Costing.xlsx",
      column: "backlog",
      mandatory: true,
      objective: "Rough BOM for pilot build with Maharashtra supplier mix.",
      context: "Use GreenDrive preferred vendor list.",
      checklist: [
        { id: "c1", label: "Top 20 lines", done: false },
        { id: "c2", label: "Alternate sourcing", done: false },
      ],
    }),
    emptyTask({
      id: "ev-t6",
      title: "Prototype Test Report",
      priority: "P0",
      dueDate: "May 02",
      owner: "Rahul S.",
      deliverable: "Test_Report.pdf",
      column: "backlog",
      mandatory: true,
      objective: "Bench thermal cycling results vs. targets.",
      context: "Chamber slots booked with Venture Centre lab.",
      checklist: [
        { id: "c1", label: "Test plan", done: false },
        { id: "c2", label: "Instrumentation list", done: false },
      ],
    }),
    emptyTask({
      id: "ev-t7",
      title: "Pilot Metrics Review",
      priority: "P1",
      dueDate: "May 18",
      owner: "Rahul S.",
      deliverable: "Pilot KPI deck",
      column: "backlog",
      mandatory: true,
      objective: "Define KPIs for on-vehicle pilot with Baner service centre.",
      context: "Align with GreenDrive CX lead.",
      checklist: [{ id: "c1", label: "KPI tree", done: false }],
    }),
  ];

  const p = buildProject(
    "spr-msme-ev-cooling",
    "Low-cost EV battery cooling system",
    "GreenDrive Motors",
    "msme",
    3,
    6,
    12,
    "Jun 06, 2026",
    "Dr Rao",
    48,
    taskDefs,
  );
  p.blockers = [
    { id: "b1", title: "Need material approval", detail: "Manifold alloy sign-off from GreenDrive procurement.", resolved: false },
    { id: "b2", title: "Waiting for MSME feedback", detail: "Pack PM reviewing sketch pack v2.", resolved: false },
    { id: "b3", title: "Testing delayed", detail: "Chamber calibration slip — lab rescheduled to Apr 21.", resolved: false },
  ];
  p.deliverables = [
    { id: "d1", name: "Interview Notes.pdf", type: "PDF" },
    { id: "d2", name: "CAD_v1.step", type: "CAD" },
    { id: "d3", name: "Costing.xlsx", type: "Sheet" },
    { id: "d4", name: "Test_Report.pdf", type: "PDF" },
  ];
  p.linkedChallengeId = "ch-5";
  return p;
}

export function createCohortHostelSprintProject(): SprintProject {
  const taskDefs: SprintTask[] = [
    emptyTask({
      id: "fw-t1",
      title: "Hostel kitchen audit",
      priority: "P1",
      dueDate: "Apr 05",
      owner: "Rahul S.",
      deliverable: "Audit log",
      column: "done",
      mandatory: true,
      objective: "Baseline waste streams across 3 hostel kitchens.",
      context: "VNIT + local partner hostels — weekend access.",
      checklist: [
        { id: "c1", label: "Photo evidence", done: true },
        { id: "c2", label: "Weight samples", done: true },
      ],
    }),
    emptyTask({
      id: "fw-t2",
      title: "Data schema for plate waste",
      priority: "P0",
      dueDate: "Apr 10",
      owner: "Rahul S.",
      deliverable: "Schema.md",
      column: "in_progress",
      mandatory: true,
      objective: "Define fields for prediction model training.",
      context: "Align with cohort data mentor.",
      checklist: [
        { id: "c1", label: "Field dictionary", done: true },
        { id: "c2", label: "PII review", done: false },
      ],
      mentorFeedback: mentorThread("Add meal-type encoding before labeling sprint."),
    }),
    emptyTask({
      id: "fw-t3",
      title: "Labeling sprint",
      priority: "P1",
      dueDate: "Apr 14",
      owner: "Rahul S.",
      deliverable: "Labels.csv",
      column: "backlog",
      mandatory: true,
      objective: "500 labeled trays for v0 model.",
      context: "Volunteer pool from institute clubs.",
      checklist: [{ id: "c1", label: "Guidelines doc", done: false }],
    }),
    emptyTask({
      id: "fw-t4",
      title: "Model v0 training",
      priority: "P0",
      dueDate: "Apr 20",
      owner: "Rahul S.",
      deliverable: "Notebook export",
      column: "backlog",
      mandatory: true,
      objective: "Baseline accuracy vs. kitchen manager estimates.",
      context: "Python + campus GPU slot.",
      checklist: [
        { id: "c1", label: "Train/val split", done: false },
        { id: "c2", label: "Metrics sheet", done: false },
      ],
    }),
  ];
  const p = buildProject(
    "spr-cohort-hostel",
    innovatorSprint.project,
    innovatorProfile.cohortStatus,
    "cohort",
    1,
    innovatorSprint.weekCurrent,
    innovatorSprint.weekTotal,
    innovatorSprint.deadlineLabel,
    "Dr Rao",
    innovatorSprint.progressPct,
    taskDefs,
  );
  p.blockers = [
    { id: "fb1", title: "Waiting for MSME feedback", detail: "Partner hostel warden sign-off on camera use.", resolved: false },
    { id: "fb2", title: "Testing delayed", detail: "GPU queue — shifted training to weekend.", resolved: true },
  ];
  p.deliverables = [{ id: "fd1", name: "Audit_Photos.zip", type: "Archive" }];
  return p;
}

export function createMarketplaceSprintFromAccepted(ctx: AcceptedSprintContext): SprintProject {
  const base = createEvCoolingSprintProject();
  const cloneTasks = structuredClone(base.tasks) as Record<string, SprintTask>;
  const cloneColumns = structuredClone(base.columns) as Record<SprintKanbanColumn, string[]>;
  const id = `spr-mkt-${ctx.challengeId}`;
  return {
    ...base,
    id,
    name: ctx.title,
    sponsor: ctx.company,
    sponsorType: "msme",
    tasks: cloneTasks,
    columns: cloneColumns,
    blockers: structuredClone(base.blockers),
    deliverables: structuredClone(base.deliverables),
    stageGatePending: false,
    archived: false,
    linkedChallengeId: ctx.challengeId,
  };
}

export function createInitialInnovatorSprintState(): InnovatorSprintStoreState {
  const cohort = createCohortHostelSprintProject();
  const ev = createEvCoolingSprintProject();
  return {
    version: 1,
    activeSprintId: cohort.id,
    projects: {
      [cohort.id]: cohort,
      [ev.id]: ev,
    },
  };
}

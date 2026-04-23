import {
  NAGPUR_NEXT_CYCLE_LABEL,
  NAGPUR_NEXT_EXECUTION_LANES,
  NAGPUR_NEXT_INNOVATOR_TEAM_ID,
  NAGPUR_NEXT_PHASES,
  NAGPUR_NEXT_PROGRAM_ID,
  NAGPUR_NEXT_TASK_ID_ORDER,
  getSprintOrderIndex,
  type NagpurProgramPhaseTemplate,
  type NagpurProgramSprintTemplate,
  type NagpurProgramTaskTemplate,
  type NagpurProgramResource,
  type NagpurProgramSme,
} from "@/data/nagpur-next-program-config";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import type {
  InnovatorEvidenceItem,
  InnovatorExecutionPhase,
  InnovatorSprint,
  InnovatorSprintTask,
  InnovatorTaskStatus,
} from "@/data/innovator-active-challenge";
import { mentorProfile } from "@/data/mentor-workspace";

// Constants moved here with defensive null-safety to prevent top-level module initialization crashes
const PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const M_MSME = (typeof innovatorActiveChallenge !== 'undefined' && innovatorActiveChallenge?.msme?.poc) ? innovatorActiveChallenge.msme.poc : "POC";
const M_COHORT = (typeof mentorProfile !== 'undefined' && mentorProfile?.shortName) ? mentorProfile.shortName : "Mentor";
const LS_KEY = "maharashtra-nagpur-next-cohort-v2";


export type NagpurCohortTaskStatus = InnovatorTaskStatus;

export type CohortActivityKind =
  | "submission"
  | "feedback"
  | "approval"
  | "sprint_unlock"
  | "delay";

export interface CohortActivityItem {
  id: string;
  kind: CohortActivityKind;
  label: string;
  detail: string;
  atLabel: string;
  teamId: string;
}

export interface CohortReviewItem {
  id: string;
  dateLabel: string;
  teamName: string;
  sprintLabel: string;
  mentor: string;
}

export interface NagpurTeamCard {
  id: string;
  teamName: string;
  studentLead: string;
  college: string;
  currentSprintLabel: string;
  currentPhaseTitle: string;
  riskReason?: string;
  atRisk: boolean;
  progressPct: number;
  domain: string;
}

export interface TaskRuntime {
  status: NagpurCohortTaskStatus;
  dueDate: string;
  mentor: string;
  mentorComments: string[];
  submitted: boolean;
  mentorReview?: "Approved" | "Pending Review";
  evidence: InnovatorEvidenceItem[];
  /** Mentor/admin hard lock */
  taskLocked: boolean;
  /** New: Mentor-assigned rubric scores */
  rubricScores?: Record<string, number>;
}

export interface NagpurCohortStoreState {
  version: 1;
  programId: typeof NAGPUR_NEXT_PROGRAM_ID;
  cycleLabel: string;
  /** Dynamic program structure */
  programFramework: NagpurProgramPhaseTemplate[];
  /** TRL / CRL / IRL — innovator UI reads same numbers */
  levels: { trl: number; crl: number; irl: number };
  taskState: Record<string, TaskRuntime>;
  activity: CohortActivityItem[];
  upcomingReviews: CohortReviewItem[];
  teamsMeta: Record<string, { atRisk: boolean; riskReason?: string }>;
  avgMentorResponseHours: number;
  demoReadinessPct: number;
  activeProjectId: string;
  /** New: Manual phase overrides by mentor */
  manualPhaseUnlocks: Record<string, boolean>;
}

type Listener = () => void;
const listeners = new Set<Listener>();
let memVersion = 0;

function defaultMentorForTask(taskIndex: number): string {
  return taskIndex % 2 === 0 ? M_MSME : M_COHORT;
}

function buildDefaultTaskState(framework: NagpurProgramPhaseTemplate[]): Record<string, TaskRuntime> {
  const map: Record<string, TaskRuntime> = {};
  let idx = 0;
  for (const ph of framework) {
    for (const sp of ph.sprints) {
      for (const t of sp.tasks) {
        map[t.id] = {
          status: "not_started",
          dueDate: "Jun 2026",
          mentor: defaultMentorForTask(idx),
          mentorComments: [],
          submitted: false,
          evidence: [],
          taskLocked: false,
        };
        idx += 1;
      }
    }
  }
  return map;
}

/** Demo seed aligned with Kiran / Navitas / Nagpur NEXT narrative */
function initialState(): NagpurCohortStoreState {
  const programFramework = JSON.parse(JSON.stringify(NAGPUR_NEXT_PHASES));
  const taskState = buildDefaultTaskState(programFramework);
  
  const state: NagpurCohortStoreState = {
    version: 2,
    programId: NAGPUR_NEXT_PROGRAM_ID,
    cycleLabel: NAGPUR_NEXT_CYCLE_LABEL,
    programFramework,
    levels: { ...innovatorActiveChallenge.levels },
    taskState,
    activity: [],
    upcomingReviews: [],
    teamsMeta: {
      [NAGPUR_NEXT_INNOVATOR_TEAM_ID]: { atRisk: false },
      "team-aurora": { atRisk: true, riskReason: "Vendor slip on LED reels — milestone at risk" },
      "team-agrisense": { atRisk: false },
    },
    avgMentorResponseHours: 6.5,
    demoReadinessPct: 61,
    activeProjectId: "project-drone",
    manualPhaseUnlocks: {},
  };

  const done = (taskId: string, date: string, mnter: string, file?: string, rubric?: Record<string, number>) => {
    state.taskState[taskId] = {
      ...state.taskState[taskId],
      status: "approved",
      dueDate: date,
      mentor: mnter,
      mentorComments: ["Approved based on review cycle."],
      submitted: true,
      mentorReview: "Approved",
      evidence: file ? [{ id: `f-${taskId}`, title: file, url: PDF, kind: "doc" }] : [],
      taskLocked: false,
      rubricScores: rubric,
    };
  };

  // Phase 1–2 + sprint 5 complete
  done("nn-t-s1-1", "12 Apr 2026", M_MSME, "Industry_Scan_Nagpur.pdf", { fidelity: 9, alignment: 8, docs: 10 });
  done("nn-t-s1-2", "14 Apr 2026", M_COHORT, "Competitor_Study_Lighting.pdf", { fidelity: 8, alignment: 7, docs: 9 });
  done("nn-t-s1-3", "16 Apr 2026", M_MSME, "User_Pain_SAR_Operators.pdf", { fidelity: 9, alignment: 9, docs: 8 });
  done("nn-t-s1-4", "18 Apr 2026", M_COHORT, "Problem_Frame_HMW.pdf", { fidelity: 10, alignment: 9, docs: 9 });
  done("nn-t-s2-1", "20 Apr 2026", M_MSME, "Stakeholder_Interviews.pdf", { fidelity: 9, alignment: 8, docs: 8 });
  done("nn-t-s2-2", "21 Apr 2026", M_MSME, "Field_Visit_Navitas.pdf", { fidelity: 8, alignment: 9, docs: 7 });
  done("nn-t-s2-3", "22 Apr 2026", M_COHORT, "Operator_Survey_Chart.pdf", { fidelity: 7, alignment: 8, docs: 9 });
  done("nn-t-s2-4", "24 Apr 2026", M_COHORT, "Insight_Synthesis_Memo.pdf", { fidelity: 9, alignment: 9, docs: 9 });
  done("nn-t-s3-1", "26 Apr 2026", M_COHORT, "Fishbone_Night_Coverage.pdf", { fidelity: 8, alignment: 7, docs: 8 });
  done("nn-t-s3-2", "27 Apr 2026", M_COHORT, "Five_Why_Pack.pdf", { fidelity: 9, alignment: 8, docs: 10 });
  done("nn-t-s3-3", "28 Apr 2026", M_MSME, "Opportunity_Areas_Map.pdf", { fidelity: 10, alignment: 9, docs: 8 });
  done("nn-t-s4-1", "30 Apr 2026", M_COHORT, "Idea_Generation_Board.pdf", { fidelity: 9, alignment: 9, docs: 9 });
  done("nn-t-s4-2", "2 May 2026", M_MSME, "Concept_Scoring_Sheet.pdf", { fidelity: 8, alignment: 8, docs: 8 });
  done("nn-t-s4-3", "4 May 2026", M_MSME, "Feasibility_Matrix.pdf", { fidelity: 9, alignment: 10, docs: 9 });

  // Currently Under Review (Sprint 5)
  state.taskState["nn-t-s5-1"] = {
    ...state.taskState["nn-t-s5-1"],
    status: "under_review",
    dueDate: "8 May 2026",
    mentor: M_MSME,
    submitted: true,
    mentorReview: "Pending Review",
    evidence: [{ id: "ev-s5-1", title: "BOM_Draft_Navitas.pdf", url: PDF, kind: "pdf" }],
    taskLocked: false,
  };
  
  state.taskState["nn-t-s5-2"] = {
    ...state.taskState["nn-t-s5-2"],
    status: "not_started",
    dueDate: "10 May 2026",
    mentor: M_COHORT,
    submitted: false,
    taskLocked: true, // Auto-locked because S5-1 is under review
  };

  // Sprint 6 — active
  state.taskState["nn-t-s6-1"] = {
    ...state.taskState["nn-t-s6-1"],
    status: "under_review",
    dueDate: "18 May 2026",
    mentor: M_MSME,
    submitted: true,
    mentorReview: "Pending Review",
    mentorComments: [
      "Strong bench evidence — add one more lux contour at 40 m AGL.",
      "Awaiting final pass for MVP gate.",
    ],
    evidence: [{ id: "nn-t-s6-1-ev", title: "Prototype_Evidence_Pack.pdf", url: PDF, kind: "pdf" }],
    taskLocked: false,
  };
  taskState["nn-t-s6-2"] = {
    ...taskState["nn-t-s6-2"],
    status: "in_progress",
    dueDate: "22 May 2026",
    mentor: M_COHORT,
    submitted: false,
    mentorComments: ["Log fail-safe cutover explicitly in next upload."],
    evidence: [{ id: "nn-t-s6-2-ev", title: "Testing_Log_Draft.pdf", url: PDF, kind: "pdf" }],
    taskLocked: false,
  };
  taskState["nn-t-s6-3"] = {
    ...taskState["nn-t-s6-3"],
    status: "not_started",
    dueDate: "28 May 2026",
    mentor: M_MSME,
    mentorComments: [],
    submitted: false,
    evidence: [],
    taskLocked: false,
  };

  const activity: CohortActivityItem[] = [
    {
      id: "act-1",
      kind: "submission",
      label: "Submission uploaded",
      detail: `${innovatorActiveChallenge.student.displayName} — Prototype evidence pack (Sprint 6)`,
      atLabel: "2h ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-2",
      kind: "feedback",
      label: "Mentor feedback added",
      detail: `${M_MSME} commented on Testing logs`,
      atLabel: "5h ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-3",
      kind: "approval",
      label: "Task approved",
      detail: "Resource plan signed off for MVP build",
      atLabel: "Yesterday",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-4",
      kind: "sprint_unlock",
      label: "Sprint unlocked",
      detail: "Sprint 6: MVP Build unlocked after planning gate",
      atLabel: "2d ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-5",
      kind: "delay",
      label: "Team delayed",
      detail: "Team Aurora — waiting on vendor LEDs (watchlist)",
      atLabel: "3d ago",
      teamId: "team-aurora",
    },
  ];

  const upcomingReviews: CohortReviewItem[] = [
    {
      id: "rev-1",
      dateLabel: innovatorActiveChallenge.project.nextReview,
      teamName: `${innovatorActiveChallenge.project.name} · ${innovatorActiveChallenge.student.displayName}`,
      sprintLabel: "Sprint 6: MVP Build",
      mentor: M_MSME,
    },
    {
      id: "rev-2",
      dateLabel: "25 May 2026",
      teamName: "Aurora Grid Labs",
      sprintLabel: "Sprint 5: Prototype Planning",
      mentor: M_COHORT,
    },
    {
      id: "rev-3",
      dateLabel: "29 May 2026",
      teamName: "Vidarbha AgriSense",
      sprintLabel: "Sprint 4: Ideation",
      mentor: M_MSME,
    },
  ];

  return {
    version: 2,
    programId: NAGPUR_NEXT_PROGRAM_ID,
    cycleLabel: NAGPUR_NEXT_CYCLE_LABEL,
    programFramework,
    levels: { ...innovatorActiveChallenge.levels },
    taskState,
    activity,
    upcomingReviews,
    teamsMeta: {
      [NAGPUR_NEXT_INNOVATOR_TEAM_ID]: { atRisk: false },
      "team-aurora": { atRisk: true, riskReason: "Vendor slip on LED reels — milestone at risk" },
      "team-agrisense": { atRisk: false },
    },
    avgMentorResponseHours: 6.5,
    demoReadinessPct: 61,
    activeProjectId: "project-drone",
    manualPhaseUnlocks: {},
  };
}

function loadOrCreate(): NagpurCohortStoreState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as NagpurCohortStoreState;
    if (!parsed || parsed.version !== 2 || !parsed.taskState || !parsed.manualPhaseUnlocks) {
      console.log("[NagpurCohortStore] State version mismatch or missing critical fields, resetting.");
      return initialState();
    }
    return parsed;
  } catch (err) {
    console.warn("[NagpurCohortStore] Failed to load state from LS, using initial:", err);
    return initialState();
  }
}

// Global safety state - lazy initialized
let state: NagpurCohortStoreState | null = null;

function ensureState(): NagpurCohortStoreState {
  if (!state) {
    try {
      state = loadOrCreate();
    } catch (e) {
      console.error("[NagpurCohortStore] CRITICAL CRASH in state initialization:", e);
      state = initialState();
    }
  }
  return state;
}

function persist() {
  const s = ensureState();
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function emit() {
  memVersion += 1;
  persist();
  listeners.forEach((l) => l());
}

export function subscribeNagpurNextCohortStore(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getNagpurNextCohortStoreVersion() {
  return memVersion;
}

export function getNagpurNextCohortState(): NagpurCohortStoreState {
  return ensureState();
}

export function resetNagpurNextCohortDemo() {
  state = initialState();
  emit();
}

function taskWeight(s: NagpurCohortTaskStatus): number {
  if (s === "completed" || s === "approved") return 1;
  if (s === "under_review" || s === "submitted") return 0.85;
  if (s === "in_progress" || s === "rework_needed") return 0.45;
  if (s === "not_started") return 0;
  if (s === "locked") return 0;
  return 0;
}

function isTerminal(s: NagpurCohortTaskStatus): boolean {
  return s === "completed" || s === "approved";
}

function sprintComplete(sprintId: string): boolean {
  const s = ensureState();
  const sprint = s.programFramework.flatMap((p) => p.sprints).find((s) => s.id === sprintId);
  if (!sprint) return false;
  return sprint.tasks.every((t) => {
    const st = s.taskState[t.id]?.status ?? "not_started";
    return isTerminal(st);
  });
}

function sprintGloballyLocked(sprintId: string): boolean {
  const s = ensureState();
  if (s?.manualPhaseUnlocks?.[sprintId]) return false;
  const ord = getSprintOrderIndex(sprintId);
  if (ord <= 0) return false;
  const flat = s?.programFramework?.flatMap((p) => p.sprints) || [];
  if (ord > flat.length) return false;
  const prev = flat[ord - 1];
  if (!prev) return false;
  return !sprintComplete(prev.id);
}

function mergeSprint(phase: NagpurProgramPhaseTemplate, sprint: NagpurProgramSprintTemplate): InnovatorSprint {
  const sequentialLock = sprintGloballyLocked(sprint.id);
  const locked = sequentialLock;

  return {
    id: sprint.id,
    name: sprint.name,
    locked,
    lockHint: sequentialLock ? "Complete the previous sprint gate to unlock." : "Locked by mentor.",
    defaultOpen: !locked && (sprint.id === "nn-s6" || sprint.id === "nn-s5"),
    evidenceNote: sprint.evidenceNote,
    tasks: sprint.tasks.map((t) => toInnovatorTask(phase, sprint, t.id)),
    resources: sprint.resources,
    smeData: sprint.smeData,
  };
}

function toInnovatorTask(
  phase: NagpurProgramPhaseTemplate,
  sprint: NagpurProgramSprintTemplate,
  taskId: string,
): InnovatorSprintTask {
  const tmpl = sprint.tasks.find((x) => x.id === taskId)!;
  const rt = state.taskState[taskId] ?? buildDefaultTaskState(state.programFramework)[taskId];
  const sequentialLock = sprintGloballyLocked(sprint.id);
  let status: InnovatorTaskStatus = rt.status;
  if (sequentialLock) status = "locked";
  else if (rt.taskLocked) status = "locked";

  const score =
    status === "completed" || status === "approved"
      ? "9.0 / 10"
      : status === "under_review"
        ? "In review"
        : status === "rework_needed"
          ? "Rework"
          : "—";

  return {
    id: tmpl.id,
    name: tmpl.name,
    subtitle: tmpl.subtitle,
    status,
    dueDate: rt.dueDate,
    mentor: rt.mentor,
    submitted: rt.submitted,
    mentorReview: rt.mentorReview,
    progressPct:
      status === "in_progress" ? 42 : status === "under_review" ? 88 : status === "submitted" ? 100 : undefined,
    toolLabel: "Open workspace",
    objective: tmpl.objective,
    mentorComments: rt.mentorComments,
    score,
    evidence: rt.evidence,
    resources: tmpl.resources,
    smeData: tmpl.smeData,
  };
}

export function getNagpurNextExecutionPhasesForInnovator(): InnovatorExecutionPhase[] {
  return state.programFramework.map((phase) => ({
    id: phase.id,
    index: phase.index,
    title: phase.title,
    defaultOpen: phase.id === "nn-p3",
    collapsedSprintLabels: [] as string[],
    sprints: phase.sprints.map((s) => mergeSprint(phase, s)),
  }));
}

export function getNagpurNextSprintHeaderSnapshot() {
  const pct = computeOverallProgressPct();
  return {
    userName: innovatorActiveChallenge.student.displayName,
    studentName: innovatorActiveChallenge.student.displayName,
    projectName: innovatorActiveChallenge.project.name,
    programName: innovatorActiveChallenge.cohort.name,
    assignedMsme: innovatorActiveChallenge.msme.company,
    stage: innovatorActiveChallenge.project.stageLabel,
    trl: state.levels.trl,
    crl: state.levels.crl,
    irl: state.levels.irl,
    currentPhase: "Phase 3: Prototype Development",
    currentSprint: "Sprint 6: MVP Build",
    progressPct: pct,
    nextMentorReview: innovatorActiveChallenge.project.nextReview,
    challengeStatus: innovatorActiveChallenge.project.status,
    domain: innovatorActiveChallenge.msme.domain,
  } as const;
}

/** Set active project ID for innovator context */
export function nagpurNextSetActiveProject(projectId: string) {
  const s = ensureState();
  s.activeProjectId = projectId;
  emit();
}

/** Get active project context from innovator challenge */
export function getNagpurNextActiveProject() {
  const s = ensureState();
  const pId = s.activeProjectId || "project-drone";
  return innovatorActiveChallenge.projects.find((p) => p.id === pId) || innovatorActiveChallenge.projects[0];
}

export function getNagpurNextProjectSnapshot() {
  const pct = computeOverallProgressPct();
  return {
    overallProgressPct: pct,
    nextReview: innovatorActiveChallenge.project.nextReview,
    weekCurrent: innovatorActiveChallenge.project.weekCurrent,
    weekTotal: innovatorActiveChallenge.project.weekTotal,
    demoDaysLeft: innovatorActiveChallenge.project.demoDaysLeft,
    stageLabel: innovatorActiveChallenge.project.stageLabel,
    currentPhaseTitle: "Phase 3: Prototype Development",
    currentSprintTitle: "Sprint 6: MVP Build",
  } as const;
}

function computeOverallProgressPct(): number {
  const s = ensureState();
  let sum = 0;
  const taskIds = s.programFramework.flatMap(p => p.sprints).flatMap(s => s.tasks).map(t => t.id);
  for (const id of taskIds) {
    const st = s.taskState[id]?.status ?? "not_started";
    sum += taskWeight(st);
  }
  if (taskIds.length === 0) return 0;
  return Math.min(100, Math.round((sum / taskIds.length) * 100));
}

export function getNagpurNextLaneProgress() {
  const s = ensureState();
  return NAGPUR_NEXT_EXECUTION_LANES.map((lane) => {
    const taskIds = s.programFramework.flatMap((p) =>
      p.sprints.filter((sp) => (lane.sprintIds as readonly string[]).includes(sp.id)).flatMap((sp) => sp.tasks.map((t) => t.id)),
    );
    const pct =
      taskIds.length === 0
        ? 0
        : Math.round(
            (taskIds.reduce((a, id) => a + taskWeight(s.taskState[id]?.status ?? "not_started"), 0) / taskIds.length) *
              100,
          );
    return { id: lane.id, label: lane.label, completionPct: Math.min(100, pct) };
  });
}

export function getNagpurNextCohortKpis() {
  const s = ensureState();
  const tasks = Object.values(s.taskState);
  const pendingReview = tasks.filter((t) => t.status === "under_review").length;
  const approved = tasks.filter((t) => t.mentorReview === "Approved" || t.status === "approved" || t.status === "completed").length;
  const totalInnovators = 24;
  const activeTeams = 18;
  const atRiskTeams = Object.values(s.teamsMeta).filter((m) => m.atRisk).length;
  const sprintCompletion = computeOverallProgressPct();

  return [
    { id: "ti", label: "Total innovators", value: String(totalInnovators) },
    { id: "at", label: "Active teams", value: String(activeTeams) },
    { id: "pr", label: "Tasks pending review", value: String(pendingReview) },
    { id: "sc", label: "Sprint completion", value: `${sprintCompletion}%` },
    { id: "rk", label: "At-risk teams", value: String(atRiskTeams) },
    { id: "ap", label: "Approved submissions", value: String(approved) },
    { id: "rt", label: "Avg mentor response", value: `${s.avgMentorResponseHours}h` },
    { id: "dr", label: "Demo readiness", value: `${s.demoReadinessPct}%` },
  ] as const;
}

export function getNagpurNextTeamsAttention(): NagpurTeamCard[] {
  const s = ensureState();
  return [
    {
      id: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
      teamName: innovatorActiveChallenge.project.name,
      studentLead: innovatorActiveChallenge.student.displayName,
      college: "VNIT Nagpur",
      currentSprintLabel: "Sprint 6: MVP Build",
      currentPhaseTitle: "Prototype Development",
      atRisk: s.teamsMeta[NAGPUR_NEXT_INNOVATOR_TEAM_ID]?.atRisk ?? false,
      riskReason: s.teamsMeta[NAGPUR_NEXT_INNOVATOR_TEAM_ID]?.riskReason,
      progressPct: computeOverallProgressPct(),
      domain: innovatorActiveChallenge.msme.domain,
    },
    {
      id: "team-aurora",
      teamName: "Aurora Grid Labs",
      studentLead: "Sana Sheikh",
      college: "IIM Nagpur",
      currentSprintLabel: "Sprint 5: Prototype Planning",
      currentPhaseTitle: "Prototype Development",
      atRisk: true,
      riskReason: s.teamsMeta["team-aurora"]?.riskReason,
      progressPct: 54,
      domain: "Energy",
    },
    {
      id: "team-agrisense",
      teamName: "Vidarbha AgriSense",
      studentLead: "Rohit Bhagat",
      college: "PIET Nagpur",
      currentSprintLabel: "Sprint 4: Ideation",
      currentPhaseTitle: "Validation & Concepting",
      atRisk: false,
      progressPct: 62,
      domain: "Agri-tech",
    },
  ];
}

export function getNagpurNextTeamAssets(teamId: string) {
  const s = ensureState();
  // Since this is a demo linked to local store, we just return all evidence across all tasks
  return Object.values(s.taskState)
    .flatMap((t) => t.evidence)
    .filter(Boolean);
}

export function getNagpurNextTeamDetail(teamId: string) {
  const ac = innovatorActiveChallenge;
  if (teamId !== NAGPUR_NEXT_INNOVATOR_TEAM_ID) {
    const card = getNagpurNextTeamsAttention().find((t) => t.id === teamId);
    return {
      teamId,
      student: card
        ? { name: card.studentLead, college: card.college, skills: [] as string[], matchScore: 0, attendancePct: 0, trend: "—" as const }
        : null,
      project: card
        ? {
            problemStatement: "—",
            msme: "—",
            trl: 0,
            crl: 0,
            irl: 0,
            phase: card.currentPhaseTitle,
            sprint: card.currentSprintLabel,
          }
        : null,
      tasksPreview: [] as { name: string; status: string }[],
    };
  }

  const s = ensureState();
  const taskIds = s.programFramework.flatMap(p => p.sprints).flatMap(s => s.tasks).map(t => t.id);
  const tasksPreview = taskIds.map((id) => {
    const tmpl = s.programFramework.flatMap((p) => p.sprints).flatMap((sp) => sp.tasks).find((t) => t.id === id)!;
    return { id, name: tmpl.name, status: s.taskState[id]?.status ?? "not_started" };
  });

  return {
    teamId,
    student: {
      name: ac.student.displayName,
      college: "VNIT Nagpur",
      skills: [...ac.skills],
      matchScore: 94,
      attendancePct: ac.cohortRank.attendancePct,
      trend: "Up" as const,
    },
    project: {
      problemStatement: ac.problemStatement,
      msme: ac.msme.company,
      trl: s.levels.trl,
      crl: s.levels.crl,
      irl: s.levels.irl,
      phase: "Phase 3: Prototype Development",
      sprint: "Sprint 6: MVP Build",
    },
    tasksPreview,
    feedback: ac.mentor.timeline.map((m) => ({ author: m.author, message: m.message })),
    files: ac.deliverableVault,
  };
}

function pushActivity(item: Omit<CohortActivityItem, "id">) {
  const s = ensureState();
  const id = `act-${Date.now()}`;
  state = { ...s, activity: [{ id, ...item }, ...s.activity].slice(0, 40) };
  emit();
}

export function nagpurNextUpdateTask(
  taskId: string,
  patch: Partial<TaskRuntime> & { status?: NagpurCohortTaskStatus },
) {
  const s = ensureState();
  const cur = s.taskState[taskId];
  if (!cur) return;
  const next: TaskRuntime = { ...cur, ...patch };
  if (patch.status === "approved" || patch.status === "completed") {
    next.mentorReview = "Approved";
    next.submitted = true;
  }
  if (patch.status === "rework_needed") {
    next.mentorReview = "Pending Review";
  }
  state = { ...s, taskState: { ...s.taskState, [taskId]: next } };
  emit();
}

export function nagpurNextMentorReviewAction(
  taskId: string,
  action: "approve" | "request_changes" | "comment",
  comment?: string,
  rubricScores?: Record<string, number>
) {
  const s = ensureState();
  const cur = s.taskState[taskId];
  if (!cur) return;
  if (action === "approve") {
    nagpurNextUpdateTask(taskId, {
      status: "completed",
      mentorReview: "Approved",
      mentorComments: [...cur.mentorComments, comment ?? "Approved for Nagpur NEXT gate."],
      rubricScores: rubricScores || cur.rubricScores,
    });
    pushActivity({
      kind: "approval",
      label: "Task approved",
      detail: `${taskId} marked approved`,
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  } else if (action === "request_changes") {
    nagpurNextUpdateTask(taskId, {
      status: "rework_needed",
      mentorReview: "Pending Review",
      mentorComments: [...cur.mentorComments, comment ?? "Changes requested — see comments."],
      rubricScores: rubricScores || cur.rubricScores,
    });
    pushActivity({
      kind: "feedback",
      label: "Changes requested",
      detail: comment ?? "Mentor requested updates",
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  } else if (action === "comment" && comment?.trim()) {
    nagpurNextUpdateTask(taskId, {
      mentorComments: [...cur.mentorComments, comment.trim()],
    });
    pushActivity({
      kind: "feedback",
      label: "Mentor comment",
      detail: comment.trim(),
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  }
}

export function nagpurNextSetPhaseUnlock(sprintId: string, unlocked: boolean) {
  const s = ensureState();
  state = {
    ...s,
    manualPhaseUnlocks: { ...s.manualPhaseUnlocks, [sprintId]: unlocked }
  };
  emit();
  pushActivity({
    kind: "sprint_unlock",
    label: unlocked ? "Sprint unlocked" : "Sprint locked",
    detail: `${sprintId} status updated by mentor`,
    atLabel: "Just now",
    teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
  });
}

export function nagpurNextToggleTaskLock(taskId: string) {
  const s = ensureState();
  const cur = s.taskState[taskId];
  if (!cur) return;
  nagpurNextUpdateTask(taskId, { taskLocked: !cur.taskLocked });
}

export function nagpurNextSetTaskDueDate(taskId: string, dueDate: string) {
  nagpurNextUpdateTask(taskId, { dueDate });
}

export function nagpurNextReassignMentor(taskId: string, mentor: string) {
  nagpurNextUpdateTask(taskId, { mentor });
}

export function nagpurNextSetTeamAtRisk(teamId: string, atRisk: boolean, riskReason?: string) {
  const s = ensureState();
  state = {
    ...s,
    teamsMeta: { ...s.teamsMeta, [teamId]: { atRisk, riskReason } },
  };
  emit();
}

export function nagpurNextSetLevels(levels: { trl: number; crl: number; irl: number }) {
  const s = ensureState();
  state = { ...s, levels: { ...levels } };
  emit();
}

/** Innovator-side: record upload (demo) — keeps activity feed aligned */
export function nagpurNextRecordInnovatorSubmission(taskId: string, fileName: string) {
  const s = ensureState();
  const cur = s.taskState[taskId];
  if (!cur) return;
  nagpurNextUpdateTask(taskId, {
    submitted: true,
    status: cur.status === "not_started" ? "submitted" : "under_review",
    evidence: [...cur.evidence, { id: `up-${Date.now()}`, title: fileName, url: PDF, kind: "pdf" }],
  });
  pushActivity({
    kind: "submission",
    label: "Submission uploaded",
    detail: `${innovatorActiveChallenge.student.displayName} — ${fileName}`,
    atLabel: "Just now",
    teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
  });
}

// PROGRAM MANAGEMENT ACTIONS

export function nagpurNextUpdateSprint(sprintId: string, patch: Partial<NagpurProgramSprintTemplate>) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => sp.id === sprintId ? { ...sp, ...patch } : sp)
    }))
  };
  emit();
}

export function nagpurNextAddSprintResource(sprintId: string, resource: Omit<NagpurProgramResource, "id">) {
  const s = ensureState();
  const id = `res-${Date.now()}`;
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => sp.id === sprintId ? { ...sp, resources: [...(sp.resources || []), { ...resource, id } as NagpurProgramResource] } : sp)
    }))
  };
  emit();
}

export function nagpurNextRemoveSprintResource(sprintId: string, resourceId: string) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => sp.id === sprintId ? { ...sp, resources: (sp.resources || []).filter(r => r.id !== resourceId) } : sp)
    }))
  };
  emit();
}

export function nagpurNextAddTaskTemplate(sprintId: string, task: Omit<NagpurProgramTaskTemplate, "id">) {
  const s = ensureState();
  const id = `task-new-${Date.now()}`;
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return { ...sp, tasks: [...sp.tasks, { ...task, id } as NagpurProgramTaskTemplate] };
      })
    })),
    taskState: {
      ...s.taskState,
      [id]: {
        status: "not_started",
        dueDate: "Jun 2026",
        mentor: M_MSME,
        mentorComments: [],
        submitted: false,
        evidence: [],
        taskLocked: false,
      }
    }
  };
  emit();
}

export function nagpurNextDeleteTaskTemplate(sprintId: string, taskId: string) {
  const s = ensureState();
  const newTaskState = { ...s.taskState };
  delete newTaskState[taskId];

  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return { ...sp, tasks: sp.tasks.filter(t => t.id !== taskId) };
      })
    })),
    taskState: newTaskState
  };
  emit();
}

export function nagpurNextUpdateTaskTemplate(sprintId: string, taskId: string, updates: Partial<NagpurProgramTaskTemplate>) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return {
          ...sp,
          tasks: sp.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
        };
      })
    }))
  };
  emit();
}

export function nagpurNextUpdateSmeSection(sprintId: string, smeData: NagpurProgramSme[]) {
  nagpurNextUpdateSprint(sprintId, { smeData });
}

export function nagpurNextAddTaskResource(sprintId: string, taskId: string, resource: NagpurProgramResource) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return {
          ...sp,
          tasks: sp.tasks.map(t => {
            if (t.id !== taskId) return t;
            return {
              ...t,
              resources: [...(t.resources || []), resource]
            };
          })
        };
      })
    }))
  };
  emit();
}

export function nagpurNextRemoveTaskResource(sprintId: string, taskId: string, resourceId: string) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return {
          ...sp,
          tasks: sp.tasks.map(t => {
            if (t.id !== taskId) return t;
            return {
              ...t,
              resources: (t.resources || []).filter(r => r.id !== resourceId)
            };
          })
        };
      })
    }))
  };
  emit();
}

export function nagpurNextUpdateTaskSmeSection(sprintId: string, taskId: string, smeData: NagpurProgramSme[]) {
  const s = ensureState();
  state = {
    ...s,
    programFramework: s.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(sp => {
        if (sp.id !== sprintId) return sp;
        return {
          ...sp,
          tasks: sp.tasks.map(t => t.id === taskId ? { ...t, smeData } : t)
        };
      })
    }))
  };
  emit();
}

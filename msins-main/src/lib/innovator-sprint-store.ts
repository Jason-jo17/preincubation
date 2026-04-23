import { getMarketplaceCatalog } from "@/data/innovator-marketplace-catalog";
import type { AcceptedSprintContext } from "@/data/innovator-marketplace-hub";
import {
  createCohortHostelSprintProject,
  createEvCoolingSprintProject,
  createInitialInnovatorSprintState,
  createMarketplaceSprintFromAccepted,
  SPRINT_STAGE_LABELS,
  type InnovatorSprintStoreState,
  type SprintKanbanColumn,
  type SprintProject,
  type SprintTask,
} from "@/data/innovator-sprint-seed";

const LS_KEY = "maharashtra-innovator-sprint-v1";

type Listener = () => void;
const listeners = new Set<Listener>();
let memVersion = 0;

let state: InnovatorSprintStoreState = loadOrCreate();

function loadOrCreate(): InnovatorSprintStoreState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return createInitialInnovatorSprintState();
    const parsed = JSON.parse(raw) as InnovatorSprintStoreState & { completedProjectIds?: string[] };
    if (parsed?.version !== 1 || !parsed.projects || !parsed.activeSprintId) {
      return createInitialInnovatorSprintState();
    }
    const { completedProjectIds: _legacy, ...rest } = parsed;
    return rest;
  } catch {
    return createInitialInnovatorSprintState();
  }
}

function persist() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function emit() {
  memVersion += 1;
  persist();
  listeners.forEach((l) => l());
}

export function subscribeInnovatorSprintStore(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getInnovatorSprintStoreVersion() {
  return memVersion;
}

export function getInnovatorSprintState(): InnovatorSprintStoreState {
  return state;
}

function recomputeProgress(project: SprintProject): number {
  const list = Object.values(project.tasks);
  if (list.length === 0) return 0;
  const done = list.filter((t) => t.column === "done").length;
  return Math.min(100, Math.round((done / list.length) * 100));
}

function removeTaskFromColumns(project: SprintProject, taskId: string) {
  for (const k of Object.keys(project.columns) as SprintKanbanColumn[]) {
    project.columns[k] = project.columns[k].filter((id) => id !== taskId);
  }
}

function addTaskToColumn(project: SprintProject, col: SprintKanbanColumn, taskId: string) {
  removeTaskFromColumns(project, taskId);
  project.columns[col] = [...project.columns[col], taskId];
  project.tasks[taskId] = { ...project.tasks[taskId], column: col };
}

function firstActiveSprintId(): string {
  const active = Object.values(state.projects).find((p) => !p.archived);
  return active?.id ?? "spr-cohort-hostel";
}

export function setActiveSprintProject(id: string) {
  const p = state.projects[id];
  if (!p || p.archived) return false;
  state = { ...state, activeSprintId: id };
  emit();
  return true;
}

export function ensureMarketplaceSprint(ctx: AcceptedSprintContext) {
  const id = `spr-mkt-${ctx.challengeId}`;
  if (state.projects[id] && !state.projects[id].archived) {
    state = { ...state, activeSprintId: id };
    emit();
    return id;
  }
  const proj = createMarketplaceSprintFromAccepted(ctx);
  state = {
    ...state,
    projects: { ...state.projects, [id]: proj },
    activeSprintId: id,
  };
  emit();
  return id;
}

export function ensureSprintForChallengeId(challengeId: string) {
  const hit = getMarketplaceCatalog().find((c) => c.challenge.id === challengeId);
  const ctx: AcceptedSprintContext = {
    challengeId,
    title: hit?.challenge.title ?? "MSME Challenge",
    company: hit?.challenge.company ?? "Partner MSME",
    acceptedAtLabel: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  };
  return ensureMarketplaceSprint(ctx);
}

export function ensureDefaultProjects() {
  const next = { ...state.projects };
  let changed = false;
  const cohort = createCohortHostelSprintProject();
  const ev = createEvCoolingSprintProject();
  if (!next[cohort.id] || next[cohort.id].archived) {
    next[cohort.id] = cohort;
    changed = true;
  }
  if (!next[ev.id] || next[ev.id].archived) {
    next[ev.id] = ev;
    changed = true;
  }
  if (changed) {
    state = { ...state, projects: next };
    emit();
  }
}

export function reconcileActiveSprintId() {
  const cur = state.projects[state.activeSprintId];
  if (cur && !cur.archived) return;
  const next = firstActiveSprintId();
  state = { ...state, activeSprintId: next };
  emit();
}

function writableProject(): SprintProject | undefined {
  const p = state.projects[state.activeSprintId];
  if (p && !p.archived) return p;
  return undefined;
}

export function moveTask(taskId: string, to: SprintKanbanColumn) {
  const p = writableProject();
  if (!p?.tasks[taskId]) return;
  addTaskToColumn(p, to, taskId);
  p.overallProgressPct = recomputeProgress(p);
  state = { ...state, projects: { ...state.projects, [p.id]: { ...p } } };
  emit();
}

export function updateTask(taskId: string, patch: Partial<SprintTask>) {
  const p = writableProject();
  if (!p?.tasks[taskId]) return;
  p.tasks[taskId] = { ...p.tasks[taskId], ...patch };
  p.overallProgressPct = recomputeProgress(p);
  state = { ...state, projects: { ...state.projects, [p.id]: { ...p } } };
  emit();
}

export function toggleTaskChecklistItem(taskId: string, itemId: string) {
  const p = writableProject();
  if (!p?.tasks[taskId]) return;
  const t = p.tasks[taskId];
  const checklist = t.checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c));
  p.tasks[taskId] = { ...t, checklist };
  state = { ...state, projects: { ...state.projects, [p.id]: { ...p } } };
  emit();
}

export function toggleBlockerResolved(blockerId: string) {
  const p = writableProject();
  if (!p) return;
  p.blockers = p.blockers.map((b) => (b.id === blockerId ? { ...b, resolved: !b.resolved } : b));
  state = { ...state, projects: { ...state.projects, [p.id]: { ...p } } };
  emit();
}

export function allMandatoryTasksDone(project: SprintProject): boolean {
  const mandatory = Object.values(project.tasks).filter((t) => t.mandatory);
  return mandatory.length > 0 && mandatory.every((t) => t.column === "done");
}

export function appendTaskComment(taskId: string, body: string) {
  const p = writableProject();
  if (!p?.tasks[taskId] || !body.trim()) return;
  const t = p.tasks[taskId];
  const comments = [
    ...t.comments,
    {
      id: `cm-${Date.now()}`,
      author: "You",
      body: body.trim(),
      at: new Date().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" }),
    },
  ];
  p.tasks[taskId] = { ...t, comments };
  state = { ...state, projects: { ...state.projects, [p.id]: { ...p } } };
  emit();
}

export function submitStageGate() {
  const p = writableProject();
  if (!p || !allMandatoryTasksDone(p)) return { ok: false as const, reason: "incomplete" as const };
  if (p.currentStageIndex >= 6) return { ok: false as const, reason: "final" as const };

  const nextIndex = p.currentStageIndex + 1;
  const stageLabel = SPRINT_STAGE_LABELS[nextIndex] ?? "Next";
  const handoverId = `handover-${Date.now()}`;
  const handover: SprintTask = {
    id: handoverId,
    title: `Readiness — ${stageLabel}`,
    priority: "P1",
    dueDate: "TBD",
    owner: "Rahul S.",
    deliverable: "Stage handover note",
    column: "backlog",
    mandatory: true,
    objective: "Confirm entry criteria and mentor sign-off for the next stage.",
    context: "Maharashtra pre-incubation playbook — attach links in notes.",
    notesDraft: "",
    checklist: [
      { id: "h1", label: "Mentor sync scheduled", done: false },
      { id: "h2", label: "MSME visibility check", done: false },
    ],
    comments: [],
    mentorFeedback: [],
  };
  const next: SprintProject = {
    ...p,
    currentStageIndex: nextIndex,
    stageGatePending: false,
    weekCurrent: Math.min(p.weekTotal, p.weekCurrent + 1),
    tasks: { ...p.tasks, [handoverId]: handover },
    columns: {
      ...p.columns,
      backlog: [...p.columns.backlog, handoverId],
    },
  };
  next.overallProgressPct = recomputeProgress(next);
  state = { ...state, projects: { ...state.projects, [p.id]: next } };
  emit();
  return { ok: true as const, stage: nextIndex };
}

export function submitFinalCloseout() {
  const p = writableProject();
  if (!p || p.currentStageIndex !== 6 || !allMandatoryTasksDone(p)) return { ok: false as const };

  const archived = { ...p, archived: true as const };
  const nextProjects = { ...state.projects, [p.id]: archived };
  const nextActive = Object.values(nextProjects).find((x) => !x.archived && x.id !== p.id)?.id ?? firstActiveSprintId();

  state = {
    ...state,
    projects: nextProjects,
    activeSprintId: nextActive,
  };
  ensureDefaultProjects();
  emit();
  return { ok: true as const };
}

export function resetInnovatorSprintDemo() {
  state = createInitialInnovatorSprintState();
  emit();
}

export function refreshInnovatorSprintFromStorage() {
  state = loadOrCreate();
  emit();
}

/**
 * Innovator dashboard — static copy from `innovatorActiveChallenge`;
 * phase/sprint/task rows sync from `nagpur-next-cohort-store` (same as Cohort Mentor UI).
 */

import { innovatorActiveChallenge, type InnovatorTaskStatus } from "@/data/innovator-active-challenge";
import {
  getNagpurNextExecutionPhasesForInnovator,
  getNagpurNextProjectSnapshot,
  getNagpurNextSprintHeaderSnapshot,
} from "@/lib/nagpur-next-cohort-store";

const ac = innovatorActiveChallenge;

export type InnovatorDashboardHero = {
  initials: string;
  name: string;
  roleLine: string;
  currentProject: string;
  badges: readonly { label: string; value: number }[];
  currentPhase: string;
  currentSprint: string;
  skills: readonly string[];
  linkedChallengeId: string;
  assignedMsme: string;
  domain: string;
  challengeStatus: string;
  overallProgressPct: number;
  nextReview: string;
};

export function buildInnovatorDashboardHero(): InnovatorDashboardHero {
  const head = getNagpurNextSprintHeaderSnapshot();
  const snap = getNagpurNextProjectSnapshot();
  return {
    initials: ac.student.initials,
    name: ac.student.displayName,
    roleLine: `${ac.student.role} · ${ac.cohort.name}`,
    currentProject: ac.project.name,
    badges: [
      { label: "TRL", value: head.trl },
      { label: "CRL", value: head.crl },
      { label: "IRL", value: head.irl },
    ] as const,
    currentPhase: snap.currentPhaseTitle,
    currentSprint: snap.currentSprintTitle,
    skills: ac.skills,
    linkedChallengeId: ac.ids.innovatorProblemId,
    assignedMsme: ac.msme.company,
    domain: ac.msme.domain,
    challengeStatus: ac.project.status,
    overallProgressPct: snap.overallProgressPct,
    nextReview: snap.nextReview,
  };
}

/** @deprecated Prefer `buildInnovatorDashboardHero()` — static TRL/progress drifted from cohort store. */
export const innovatorDashboardHero = buildInnovatorDashboardHero();

/** Top summary row — four cards (single source: `ac.dashboard.summaryKpis`). */
export const innovatorDashboardKpis = ac.dashboard.summaryKpis;

export const innovatorDashboardQuickWidgets = ac.dashboard.quickWidgets;

export type InnovatorProgramCard = {
  programName: string;
  weekCurrent: number;
  weekTotal: number;
  assignedChallengeTitle: string;
  mentorName: string;
  demoDaysLeft: number;
  challengeStatus: string;
  overallProgressPct: number;
  nextReview: string;
  assignedMsme: string;
};

export function buildInnovatorProgramCard(): InnovatorProgramCard {
  const snap = getNagpurNextProjectSnapshot();
  return {
    programName: ac.cohort.programTitle,
    weekCurrent: snap.weekCurrent,
    weekTotal: snap.weekTotal,
    assignedChallengeTitle: `${ac.msme.company} — ${ac.project.name}`,
    mentorName: ac.mentor.primaryName,
    demoDaysLeft: snap.demoDaysLeft,
    challengeStatus: ac.project.status,
    overallProgressPct: snap.overallProgressPct,
    nextReview: snap.nextReview,
    assignedMsme: ac.msme.company,
  };
}

/** @deprecated Prefer `buildInnovatorProgramCard()`. */
export const innovatorProgramCard = buildInnovatorProgramCard();

export type ExecutionTaskStatus =
  | "Completed"
  | "Approved"
  | "Pending Review"
  | "Under Review"
  | "Submitted"
  | "Rework Needed"
  | "In Progress"
  | "Not Started"
  | "Locked";

export interface ExecutionTaskRow {
  id: string;
  name: string;
  status: ExecutionTaskStatus;
  mentor: string;
  dueDate: string;
  toolLabel: string;
}

export interface ExecutionPhase {
  id: string;
  title: string;
  sprintLabel: string;
  tasks: ExecutionTaskRow[];
  lockedUntilGate: boolean;
}

function mapTaskStatus(s: InnovatorTaskStatus): ExecutionTaskStatus {
  if (s === "completed") return "Completed";
  if (s === "approved") return "Approved";
  if (s === "under_review") return "Under Review";
  if (s === "submitted") return "Submitted";
  if (s === "rework_needed") return "Rework Needed";
  if (s === "in_progress") return "In Progress";
  if (s === "not_started") return "Not Started";
  return "Locked";
}

export function getInnovatorExecutionPhasesLive(): ExecutionPhase[] {
  return getNagpurNextExecutionPhasesForInnovator().map((phase) => ({
    id: phase.id,
    title: phase.title,
    sprintLabel: phase.sprints.map((s) => s.name).join(" · ") || "—",
    lockedUntilGate: false,
    tasks: phase.sprints.flatMap((s) =>
      s.tasks.map((t) => ({
        id: t.id,
        name: t.name,
        status: mapTaskStatus(t.status),
        mentor: t.mentor,
        dueDate: t.dueDate,
        toolLabel: t.toolLabel,
      })),
    ),
  }));
}

/** @deprecated Prefer `getInnovatorExecutionPhasesLive()`. */
export const innovatorExecutionPhases: ExecutionPhase[] = getInnovatorExecutionPhasesLive();

export const innovatorMentorFeedbackCards = [
  {
    id: "mf1",
    tone: "success" as const,
    title: "Approved — Sprint 3 package",
    detail: "Concept and AI lighting logic aligned with Navitas field constraints.",
  },
  {
    id: "mf2",
    tone: "warning" as const,
    title: "Pending — Sprint 2 gate",
    detail: ac.dashboard.quickWidgets.latestMentorComment,
  },
  {
    id: "mf3",
    tone: "primary" as const,
    title: "Next review",
    detail: `Book session before ${ac.project.nextReview} to close open review items.`,
  },
  {
    id: "mf4",
    tone: "muted" as const,
    title: "Cohort velocity",
    detail: "Your team is ahead of median on deliverable throughput for Nagpur NEXT.",
  },
];

export const innovatorCareerReadiness = {
  portfolioScore: 86,
  techMatchPct: 82,
  communicationPct: 79,
  leadershipPct: 84,
  innovationIndexPct: 88,
} as const;

export const innovatorDashboardOpportunities = [
  {
    id: "op1",
    title: "MSME Challenge Match",
    detail: `${ac.project.name} · ${ac.msme.company}`,
    action: "View match" as const,
  },
  { id: "op2", title: "Internship Opportunity", detail: "GreenDrive Motors · EV lab", action: "Apply" as const },
  { id: "op3", title: "Startup Hiring", detail: "AgriTech · Nashik cluster", action: "Learn more" as const },
  { id: "op4", title: "Grant Open", detail: "Startup Maharashtra · Micro-grant window", action: "Open" as const },
  { id: "op5", title: "Mentor Session", detail: `${ac.mentor.primaryName} · Office hours`, action: "Book" as const },
];

export const innovatorTeamPanel = {
  name: "Team SkyLux",
  members: ac.dashboard.quickWidgets.teamMembers.length,
  contributionPct: 32,
  lastActivity: "1 hr ago",
  health: "Good" as const,
  membersDetail: ac.dashboard.quickWidgets.teamMembers,
};

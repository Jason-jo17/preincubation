/**
 * Cohort Manager role workspace — Maharashtra innovation programs (demo).
 * Team names align with MSME applicants / kanban where noted.
 */

export type CohortHealthStatus = "on_track" | "at_risk" | "delayed";

export interface CohortHealthCard {
  id: string;
  name: string;
  windowLabel: string;
  phase: string;
  progressPct: number;
  teams: number;
  solved: number;
  msmes: number;
  lead: string;
  reviewLabel: string;
  budgetUsedLakh: number;
  budgetCapLakh: number;
  status: CohortHealthStatus;
  note?: string;
}

export interface CohortRiskAlert {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium";
}

export interface CohortFrameworkRow {
  id: string;
  name: string;
  completionPct: number;
  prototypeRatePct: number;
  deploymentPct: number;
  satisfactionPct: number;
}

export interface CohortTeamProgressRow {
  id: string;
  team: string;
  cohort: string;
  sprint: string;
  tasksDone: number;
  tasksPending: number;
  mentorScore: number;
  risk: "Low" | "Medium" | "High";
}

export interface CohortReviewQueueItem {
  id: string;
  label: string;
  count: number;
}

export interface CohortCalendarItem {
  id: string;
  title: string;
  when: string;
  region: string;
}

export const cohortManagerKpis = [
  { id: "active", label: "Active Cohorts", value: "6", href: "/cohort/dashboard#health-board" },
  { id: "teams", label: "Total Teams", value: "26", href: "/cohort/dashboard#team-monitor" },
  { id: "ontrack", label: "On Track", value: "3", href: "/cohort/dashboard#health-board" },
  { id: "risk", label: "At Risk", value: "2", href: "/cohort/dashboard#risk-alerts" },
  { id: "delayed", label: "Delayed", value: "1", href: "/cohort/dashboard#health-board" },
  { id: "completion", label: "Completion Rate", value: "72%", href: "/cohorts" },
  { id: "mentors", label: "Mentor Coverage", value: "88%", href: "/cohort/dashboard#mentor-util" },
  { id: "programs", label: "Programs Running", value: "4", href: "/cohorts" },
] as const;

export const cohortHealthBoard: CohortHealthCard[] = [
  {
    id: "ch-pune-pioneer",
    name: "Pune Pioneer",
    windowLabel: "Jan–Apr 2026",
    phase: "Validation",
    progressPct: 85,
    teams: 7,
    solved: 6,
    msmes: 8,
    lead: "Prashant Bhosale",
    reviewLabel: "Apr 15",
    budgetUsedLakh: 3.9,
    budgetCapLakh: 4.8,
    status: "on_track",
  },
  {
    id: "ch-mumbai-metro",
    name: "Mumbai Metro",
    windowLabel: "Feb–May 2026",
    phase: "Prototype",
    progressPct: 72,
    teams: 5,
    solved: 4,
    msmes: 6,
    lead: "Neha Kulkarni",
    reviewLabel: "Apr 18",
    budgetUsedLakh: 6.2,
    budgetCapLakh: 8.0,
    status: "on_track",
    note: "Leadership changed mid sprint",
  },
  {
    id: "ch-nagpur-central",
    name: "Nagpur Central",
    windowLabel: "Jan–Mar 2026",
    phase: "Pilot",
    progressPct: 45,
    teams: 4,
    solved: 2,
    msmes: 5,
    lead: "Amit Deshmukh",
    reviewLabel: "Apr 12",
    budgetUsedLakh: 2.1,
    budgetCapLakh: 5.5,
    status: "at_risk",
    note: "1 team dropout risk",
  },
  {
    id: "ch-nashik-growth",
    name: "Nashik Growth",
    windowLabel: "Dec 2025–Mar 2026",
    phase: "Closeout",
    progressPct: 20,
    teams: 6,
    solved: 3,
    msmes: 7,
    lead: "Sunita Patil",
    reviewLabel: "Apr 08",
    budgetUsedLakh: 4.4,
    budgetCapLakh: 5.0,
    status: "delayed",
    note: "Mentor shortage",
  },
  {
    id: "ch-kolhapur-industrial",
    name: "Kolhapur Industrial",
    windowLabel: "Jan–Apr 2026",
    phase: "Validation",
    progressPct: 55,
    teams: 5,
    solved: 3,
    msmes: 4,
    lead: "Rohit Jadhav",
    reviewLabel: "Apr 20",
    budgetUsedLakh: 2.8,
    budgetCapLakh: 6.0,
    status: "at_risk",
  },
  {
    id: "ch-aurangabad-heritage",
    name: "Aurangabad Heritage",
    windowLabel: "Mar–Jun 2026",
    phase: "Discover",
    progressPct: 10,
    teams: 3,
    solved: 0,
    msmes: 2,
    lead: "Farhan Shaikh",
    reviewLabel: "May 02",
    budgetUsedLakh: 0.4,
    budgetCapLakh: 3.2,
    status: "on_track",
  },
];

export const cohortRiskAlerts: CohortRiskAlert[] = [
  {
    id: "r1",
    title: "2 teams missed deadline",
    detail: "Mumbai Metro — packaging sprint and Nashik Growth — field pilot report.",
    severity: "high",
  },
  {
    id: "r2",
    title: "Mentor shortage in Nashik",
    detail: "Only 2 mentors available for 6 teams until Apr 22.",
    severity: "medium",
  },
  {
    id: "r3",
    title: "Nagpur dropout risk",
    detail: "Team linked to Vidarbha Industrial Systems challenge paused submissions.",
    severity: "high",
  },
  {
    id: "r4",
    title: "Mumbai team lead changed",
    detail: "Handover checklist in progress; sprint velocity dipped 12%.",
    severity: "medium",
  },
];

export const cohortFrameworkPerformance: CohortFrameworkRow[] = [
  { id: "fw-pre8", name: "Pre-Incubation 8 Week", completionPct: 74, prototypeRatePct: 62, deploymentPct: 28, satisfactionPct: 86 },
  { id: "fw-inc12", name: "Incubation 12 Week", completionPct: 68, prototypeRatePct: 71, deploymentPct: 41, satisfactionPct: 88 },
  { id: "fw-msme", name: "MSME Sprint", completionPct: 72, prototypeRatePct: 55, deploymentPct: 48, satisfactionPct: 81 },
  { id: "fw-proto", name: "Prototype Accelerator", completionPct: 61, prototypeRatePct: 84, deploymentPct: 33, satisfactionPct: 90 },
];

export const cohortTeamProgress: CohortTeamProgressRow[] = [
  {
    id: "tp-1",
    team: "AgriBot Labs",
    cohort: "Nashik Growth",
    sprint: "Smart Irrigation Device",
    tasksDone: 18,
    tasksPending: 6,
    mentorScore: 4.6,
    risk: "High",
  },
  {
    id: "tp-2",
    team: "Vision Textile AI",
    cohort: "Kolhapur Industrial",
    sprint: "Fabric Defect Detection",
    tasksDone: 12,
    tasksPending: 9,
    mentorScore: 4.2,
    risk: "Medium",
  },
  {
    id: "tp-3",
    team: "Team Nova",
    cohort: "Nagpur Central",
    sprint: "Energy Monitoring System",
    tasksDone: 22,
    tasksPending: 4,
    mentorScore: 4.8,
    risk: "Low",
  },
  {
    id: "tp-4",
    team: "VNIT Nagpur · Rahul Sharma",
    cohort: "Pune Pioneer",
    sprint: "Low-cost EV battery cooling system",
    tasksDone: 14,
    tasksPending: 8,
    mentorScore: 4.5,
    risk: "Low",
  },
  {
    id: "tp-5",
    team: "COEP Solver Team",
    cohort: "Pune Pioneer",
    sprint: "Reduce Packaging Waste",
    tasksDone: 16,
    tasksPending: 5,
    mentorScore: 4.7,
    risk: "Low",
  },
  {
    id: "tp-6",
    team: "PDKV AgriSense Unit",
    cohort: "Nashik Growth",
    sprint: "Soil analytics pilot",
    tasksDone: 9,
    tasksPending: 11,
    mentorScore: 3.9,
    risk: "High",
  },
  {
    id: "tp-7",
    team: "AIC BAMU Mechatronics Cell",
    cohort: "Aurangabad Heritage",
    sprint: "Line balancing study",
    tasksDone: 4,
    tasksPending: 14,
    mentorScore: 4.1,
    risk: "Medium",
  },
];

export const cohortMentorUtilization = {
  total: 18,
  active: 14,
  overloaded: 3,
  freeCapacityTeams: 4,
  unassignedTeams: 2,
};

export const cohortReviewQueue: CohortReviewQueueItem[] = [
  { id: "rq-gates", label: "Stage Gates", count: 6 },
  { id: "rq-proto", label: "Prototype Reviews", count: 3 },
  { id: "rq-pitch", label: "Final Pitches", count: 2 },
  { id: "rq-complete", label: "Completion Requests", count: 4 },
];

export const cohortOutcomesSnapshot = {
  prototypesBuilt: 31,
  startupsFormed: 8,
  msmesSolved: 14,
  fundsUsedLakh: 28,
  jobsCreated: 67,
  revenueImpactCr: 1.8,
};

export const cohortCalendar: CohortCalendarItem[] = [
  { id: "cal-1", title: "Demo Day Pune", when: "Apr 24 · 4 PM", region: "Pune" },
  { id: "cal-2", title: "Mid Review Mumbai", when: "Apr 19 · 11 AM", region: "Mumbai" },
  { id: "cal-3", title: "Sprint Deadline Nagpur", when: "Apr 16 · EOD", region: "Nagpur" },
  { id: "cal-4", title: "Mentor Workshop Nashik", when: "Apr 21 · 9 AM", region: "Nashik" },
];

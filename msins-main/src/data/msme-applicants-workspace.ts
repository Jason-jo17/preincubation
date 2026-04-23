/**
 * MSME Applicants & Teams workspace — selection, execution progress, and pipeline.
 */

export type ApplicantsWorkspaceTab =
  | "all_applicants"
  | "shortlisted"
  | "active_teams"
  | "completed"
  | "blocked";

export const APPLICANTS_WORKSPACE_TABS: { value: ApplicantsWorkspaceTab; label: string }[] = [
  { value: "all_applicants", label: "All Applicants" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "active_teams", label: "Active Teams" },
  { value: "completed", label: "Completed" },
  { value: "blocked", label: "Blocked" },
];

export type ApplicantPipelineStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Selected";

export interface MsmeApplicantRow {
  id: string;
  teamName: string;
  source: string;
  matchScore: number;
  skills: string;
  status: ApplicantPipelineStatus;
}

export type KanbanColumnId = "research" | "building" | "testing" | "submitted" | "approved";

export interface MsmeKanbanCard {
  id: string;
  teamName: string;
  challengeTitle: string;
  company: string;
  progress: number;
  column: KanbanColumnId;
}

export interface MsmeActiveTeamRow {
  id: string;
  teamName: string;
  challenge: string;
  company: string;
  progress: number;
  stage: string;
  lastUpdate: string;
  mentor: "Assigned" | "Unassigned";
  blocker: string | null;
}

export interface MsmeBlockerItem {
  id: string;
  title: string;
  detail: string;
}

export interface MsmeScoreboardRow {
  id: string;
  team: string;
  challenge: string;
  delivery: string;
  impact: string;
  score: string;
}

export const msmeApplicantsKpis = [
  { id: "total", label: "Total Applicants", value: "31", trend: { value: "6%", positive: true as const }, icon: "users" as const },
  { id: "shortlist", label: "Shortlisted", value: "9", trend: { value: "2", positive: true as const }, icon: "list" as const },
  { id: "active", label: "Active Teams", value: "7", trend: { value: "1", positive: true as const }, icon: "zap" as const },
  { id: "done", label: "Completed", value: "12", trend: { value: "8%", positive: true as const }, icon: "check" as const },
  { id: "pending", label: "Pending Reviews", value: "3", trend: { value: "−1", positive: true as const }, icon: "clock" as const },
  { id: "blocked", label: "Blocked Teams", value: "2", trend: { value: "1", positive: false as const }, icon: "alert" as const },
];

export const packagingChallengeApplicants: MsmeApplicantRow[] = [
  {
    id: "app-1",
    teamName: "COEP Solver Team",
    source: "COEP Bhau Institute",
    matchScore: 92,
    skills: "Mechanical, CAD, Lean",
    status: "New",
  },
  {
    id: "app-2",
    teamName: "EcoPack Innovators",
    source: "Venture Centre Pune",
    matchScore: 89,
    skills: "Sustainable Materials",
    status: "Reviewed",
  },
  {
    id: "app-3",
    teamName: "SmartFab Systems",
    source: "KIT Innovation Foundation",
    matchScore: 84,
    skills: "Manufacturing Automation",
    status: "Shortlisted",
  },
];

export const activeTeamsDetailed: MsmeActiveTeamRow[] = [
  {
    id: "tm-1",
    teamName: "AgriBot Labs",
    challenge: "Smart Irrigation Device",
    company: "Sahyadri Agro Processing Pvt Ltd",
    progress: 68,
    stage: "Prototype",
    lastUpdate: "2 days ago",
    mentor: "Assigned",
    blocker: null,
  },
  {
    id: "tm-2",
    teamName: "Vision Textile AI",
    challenge: "Fabric Defect Detection",
    company: "Marathwada Textiles Pvt Ltd",
    progress: 42,
    stage: "Testing",
    lastUpdate: "5 hours ago",
    mentor: "Assigned",
    blocker: "Awaiting sample images",
  },
  {
    id: "tm-3",
    teamName: "Team Nova",
    challenge: "Energy Monitoring System",
    company: "Vidarbha Industrial Systems",
    progress: 82,
    stage: "Final Validation",
    lastUpdate: "1 day ago",
    mentor: "Assigned",
    blocker: null,
  },
];

export const kanbanColumns: { id: KanbanColumnId; label: string }[] = [
  { id: "research", label: "Research" },
  { id: "building", label: "Building" },
  { id: "testing", label: "Testing" },
  { id: "submitted", label: "Submitted" },
  { id: "approved", label: "Approved" },
];

export const kanbanTeamCards: MsmeKanbanCard[] = [
  {
    id: "k1",
    teamName: "PDKV AgriSense Unit",
    challenge: "Soil analytics pilot",
    company: "Sahyadri Agro Processing Pvt Ltd",
    progress: 22,
    column: "research",
  },
  {
    id: "k2",
    teamName: "AgriBot Labs",
    challenge: "Smart Irrigation Device",
    company: "Sahyadri Agro Processing Pvt Ltd",
    progress: 68,
    column: "building",
  },
  {
    id: "k3",
    teamName: "Vision Textile AI",
    challenge: "Fabric Defect Detection",
    company: "Marathwada Textiles Pvt Ltd",
    progress: 42,
    column: "testing",
  },
  {
    id: "k4",
    teamName: "Team Nova",
    challenge: "Energy Monitoring System",
    company: "Vidarbha Industrial Systems",
    progress: 82,
    column: "submitted",
  },
  {
    id: "k5",
    teamName: "AIC BAMU Mechatronics Cell",
    challenge: "Line balancing study",
    company: "Precision Auto Components Pvt Ltd",
    progress: 55,
    column: "building",
  },
];

export const blockerEscalations: MsmeBlockerItem[] = [
  { id: "bl-1", title: "Waiting for factory data", detail: "Nagpur utilities — feeder logs for Team Nova" },
  { id: "bl-2", title: "Budget approval pending", detail: "Marathwada Textiles — Vision Textile AI camera rig" },
  { id: "bl-3", title: "Mentor feedback overdue", detail: "Venture Centre mentor — EcoPack packaging sprint" },
];

export const completedTeamsScoreboard: MsmeScoreboardRow[] = [
  { id: "sc-1", team: "COEP Solver Team", challenge: "Packaging Waste", delivery: "On Time", impact: "High Quality", score: "4.8" },
  { id: "sc-2", team: "AgriBot Labs", challenge: "Irrigation", delivery: "On Time", impact: "Strong Impact", score: "4.7" },
  { id: "sc-3", team: "SPPU Research Park Unit", challenge: "EV charging layout", delivery: "On Time", impact: "High Quality", score: "4.6" },
  { id: "sc-4", team: "Venture Centre Materials Lab", challenge: "Cold chain sensor", delivery: "Slight Delay", impact: "Strong Impact", score: "4.4" },
];

export const applicantsWorkspaceDataset = {
  kpis: msmeApplicantsKpis,
  applicants: packagingChallengeApplicants,
  activeTeams: activeTeamsDetailed,
  kanban: kanbanTeamCards,
  blockers: blockerEscalations,
  scoreboard: completedTeamsScoreboard,
} as const;

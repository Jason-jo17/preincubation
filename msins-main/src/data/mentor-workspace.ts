/**
 * Mentor role workspace — Dr Rao demo persona, aligned with innovator / MSME / cohort modules.
 */

export type MentorType = "Domain Mentor" | "Subject Mentor" | "Cohort Mentor" | "Startup Mentor";

export const mentorProfile = {
  displayName: "Dr. Rao",
  /** Shown in welcome line */
  shortName: "Dr. Rao",
  badges: ["Cohort Mentor", "Domain Mentor", "Startup Mentor"] as MentorType[],
};

export const mentorDashboardKpis = [
  { id: "teams", label: "Active Teams", value: "8", href: "/mentor/teams" },
  { id: "sessions", label: "Sessions This Week", value: "6", href: "/mentor/sessions" },
  { id: "reviews", label: "Pending Reviews", value: "4", href: "/mentor/teams?tab=reviews" },
  { id: "rating", label: "Avg Rating", value: "4.8/5", href: "/mentor/dashboard" },
  { id: "hours", label: "Hours Mentored", value: "18", href: "/mentor/sessions" },
  { id: "success", label: "Success Score", value: "92", href: "/mentor/dashboard" },
] as const;

export const mentorAgendaToday = [
  {
    id: "ag-1",
    time: "10:00 AM",
    title: "Team Alpha Sprint Review",
    detail: "Linked to VNIT Nagpur · EV cooling sprint",
  },
  {
    id: "ag-2",
    time: "12:30 PM",
    title: "EV Team Guidance",
    detail: "GreenDrive Motors challenge — CAD thermal loop",
  },
  {
    id: "ag-3",
    time: "4:00 PM",
    title: "Pitch Feedback",
    detail: "Mumbai Metro cohort — deck v2",
  },
];

export const mentorPriorityTeams = [
  {
    id: "pt-1",
    label: "Vision Textile AI stuck in prototype",
    detail: "Marathwada Textiles — awaiting sample images (MSME applicants workspace).",
    mentorTeamRowId: "mt-2",
  },
  {
    id: "pt-2",
    label: "PDKV AgriSense Unit missed gate",
    detail: "Nashik Growth cohort — soil analytics pilot behind schedule.",
    mentorTeamRowId: "mt-6",
  },
  {
    id: "pt-3",
    label: "Team Nova low activity",
    detail: "Nagpur Central — energy monitoring sprint; last log 5 days ago.",
    mentorTeamRowId: "mt-5",
  },
  {
    id: "pt-4",
    label: "MSME packaging challenge needs signoff",
    detail: "Precision Auto Components — reviewer comments pending publish.",
    mentorTeamRowId: "mt-4",
  },
];

export const mentorRecentActions = [
  { id: "ra-1", label: "3 comments submitted", detail: "Across sprint tasks and review queue" },
  { id: "ra-2", label: "2 tasks approved", detail: "CAD Model V1 + Field audit checklist" },
  { id: "ra-3", label: "1 gate pending", detail: "Pune Pioneer — validation gate package" },
];

export const mentorImpact = [
  { id: "mi-1", label: "5 teams completed sprint", detail: "Rolling 60 days across Maharashtra programs" },
  { id: "mi-2", label: "2 prototypes launched", detail: "Including irrigation pilot in Nashik cluster" },
  { id: "mi-3", label: "1 startup got pilot customer", detail: "Via MSME matchmaking intro — Pune MIDC" },
];

export interface MentorTeamRow {
  id: string;
  teamName: string;
  members: string;
  domain: string;
  sprint: string;
  progressPct: number;
  risk: "Low" | "Medium" | "High";
  lastActive: string;
  cohortOrMsme: string;
  projectType: "Academic" | "Innovation";
}

export const mentorTeamRows: MentorTeamRow[] = [
  {
    id: "mt-kiran",
    teamName: "Navitas Lighting · Kiran",
    members: "4",
    domain: "Robotics / IoT",
    sprint: "Intelligent Modular Drone System",
    progressPct: 72,
    risk: "Low",
    lastActive: "Just now",
    cohortOrMsme: "Navitas Lighting · Nagpur NEXT",
    projectType: "Innovation",
  },
  {
    id: "mt-1",
    teamName: "AgriBot Labs",
    members: "4",
    domain: "Agri-tech / IoT",
    sprint: "Smart Irrigation Device",
    progressPct: 68,
    risk: "Low",
    lastActive: "2h ago",
    cohortOrMsme: "Sahyadri Agro · Nashik Growth",
    projectType: "Innovation",
  },
  {
    id: "mt-2",
    teamName: "Vision Textile AI",
    members: "3",
    domain: "Computer vision",
    sprint: "Fabric Defect Detection",
    progressPct: 42,
    risk: "High",
    lastActive: "5h ago",
    cohortOrMsme: "Marathwada Textiles · Kolhapur Industrial",
    projectType: "Innovation",
  },
  {
    id: "mt-3",
    teamName: "VNIT Nagpur · Rahul Sharma",
    members: "Solo + advisor",
    domain: "Mechanical / Thermal",
    sprint: "Low-cost EV battery cooling",
    progressPct: 48,
    risk: "Low",
    lastActive: "1d ago",
    cohortOrMsme: "GreenDrive Motors · Pune Pioneer",
    projectType: "Academic",
  },
  {
    id: "mt-4",
    teamName: "COEP Solver Team",
    members: "5",
    domain: "Packaging / Lean",
    sprint: "Reduce Packaging Waste",
    progressPct: 55,
    risk: "Medium",
    lastActive: "3h ago",
    cohortOrMsme: "Precision Auto · Pune Pioneer",
    projectType: "Academic",
  },
  {
    id: "mt-5",
    teamName: "Team Nova",
    members: "4",
    domain: "Energy analytics",
    sprint: "Energy Monitoring System",
    progressPct: 82,
    risk: "Low",
    lastActive: "1d ago",
    cohortOrMsme: "Vidarbha Industrial · Nagpur Central",
    projectType: "Innovation",
  },
  {
    id: "mt-6",
    teamName: "PDKV AgriSense Unit",
    members: "3",
    domain: "Soil analytics",
    sprint: "Soil analytics pilot",
    progressPct: 22,
    risk: "High",
    lastActive: "6h ago",
    cohortOrMsme: "Sahyadri Agro · Nashik Growth",
    projectType: "Innovation",
  },
];

export const mentorReviewQueue = [
  { id: "rv-1", title: "Problem Research", owner: "Team Nova", due: "Apr 14" },
  { id: "rv-2", title: "CAD Prototype", owner: "VNIT Nagpur · Rahul Sharma", due: "Apr 15" },
  { id: "rv-3", title: "Pitch Deck", owner: "Mumbai Metro cohort team", due: "Apr 16" },
  { id: "rv-4", title: "Final Gate", owner: "Pune Pioneer — Team Alpha", due: "Apr 17" },
];

export const mentorCohortWatchlist = [
  { id: "mw-1", name: "Pune Pioneer", healthPct: 85, attendancePct: 92, progressPct: 85, window: "Jan–Apr 2026" },
  { id: "mw-2", name: "Mumbai Metro", healthPct: 72, attendancePct: 78, progressPct: 72, window: "Feb–May 2026" },
];

export const mentorMsmeWatchlist = [
  {
    id: "mm-1",
    title: "EV Battery Cooling",
    company: "GreenDrive Motors",
    teams: "VNIT Nagpur · Rahul Sharma, COEP Solver (shadow)",
    notes: "Thermal CAD comments due before chamber booking.",
  },
  {
    id: "mm-2",
    title: "Textile / Energy Reduction",
    company: "Marathwada Textiles Pvt Ltd",
    teams: "Vision Textile AI",
    notes: "Camera rig blocker — escalate if samples not received by Apr 18.",
  },
];

export const mentorWeekSlots = [
  { id: "ws-1", day: "Tue Apr 15", blocks: ["09:00–11:00 Office hours", "14:00–16:00 Cohort round-robin"] },
  { id: "ws-2", day: "Wed Apr 16", blocks: ["10:00 Sprint review", "12:30 EV guidance", "16:00 Pitch feedback"] },
  { id: "ws-3", day: "Thu Apr 17", blocks: ["09:30 MSME signoff", "15:00 Mentor workshop prep"] },
];

export const mentorDaySlots = [
  { id: "ds-1", time: "09:00", label: "Office hours (open)" },
  { id: "ds-2", time: "10:00", label: "Team Alpha Sprint Review" },
  { id: "ds-3", time: "12:30", label: "EV Team Guidance" },
  { id: "ds-4", time: "15:00", label: "Block: research writeup" },
  { id: "ds-5", time: "16:00", label: "Pitch Feedback" },
];

export const mentorSessionRequests = [
  { id: "sr-1", from: "Team Alpha", context: "Pune Pioneer — validation gate dry run", type: "Cohort" as const },
  { id: "sr-2", from: "Pune Cohort", context: "Prashant Bhosale — mid-cycle health check", type: "Cohort" as const },
  { id: "sr-3", from: "Bharat Foods MSME", context: "Packaging mini automation — design review", type: "MSME" as const },
];

export const mentorHonorarium = {
  sessionsCompleted: 12,
  pendingPayoutRupee: 8000,
  totalEarnedRupee: 32000,
};

export const mentorResourceLinks = [
  { id: "res-1", title: "Feedback Rubric", hint: "PDF · Venture Centre template" },
  { id: "res-2", title: "Review Checklist", hint: "Stage gates + MSME visibility" },
  { id: "res-3", title: "Sprint Guide", hint: "Aligned with innovator sprint columns" },
  { id: "res-4", title: "Pitch Scorecard", hint: "Demo Day Mumbai rubric" },
];

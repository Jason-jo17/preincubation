/**
 * MSME role workspace data — structured for reuse (e.g. CEO aggregates later).
 */

export type MsmeChallengeStatus = "Shortlisting" | "In Progress" | "Open" | "Testing";

export interface MsmeChallenge {
  id: string;
  challenge: string;
  company: string;
  region: string;
  status: MsmeChallengeStatus;
  applicants: number;
  progress: number;
  dueLabel: string;
}

export interface MsmePendingAction {
  id: string;
  label: string;
  href: string;
}

export interface MsmeRecommendedTeam {
  id: string;
  name: string;
  source: string;
  matchScore: number;
  skills: string;
}

export interface MsmeActivityItem {
  id: string;
  message: string;
  timeLabel: string;
}

export interface MsmeInsight {
  id: string;
  message: string;
}

export const msmeKpis = [
  {
    id: "active-challenges",
    label: "Active Challenges",
    value: "4",
    trend: { value: "+1", positive: true as const },
    icon: "clipboard" as const,
  },
  {
    id: "new-applicants",
    label: "New Applicants",
    value: "18",
    trend: { value: "22%", positive: true as const },
    icon: "userPlus" as const,
  },
  {
    id: "teams-progress",
    label: "Teams In Progress",
    value: "7",
    trend: { value: "2", positive: true as const },
    icon: "users" as const,
  },
  {
    id: "completed",
    label: "Completed Solutions",
    value: "12",
    trend: { value: "8%", positive: true as const },
    icon: "checkCircle" as const,
  },
  {
    id: "response-time",
    label: "Avg Response Time",
    value: "2.8 Days",
    trend: { value: "0.4d", positive: true as const },
    subtitle: "vs last quarter",
    icon: "timer" as const,
  },
  {
    id: "satisfaction",
    label: "Satisfaction Score",
    value: "4.4 / 5",
    trend: { value: "0.2", positive: true as const },
    subtitle: "post-solution survey",
    icon: "star" as const,
  },
] as const;

export const msmeChallenges: MsmeChallenge[] = [
  {
    id: "c1",
    challenge: "Reduce Packaging Waste",
    company: "Precision Auto Components Pvt Ltd",
    region: "Pune",
    status: "Shortlisting",
    applicants: 12,
    progress: 25,
    dueLabel: "Apr 18",
  },
  {
    id: "c2",
    challenge: "Smart Irrigation Device",
    company: "Sahyadri Agro Processing Pvt Ltd",
    region: "Nashik",
    status: "In Progress",
    applicants: 6,
    progress: 68,
    dueLabel: "Apr 28",
  },
  {
    id: "c3",
    challenge: "Fabric Defect Detection",
    company: "Marathwada Textiles Pvt Ltd",
    region: "Aurangabad",
    status: "Open",
    applicants: 8,
    progress: 0,
    dueLabel: "May 2",
  },
  {
    id: "c4",
    challenge: "Energy Monitoring System",
    company: "Vidarbha Industrial Systems",
    region: "Nagpur",
    status: "Testing",
    applicants: 5,
    progress: 82,
    dueLabel: "Apr 24",
  },
];

export const msmePendingActions: MsmePendingAction[] = [
  { id: "a1", label: "Review 5 new applications", href: "/msme/applicants" },
  { id: "a2", label: "Approve milestone for COEP Solver Team", href: "/msme/applicants" },
  { id: "a3", label: "Reply to mentor query on irrigation challenge", href: "/msme/business-hub?tab=messages" },
  { id: "a4", label: "Select finalist for packaging challenge", href: "/msme/challenges" },
];

export const msmeRecommendedTeams: MsmeRecommendedTeam[] = [
  {
    id: "t1",
    name: "COEP Solver Team",
    source: "COEP Bhau Institute",
    matchScore: 92,
    skills: "Mechanical + Automation",
  },
  {
    id: "t2",
    name: "AgriBot Labs",
    source: "PDKV Innovation Foundation",
    matchScore: 89,
    skills: "IoT + Agriculture",
  },
  {
    id: "t3",
    name: "Vision Textile AI",
    source: "AIC BAMU Foundation",
    matchScore: 86,
    skills: "Computer Vision",
  },
];

export const msmeRecentActivity: MsmeActivityItem[] = [
  { id: "u0", message: "Shakti Foundry Works (Kolhapur) saved your casting-line automation brief", timeLabel: "45m ago" },
  { id: "u1", message: "Team Nova uploaded prototype images", timeLabel: "2h ago" },
  { id: "u2", message: "3 new applicants joined Packaging Challenge", timeLabel: "5h ago" },
  { id: "u3", message: "Mentor assigned to Smart Irrigation Device", timeLabel: "Yesterday" },
  { id: "u4", message: "Milestone approved for Energy Monitoring System", timeLabel: "Yesterday" },
  { id: "u5", message: "New recommendation generated for Textile Challenge", timeLabel: "2 days ago" },
];

export const msmeOpportunityInsights: MsmeInsight[] = [
  { id: "i1", message: "Nashik shows rising demand for AgriTech solutions" },
  { id: "i2", message: "Vidarbha has strong industrial modernization potential" },
  { id: "i3", message: "Pune has highest solver availability" },
  { id: "i4", message: "Marathwada textile innovation participation is growing" },
];

/** Canonical sectors referenced across MSME flows (for filters, future modules). */
export const msmeSectors = [
  "Manufacturing",
  "Agriculture",
  "Food Processing",
  "Textile",
  "Engineering",
  "Energy",
  "EV",
  "AgriTech",
] as const;

export const msmeSolverSources = [
  "COEP Bhau Institute",
  "Venture Centre Pune",
  "AIC BAMU Foundation",
  "KIT Innovation Foundation",
  "PDKV Innovation Foundation",
  "SPPU Research & Incubation Park",
] as const;

export const msmeRegions = ["Pune", "Nashik", "Nagpur", "Aurangabad", "Kolhapur", "Mumbai"] as const;

export const msmeCompanies = [
  "Precision Auto Components Pvt Ltd (Pune)",
  "Sahyadri Agro Processing Pvt Ltd (Nashik)",
  "Vidarbha Industrial Systems (Nagpur)",
  "Marathwada Textiles Pvt Ltd (Aurangabad)",
  "Shakti Foundry Works (Kolhapur)",
] as const;

/** Single export for aggregation / future API sync. */
export const msmeWorkspaceDataset = {
  challenges: msmeChallenges,
  applications: { pendingReviewCount: 5, newThisWeek: 18 },
  teams: { inProgress: 7, recommended: msmeRecommendedTeams },
  updates: msmeRecentActivity,
  notifications: msmePendingActions,
  insights: msmeOpportunityInsights,
  kpis: msmeKpis,
  sectors: msmeSectors,
  solverSources: msmeSolverSources,
  regions: msmeRegions,
  companies: msmeCompanies,
} as const;

export type MsmeExecutiveKpiId =
  | "active-problems"
  | "solutions-progress"
  | "annual-savings"
  | "resolution-time"
  | "productivity"
  | "roi"
  | "pending-decisions";

export interface MsmeExecutiveKpi {
  id: MsmeExecutiveKpiId;
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: "briefcase" | "activity" | "badgeIndianRupee" | "clock" | "gauge" | "lineChart" | "clipboardCheck";
  urgent?: boolean;
}

export interface MsmePriorityAction {
  id: string;
  title: string;
  type: "Approval" | "Missing Input" | "Meeting" | "Delay";
  priority: "High" | "Medium" | "Scheduled";
  actionLabel: "Approve" | "Respond" | "Join" | "Review";
}

export type MsmeChallengeStatus = "Open" | "In Review" | "In Progress" | "Delayed" | "Completed";

export interface MsmeChallengeCard {
  id: string;
  title: string;
  company: string;
  location: string;
  status: MsmeChallengeStatus;
  applicants: number;
  savingsPotential: string;
  eta?: string;
  bestMatch?: string;
}

export interface MsmeRecommendedTeamCard {
  id: string;
  name: string;
  matchPct: number;
  source: string;
  skills: string;
  pastWins?: string;
  deliverySpeed?: string;
}

export interface MsmeImpactCard {
  id: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  savingsLabel: string;
  savingsValue: string;
  progressPct: number;
}

export const msmeExecutiveKpis: MsmeExecutiveKpi[] = [
  { id: "active-problems", label: "Active Problems", value: "4", delta: "+1", positive: true, icon: "briefcase" },
  { id: "solutions-progress", label: "Solutions In Progress", value: "7", delta: "+2", positive: true, icon: "activity" },
  { id: "annual-savings", label: "Annual Savings Generated", value: "₹28L / year", delta: "+22%", positive: true, icon: "badgeIndianRupee" },
  { id: "resolution-time", label: "Avg Resolution Time", value: "18 days", delta: "-12%", positive: true, icon: "clock" },
  { id: "productivity", label: "Productivity Gain", value: "+16%", delta: "+4%", positive: true, icon: "gauge" },
  { id: "roi", label: "ROI Score", value: "3.4x", delta: "+0.6x", positive: true, icon: "lineChart" },
  { id: "pending-decisions", label: "Pending Decisions", value: "3", icon: "clipboardCheck", urgent: true },
];

export const businessHealthMetrics = [
  { subject: "Operations", value: 72 },
  { subject: "Quality", value: 81 },
  { subject: "Cost Efficiency", value: 68 },
  { subject: "Automation", value: 54 },
  { subject: "Delivery Speed", value: 76 },
  { subject: "Innovation Readiness", value: 61 },
];

export const msmePriorityActions: MsmePriorityAction[] = [
  {
    id: "pa-1",
    title: "Approve shortlisted teams for Packaging Waste challenge",
    type: "Approval",
    priority: "High",
    actionLabel: "Approve",
  },
  {
    id: "pa-2",
    title: "Add machine downtime details for Textile Defect challenge",
    type: "Missing Input",
    priority: "Medium",
    actionLabel: "Respond",
  },
  {
    id: "pa-3",
    title: "Mentor review meeting tomorrow at 3:00 PM",
    type: "Meeting",
    priority: "Scheduled",
    actionLabel: "Join",
  },
  {
    id: "pa-4",
    title: "Energy Monitoring challenge overdue by 4 days",
    type: "Delay",
    priority: "High",
    actionLabel: "Review",
  },
];

export const msmeActiveChallengeCards: MsmeChallengeCard[] = [
  {
    "id": "ch-navitas-lighting-drone",
    "title": "Intelligent Modular Drone Lighting",
    "company": "Navitas Lighting",
    "location": "Nagpur",
    "status": "In Progress",
    "applicants": 6,
    "savingsPotential": "₹36L/year",
    "eta": "12 days",
    "bestMatch": "KIRAN · Lead Systems (Matched)"
  },
  {
    id: "ch-1",
    title: "Reduce Packaging Waste",
    company: "Precision Auto Components Pvt Ltd",
    location: "Pune",
    status: "In Review",
    applicants: 12,
    savingsPotential: "₹8L/year",
    eta: "14 days",
    bestMatch: "COP Solver Team (92%)",
  },
  {
    id: "ch-3",
    title: "Fabric Defect Detection",
    company: "Marathwada Textiles Pvt Ltd",
    location: "Aurangabad",
    status: "Open",
    applicants: 8,
    savingsPotential: "₹10L/year",
  },
];

export const msmeRecommendedTeams: MsmeRecommendedTeamCard[] = [
  {
    id: "tm-1",
    name: "COP Solver Team",
    matchPct: 92,
    source: "COEP Pune",
    skills: "CAD, Automation, IoT",
    pastWins: "3 MSME projects",
    deliverySpeed: "High",
  },
  {
    id: "tm-2",
    name: "AgriBot Labs",
    matchPct: 80,
    source: "PDKV Innovation Foundation",
    skills: "Sensors / Embedded",
  },
  {
    id: "tm-3",
    name: "Vision Textile AI",
    matchPct: 84,
    source: "BAMU Foundry Lab",
    skills: "Computer Vision, Quality Control",
  },
];

export const msmeImpactCards: MsmeImpactCard[] = [
  {
    id: "im-drone-lighting",
    title: "Intelligent Drone Lighting",
    metricLabel: "Search coverage gain",
    metricValue: "40%",
    savingsLabel: "Opportunity value",
    savingsValue: "₹36L",
    progressPct: 72,
  },
  {
    id: "im-2",
    title: "Energy Monitoring System",
    metricLabel: "Power bill reduced",
    metricValue: "18%",
    savingsLabel: "Savings",
    savingsValue: "₹9L",
    progressPct: 64,
  },
  {
    id: "im-3",
    title: "Fabric Detection AI",
    metricLabel: "Defect reduction",
    metricValue: "32%",
    savingsLabel: "Rework saved",
    savingsValue: "₹4L",
    progressPct: 81,
  },
];

export const msmeOpportunityInsights = [
  "Pune has highest solver availability this month",
  "Government subsidy open for automation upgrades",
  "Strong AgriTech teams available in Nashik",
  "EV experts available in Nagpur",
  "Mentor slots open this week",
  "Your ROI can improve by 18% by solving Packaging Waste first",
];

export const msmeTimelineFeed = [
  "Team Nova uploaded prototype images",
  "3 applicants joined Packaging challenge",
  "Mission approved Energy Monitoring challenge",
  "Mentor assigned yesterday",
];

/** Shared trend curve — aligns MSME workspace analytics with executive headline KPIs. */
export const msmeWorkspaceResolutionTrend = [
  { month: "Nov", days: 24 },
  { month: "Dec", days: 22 },
  { month: "Jan", days: 21 },
  { month: "Feb", days: 20 },
  { month: "Mar", days: 19 },
  { month: "Apr", days: 18 },
] as const;

export const msmeChallengeWorkspaceAiHints: { id: string; label: string }[] = [
  { id: "h1", label: "Publish Fabric Defect challenge after QC adds loom batch IDs." },
  { id: "h2", label: "Approve top team for Packaging Waste — COEP Solver Team is match-ready." },
  { id: "h3", label: "Add MSEDCL feeder logs for Energy Monitoring draft to unlock solver interest." },
  { id: "h4", label: "Similar packaging waste challenge solved in Pune — reuse playbook templates." },
  { id: "h5", label: "State automation subsidy window open for Nashik AgriTech pilots." },
  { id: "h6", label: "Mentor support recommended before EV charging kiosk goes to pilot." },
];

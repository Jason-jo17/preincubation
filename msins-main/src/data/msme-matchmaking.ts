/**
 * MSME Matchmaking Hub — AI matches, directories, invite pipeline.
 */

export type MatchmakingHubTab =
  | "ai_matches"
  | "teams"
  | "individuals"
  | "startups"
  | "invited"
  | "accepted"
  | "saved";

export const MATCHMAKING_HUB_TABS: { value: MatchmakingHubTab; label: string }[] = [
  { value: "ai_matches", label: "AI Matches" },
  { value: "teams", label: "Teams" },
  { value: "individuals", label: "Individuals" },
  { value: "startups", label: "Startups" },
  { value: "invited", label: "Invited" },
  { value: "accepted", label: "Accepted" },
  { value: "saved", label: "Saved" },
];

export const msmeMatchmakingKpis = [
  { id: "rec", label: "Recommended Matches", value: "24", trend: { value: "12%", positive: true as const }, icon: "spark" as const },
  { id: "inv", label: "Invites Sent", value: "9", trend: { value: "3", positive: true as const }, icon: "send" as const },
  { id: "acc", label: "Accepted", value: "4", trend: { value: "1", positive: true as const }, icon: "check" as const },
  { id: "disc", label: "Active Discussions", value: "3", trend: { value: "0", positive: true as const }, icon: "message" as const },
  { id: "fit", label: "High Fit Matches", value: "11", trend: { value: "5%", positive: true as const }, icon: "target" as const },
  { id: "new", label: "New Profiles This Week", value: "7", trend: { value: "2", positive: true as const }, icon: "userPlus" as const },
];

export interface AiBestMatch {
  id: string;
  rank: number;
  teamName: string;
  source: string;
  matchScore: number;
  whyMatch: string[];
  mindset: string[];
}

export const aiBestMatches: AiBestMatch[] = [
  {
    id: "ai-coep",
    rank: 1,
    teamName: "COEP Solver Team",
    source: "COEP Bhau Institute",
    matchScore: 94,
    whyMatch: [
      "Strong manufacturing builds",
      "Fast execution history",
      "CAD + Automation skills",
    ],
    mindset: ["Builder", "Reliable"],
  },
  {
    id: "ai-agribot",
    rank: 2,
    teamName: "AgriBot Labs",
    source: "PDKV Innovation Foundation",
    matchScore: 91,
    whyMatch: ["AgriTech experience", "IoT hardware builds"],
    mindset: ["Practical", "Fast"],
  },
  {
    id: "ai-vision",
    rank: 3,
    teamName: "Vision Textile AI",
    source: "AIC BAMU Foundation",
    matchScore: 88,
    whyMatch: ["Computer vision for quality systems"],
    mindset: ["Analytical", "Detail-oriented"],
  },
];

export interface TeamDirectoryRow {
  id: string;
  teamName: string;
  members: string;
  region: string;
  domain: string;
  pastProjects: string;
  matchScore: number;
  availability: string;
}

export const teamDirectory: TeamDirectoryRow[] = [
  {
    id: "td-coep",
    teamName: "COEP Solver Team",
    members: "6 members",
    region: "Pune",
    domain: "Manufacturing · CAD",
    pastProjects: "Packaging line, CNC fixtures",
    matchScore: 94,
    availability: "Available now",
  },
  {
    id: "td-nova",
    teamName: "Team Nova",
    members: "4 members",
    region: "Nagpur",
    domain: "Energy · IoT telemetry",
    pastProjects: "MSEDCL analytics pilot",
    matchScore: 89,
    availability: "From May 1",
  },
  {
    id: "td-smartfab",
    teamName: "SmartFab Systems",
    members: "5 members",
    region: "Kolhapur",
    domain: "Factory automation",
    pastProjects: "Line balancing, SCADA",
    matchScore: 84,
    availability: "Available now",
  },
  {
    id: "td-ecopack",
    teamName: "EcoPack Innovators",
    members: "5 members",
    region: "Pune",
    domain: "Sustainable materials",
    pastProjects: "Venture Centre waste pilots",
    matchScore: 87,
    availability: "Limited — 1 slot",
  },
];

export interface IndividualProfile {
  id: string;
  name: string;
  role: string;
  city: string;
  skills: string;
}

export const individualProfiles: IndividualProfile[] = [
  { id: "ind-1", name: "Rahul Patil", role: "Mechanical Designer", city: "Pune", skills: "SolidWorks, CAD, CNC" },
  { id: "ind-2", name: "Sneha Kulkarni", role: "Embedded Engineer", city: "Nashik", skills: "IoT, Arduino, Sensors" },
  { id: "ind-3", name: "Arjun More", role: "AI Engineer", city: "Mumbai", skills: "Python, CV, ML" },
];

export interface StartupDirectoryRow {
  id: string;
  name: string;
  tagline: string;
  region?: string;
}

export const startupDirectory: StartupDirectoryRow[] = [
  { id: "su-1", name: "EcoSense Technologies", tagline: "Waste optimization systems", region: "Pune" },
  { id: "su-2", name: "FarmLogic Systems", tagline: "Smart irrigation products", region: "Nashik" },
  { id: "su-3", name: "AutoFlow Labs", tagline: "Factory automation tools", region: "Chakan" },
];

export type InvitePipelineStatus = "Sent" | "Viewed" | "Accepted" | "Declined" | "In Discussion";

export interface InvitePipelineRow {
  id: string;
  name: string;
  kind: "team" | "individual" | "startup";
  status: InvitePipelineStatus;
}

export const invitePipelineSeed: InvitePipelineRow[] = [
  { id: "inv-1", name: "COEP Solver Team", kind: "team", status: "Accepted" },
  { id: "inv-2", name: "AgriBot Labs", kind: "team", status: "Viewed" },
  { id: "inv-3", name: "Rahul Patil", kind: "individual", status: "Sent" },
  { id: "inv-4", name: "EcoSense Technologies", kind: "startup", status: "In Discussion" },
];

export const matchExplainability: Record<
  string,
  { score: number; bullets: string[] }
> = {
  "ai-coep": {
    score: 94,
    bullets: [
      "Challenge requires manufacturing redesign",
      "3 relevant past builds",
      "High rating from MSME cohort",
      "Available now",
      "Located in Pune",
    ],
  },
  "ai-agribot": {
    score: 91,
    bullets: [
      "Strong overlap with AgriTech + irrigation scope",
      "Field-deployed IoT references",
      "PDKV mentor network aligned",
      "Available for Nashik-region pilots",
    ],
  },
  "ai-vision": {
    score: 88,
    bullets: [
      "Computer vision stack matches quality inspection",
      "AIC BAMU textile innovation track record",
      "Prototype velocity rated high",
    ],
  },
};

export const matchmakingHubDataset = {
  kpis: msmeMatchmakingKpis,
  aiMatches: aiBestMatches,
  teams: teamDirectory,
  individuals: individualProfiles,
  startups: startupDirectory,
  invites: invitePipelineSeed,
} as const;

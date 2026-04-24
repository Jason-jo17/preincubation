export type RegionKey =
  | "pune"
  | "mumbai"
  | "nashik"
  | "nagpur"
  | "aurangabad-marathwada"
  | "kolhapur-western-belt"
  | "solapur"
  | "amravati";
export type SectorKey = "ev" | "aerospace" | "agritech" | "manufacturing" | "textile" | "ai-deeptech" | "defence" | "healthcare";
export type PyramidLayerKey = "talent" | "teams" | "projects" | "pilots" | "startups" | "impact";

export interface RegionIntelligence {
  key: RegionKey;
  slug: string;
  label: string;
  fundsCr: number;
  startups: number;
  jobs: number;
  msmes: number;
  roiX: number;
  risk: "Low" | "Medium" | "High";
}

export interface SectorIntelligence {
  key: SectorKey;
  slug: string;
  label: string;
  teams: number;
  startups: number;
  msmeDemand: string;
  growthPct: number;
  opportunityCr: number;
}

export interface StartupIntelligence {
  slug: string;
  name: string;
  region: RegionKey;
  sector: SectorKey;
  stage: "Prototype" | "Pilot" | "Revenue";
  revenueCr: number;
  jobs: number;
  msmeClients: number;
  fundingLakh: number;
  founders: string[];
  product: string;
  milestones: string[];
}

export interface IncubatorIntelligence {
  slug: string;
  name: string;
  region: RegionKey;
  fundsCr: number;
  utilizationPct: number;
  teamsSupported: number;
  startupConversionPct: number;
  roiScore: number;
  stateRank: number;
  mentorNetwork: number;
}

export interface CohortIntelligence {
  slug: string;
  name: string;
  region: RegionKey;
  teamsEnrolled: number;
  completionPct: number;
  delayedTeams: number;
  mentorLoadPct: number;
  outcomes: string;
}

export const regionData: RegionIntelligence[] = [
  { key: "pune", slug: "pune", label: "Pune", fundsCr: 24, startups: 76, jobs: 1320, msmes: 286, roiX: 4.2, risk: "Low" },
  { key: "mumbai", slug: "mumbai", label: "Mumbai / Konkan", fundsCr: 17, startups: 52, jobs: 980, msmes: 215, roiX: 3.6, risk: "Medium" },
  { key: "nashik", slug: "nashik", label: "Nashik", fundsCr: 10, startups: 31, jobs: 590, msmes: 142, roiX: 2.9, risk: "High" },
  { key: "nagpur", slug: "nagpur", label: "Nagpur", fundsCr: 8, startups: 24, jobs: 450, msmes: 114, roiX: 2.5, risk: "High" },
  { key: "aurangabad-marathwada", slug: "aurangabad-marathwada", label: "Aurangabad / Marathwada", fundsCr: 9, startups: 21, jobs: 430, msmes: 102, roiX: 2.6, risk: "High" },
  { key: "kolhapur-western-belt", slug: "kolhapur-western-belt", label: "Kolhapur / Western Belt", fundsCr: 7, startups: 18, jobs: 470, msmes: 96, roiX: 3.1, risk: "Medium" },
  { key: "solapur", slug: "solapur", label: "Solapur", fundsCr: 5, startups: 13, jobs: 300, msmes: 88, roiX: 2.8, risk: "Medium" },
  { key: "amravati", slug: "amravati", label: "Amravati", fundsCr: 4, startups: 13, jobs: 280, msmes: 97, roiX: 2.4, risk: "High" },
];



export const sectorData: SectorIntelligence[] = [
  { key: "ev", slug: "ev", label: "EV", teams: 24, startups: 11, msmeDemand: "Battery cooling, retrofits", growthPct: 22, opportunityCr: 42 },
  { key: "aerospace", slug: "aerospace", label: "Aerospace", teams: 18, startups: 8, msmeDemand: "Inspection, avionics fixtures", growthPct: 19, opportunityCr: 31 },
  { key: "agritech", slug: "agritech", label: "AgriTech", teams: 21, startups: 10, msmeDemand: "Smart irrigation, post-harvest", growthPct: 17, opportunityCr: 28 },
  { key: "manufacturing", slug: "manufacturing", label: "Manufacturing", teams: 27, startups: 13, msmeDemand: "Factory automation, QA", growthPct: 15, opportunityCr: 47 },
  { key: "textile", slug: "textile", label: "Textile", teams: 13, startups: 5, msmeDemand: "Fabric defect detection", growthPct: 11, opportunityCr: 19 },
  { key: "ai-deeptech", slug: "ai-deeptech", label: "AI / DeepTech", teams: 16, startups: 7, msmeDemand: "Predictive analytics", growthPct: 26, opportunityCr: 34 },
  { key: "defence", slug: "defence", label: "Defence", teams: 9, startups: 4, msmeDemand: "Supply-chain tooling", growthPct: 14, opportunityCr: 23 },
  { key: "healthcare", slug: "healthcare", label: "Healthcare", teams: 12, startups: 6, msmeDemand: "Diagnostics workflow tools", growthPct: 10, opportunityCr: 18 },
];

export const startupData: StartupIntelligence[] = [
  {
    slug: "ecosense-technologies",
    name: "EcoSense Technologies",
    region: "pune",
    sector: "ev",
    stage: "Revenue",
    revenueCr: 6.8,
    jobs: 46,
    msmeClients: 12,
    fundingLakh: 180,
    founders: ["Neha Joshi", "Aditya Kulkarni"],
    product: "Battery Cooling Intelligence Stack",
    milestones: ["3 OEM pilots converted", "12 MSME installs", "Patent filing in progress"],
  },
  {
    slug: "farmlogic-systems",
    name: "FarmLogic Systems",
    region: "nashik",
    sector: "agritech",
    stage: "Pilot",
    revenueCr: 1.9,
    jobs: 22,
    msmeClients: 8,
    fundingLakh: 96,
    founders: ["Prasad Borse", "Swati Gaikwad"],
    product: "Smart Irrigation Command Mesh",
    milestones: ["40-farm pilot", "Water reduction 18%", "Co-op expansion signed"],
  },
  {
    slug: "autoflow-labs",
    name: "AutoFlow Labs",
    region: "nagpur",
    sector: "manufacturing",
    stage: "Prototype",
    revenueCr: 0.8,
    jobs: 17,
    msmeClients: 5,
    fundingLakh: 74,
    founders: ["Rohan Jain", "Sneha Bhosale"],
    product: "Factory Automation Cells",
    milestones: ["2 line retrofits", "Throughput +11%", "Grant utilization review due"],
  },
  {
    slug: "aeromatrix-robotics",
    name: "AeroMatrix Robotics",
    region: "mumbai",
    sector: "aerospace",
    stage: "Pilot",
    revenueCr: 2.3,
    jobs: 28,
    msmeClients: 7,
    fundingLakh: 122,
    founders: ["Ishita Naik", "Rahul Menon"],
    product: "Drone Inspection and Mapping Suite",
    milestones: ["Airport test completed", "7 MSME service contracts", "Defence RFP shortlisting"],
  },
];

export const incubatorData: IncubatorIntelligence[] = [
  { slug: "coep-bhau-institute", name: "COEP Bhau Institute", region: "pune", fundsCr: 6.1, utilizationPct: 88, teamsSupported: 24, startupConversionPct: 35, roiScore: 92, stateRank: 1, mentorNetwork: 38 },
  { slug: "venture-centre-pune", name: "Venture Centre Pune", region: "pune", fundsCr: 5.2, utilizationPct: 84, teamsSupported: 21, startupConversionPct: 31, roiScore: 89, stateRank: 2, mentorNetwork: 31 },
  { slug: "sppu-research-park", name: "SPPU Research Park", region: "pune", fundsCr: 3.8, utilizationPct: 79, teamsSupported: 17, startupConversionPct: 28, roiScore: 82, stateRank: 4, mentorNetwork: 24 },
  { slug: "aic-bamu-foundation", name: "AIC BAMU Foundation", region: "aurangabad-marathwada", fundsCr: 2.4, utilizationPct: 68, teamsSupported: 11, startupConversionPct: 19, roiScore: 63, stateRank: 11, mentorNetwork: 13 },
  { slug: "kumbhathon-innovation-foundation", name: "Kumbhathon Innovation Foundation", region: "nashik", fundsCr: 2.1, utilizationPct: 71, teamsSupported: 10, startupConversionPct: 22, roiScore: 67, stateRank: 10, mentorNetwork: 14 },
  { slug: "incubein-foundation", name: "Incubein Foundation", region: "nagpur", fundsCr: 1.9, utilizationPct: 57, teamsSupported: 9, startupConversionPct: 16, roiScore: 54, stateRank: 14, mentorNetwork: 11 },
  { slug: "kit-irf", name: "KIT IRF", region: "kolhapur-western-belt", fundsCr: 2.7, utilizationPct: 76, teamsSupported: 13, startupConversionPct: 25, roiScore: 73, stateRank: 8, mentorNetwork: 17 },
];

export const cohortData: CohortIntelligence[] = [
  { slug: "pune-pioneer", name: "Pune Pioneer", region: "pune", teamsEnrolled: 22, completionPct: 91, delayedTeams: 2, mentorLoadPct: 82, outcomes: "9 startups, 3 patent filings" },
  { slug: "ev-accelerator", name: "EV Accelerator", region: "pune", teamsEnrolled: 18, completionPct: 88, delayedTeams: 3, mentorLoadPct: 86, outcomes: "7 pilots, 4 MSME contracts" },
  { slug: "agri-launchpad", name: "Agri Launchpad", region: "nashik", teamsEnrolled: 14, completionPct: 74, delayedTeams: 4, mentorLoadPct: 96, outcomes: "Smart irrigation scaled in 2 districts" },
  { slug: "nagpur-manufacturing-sprint", name: "Nagpur Manufacturing Sprint", region: "nagpur", teamsEnrolled: 13, completionPct: 68, delayedTeams: 5, mentorLoadPct: 93, outcomes: "Factory automation prototypes maturing" },
  { slug: "marathwada-growth-cohort", name: "Marathwada Growth Cohort", region: "aurangabad-marathwada", teamsEnrolled: 12, completionPct: 70, delayedTeams: 4, mentorLoadPct: 88, outcomes: "Energy monitoring pilots in review" },
];

export const riskCards = [
  "Nagpur low conversion despite funding",
  "Nashik mentor shortage",
  "2 incubators underutilizing grants",
  "Mumbai startup retention dropping",
  "Aurangabad high demand low infrastructure",
] as const;

export const challengeProjects = [
  "Packaging Waste",
  "Smart Irrigation",
  "Battery Cooling",
  "Fabric Defect Detection",
  "Energy Monitoring",
  "Factory Automation",
] as const;

export const platformPipeline = {
  talentPool: 18400,
  teamsFormed: 4200,
  projectsInCohorts: 1280,
  prototypesBuilt: 810,
  msmePilots: 486,
  activeInnovationProjects: 612,
} as const;

/**
 * State-wide economic ROI — single source for CEO hub and any role that surfaces the same narrative.
 * Value split sums to totalValueGeneratedCr; overall multiple is total / public investment.
 */
export const platformEconomicRoi = {
  /** Sum of regional investment (84 Cr). */
  publicInvestmentCr: 84,
  /** Overall impact derived from 3.4x multiplier (standardized to 286 Cr). */
  totalValueGeneratedCr: 286,
  breakdown: [
    { label: "Startup Revenue", valueCr: 126, pct: 44 },
    { label: "MSME Savings", valueCr: 72, pct: 25 },
    { label: "Jobs Value", valueCr: 54, pct: 19 },
    { label: "Follow-on Investment", valueCr: 34, pct: 12 },
  ],
} as const;

export function platformEconomicRoiOverallMultiple() {
  const m = platformEconomicRoi.totalValueGeneratedCr / platformEconomicRoi.publicInvestmentCr;
  return Math.round(m * 10) / 10;
}

export const platformKpis = {
  fundsDeployedCr: platformEconomicRoi.publicInvestmentCr,
  startupsRegistered: 248,
  jobsCreated: 4820,
  msmesBenefited: 1140,
  studentsMobilized: platformPipeline.talentPool,
  activeInnovationProjects: platformPipeline.activeInnovationProjects,
  /** Aligned with `platformEconomicRoi` (value generated ÷ public investment), or sum of regions. */
  roiIndex: platformEconomicRoiOverallMultiple(),
} as const;

/** Public investment per outcome — derived from platformEconomicRoi + platformKpis for consistency. */
export function platformEconomicRoiUnitCosts() {
  const inv = platformEconomicRoi.publicInvestmentCr;
  const costPerStartupLakh = Math.round((inv * 100) / platformKpis.startupsRegistered);
  const costPerJobK = Math.round((inv * 10_000_000) / platformKpis.jobsCreated / 1000);
  return { costPerStartupLakh, costPerJobK };
}

export function regionBySlug(slug?: string) {
  return regionData.find((x) => x.slug === slug);
}

export const pyramidLayers: { key: PyramidLayerKey; title: string; subtitle: string }[] = [
  { key: "talent", title: "Talent Pool", subtitle: `${platformPipeline.talentPool.toLocaleString()} students / applicants` },
  { key: "teams", title: "Teams Formed", subtitle: `${platformPipeline.teamsFormed.toLocaleString()} teams` },
  { key: "projects", title: "Projects Built", subtitle: `${platformPipeline.projectsInCohorts.toLocaleString()} projects` },
  { key: "pilots", title: "Pilots Running", subtitle: `${platformPipeline.msmePilots.toLocaleString()} pilots` },
  { key: "startups", title: "Startups Registered", subtitle: `${platformKpis.startupsRegistered.toLocaleString()} startups` },
  { key: "impact", title: "Ecosystem Impact", subtitle: `${platformKpis.jobsCreated.toLocaleString()} jobs · ${platformKpis.msmesBenefited.toLocaleString()} MSMEs · ₹${platformEconomicRoi.totalValueGeneratedCr} Cr impact` },
];

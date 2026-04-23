import { initialMsmeChallengeList, type MsmeChallengeListItem } from "@/data/msme-challenges-list";
import { NAGPUR_NEXT_CHALLENGES } from "@/data/nagpur-next-data";

export const MARKETPLACE_HEADER_STATS = {
  liveProblems: 126,
  highMatch: 38,
  opportunityValueLabel: "₹2.4Cr",
  newThisWeek: 24,
} as const;

export type MarketplaceDifficulty = "Beginner" | "Medium" | "Advanced";
export type MarketplaceReward = "Milestone payment" | "Impact grant" | "Pilot budget" | "Revenue share (pilot)";
export type MarketplaceTeamMode = "Solo" | "Team" | "Either";
export type MarketplaceWorkMode = "Remote-first" | "Onsite" | "Hybrid";

export interface MarketplaceProblem {
  challenge: MsmeChallengeListItem;
  city: string;
  matchPct: number;
  difficulty: MarketplaceDifficulty;
  teamSize: string;
  deadlineLabel: string;
  valueLabel: string;
  valueLakh: number;
  tags: string[];
  rewardType: MarketplaceReward;
  teamMode: MarketplaceTeamMode;
  workMode: MarketplaceWorkMode;
  skills: string[];
  whyMatch: string;
  /** ISO date for sorting */
  deadlineSort: string;
  /** for "new this week" style sorts */
  listedSort: string;
}

export interface MarketplaceProblemDetail {
  problemStatement: string;
  rootCause: string;
  opportunitySize: string;
  requiredSkills: string[];
  deliverables: string[];
  timeline: string;
  constraints: string[];
  msmeProfile: string;
  similarSolutions: string[];
  suggestedTeam: { name: string; role: string; institute: string }[];
}

const META: Record<
  string,
  Omit<MarketplaceProblem, "challenge"> & { city?: string }
> = {
  "ch-1": {
    city: "Pune",
    matchPct: 79,
    difficulty: "Medium",
    teamSize: "2–4",
    deadlineLabel: "May 18, 2026",
    deadlineSort: "2026-05-18",
    valueLabel: "₹22 Lakhs",
    valueLakh: 22,
    tags: ["Packaging", "Lean", "Sustainability"],
    rewardType: "Milestone payment",
    teamMode: "Team",
    workMode: "Hybrid",
    skills: ["CAD", "Materials", "Process"],
    whyMatch: "Manufacturing + CAD overlap with your profile",
    listedSort: "2026-04-05",
  },
  "ch-2": {
    city: "Nashik",
    matchPct: 86,
    difficulty: "Medium",
    teamSize: "2–5",
    deadlineLabel: "May 02, 2026",
    deadlineSort: "2026-05-02",
    valueLabel: "₹16 Lakhs",
    valueLakh: 16,
    tags: ["IoT", "Sensors", "Field"],
    rewardType: "Pilot budget",
    teamMode: "Either",
    workMode: "Hybrid",
    skills: ["IoT", "Embedded", "Python"],
    whyMatch: "Strong IoT + field deployment fit",
    listedSort: "2026-04-08",
  },
  "ch-5": {
    city: "Pune",
    matchPct: 94,
    difficulty: "Advanced",
    teamSize: "3–5",
    deadlineLabel: "Jun 06, 2026",
    deadlineSort: "2026-06-06",
    valueLabel: "₹50 Lakhs",
    valueLakh: 50,
    tags: ["EV", "Thermal", "CAD"],
    rewardType: "Impact grant",
    teamMode: "Team",
    workMode: "Onsite",
    skills: ["CAD", "Thermal", "Mechanical"],
    whyMatch: "CAD + Mechanical + Thermal",
    listedSort: "2026-04-12",
  },
  "ch-6": {
    city: "Nashik",
    matchPct: 88,
    difficulty: "Medium",
    teamSize: "2–4",
    deadlineLabel: "May 22, 2026",
    deadlineSort: "2026-05-22",
    valueLabel: "₹18 Lakhs",
    valueLakh: 18,
    tags: ["IoT", "Agritech", "Edge"],
    rewardType: "Pilot budget",
    teamMode: "Either",
    workMode: "Hybrid",
    skills: ["IoT", "Sensors", "Firmware"],
    whyMatch: "IoT + Sensors",
    listedSort: "2026-04-11",
  },
  "ch-7": {
    city: "Mumbai",
    matchPct: 82,
    difficulty: "Medium",
    teamSize: "2–3",
    deadlineLabel: "May 30, 2026",
    deadlineSort: "2026-05-30",
    valueLabel: "₹12 Lakhs",
    valueLakh: 12,
    tags: ["Automation", "Food", "CAD"],
    rewardType: "Milestone payment",
    teamMode: "Team",
    workMode: "Onsite",
    skills: ["CAD", "Mechatronics", "PLC basics"],
    whyMatch: "CAD + Ops",
    listedSort: "2026-04-10",
  },
  "ch-8": {
    city: "Mumbai",
    matchPct: 74,
    difficulty: "Advanced",
    teamSize: "3–5",
    deadlineLabel: "Jun 15, 2026",
    deadlineSort: "2026-06-15",
    valueLabel: "₹28 Lakhs",
    valueLakh: 28,
    tags: ["Routing", "TMS", "Analytics"],
    rewardType: "Revenue share (pilot)",
    teamMode: "Team",
    workMode: "Hybrid",
    skills: ["Python", "OR", "APIs"],
    whyMatch: "Algorithms + logistics domain",
    listedSort: "2026-04-09",
  },
  "ch-9": {
    city: "Ratnagiri",
    matchPct: 71,
    difficulty: "Beginner",
    teamSize: "2–3",
    deadlineLabel: "May 12, 2026",
    deadlineSort: "2026-05-12",
    valueLabel: "₹9 Lakhs",
    valueLakh: 9,
    tags: ["Cold chain", "IoT", "Cloud"],
    rewardType: "Pilot budget",
    teamMode: "Either",
    workMode: "Hybrid",
    skills: ["IoT", "Web", "QA"],
    whyMatch: "Sensor + lightweight cloud stack",
    listedSort: "2026-04-07",
  },
  "ch-10": {
    city: "Aurangabad",
    matchPct: 77,
    difficulty: "Advanced",
    teamSize: "2–4",
    deadlineLabel: "Jul 01, 2026",
    deadlineSort: "2026-07-01",
    valueLabel: "₹35 Lakhs",
    valueLakh: 35,
    tags: ["Power quality", "Electrical", "Manufacturing"],
    rewardType: "Milestone payment",
    teamMode: "Team",
    workMode: "Onsite",
    skills: ["Power electronics", "Measurements", "MATLAB/Python"],
    whyMatch: "Electrical + manufacturing floor context",
    listedSort: "2026-04-06",
  },
  "ch-11": {
    city: "Solapur",
    matchPct: 80,
    difficulty: "Beginner",
    teamSize: "Solo–3",
    deadlineLabel: "May 25, 2026",
    deadlineSort: "2026-05-25",
    valueLabel: "₹11 Lakhs",
    valueLakh: 11,
    tags: ["Textile", "IoT", "Warehouse"],
    rewardType: "Pilot budget",
    teamMode: "Solo",
    workMode: "Hybrid",
    skills: ["IoT", "LoRa", "Dashboards"],
    whyMatch: "Easy win IoT deployment profile",
    listedSort: "2026-04-05",
  },
  "ch-12": {
    city: "Pune",
    matchPct: 73,
    difficulty: "Medium",
    teamSize: "2–4",
    deadlineLabel: "Jun 08, 2026",
    deadlineSort: "2026-06-08",
    valueLabel: "₹19 Lakhs",
    valueLakh: 19,
    tags: ["Scheduling", "Logistics", "Web"],
    rewardType: "Milestone payment",
    teamMode: "Team",
    workMode: "Hybrid",
    skills: ["React", "APIs", "UX"],
    whyMatch: "Scheduling UX + yard operations",
    listedSort: "2026-04-04",
  },
  "ch-13": {
    city: "Satara",
    matchPct: 69,
    difficulty: "Beginner",
    teamSize: "2–3",
    deadlineLabel: "May 08, 2026",
    deadlineSort: "2026-05-08",
    valueLabel: "₹8 Lakhs",
    valueLakh: 8,
    tags: ["Solar", "Energy", "Dashboard"],
    rewardType: "Pilot budget",
    teamMode: "Either",
    workMode: "Remote-first",
    skills: ["Data pipelines", "Visualization"],
    whyMatch: "Lightweight analytics build",
    listedSort: "2026-04-03",
  },
  "ch-14": {
    city: "Pune",
    matchPct: 84,
    difficulty: "Medium",
    teamSize: "2–3",
    deadlineLabel: "Jun 20, 2026",
    deadlineSort: "2026-06-20",
    valueLabel: "₹15 Lakhs",
    valueLakh: 15,
    tags: ["EV", "UX", "Kiosk"],
    rewardType: "Milestone payment",
    teamMode: "Either",
    workMode: "Onsite",
    skills: ["Frontend", "Embedded", "UX"],
    whyMatch: "EV domain + interface design",
    listedSort: "2026-04-02",
  },
};

const DETAIL: Record<string, MarketplaceProblemDetail> = {
  "ch-1": {
    problemStatement:
      "Single-use packaging intensity on the Chakan line is misaligned with OEM sustainability asks and Maharashtra plastic compliance expectations.",
    rootCause:
      "No standard dunnage spec per SKU family; ad-hoc vendor changes without QC loop; limited weight-out telemetry at dispatch.",
    opportunitySize: "₹22 Lakhs pilot envelope + vendor co-funding pathway.",
    requiredSkills: ["CAD", "Packaging materials", "Lean line trials"],
    deliverables: ["Baseline weight-out study", "Two pilot SKU workflows", "QC checklist update"],
    timeline: "10-week pilot with 2 on-site validation windows.",
    constraints: ["No line shutdown beyond Sunday maintenance", "OEM sign-off on alternate dunnage"],
    msmeProfile:
      "Precision Auto Components Pvt Ltd — tier-2 automotive supplier in Pune MIDC with ISO-aligned operations and export dispatch peaks.",
    similarSolutions: ["Returnable tote pilots in Chennai cluster", "Lightweight honeycomb dunnage in Pune OEM supply base"],
    suggestedTeam: [
      { name: "Ananya Kulkarni", role: "Materials", institute: "COEP" },
      { name: "Vikram Desai", role: "CAD", institute: "VNIT" },
    ],
  },
  "ch-2": {
    problemStatement:
      "Contract farms need dependable irrigation assists with flaky connectivity and mixed valve hardware across Nashik blocks.",
    rootCause:
      "Manual rounds dominate; soil moisture data not actionable at supervisor level; alert fatigue from brittle SMS gateways.",
    opportunitySize: "₹16 Lakhs staged across pilot + field hardening.",
    requiredSkills: ["Embedded C", "LoRa/WiFi", "Python services"],
    deliverables: ["Edge firmware", "Supervisor dashboard", "Field test report"],
    timeline: "12 weeks including two farm clusters.",
    constraints: ["Battery/solar budget cap", "Marathi-first SMS templates"],
    msmeProfile:
      "Sahyadri Agro Processing Pvt Ltd — aggregator with cold chain and contract farming footprint across Nashik district.",
    similarSolutions: ["PDKV soil analytics pilots", "Low-cost valve actuators from Aurangabad fab labs"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "IoT lead", institute: "VNIT Nagpur" },
      { name: "Sneha Patil", role: "Field testing", institute: "MPKV" },
    ],
  },
  "ch-5": {
    problemStatement:
      "LCV battery packs see thermal throttling in peak summer without a cost-feasible cooling architecture for Chakan assembly.",
    rootCause:
      "OEM targets vs. BOM gap; limited CFD iteration bandwidth; warranty test cycles compressed.",
    opportunitySize: "₹50 Lakhs impact-class envelope with milestone gates.",
    requiredSkills: ["Thermal CAD", "CFD basics", "Pack integration"],
    deliverables: ["CAD variants", "Prototype test plan", "Risk register for warranty"],
    timeline: "14 weeks with MIDC safety review checkpoint.",
    constraints: ["No changes to HV safety enclosures without sign-off", "Supplier freeze after week 8"],
    msmeProfile:
      "GreenDrive Motors — Pune EV assembly and service footprint with Chakan integration bay and dealer network trials.",
    similarSolutions: ["Passive manifold pilots in Bengaluru LCV OEMs", "Phase-change pad studies at NCL Venture Centre"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "Mechanical lead", institute: "VNIT Nagpur" },
      { name: "Karan Mehta", role: "Thermal analyst", institute: "IIT Bombay" },
    ],
  },
  "ch-6": {
    problemStatement:
      "Drip blocks need autonomous scheduling that tolerates intermittent connectivity and heterogeneous valve vendors.",
    rootCause:
      "No unified edge state machine; supervisors lack confidence in automated overrides during monsoon spikes.",
    opportunitySize: "₹18 Lakhs pilot with extension on KPI hit.",
    requiredSkills: ["Firmware", "Sensors", "Lightweight cloud"],
    deliverables: ["Controller firmware", "Supervisor app", "Monsoon hardening checklist"],
    timeline: "11 weeks across rabi window.",
    constraints: ["Field IP65 enclosure budget", "SMS gateway rate limits"],
    msmeProfile: "AgriFlow Systems — Nashik-based agritech integrator for contract farms and processor tie-ups.",
    similarSolutions: ["Sahyadri Agro irrigation pilots", "Krishi IoT kits from Pune startups"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "IoT", institute: "VNIT Nagpur" },
      { name: "Isha Rao", role: "Cloud", institute: "PICT Pune" },
    ],
  },
  "ch-7": {
    problemStatement:
      "Pouch collation and case erecting are manual bottlenecks on a compact Taloja line with strict FMCG dispatch windows.",
    rootCause:
      "Space-constrained layout; inconsistent case weights; limited maintenance windows for automation retrofits.",
    opportunitySize: "₹12 Lakhs for mini-unit design + commissioning plan.",
    requiredSkills: ["CAD", "Mechatronics", "Line time studies"],
    deliverables: ["Layout CAD", "BOM", "Training deck for operators"],
    timeline: "9 weeks with two dry-run Saturdays.",
    constraints: ["Ceiling height limit", "No disruption to morning milk SKU run"],
    msmeProfile: "Bharat Foods — Mumbai MIDC packaged foods exporter with Taloja production hub.",
    similarSolutions: ["Compact collators used in Indore snack MSMEs", "Collaborative pick assist in Pune FMCG"],
    suggestedTeam: [
      { name: "Neha Joshi", role: "CAD/Mech", institute: "VJTI Mumbai" },
      { name: "Arjun Pillai", role: "Controls", institute: "DJ Sanghvi" },
    ],
  },
  "ch-8": {
    problemStatement:
      "B2B parcel routing across Thane–Mumbai lanes misses real-time traffic and toll variability, inflating costs and SLA risk.",
    rootCause:
      "TMS exports are batch; dispatcher heuristics not encoded; limited telemetry from fleet partners.",
    opportunitySize: "₹28 Lakhs pilot with revenue-share extension clause.",
    requiredSkills: ["Python", "Heuristics/OR", "API integration"],
    deliverables: ["Routing module MVP", "KPI dashboard", "Dispatcher playbook"],
    timeline: "12 weeks with monsoon stress test.",
    constraints: ["Data residency preferences", "Driver SMS literacy variance"],
    msmeProfile: "Western Logistics LLP — Bhiwandi-centric 3PL with metro line-haul contracts.",
    similarSolutions: ["OSRM overlays in Bengaluru intra-city", "Maharashtra toll-aware pilots with STUs"],
    suggestedTeam: [
      { name: "Dev Apte", role: "Algorithms", institute: "IIT Bombay" },
      { name: "Maya Shah", role: "Product", institute: "NMIMS" },
    ],
  },
  "ch-9": {
    problemStatement:
      "Cold chain proof between plant and distributor is fragmented, creating audit friction for Konkan fresh exports.",
    rootCause:
      "Manual logs; device heterogeneity; weak reconciliation at handoffs.",
    opportunitySize: "₹9 Lakhs pilot budget.",
    requiredSkills: ["IoT", "Web", "CSV/API exports"],
    deliverables: ["Logger integration", "Reconciliation UI", "Audit export pack"],
    timeline: "8 weeks.",
    constraints: ["Limited IT staff on-site", "Power backup assumptions"],
    msmeProfile: "Konkan Fresh Foods Pvt Ltd — Ratnagiri processing and coastal distribution.",
    similarSolutions: ["FSSAI-aligned logger stacks in Kochi", "Maharashtra fishery cold chain pilots"],
    suggestedTeam: [
      { name: "Riya Nair", role: "Full-stack", institute: "Goa Engineering" },
      { name: "Rahul Sharma", role: "Hardware", institute: "VNIT Nagpur" },
    ],
  },
  "ch-10": {
    problemStatement:
      "New CNC lines introduce harmonics that risk utility warnings and nuisance tripping across shared MIDC feeders.",
    rootCause:
      "No unified measurement campaign; passive filter sizing uncertain; production cannot pause for long baselines.",
    opportunitySize: "₹35 Lakhs engineering + procurement envelope.",
    requiredSkills: ["Power quality", "Measurements", "Reporting"],
    deliverables: ["Harmonic survey", "Filter sizing memo", "Implementation Gantt"],
    timeline: "10 weeks with utility liaison support.",
    constraints: ["Measurement windows < 4h", "MIDC safety permits"],
    msmeProfile: "MIDC Aurangabad Controls — electrical integrator supporting Chikalthana cluster plants.",
    similarSolutions: ["Passive filter rollouts in Pimpri-Chinchwad", "IEEE 519 advisory packs from IITs"],
    suggestedTeam: [
      { name: "Siddharth Kulkarni", role: "Electrical", institute: "VIT Pune" },
      { name: "Aditi Rao", role: "Analytics", institute: "IIT Madras" },
    ],
  },
  "ch-11": {
    problemStatement:
      "Cotton bale moisture hotspots are detected late, causing disputes before auction to spinning buyers.",
    rootCause:
      "Manual probes; uneven sensor coverage; no trend visualisation for managers.",
    opportunitySize: "₹11 Lakhs cooperative-funded pilot.",
    requiredSkills: ["LoRa", "Sensors", "Dashboards"],
    deliverables: ["Sensor map", "Weekly digest", "Calibration SOP"],
    timeline: "7 weeks pre-monsoon.",
    constraints: ["Dust ingress", "Minimal cabling"],
    msmeProfile: "Solapur Ginning Cooperative — storage and auction operations for member farmers.",
    similarSolutions: ["Warehouse IoT in Nagpur agri logistics", "Textile moisture pilots in Ichalkaranji"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "IoT lead", institute: "VNIT Nagpur" },
      { name: "Pooja Bhosale", role: "Field", institute: "Solapur University" },
    ],
  },
  "ch-12": {
    problemStatement:
      "Dock doors at Chakan warehouse see morning peaks that create yard congestion and demurrage exposure.",
    rootCause:
      "First-come-first-served; no driver communication loop; loader staffing misaligned to arrivals.",
    opportunitySize: "₹19 Lakhs build + rollout.",
    requiredSkills: ["Web booking", "SMS gateway", "Operations UX"],
    deliverables: ["Driver booking web", "Yard display", "Loader roster template"],
    timeline: "9 weeks.",
    constraints: ["Hindi/Marathi SMS", "Low bandwidth kiosks"],
    msmeProfile: "Paujana Warehousing Pvt Ltd — Chakan logistics park operator.",
    similarSolutions: ["Dock slot pilots in Bhiwandi", "Port gate automation references from JNPT corridor"],
    suggestedTeam: [
      { name: "Aman Varma", role: "Full-stack", institute: "PICT" },
      { name: "Kirti Sen", role: "Ops design", institute: "SIBM Pune" },
    ],
  },
  "ch-13": {
    problemStatement:
      "Member MSMEs lack a shared view of rooftop solar generation vs. import for cluster planning and maintenance.",
    rootCause:
      "Inverter APIs not aggregated; manual Excel; no standard time granularity.",
    opportunitySize: "₹8 Lakhs cluster office funded.",
    requiredSkills: ["Data ingestion", "Visualization", "CSV exports"],
    deliverables: ["Read-only dashboard", "Member onboarding kit", "Export templates"],
    timeline: "6 weeks for 9-site pilot.",
    constraints: ["Read-only mandate", "No control commands"],
    msmeProfile: "Satara Industrial Cluster Association — representative body for member plants.",
    similarSolutions: ["MSME solar visibility pilots in Kolhapur", "Open energy monitor forks in Pune"],
    suggestedTeam: [
      { name: "Omkar Deshpande", role: "Data", institute: "COEP" },
      { name: "Rahul Sharma", role: "Edge integration", institute: "VNIT Nagpur" },
    ],
  },
  "ch-14": {
    problemStatement:
      "DC fast-charge queues at dealer workshops create customer complaints without a fair local queue policy.",
    rootCause:
      "No kiosk UX; manual priority conflicts; limited integration to service bay schedule.",
    opportunitySize: "₹15 Lakhs for kiosk + rules engine.",
    requiredSkills: ["Frontend", "Local rules", "Lightweight hardware"],
    deliverables: ["Kiosk UI", "Rules engine", "Admin override console"],
    timeline: "8 weeks with two-site pilot.",
    constraints: ["Dealer branding kit", "Offline-first blocks"],
    msmeProfile: "GreenDrive Motors — Pune service network with Baner pilot site.",
    similarSolutions: ["QMS kiosks in Mumbai retail", "EV queue pilots in Hyderabad"],
    suggestedTeam: [
      { name: "Tanvi Rao", role: "UX", institute: "MITID Pune" },
      { name: "Rahul Sharma", role: "Integration", institute: "VNIT Nagpur" },
    ],
  },
  "challenge-nag-011": {
    problemStatement: "Current search and rescue (SAR) operations using drones at night are heavily constrained by lighting. Single-purpose payload drones have limited range and battery life, and static lighting systems cannot adapt to varying altitudes or tracking requirements.",
    rootCause: "Drones equipped with standard lights waste battery illuminating non-essential areas. Fixed beam angles fail to provide adequate coverage during multi-altitude sweeps. Lack of tracking integration makes target acquisition slow and manual.",
    opportunitySize: "₹5-8 Lakhs for prototype",
    requiredSkills: ["Embedded Systems", "Optics", "Mechanical Design", "Drone Systems"],
    deliverables: ["Design swarm coordination algorithms", "Develop energy-efficient LED systems", "Create fleet communication protocols", "Implement autonomous path planning"],
    timeline: "12 weeks",
    constraints: ["Power < 50W", "Beam adjustable 10-120°"],
    msmeProfile: "Navitas (Zero Systems) — Nagpur, Maharashtra · Drones.",
    similarSolutions: ["Coordinated UAS floodlight trials in EU SAR exercises"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "Hardware", institute: "VNIT Nagpur" },
      { name: "Kirti Sen", role: "Algorithms", institute: "PICT" }
    ],
  },
  "challenge-nag-012": {
    problemStatement: "Cotton is highly flammable. Smoke detectors trigger too late. Needs thermal/vision-based early hot-spot detection with targeted suppression.",
    rootCause: "Smoke detectors rely on particle density which takes too long to accumulate in large open spaces. Suppression systems are blanket and cause excessive water damage.",
    opportunitySize: "₹8-12 Lakhs for MVP",
    requiredSkills: ["Fire Sensors", "Microcontrollers", "Suppression Systems", "Automation"],
    deliverables: ["AI vision model for hot-spot detection", "Targeted nozzle actuator prototype", "Integration with existing safety bus"],
    timeline: "10 weeks",
    constraints: ["Dust ingress in cotton mills", "False positive rate < 0.1%"],
    msmeProfile: "Automation Controls — Nagpur, Maharashtra · Manufacturing.",
    similarSolutions: ["Thermal monitoring in chemical warehousing"],
    suggestedTeam: [
      { name: "Siddharth Kulkarni", role: "Electrical", institute: "VIT Pune" },
      { name: "Dev Apte", role: "AI Vision", institute: "IIT Bombay" }
    ],
  }
};

export function isLiveOnMarketplace(c: MsmeChallengeListItem): boolean {
  if (!c.publishedToInnovators) return false;
  return c.status === "Published" || c.status === "In Progress";
}

function defaultMeta(ch: MsmeChallengeListItem): Omit<MarketplaceProblem, "challenge"> {
  return {
    city: ch.region,
    matchPct: 65,
    difficulty: "Medium",
    teamSize: "2–4",
    deadlineLabel: "Jun 30, 2026",
    deadlineSort: "2026-06-30",
    valueLabel: "₹10 Lakhs",
    valueLakh: 10,
    tags: [ch.sector],
    rewardType: "Pilot budget",
    teamMode: "Either",
    workMode: "Hybrid",
    skills: ["Generalist"],
    whyMatch: "Sector alignment",
    listedSort: "2026-04-01",
  };
}

export function buildMarketplaceProblem(ch: MsmeChallengeListItem): MarketplaceProblem {
  const m = META[ch.id] ?? defaultMeta(ch);
  return {
    challenge: ch,
    city: m.city ?? ch.region,
    matchPct: m.matchPct,
    difficulty: m.difficulty,
    teamSize: m.teamSize,
    deadlineLabel: m.deadlineLabel,
    deadlineSort: m.deadlineSort,
    valueLabel: m.valueLabel,
    valueLakh: m.valueLakh,
    tags: m.tags,
    rewardType: m.rewardType,
    teamMode: m.teamMode,
    workMode: m.workMode,
    skills: m.skills,
    whyMatch: m.whyMatch,
    listedSort: m.listedSort,
  };
}

export function getMarketplaceCatalog(): MarketplaceProblem[] {
  const combined = [...initialMsmeChallengeList, ...NAGPUR_NEXT_CHALLENGES];
  return combined.filter(isLiveOnMarketplace).map(buildMarketplaceProblem);
}

export const FEATURED_MARKETPLACE_IDS = ["challenge-nag-011", "challenge-nag-012", "ch-5"] as const;

export function getMarketplaceDetail(challengeId: string): MarketplaceProblemDetail | undefined {
  return DETAIL[challengeId];
}

export function fallbackMarketplaceDetail(ch: MsmeChallengeListItem): MarketplaceProblemDetail {
  return {
    problemStatement: ch.summary,
    rootCause:
      "Operational variability, limited telemetry, and compressed decision cycles typical of Maharashtra MSME clusters.",
    opportunitySize: "Defined with MSME sponsor after short discovery call.",
    requiredSkills: ["Problem framing", "Prototype discipline", "Stakeholder communication"],
    deliverables: ["Discovery readout", "Pilot plan", "Weekly demo cadence"],
    timeline: "8–12 weeks typical for published challenges.",
    constraints: ["Factory safety and MIDC compliance", "Export customer confidentiality where applicable"],
    msmeProfile: `${ch.company} — ${ch.region}, Maharashtra · ${ch.sector}.`,
    similarSolutions: ["Peer pilots listed in Maharashtra innovation corridor programs", "Venture Centre and SINE templates"],
    suggestedTeam: [
      { name: "Rahul Sharma", role: "Lead", institute: "VNIT Nagpur" },
      { name: "Peer match", role: "Co-solver", institute: "State incubation network" },
    ],
  };
}

export const AI_GUIDANCE_BULLETS = [
  "Medium manufacturing problems fit you best",
  "Add electronics skill to unlock 12 more problems",
  "Join Team Alpha for higher EV challenge success",
  "Complete profile for direct MSME invites",
] as const;

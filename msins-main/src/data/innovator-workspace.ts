/**
 * Innovator role workspace — Maharashtra ecosystem demo data.
 * Aligns thematically with MSME challenges (EV, agri IoT, packaging) without duplicating list IDs.
 */

export interface InnovatorProfile {
  name: string;
  institute: string;
  role: string;
  domain: string;
  skills: string[];
  cohortStatus: string;
  profileStrengthPct: number;
  matchScorePct: number;
}

export interface InnovatorKpi {
  id: string;
  label: string;
  value: string;
  hint?: string;
  /** navigable path or hash on dashboard */
  href: string;
}

export interface InnovatorProblemCard {
  id: string;
  title: string;
  msme: string;
  region: string;
  matchPct: number;
  why: string;
  valueLabel: string;
  sector: string;
  summary: string;
  problemLocation: string;
  businessImpact: string;
  desiredOutcome: string;
}

export interface InnovatorSprint {
  inCohort: boolean;
  project: string;
  stage: string;
  weekCurrent: number;
  weekTotal: number;
  tasksPending: number;
  mentorFeedbackPending: number;
  deadlineLabel: string;
  progressPct: number;
}

export const innovatorProfile: InnovatorProfile = {
  name: "Rahul Sharma",
  institute: "VNIT Nagpur",
  role: "Innovator",
  domain: "Mechanical Engineering",
  skills: ["CAD/CAM", "IoT", "Python"],
  cohortStatus: "Pre-Incubation Batch 2026",
  profileStrengthPct: 84,
  matchScorePct: 94,
};

export const innovatorKpis: InnovatorKpi[] = [
  { id: "applied", label: "Problems Applied", value: "4", hint: "Across published MSME challenges", href: "/innovator/marketplace" },
  { id: "active", label: "Active Challenges", value: "2", hint: "Shortlisted or in review", href: "/innovator/marketplace" },
  { id: "sprint", label: "Sprint Progress", value: "61%", hint: "Cohort sprint completion", href: "/innovator/sprint?from=dashboard" },
  { id: "mentor", label: "Mentor Sessions", value: "3", hint: "Completed this quarter", href: "/innovator/dashboard#mentor-activity" },
  { id: "opps", label: "Opportunities Open", value: "6", hint: "Grants, events, programs", href: "/innovator/dashboard#opportunity-feed" },
  { id: "grants", label: "Grants Won", value: "₹25,000", hint: "Startup Maharashtra micro-grant", href: "/innovator/dashboard#opportunity-feed" },
];

export const innovatorRecommendedProblems: InnovatorProblemCard[] = [
  {
    id: "inv-p-ev-cooling",
    title: "Low-cost EV battery cooling system",
    msme: "GreenDrive Motors",
    region: "Pune",
    matchPct: 94,
    why: "Mechanical + CAD + Thermal",
    valueLabel: "₹50 Lakhs",
    sector: "Electric Mobility",
    summary:
      "Design a lightweight thermal management approach for LCV battery packs assembled in Chakan, balancing BOM cost with Maharashtra summer load profiles.",
    problemLocation: "Pack integration bay — dual shift production.",
    businessImpact: "Cell derating under peak ambient; warranty exposure on thermal excursions.",
    desiredOutcome: "Validated CAD + prototype path with MIDC safety checklist alignment.",
  },
  {
    id: "inv-p-smart-irrigation",
    title: "Smart irrigation controller",
    msme: "AgriFlow Systems",
    region: "Nashik",
    matchPct: 88,
    why: "IoT + Sensors",
    valueLabel: "₹18 Lakhs",
    sector: "Agri-tech",
    summary:
      "Edge-first controller for drip blocks with unreliable connectivity; integrates with existing valve manifolds used across contract farms.",
    problemLocation: "Nashik district — rabi onion belt.",
    businessImpact: "Labour for manual rounds; over/under irrigation across plots.",
    desiredOutcome: "Field-tested firmware + dashboard alerts for supervisors.",
  },
  {
    id: "inv-p-packaging",
    title: "Packaging automation mini unit",
    msme: "Bharat Foods",
    region: "Mumbai",
    matchPct: 82,
    why: "CAD + Manufacturing",
    valueLabel: "₹12 Lakhs",
    sector: "Food Processing",
    summary:
      "Compact semi-auto station for pouch collation and case erecting on a tight shop floor in Taloja MIDC.",
    problemLocation: "Finished goods line — FMCG dispatch windows.",
    businessImpact: "Peak shift bottlenecks; inconsistent case weights for retail partners.",
    desiredOutcome: "Throughput uplift with MSME-friendly capex and training plan.",
  },
];

/** Extended pool for browse index */
export const innovatorProblemPool: InnovatorProblemCard[] = [
  ...innovatorRecommendedProblems,
  {
    id: "inv-p-navitas-drone-fleet",
    title: "SAR Drone Fleet Intelligence",
    msme: "Navitas Lighting",
    region: "Nagpur",
    matchPct: 98,
    why: "UAV Dev + Embedded systems + SAR focus",
    valueLabel: "₹36 Lakhs",
    sector: "Aerospace / Electronics",
    summary: "Coordinate a fleet of drones equipped with intelligent inflatable LED systems for large-scale Search & Rescue missions in dark zones.",
    problemLocation: "Multiple MIDC locations & Disaster sites",
    businessImpact: "Strategic entry into disaster management tech; improved product reliability in critical zones.",
    desiredOutcome: "Command hub for multi-UAV light coordination and mission telemetry."
  },
  {
    id: "prd-nag-001",
    title: "AI-Powered Shopfloor Workflow Optimization",
    msme: "Ashta Tech Automation",
    region: "Nagpur",
    matchPct: 92,
    why: "Industrial Automation + AI core",
    valueLabel: "₹15 Lakhs",
    sector: "Manufacturing",
    summary: "Develop a smart scheduling and monitoring system that optimizes production workflows and reduces idle time on the shopfloor.",
    problemLocation: "Hingna MIDC facility",
    businessImpact: "40% reduction in manual QC and scheduling overhead.",
    desiredOutcome: "Functional AI scheduler with real-time shopfloor dashboards."
  },
  {
    id: "prd-nag-003",
    title: "Smart Rental & Maintenance Management",
    msme: "Tractor Seva",
    region: "Nagpur",
    matchPct: 88,
    why: "AgriTech + IoT expertise",
    valueLabel: "₹12 Lakhs",
    sector: "Agriculture",
    summary: "Build a scalable asset tracking and health monitoring system for shared farm equipment and electric tractors.",
    problemLocation: "Remote farm clusters, Vidarbha",
    businessImpact: "Improved asset life and reduced downtime for small farmers.",
    desiredOutcome: "Mobile-first fleet management system with predictive maintenance alerts."
  },
  {
    id: "prd-nag-004",
    title: "3D Design & Production Automation",
    msme: "Modura (Aviven Engitech)",
    region: "Nagpur",
    matchPct: 84,
    why: "Design Automation + Web development",
    valueLabel: "₹8 Lakhs",
    sector: "Furniture/Manufacturing",
    summary: "Design a web-based 3D furniture configurator that automatically generates BOM and CNC-ready design files.",
    problemLocation: "Butibori MIDC plant",
    businessImpact: "Reduction in design-to-production lead time from 10 days to 24 hours.",
    desiredOutcome: "Customer-facing 3D configurator with automated fabrication output."
  },
  {
    id: "prd-nag-005",
    title: "Advanced RF/Electronic Component Tester",
    msme: "SMARK Automations",
    region: "Nagpur",
    matchPct: 95,
    why: "Electronics + RF engineering",
    valueLabel: "₹25 Lakhs",
    sector: "Defence Electronics",
    summary: "Develop an automated testing bench for high-frequency RF components and specialized communication systems.",
    problemLocation: "Sadar Tech Hub",
    businessImpact: "Strategic import substitution for testing equipment; faster certification for iDEX projects.",
    desiredOutcome: "Lab-validated RF testing unit with digital report generation."
  },
  {
    id: "prd-nag-006",
    title: "Smart Bio-Wall Monitoring System",
    msme: "Mitrasena (Biowall Agritech)",
    region: "Nagpur",
    matchPct: 81,
    why: "CleanTech + Environmental Sensors",
    valueLabel: "₹10 Lakhs",
    sector: "CleanTech",
    summary: "Create an IoT-enabled monitoring system for vertical bio-walls to track plant health and air purification levels.",
    problemLocation: "Commercial IT parks",
    businessImpact: "Data-backed evidence of air quality improvement for ESG compliance.",
    desiredOutcome: "Sensor array with real-time dashboard and automated irrigation control."
  },
  {
    id: "prd-nag-007",
    title: "Digital Metrology Integration Unit",
    msme: "Sanjay Precision Works",
    region: "Nagpur",
    matchPct: 79,
    why: "Precision Engineering + Data capture",
    valueLabel: "₹5 Lakhs",
    sector: "Precision Engineering",
    summary: "Integrate legacy metrology tools with a digital data capture system for zero-error QC logging.",
    problemLocation: "Ambazari Industrial Area",
    businessImpact: "Elimination of manual entry errors and faster customer audit cycles.",
    desiredOutcome: "Connected metrology kit with automated SPC reporting."
  },
  {
    id: "prd-nag-008",
    title: "Precision Tension Control for Industrial Winding",
    msme: "Beta Computronics",
    region: "Nagpur",
    matchPct: 86,
    why: "Embedded Systems + Control Theory",
    valueLabel: "₹18 Lakhs",
    sector: "Industrial Electronics",
    summary: "Design a precision winding control system with closed-loop tension control and vision-based quality inspection for industrial looms.",
    problemLocation: "IT Park, Nagpur",
    businessImpact: "Enhanced precision in circular loom winding; reduction in material waste and downtime.",
    desiredOutcome: "Functional control board with real-time tension monitoring and adaptive feedback."
  },
  {
    id: "prd-nag-009",
    title: "Predictive Dehydration Process Control",
    msme: "Baron Integrated Services",
    region: "Nagpur",
    matchPct: 83,
    why: "Food Tech + Process Control",
    valueLabel: "₹20 Lakhs",
    sector: "Food Processing",
    summary: "Develop a moisture-aware predictive drying controller for food dehydration to optimize energy and yield.",
    problemLocation: "Khapri Processing Cluster",
    businessImpact: "15% reduction in energy costs and 10% improvement in product yield.",
    desiredOutcome: "PLC-integrated controller with adaptive drying algorithms."
  },
  {
    id: "prd-nag-010",
    title: "AI-UX Research & Feedback Aggregator",
    msme: "Techwalnut Innovations",
    region: "Nagpur",
    matchPct: 91,
    why: "UX + AI + Software development",
    valueLabel: "₹12 Lakhs",
    sector: "IT Services",
    summary: "Build an AI tool to aggregate and sentiment-analyze user feedback across various digital touchpoints for product companies.",
    problemLocation: "Civil Lines office",
    businessImpact: "Faster product-market fit iterations for startup clients.",
    desiredOutcome: "Dashboard-driven insight engine with automated report generation."
  },
  {
    id: "prd-nag-011",
    title: "Smart Emergency Lighting Control Systems",
    msme: "Navitas (Zero Systems)",
    region: "Nagpur",
    matchPct: 94,
    why: "Embedded Systems + Power Electronics",
    valueLabel: "₹12 Lakhs",
    sector: "LED Lighting",
    summary: "Develop an intelligent controller for inflatable LED balloon lights to enable adaptive brightness and remote health monitoring.",
    problemLocation: "Narendra Nagar, Nagpur",
    businessImpact: "Strategic entry into disaster management tech; improved product reliability in critical zones.",
    desiredOutcome: "IoT-enabled lighting controller with mobile-first command center."
  },
  {
    id: "prd-nag-012",
    title: "Smart Fire Detection & Alerting",
    msme: "Automation Controls",
    region: "Nagpur",
    matchPct: 85,
    why: "Safety Systems + IoT",
    valueLabel: "₹15 Lakhs",
    sector: "Industrial Safety",
    summary: "Implement an AI-vision based smoke and fire detection system for warehouses with low-latency alerting.",
    problemLocation: "Vidarbha Cotton Belt warehouses",
    businessImpact: "Drastic reduction in fire damage response time in remote locations.",
    desiredOutcome: "Camera-integrated fire detection kit with mobile alerts."
  },
  {
    id: "prd-nag-013",
    title: "Worker Safety & Health Wearables",
    msme: "Hixaa Technologies",
    region: "Nagpur",
    matchPct: 89,
    why: "Bio-Sensors + IoT + Wearables",
    valueLabel: "₹18 Lakhs",
    sector: "Industrial IoT",
    summary: "Refine a wearable system that monitors worker health vitals and posture in high-temperature industrial environments.",
    problemLocation: "Thermal Power Plants corridor",
    businessImpact: "Regulatory compliance for DGMS and improved worker welfare.",
    desiredOutcome: "Ruggedized wearable band with cloud monitoring dashboard."
  },
  {
    id: "prd-nag-002",
    title: "Open Innovation Category",
    msme: "Student-Identified MSME",
    region: "Nagpur/Vidarbha",
    matchPct: 75,
    why: "Discovery + Field Research",
    valueLabel: "Variable",
    sector: "Any",
    summary: "Students identify a local MSME and define a problem statement through primary field research.",
    problemLocation: "Local Nagpur Industrial Hubs",
    businessImpact: "Fostering community-level innovation and ecosystem discovery.",
    desiredOutcome: "Self-defined PRD and validated problem statement."
  },
  {
    id: "inv-p-packaging-waste",
    title: "Reduce packaging waste",
    msme: "Precision Auto Components Pvt Ltd",
    region: "Pune",
    matchPct: 76,
    why: "Manufacturing + Sustainability",
    valueLabel: "₹22 Lakhs",
    sector: "Manufacturing",
    summary:
      "Reduce single-use packaging on the Pune assembly line while meeting OEM dispatch SLAs and Maharashtra Plastic Waste Management Rules compliance.",
    problemLocation: "Finished goods packing area, Chakan plant.",
    businessImpact: "Material cost overrun; recurring QC holds on dunnage consistency.",
    desiredOutcome: "Reusable or low-waste packaging workflow with measurable weight-out reduction.",
  },
  {
    id: "inv-p-smart-irrigation-msme",
    title: "Smart irrigation device",
    msme: "Sahyadri Agro Processing Pvt Ltd",
    region: "Nashik",
    matchPct: 81,
    why: "IoT + Field ops",
    valueLabel: "₹15 Lakhs",
    sector: "Agriculture",
    summary:
      "Deploy a reliable soil-moisture aware irrigation assist for contract farms in Nashik district with low connectivity tolerance.",
    problemLocation: "Peripheral farm blocks — monsoon and rabi rotation.",
    businessImpact: "Water use variability; labour hours for manual valve rounds.",
    desiredOutcome: "Sensor-driven scheduling with SMS/WhatsApp alerts for field supervisors.",
  },
];

export const innovatorSprint: InnovatorSprint = {
  inCohort: true,
  project: "Food Waste Prediction for Hostels",
  stage: "Problem Validation",
  weekCurrent: 4,
  weekTotal: 8,
  tasksPending: 3,
  mentorFeedbackPending: 2,
  deadlineLabel: "Friday 5 PM",
  progressPct: 61,
};

export const innovatorPerformanceInsights: string[] = [
  "Your prototyping score is 18% above cohort average",
  "Manufacturing challenges have highest success rate for your profile",
  "Complete profile to unlock direct MSME invites",
  "You are top 12% in engagement this month",
];

export type OpportunityAction = "apply" | "register" | "learn_more";

export interface InnovatorOpportunity {
  id: string;
  title: string;
  detail: string;
  action: OpportunityAction;
}

export const innovatorOpportunities: InnovatorOpportunity[] = [
  { id: "o1", title: "Startup Maharashtra Grant", detail: "₹2L", action: "apply" },
  { id: "o2", title: "EV Hackathon Pune", detail: "Apr 28–30 · COEP", action: "register" },
  { id: "o3", title: "Venture Centre Incubation Program", detail: "NCL Pune", action: "learn_more" },
  { id: "o4", title: "State Demo Day Mumbai", detail: "BKC Convention", action: "register" },
  { id: "o5", title: "Prototype Lab Access", detail: "VNIT Fab Lab", action: "apply" },
  { id: "o6", title: "Internship with MSME Partner", detail: "Pune cluster", action: "learn_more" },
];

export interface InnovatorMentorBlock {
  upcomingName: string;
  upcomingTime: string;
  newMessage: string;
  suggestedName: string;
  suggestedFocus: string;
}

export const innovatorMentor: InnovatorMentorBlock = {
  upcomingName: "Dr Rao",
  upcomingTime: "Friday 4 PM",
  newMessage: "Review your CAD concept before Friday.",
  suggestedName: "Priya Joshi",
  suggestedFocus: "Manufacturing Ops",
};

export const innovatorPortfolio = {
  projectsCompleted: 3,
  prototypesBuilt: 5,
  msmesHelped: 2,
  estimatedImpact: "₹7.5L",
  certificates: 4,
};

export const innovatorActivityTimeline: { id: string; label: string; time: string }[] = [
  { id: "a1", label: "Applied to EV Cooling Challenge", time: "2h ago" },
  { id: "a2", label: "Mentor session booked", time: "Yesterday" },
  { id: "a3", label: "Sprint task submitted", time: "2d ago" },
  { id: "a4", label: "Opportunity saved", time: "3d ago" },
  { id: "a5", label: "Profile updated", time: "5d ago" },
];

export function getInnovatorProblemById(id: string): InnovatorProblemCard | undefined {
  return innovatorProblemPool.find((p) => p.id === id);
}

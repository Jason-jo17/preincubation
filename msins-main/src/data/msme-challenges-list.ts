/**
 * MSME "My Challenges" list — structured for UI and future API sync.
 */

export type MsmeChallengeTab =
  | "all"
  | "draft"
  | "under_review"
  | "published"
  | "in_progress"
  | "completed"
  | "closed";

export type MsmeChallengeListStatus =
  | "Draft"
  | "Under Review"
  | "Approved"
  | "Published"
  | "In Progress"
  | "Completed"
  | "Closed"
  | "Paused";

export interface MsmeChallengeListItem {
  id: string;
  title: string;
  company: string;
  /** Region / city for context (Maharashtra) */
  region: string;
  department: string;
  sector: string;
  status: MsmeChallengeListStatus;
  applicants: number;
  /** 0–100, or null when not yet tracked */
  progress: number | null;
  publishedToInnovators: boolean;
  lastUpdated: string;
  /** For publish / verification UI */
  verificationStage: "none" | "pending_review" | "approved" | "live";
  /** Rich text for drawer */
  summary: string;
  problemLocation: string;
  businessImpact: string;
  desiredOutcome: string;
}

export const MSME_CHALLENGE_TABS: { value: MsmeChallengeTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "under_review", label: "Under Review" },
  { value: "published", label: "Published" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" },
];

export function challengeMatchesTab(item: MsmeChallengeListItem, tab: MsmeChallengeTab): boolean {
  if (tab === "all") return true;
  if (item.status === "Paused") return tab === "all";
  const map: Record<MsmeChallengeTab, MsmeChallengeListStatus[]> = {
    all: [],
    draft: ["Draft"],
    under_review: ["Under Review", "Approved"],
    published: ["Published"],
    in_progress: ["In Progress"],
    completed: ["Completed"],
    closed: ["Closed"],
  };
  return map[tab].includes(item.status);
}

export const initialMsmeChallengeList: MsmeChallengeListItem[] = [
  {
    id: "ch-1",
    title: "Reduce Packaging Waste",
    company: "Precision Auto Components Pvt Ltd",
    region: "Pune",
    department: "Operations",
    sector: "Manufacturing",
    status: "Published",
    applicants: 12,
    progress: 25,
    publishedToInnovators: true,
    lastUpdated: "Apr 12, 2026",
    verificationStage: "live",
    summary:
      "Reduce single-use packaging on the Pune assembly line while meeting OEM dispatch SLAs and Maharashtra Plastic Waste Management Rules compliance.",
    problemLocation: "Finished goods packing area, Chakan plant — daily dispatch peaks.",
    businessImpact: "Material cost overrun ~8%; recurring QC holds on dunnage consistency.",
    desiredOutcome: "Reusable or low-waste packaging workflow with measurable weight-out reduction.",
  },
  {
    id: "ch-2",
    title: "Smart Irrigation Device",
    company: "Sahyadri Agro Processing Pvt Ltd",
    region: "Nashik",
    department: "Field Operations",
    sector: "Agriculture",
    status: "In Progress",
    applicants: 6,
    progress: 68,
    publishedToInnovators: true,
    lastUpdated: "Apr 11, 2026",
    verificationStage: "live",
    summary:
      "Deploy a reliable soil-moisture aware irrigation assist for contract farms in Nashik district with low connectivity tolerance.",
    problemLocation: "Peripheral farm blocks — monsoon and rabi rotation.",
    businessImpact: "Water use variability; labour hours for manual valve rounds.",
    desiredOutcome: "Sensor-driven scheduling with SMS/WhatsApp alerts for field supervisors.",
  },
  {
    id: "ch-3",
    title: "Fabric Defect Detection",
    company: "Marathwada Textiles Pvt Ltd",
    region: "Aurangabad",
    department: "Quality",
    sector: "Textile",
    status: "Under Review",
    applicants: 8,
    progress: 0,
    publishedToInnovators: false,
    lastUpdated: "Apr 10, 2026",
    verificationStage: "pending_review",
    summary:
      "Inline vision-assisted defect tagging on grey fabric inspection before dyeing at Aurangabad unit.",
    problemLocation: "Inspection bay after weaving — three shifts.",
    businessImpact: "Customer claims on shade lots; manual inspection fatigue.",
    desiredOutcome: "Consistent defect map with traceability to loom batch.",
  },
  {
    id: "ch-4",
    title: "Energy Monitoring System",
    company: "Vidarbha Industrial Systems",
    region: "Nagpur",
    department: "Utilities",
    sector: "Energy",
    status: "Draft",
    applicants: 0,
    progress: null,
    publishedToInnovators: false,
    lastUpdated: "Apr 9, 2026",
    verificationStage: "none",
    summary:
      "Granular energy visibility across Nagpur foundry and machining halls for demand charge control.",
    problemLocation: "Main LT panels and feeder breakers — no unified telemetry today.",
    businessImpact: "Spikes in MSEDCL billing; limited ability to attribute load to process.",
    desiredOutcome: "Dashboard + alerts with export for ISO 50001 evidence.",
  },
  {
    id: "ch-5",
    title: "Low-cost EV battery cooling system",
    company: "GreenDrive Motors",
    region: "Pune",
    department: "R&D",
    sector: "Electric Mobility",
    status: "Published",
    applicants: 18,
    progress: 12,
    publishedToInnovators: true,
    lastUpdated: "Apr 13, 2026",
    verificationStage: "live",
    summary:
      "Thermal management for LCV battery packs assembled in Chakan: balance BOM cost with Maharashtra summer load profiles and OEM thermal validation gates.",
    problemLocation: "Pack integration bay — dual shift production.",
    businessImpact: "Cell derating under peak ambient; warranty exposure on thermal excursions.",
    desiredOutcome: "Validated CAD + prototype path with MIDC safety checklist alignment.",
  },
  {
    id: "ch-6",
    title: "Smart irrigation controller",
    company: "AgriFlow Systems",
    region: "Nashik",
    department: "Field IoT",
    sector: "Agriculture",
    status: "Published",
    applicants: 14,
    progress: 20,
    publishedToInnovators: true,
    lastUpdated: "Apr 13, 2026",
    verificationStage: "live",
    summary:
      "Edge-first controller for drip blocks with unreliable connectivity; integrates with existing valve manifolds across contract farms in Nashik district.",
    problemLocation: "Peripheral farm blocks — monsoon and rabi rotation.",
    businessImpact: "Water use variability; labour hours for manual valve rounds.",
    desiredOutcome: "Sensor-driven scheduling with SMS/WhatsApp alerts for field supervisors.",
  },
  {
    id: "ch-7",
    title: "Packaging mini automation unit",
    company: "Bharat Foods",
    region: "Mumbai",
    department: "Operations",
    sector: "Food Processing",
    status: "In Progress",
    applicants: 9,
    progress: 44,
    publishedToInnovators: true,
    lastUpdated: "Apr 12, 2026",
    verificationStage: "live",
    summary:
      "Compact semi-auto station for pouch collation and case erecting on a tight shop floor in Taloja MIDC with FMCG dispatch windows.",
    problemLocation: "Finished goods line — three shifts.",
    businessImpact: "Peak shift bottlenecks; inconsistent case weights for retail partners.",
    desiredOutcome: "Throughput uplift with MSME-friendly capex and operator training plan.",
  },
  {
    id: "ch-8",
    title: "Last-mile fleet routing optimisation",
    company: "Western Logistics LLP",
    region: "Mumbai",
    department: "Dispatch",
    sector: "Logistics",
    status: "Published",
    applicants: 22,
    progress: 8,
    publishedToInnovators: true,
    lastUpdated: "Apr 12, 2026",
    verificationStage: "live",
    summary:
      "Dynamic routing for B2B parcels across Thane–Mumbai corridors with traffic and toll variability; integrate with existing TMS exports.",
    problemLocation: "Bhiwandi hub + satellite depots.",
    businessImpact: "Fuel burn and SLA penalties on peak days.",
    desiredOutcome: "Heuristic + API-ready module with pilot KPI dashboard.",
  },
  {
    id: "ch-9",
    title: "Cold chain temperature traceability",
    company: "Konkan Fresh Foods Pvt Ltd",
    region: "Ratnagiri",
    department: "Quality",
    sector: "Food Processing",
    status: "Published",
    applicants: 11,
    progress: 15,
    publishedToInnovators: true,
    lastUpdated: "Apr 11, 2026",
    verificationStage: "live",
    summary:
      "Continuous temperature proof for reefers and plant cold rooms aligned with FSSAI expectations and retailer audit trails.",
    problemLocation: "Plant gate to distributor docks.",
    businessImpact: "Spoilage disputes; manual log reconciliation.",
    desiredOutcome: "Low-cost loggers + cloud reconciliation with export for audits.",
  },
  {
    id: "ch-10",
    title: "AC drive harmonic mitigation pilot",
    company: "MIDC Aurangabad Controls",
    region: "Aurangabad",
    department: "Electrical",
    sector: "Manufacturing",
    status: "Published",
    applicants: 7,
    progress: 5,
    publishedToInnovators: true,
    lastUpdated: "Apr 11, 2026",
    verificationStage: "live",
    summary:
      "Measure and reduce harmonics on new CNC lines to avoid utility penalties and protect sensitive drives across Chikalthana MIDC units.",
    problemLocation: "Main PCC — two incoming feeders.",
    businessImpact: "Utility warnings; nuisance tripping on adjacent lines.",
    desiredOutcome: "Baseline report + passive filter sizing with implementation roadmap.",
  },
  {
    id: "ch-11",
    title: "Cotton bale moisture IoT monitoring",
    company: "Solapur Ginning Cooperative",
    region: "Solapur",
    department: "Storage",
    sector: "Textile",
    status: "Published",
    applicants: 10,
    progress: 18,
    publishedToInnovators: true,
    lastUpdated: "Apr 10, 2026",
    verificationStage: "live",
    summary:
      "Wireless moisture trend monitoring inside godowns to reduce spoilage risk before auction lots move to spinning buyers.",
    problemLocation: "Warehouse rows A–F.",
    businessImpact: "Moisture disputes; manual probe sampling gaps.",
    desiredOutcome: "Sensor grid + weekly digest for managers.",
  },
  {
    id: "ch-12",
    title: "Warehouse dock door scheduling",
    company: "Paujana Warehousing Pvt Ltd",
    region: "Pune",
    department: "Yard",
    sector: "Logistics",
    status: "Published",
    applicants: 16,
    progress: 22,
    publishedToInnovators: true,
    lastUpdated: "Apr 10, 2026",
    verificationStage: "live",
    summary:
      "Slot booking for inbound trucks to reduce yard congestion at Chakan logistics park during peak FMCG windows.",
    problemLocation: "12 dock doors — morning peak.",
    businessImpact: "Demurrage charges; loader idle time.",
    desiredOutcome: "Simple web booking + SMS confirmations for drivers.",
  },
  {
    id: "ch-13",
    title: "Solar rooftop generation visibility",
    company: "Satara Industrial Cluster Association",
    region: "Satara",
    department: "Energy",
    sector: "Energy",
    status: "Published",
    applicants: 6,
    progress: 10,
    publishedToInnovators: true,
    lastUpdated: "Apr 9, 2026",
    verificationStage: "live",
    summary:
      "Aggregate rooftop solar generation across member MSMEs for group net-metering visibility and shared maintenance planning.",
    problemLocation: "Member plants — 9 sites pilot.",
    businessImpact: "Opaque generation vs. import; maintenance coordination gaps.",
    desiredOutcome: "Read-only dashboard + CSV export for cluster office.",
  },
  {
    id: "ch-14",
    title: "EV charging queue management kiosk",
    company: "GreenDrive Motors",
    region: "Pune",
    department: "Customer Experience",
    sector: "Electric Mobility",
    status: "Published",
    applicants: 13,
    progress: 7,
    publishedToInnovators: true,
    lastUpdated: "Apr 9, 2026",
    verificationStage: "live",
    summary:
      "Queue fairness and ETA display for service-centre DC fast chargers without heavy cloud dependency for dealer workshops.",
    problemLocation: "Baner service centre — two DC bays.",
    businessImpact: "Customer complaints; charger idle vs. queue imbalance.",
    desiredOutcome: "Kiosk UI + local rules engine with admin override.",
  },
];

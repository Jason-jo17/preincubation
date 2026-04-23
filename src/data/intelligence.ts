export interface IndustryGap {
  id: string;
  title: string;
  sector: string;
  description: string;
  severity: "Critical" | "High" | "Medium";
  location: string;
}

export interface TalentMatch {
  id: string;
  projectName: string;
  innovator: string;
  score: number;
  sector: string;
  readinessLevel: string;
}

export const industryGaps: IndustryGap[] = [
  {
    id: "GAP-001",
    title: "Cold Chain Automation",
    sector: "Agri-Tech",
    description: "Lack of real-time monitoring in small-scale rural cold storage units leading to 30% spoilage.",
    severity: "Critical",
    location: "Dharwad District",
  },
  {
    id: "GAP-002",
    title: "Precision Casting Gaps",
    sector: "Manufacturing",
    description: "Inconsistencies in material purity for aerospace grade components in tier-2 supplier networks.",
    severity: "High",
    location: "Belagavi Hub",
  },
  {
    id: "GAP-003",
    title: "Direct-to-Farmer Fintech",
    sector: "Fintech",
    description: "Delayed payment processing for cooperative societies causing cash flow constraints for small growers.",
    severity: "Medium",
    location: "Dakshina Kannada",
  },
];

export const talentMatches: TalentMatch[] = [
  {
    id: "T-001",
    projectName: "SolarMesh",
    innovator: "Rahul S.",
    score: 94,
    sector: "Renewables",
    readinessLevel: "TRL-6 (Prototype)",
  },
  {
    id: "T-002",
    projectName: "AquaFilter Pro",
    innovator: "Priya M.",
    score: 88,
    sector: "Sustainability",
    readinessLevel: "TRL-4 (Lab Validated)",
  },
  {
    id: "T-003",
    projectName: "EdgeVision AI",
    innovator: "Team Cyber",
    score: 91,
    sector: "AI/ML",
    readinessLevel: "TRL-5 (Simulated Environment)",
  },
];

/** MSME Business Hub — consolidated resources, funding, ops, and company data. */

export const BUSINESS_HUB_TAB_VALUES = [
  "resources",
  "funding",
  "labs",
  "mentors",
  "events",
  "messages",
  "completed",
  "company",
  "reports",
] as const;

export type BusinessHubTabValue = (typeof BUSINESS_HUB_TAB_VALUES)[number];

export function normalizeBusinessHubTab(tab: string | null): BusinessHubTabValue {
  if (tab && (BUSINESS_HUB_TAB_VALUES as readonly string[]).includes(tab)) return tab as BusinessHubTabValue;
  return "resources";
}

export const businessHubTabs: { value: BusinessHubTabValue; label: string }[] = [
  { value: "resources", label: "Resources" },
  { value: "funding", label: "Funding" },
  { value: "labs", label: "Labs & Infra" },
  { value: "mentors", label: "Mentors" },
  { value: "events", label: "Events" },
  { value: "messages", label: "Messages" },
  { value: "completed", label: "Completed Projects" },
  { value: "company", label: "Company Profile" },
  { value: "reports", label: "Reports" },
];

export const resourceCards = [
  { id: "r1", title: "How to Write Better Challenges", summary: "Templates and reviewer checklist for clear problem statements." },
  { id: "r2", title: "IP Basics for MSMEs", summary: "Patents, trade secrets, and Maharashtra filing pathways." },
  { id: "r3", title: "Lean Manufacturing Checklist", summary: "5S, VSM, and Kaizen prompts for shop-floor teams." },
  { id: "r4", title: "Automation Starter Guide", summary: "PLC, sensors, and pilot sizing for first automation wins." },
  { id: "r5", title: "Export Readiness Toolkit", summary: "Documentation, compliance, and logistics readiness." },
] as const;

export const fundingSchemes = [
  {
    id: "f1",
    name: "MSME Credit Linked Capital Subsidy",
    eligibility: "Manufacturing MSMEs upgrading plant & machinery",
    supportAmount: "Up to 15% subsidy on eligible machinery",
    deadline: "Jun 30, 2026",
  },
  {
    id: "f2",
    name: "SIDBI Support Program",
    eligibility: "Innovation-linked working capital and term needs",
    supportAmount: "Structured credit + advisory",
    deadline: "Rolling",
  },
  {
    id: "f3",
    name: "Maharashtra Startup Support",
    eligibility: "Registered startups with Maharashtra operations",
    supportAmount: "Seed support + TBI credits",
    deadline: "Apr 22, 2026",
  },
  {
    id: "f4",
    name: "Cluster Development Scheme",
    eligibility: "Cluster SPVs and lead firms",
    supportAmount: "Shared infra & training grants",
    deadline: "May 15, 2026",
  },
  {
    id: "f5",
    name: "Technology Upgrade Grant",
    eligibility: "MSMEs adopting Industry 4.0 tools",
    supportAmount: "Up to ₹25L per approved project",
    deadline: "Mar 31, 2026",
  },
] as const;

export const labInfraRows = [
  { id: "l1", name: "COEP Prototyping Lab", location: "Pune", capabilities: "3D Printing / CAD / CNC" },
  { id: "l2", name: "Venture Centre Pune", location: "Pune", capabilities: "R&D Labs" },
  { id: "l3", name: "ARAI Testing Facility", location: "Pune", capabilities: "EV / Automotive Testing" },
  { id: "l4", name: "SPPU Innovation Lab", location: "Pune", capabilities: "Materials · Electronics · Prototyping" },
] as const;

export const mentorProfiles = [
  { id: "m1", name: "Rakesh Kulkarni", focus: "Manufacturing Operations", org: "Independent · Pune" },
  { id: "m2", name: "Priya Joshi", focus: "Packaging & Sustainability", org: "Venture Centre network" },
  { id: "m3", name: "Amit Deshpande", focus: "Automation Systems", org: "COEP Bhau Institute" },
] as const;

export const hubEvents = [
  "Maharashtra Innovation Summit",
  "Funding Readiness Workshop",
  "Smart Manufacturing Expo Pune",
  "AgriTech Connect Nashik",
] as const;

export const messageThreads = [
  { id: "t1", channel: "Teams", title: "COEP Solver Team — packaging sprint", preview: "Milestone 2 evidence uploaded", time: "1h ago" },
  { id: "t2", channel: "Mentors", title: "Rakesh Kulkarni", preview: "Suggested line layout for Chakan", time: "Yesterday" },
  { id: "t3", channel: "Platform Admin", title: "Verification complete", preview: "Your challenge is live to innovators", time: "2d ago" },
  { id: "t4", channel: "Support", title: "Ticket #4821", preview: "NDA template attached", time: "3d ago" },
] as const;

export const completedProjectsRows = [
  {
    id: "c1",
    challenge: "Packaging Waste",
    team: "COEP Solver Team",
    outcome: "Prototype Deployed",
    score: "4.8",
    impact: "18% Waste Reduced",
  },
  {
    id: "c2",
    challenge: "Smart Irrigation",
    team: "AgriBot Labs",
    outcome: "Pilot Running",
    score: "4.7",
    impact: "22% Water Saved",
  },
] as const;

export const reportCards = [
  { id: "rep1", title: "Monthly Challenge Summary", description: "Postings, applicants, and conversion funnel." },
  { id: "rep2", title: "Solver Performance Report", description: "Delivery, quality, and mentor ratings." },
  { id: "rep3", title: "Response Time Report", description: "MSME reply SLAs vs cohort benchmarks." },
  { id: "rep4", title: "Innovation ROI Summary", description: "Cost avoidance and pilot value realized." },
] as const;

export const companyProfileDefaults = {
  companyName: "Precision Auto Components Pvt Ltd",
  sector: "Manufacturing",
  city: "Pune",
  size: "120–150 employees",
  website: "https://precisionauto.example",
  keyProblemAreas: "Packaging waste, energy monitoring, line balancing",
  preferredDomains: "CAD, automation, IoT telemetry, lean",
  contactPerson: "Demo User — Operations Head",
} as const;

export const businessHubDataset = {
  tabs: businessHubTabs,
  resources: resourceCards,
  funding: fundingSchemes,
  labs: labInfraRows,
  mentors: mentorProfiles,
  events: hubEvents,
  messages: messageThreads,
  completed: completedProjectsRows,
  company: companyProfileDefaults,
  reports: reportCards,
} as const;

/**
 * Cross-role bridge: innovator marketplace actions surface on MSME Applicants,
 * and accepted work feeds the innovator sprint context.
 */

import type { MsmeApplicantRow } from "@/data/msme-applicants-workspace";
import type { MarketplaceProblem } from "@/data/innovator-marketplace-catalog";

export type InnovatorSubmissionStatus = "Applied" | "In Review" | "Shortlisted" | "Accepted" | "Completed";

export interface InnovatorMarketplaceSubmission {
  id: string;
  challengeId: string;
  title: string;
  company: string;
  status: InnovatorSubmissionStatus;
  updatedLabel: string;
}

export interface AcceptedSprintContext {
  challengeId: string;
  title: string;
  company: string;
  acceptedAtLabel: string;
}

type Listener = () => void;
const listeners = new Set<Listener>();

let hubVersion = 0;

export function getMarketplaceHubVersion() {
  return hubVersion;
}

function emit() {
  hubVersion += 1;
  listeners.forEach((l) => l());
}

export function subscribeInnovatorMarketplaceHub(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

let extraApplicants: MsmeApplicantRow[] = [
  {
    id: "app-mkt-seed-1",
    teamName: "VNIT Nagpur · Rahul Sharma",
    source: "Innovator Marketplace",
    matchScore: 94,
    skills: "CAD, Mechanical, Thermal",
    status: "New",
  },
  {
    id: "app-mkt-seed-2",
    teamName: "VNIT Nagpur · Rahul Sharma",
    source: "Innovator Marketplace",
    matchScore: 88,
    skills: "IoT, Sensors, Firmware",
    status: "Reviewed",
  },
  {
    id: "app-mkt-seed-3",
    teamName: "VNIT Nagpur · Rahul Sharma",
    source: "Innovator Marketplace",
    matchScore: 82,
    skills: "CAD, Mechatronics",
    status: "Reviewed",
  },
  {
    id: "app-mkt-seed-4",
    teamName: "VNIT Nagpur · Rahul Sharma",
    source: "Innovator Marketplace",
    matchScore: 74,
    skills: "Python, OR, APIs",
    status: "New",
  },
];

let submissions: InnovatorMarketplaceSubmission[] = [
  {
    id: "sub-seed-1",
    challengeId: "ch-5",
    title: "Low-cost EV battery cooling system",
    company: "GreenDrive Motors",
    status: "Applied",
    updatedLabel: "Apr 12",
  },
  {
    id: "sub-seed-2",
    challengeId: "ch-6",
    title: "Smart irrigation controller",
    company: "AgriFlow Systems",
    status: "Applied",
    updatedLabel: "Apr 11",
  },
  {
    id: "sub-seed-3",
    challengeId: "ch-7",
    title: "Packaging mini automation unit",
    company: "Bharat Foods",
    status: "Applied",
    updatedLabel: "Apr 10",
  },
  {
    id: "sub-seed-4",
    challengeId: "ch-8",
    title: "Last-mile fleet routing optimisation",
    company: "Western Logistics LLP",
    status: "Applied",
    updatedLabel: "Apr 9",
  },
  {
    id: "sub-seed-5",
    challengeId: "ch-1",
    title: "Reduce Packaging Waste",
    company: "Precision Auto Components Pvt Ltd",
    status: "In Review",
    updatedLabel: "Apr 8",
  },
  {
    id: "sub-seed-6",
    challengeId: "ch-2",
    title: "Smart Irrigation Device",
    company: "Sahyadri Agro Processing Pvt Ltd",
    status: "In Review",
    updatedLabel: "Apr 7",
  },
  {
    id: "sub-seed-7",
    challengeId: "ch-9",
    title: "Cold chain temperature traceability",
    company: "Konkan Fresh Foods Pvt Ltd",
    status: "Shortlisted",
    updatedLabel: "Apr 6",
  },
  {
    id: "sub-seed-8",
    challengeId: "ch-14",
    title: "EV charging queue management kiosk",
    company: "GreenDrive Motors",
    status: "Accepted",
    updatedLabel: "Apr 5",
  },
];

let savedProblemIds = new Set<string>(["ch-5", "ch-12", "ch-2"]);

let acceptedSprintContext: AcceptedSprintContext | null = {
  challengeId: "ch-14",
  title: "EV charging queue management kiosk",
  company: "GreenDrive Motors",
  acceptedAtLabel: "Apr 5, 2026",
};

export function getMarketplaceOriginatedApplicants(): MsmeApplicantRow[] {
  return [...extraApplicants];
}

export function getInnovatorSubmissions(): InnovatorMarketplaceSubmission[] {
  return [...submissions];
}

export function getSavedProblemIds(): string[] {
  return [...savedProblemIds];
}

export function isProblemSaved(challengeId: string): boolean {
  return savedProblemIds.has(challengeId);
}

export function toggleSavedProblem(challengeId: string): boolean {
  if (savedProblemIds.has(challengeId)) {
    savedProblemIds = new Set([...savedProblemIds].filter((id) => id !== challengeId));
    emit();
    return false;
  }
  savedProblemIds = new Set([...savedProblemIds, challengeId]);
  emit();
  return true;
}

function mapInnovatorStatusToMsmeRowStatus(s: InnovatorSubmissionStatus): MsmeApplicantRow["status"] {
  if (s === "Applied") return "New";
  if (s === "In Review") return "Reviewed";
  if (s === "Shortlisted") return "Shortlisted";
  if (s === "Accepted" || s === "Completed") return "Selected";
  return "New";
}

export function applyToMarketplaceProblem(mp: MarketplaceProblem): { already: boolean } {
  const challengeId = mp.challenge.id;
  const exists = submissions.some((s) => s.challengeId === challengeId);
  if (exists) return { already: true };

  const id = `sub-${Date.now()}`;
  submissions = [
    ...submissions,
    {
      id,
      challengeId,
      title: mp.challenge.title,
      company: mp.challenge.company,
      status: "Applied",
      updatedLabel: "Just now",
    },
  ];

  const appId = `app-mkt-${Date.now()}`;
  const row: MsmeApplicantRow = {
    id: appId,
    teamName: "VNIT Nagpur · Rahul Sharma",
    source: "Innovator Marketplace",
    matchScore: mp.matchPct,
    skills: mp.skills.join(", "),
    status: mapInnovatorStatusToMsmeRowStatus("Applied"),
  };
  extraApplicants = [...extraApplicants, row];

  emit();
  return { already: false };
}

/** When MSME accepts an innovator, call this to move execution into sprint context. */
export function markSubmissionAcceptedForSprint(challengeId: string, title: string, company: string) {
  submissions = submissions.map((s) =>
    s.challengeId === challengeId && s.status !== "Completed"
      ? { ...s, status: "Accepted" as const, updatedLabel: "Just now" }
      : s,
  );
  acceptedSprintContext = {
    challengeId,
    title,
    company,
    acceptedAtLabel: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
  };
  emit();
}

export function markSubmissionCompleted(challengeId: string) {
  submissions = submissions.map((s) =>
    s.challengeId === challengeId ? { ...s, status: "Completed" as const, updatedLabel: "Just now" } : s,
  );
  if (acceptedSprintContext?.challengeId === challengeId) {
    acceptedSprintContext = null;
  }
  emit();
}

export function getAcceptedSprintContext(): AcceptedSprintContext | null {
  return acceptedSprintContext;
}

export function countSubmissionsByStatus(): Record<InnovatorSubmissionStatus, number> {
  const base: Record<InnovatorSubmissionStatus, number> = {
    Applied: 0,
    "In Review": 0,
    Shortlisted: 0,
    Accepted: 0,
    Completed: 0,
  };
  submissions.forEach((s) => {
    base[s.status] += 1;
  });
  return base;
}

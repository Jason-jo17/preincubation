/**
 * Single source of truth — Kiran / Navitas Lighting / Nagpur NEXT active challenge.
 * Dashboard, sprint, profile, marketplace, and MSME rows derive from this object.
 */

const PDF = "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf";
const THUMB = "/placeholder.svg";

export const innovatorActiveChallenge = {
  ids: {
    msmeChallengeId: "ch-navitas-lighting-drone",
    innovatorProblemId: "inv-p-navitas-drone-fleet",
  },
  student: {
    displayName: "Kiran",
    initials: "K",
    role: "Principal Full-Stack Innovator",
  },
  mentor: {
    name: "Mrs. Rashmi Kulkarni",
    role: "Lead Engineer, Navitas Lighting",
    expertise: "Optical Systems, Industrial Lighting",
    contact: "rashmi.k@navitas.in",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rashmi",
    feedbackBullets: [
      "Strong real-world disaster use case",
      "Improve battery runtime assumptions",
      "Add fail-safe communication logic",
      "Excellent modular payload concept",
      "Ready for pilot demo",
    ] as const,
    timeline: [
      { id: "mf-0", author: "Mrs. Rashmi Kulkarni", message: "Strong real-world disaster use case" },
      { id: "mf-1", author: "Mrs. Rashmi Kulkarni", message: "Improve battery runtime assumptions" },
      { id: "mf-2", author: "Mrs. Rashmi Kulkarni", message: "Add fail-safe communication logic" },
      { id: "mf-3", author: "Mrs. Rashmi Kulkarni", message: "Excellent modular payload concept" },
      { id: "mf-4", author: "Mrs. Rashmi Kulkarni", message: "Ready for pilot demo" },
    ] as const,
  },
  projects: [
    {
      id: "project-drone",
      title: "SAR Drone Lighting Systems",
      projectName: "Intelligent Modular Drone System",
      linkedAcademicContext: "Nagpur NEXT Innovation Program",
      college: "VNIT Nagpur",
      branch: "Electronics & Communication Engineering",
      courseName: "B.Tech Final Year",
      cos: [
        "CO1: Design of Multi-UAV coordination protocols under mesh latency",
        "CO2: Configuration of high-intensity LED payloads for aerial optics",
        "CO3: Implementation of fail-safe communication logic for disaster zones"
      ],
      assignedMsme: "Navitas Lighting",
      progress: 85,
      isLive: true,
      icon: "Zap",
      mentor: {
        name: "Mrs. Rashmi Kulkarni",
        role: "Lead Engineer, Navitas Lighting",
        expertise: "Optical Systems, Industrial Lighting",
        contact: "rashmi.k@navitas.in",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rashmi",
      }
    },
    {
      id: "project-ece",
      title: "VibrationSense AI",
      projectName: "VibrationSense AI - Industrial Maintenance",
      linkedAcademicContext: "ECE Major Project · Nagpur University",
      college: "G.H. Raisoni College of Engineering, Nagpur",
      branch: "Electronics Engineering",
      courseName: "B.E. Major Project",
      cos: [
        "CO4: Real-time vibration signal processing using tensor-flow edge",
        "CO5: Optimization of predictive maintenance algorithms for industrial motors",
        "CO6: Integration of cloud-based health monitoring dashboards"
      ],
      assignedMsme: "TATA Motors (Industrial)",
      progress: 100,
      isLive: false,
      icon: "Activity",
      mentor: {
        name: "Dr. Anil Deshmukh",
        role: "Professor, ECE Department",
        expertise: "Digital Signal Processing, Machine Learning",
        contact: "a.deshmukh@vnit.ac.in",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Anil",
      }
    }
  ],
  portfolioProjects: [
    {
      id: "project-drone",
      title: "SAR Drone Lighting Systems",
      company: "Navitas (Zero Systems)",
      desc: "Collaborating with Navitas (Zero Systems) on adaptive optics for UAV search operations.",
      progress: 85,
      isLive: true,
      icon: "Zap"
    },
    {
      id: "project-ev",
      title: "VibrationSense AI",
      company: "TATA Motors (Industrial)",
      desc: "Predictive maintenance for industrial motor assemblies using edge-compute tensors.",
      progress: 100,
      isLive: false,
      icon: "Activity"
    },
    {
      id: "project-future",
      title: "Autonomous Fleet Integration",
      company: "Future Mobility Hub",
      desc: "Next phase system integration and pilot testing for mass manufacturing workflows.",
      progress: 0,
      isLive: false,
      isComingSoon: true,
      icon: "Target"
    }
  ],
  cohort: {
    name: "Nagpur NEXT",
    programTitle: "Nagpur NEXT Program",
  },
  project: {
    name: "Intelligent Modular Drone System",
    status: "In Progress" as const,
    overallProgressPct: 72,
    nextReview: "22 Apr 2026",
    weekCurrent: 8,
    weekTotal: 12,
    demoDaysLeft: 34,
    stageLabel: "Validate & build",
  },
  msme: {
    company: "Navitas Lighting",
    sector: "Electronics Manufacturing",
    domain: "Robotics",
    region: "Nagpur",
    department: "Advanced Lighting Systems",
    poc: "Mrs. Rashmi Kulkarni",
    website: "https://www.navitaslighting.in/",
    about:
      "Navitas Lighting designs and manufactures intelligent lighting systems for industrial and emergency-response applications across Maharashtra.",
    metaBadges: ["Live Challenge", "MSME Sponsored", "Electronics", "High Impact"],
  },
  problemStatement:
    "How might we enable coordinated fleets of drones with intelligent lighting systems to cover large dark zones efficiently during search-and-rescue missions?",
  /** Full specification copy for modals, marketplace detail, and MSME alignment (same PS + company as above). */
  specification: {
    rootCause:
      "Ad-hoc lighting on single-UAS sorties; weak formation discipline; limited lux telemetry back to incident command.",
    opportunitySize: "₹36 Lakhs program envelope including MSME co-investment for pilot fleet kits.",
    requiredSkills: ["Multi-UAS coordination", "Lighting control", "Embedded power", "Field safety"] as const,
    deliverables: [
      "Validated coverage KPIs for dark-zone missions",
      "Prototype lighting payload + bench report",
      "Manufacturing readiness pack with Navitas line",
    ] as const,
    timeline: "Nagpur NEXT sprint cadence with bench and limited field windows.",
    constraints: ["DGCA operational envelopes", "Night-flight safety SOPs", "Dust/fog degradation"] as const,
    msmeProfileLine:
      "Navitas Lighting — industrial and emergency-response intelligent lighting systems, Nagpur.",
    similarSolutions: [
      "Coordinated UAS floodlight trials in EU SAR exercises",
      "Adaptive landing-zone illuminators for helos",
    ] as const,
  },
  industryVisit: {
    blurb:
      "On-site visit in Nagpur: walk lighting assembly and integration bays, confirm drone payload interfaces with production, and align on a safe night-demo protocol with Mrs. Rashmi Kulkarni’s team.",
  },
  levels: {
    trl: 4,
    crl: 2,
    irl: 3,
  },
  dashboard: {
    summaryKpis: [
      { id: "tasks", label: "Tasks Completed", value: "18", delta: "+2", positive: true },
      { id: "reviews", label: "Pending Review", value: "3", delta: "+1", positive: false },
      { id: "deliverables", label: "Deliverables Submitted", value: "5", delta: "+1", positive: true },
      { id: "mentor", label: "Mentor Score", value: "8.8/10", delta: "+0.3", positive: true },
    ],
    quickWidgets: {
      latestMentorComment:
        "Strong real-world disaster use case — tighten battery runtime assumptions before pilot demo.",
      upcomingDeadline: {
        label: "Sprint 6 · MVP build — testing logs checkpoint",
        date: "22 May 2026",
      },
      deliverableStatus: {
        submitted: 5,
        expected: 8,
        summary: "5 of 8 evidence packs submitted",
      },
      teamMembers: [
        { name: "Kiran", role: "Lead · Systems" },
        { name: "Asha Patil", role: "Embedded" },
        { name: "Vikram Deshmukh", role: "CAD / Structures" },
        { name: "Neha Soni", role: "AI / Lighting logic" },
      ],
    },
  },
  skills: [
    "React.js",
    "FastAPI",
    "ROS basics",
    "Embedded C",
    "CAD",
    "Computer vision",
    "Leadership",
    "Field testing",
  ] as const,
  deliverableVault: [
    { id: "d1", fileName: "MSME_Context.pdf", url: PDF, kind: "pdf" as const },
    { id: "d2", fileName: "Product_Requirements.pdf", url: PDF, kind: "pdf" as const },
    { id: "d3", fileName: "Concept_Architecture.pdf", url: PDF, kind: "pdf" as const },
    { id: "d4", fileName: "CAD_Electronics_Logic.pdf", url: PDF, kind: "pdf" as const },
    { id: "d5", fileName: "Prototype_Dev_Log.pdf", url: PDF, kind: "pdf" as const },
  ],
  milestones: [
    "Phase 1 — Discover Problem: requirements gate pending mentor sign-off",
    "Phase 2 — Design Solution: engineering package approved",
    "Phase 3 — Prototype build in progress",
    "Business feasibility sprint starts after integration test",
  ],
  cohortRank: {
    rank: 5,
    totalTeams: 42,
    attendancePct: 94,
    submissionConsistency: "Strong" as const,
  },
  sprint: {
    challengeBrief: {
      msmeOverview:
        "Navitas Lighting supplies intelligent, ruggedized lighting for industrial plants and emergency fleets, with growing focus on portable systems that pair with UAV operations in Maharashtra.",
      whyItMatters:
        "Night SAR corridors often lack coordinated illumination; single-drone spotlights leave shadows and fatigue pilots. Fleet-scale adaptive lighting can shrink time-to-find and improve command visibility.",
      expectedImpact:
        "Target 25–40% faster coverage of priority grid cells in exercises, with a manufacturable payload module Navitas can pilot with district responders.",
    },
    ideaSubmission: {
      fileName: "Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf",
      status: "Approved" as const,
      pdfUrl: "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf",
      previewThumbUrls: [
        "/slide_1.png",
        "/slide_2.png",
        "/slide_3.png",
        "/slide_4.png"
      ] as const,
    },
    header: {
      stage: "Validate & build",
      currentPhaseTitle: "Phase 3: Prototype Development",
      currentSprintTitle: "Sprint 6: MVP Build",
    },
    executionPhases: [],

  },
} as const;

export type InnovatorTaskStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "under_review"
  | "approved"
  | "rework_needed"
  | "completed"
  | "locked";

export type InnovatorEvidenceItem = {
  id: string;
  title: string;
  url: string;
  kind: "pdf" | "image" | "sheet";
};

export type InnovatorSprintTask = {
  id: string;
  name: string;
  subtitle: string;
  status: InnovatorTaskStatus;
  dueDate: string;
  mentor: string;
  submitted?: boolean;
  mentorReview?: "Approved" | "Pending Review";
  progressPct?: number;
  sprintGate?: boolean;
  lockReason?: string;
  toolLabel: string;
  objective: string;
  mentorComments?: string[];
  score?: string;
  evidence?: InnovatorEvidenceItem[];
  resources?: import("./nagpur-next-program-config").NagpurProgramResource[];
  smeData?: import("./nagpur-next-program-config").NagpurProgramSme[];
};

export type InnovatorSprint = {
  id: string;
  name: string;
  locked: boolean;
  lockHint?: string;
  defaultOpen: boolean;
  evidenceNote?: string;
  tasks: InnovatorSprintTask[];
  resources?: import("./nagpur-next-program-config").NagpurProgramResource[];
  smeData?: import("./nagpur-next-program-config").NagpurProgramSme[];
};

export type InnovatorExecutionPhase = {
  id: string;
  title: string;
  index: number;
  defaultOpen: boolean;
  collapsedSprintLabels: string[];
  sprints: InnovatorSprint[];
};

export const nagpurNextSprintMsmeChallengeId = innovatorActiveChallenge.ids.msmeChallengeId;
export const nagpurNextSprintInnovatorProblemId = innovatorActiveChallenge.ids.innovatorProblemId;

export const nagpurNextSprintChallengeBrief = innovatorActiveChallenge.sprint.challengeBrief;
export const nagpurNextIdeaSubmission = innovatorActiveChallenge.sprint.ideaSubmission;

export const nagpurNextIndustryChallenge = {
  title: "Assigned industry challenge",
  problemStatement: innovatorActiveChallenge.problemStatement,
  company: innovatorActiveChallenge.msme.company,
  about: innovatorActiveChallenge.msme.about,
  sector: innovatorActiveChallenge.msme.sector,
  domain: innovatorActiveChallenge.msme.domain,
  location: innovatorActiveChallenge.msme.region,
  department: innovatorActiveChallenge.msme.department,
  industrySpoc: innovatorActiveChallenge.msme.poc,
  website: innovatorActiveChallenge.msme.website,
  metaBadges: innovatorActiveChallenge.msme.metaBadges,
} as const;

export type NagpurSprintTask = InnovatorSprintTask;
export type NagpurTaskStatus = InnovatorTaskStatus;
export type NagpurPhase = InnovatorExecutionPhase;
export type NagpurSprint = InnovatorSprint;

export const nagpurNextMentorFeedbackTimeline = innovatorActiveChallenge.mentor.timeline;
export const nagpurNextMentorFeedbackBullets = innovatorActiveChallenge.mentor.feedbackBullets;
export const nagpurNextDeliverableVault = innovatorActiveChallenge.deliverableVault;
export const nagpurNextDeliverables = innovatorActiveChallenge.deliverableVault.map((d) => d.fileName);
export const nagpurNextMilestones = innovatorActiveChallenge.milestones;
export const nagpurNextCohortRank = innovatorActiveChallenge.cohortRank;
export const nagpurNextSpecification = innovatorActiveChallenge.specification;
export const nagpurNextIndustryVisit = innovatorActiveChallenge.industryVisit;

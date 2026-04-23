export const platformPipeline = {
  talentPool: 18400,
  teamsFormed: 4200,
  projectsInCohorts: 1280,
  prototypesBuilt: 810,
  msmePilots: 486,
  activeInnovationProjects: 612,
} as const;

export const platformEconomicRoi = {
  publicInvestmentCr: 84,
  totalValueGeneratedCr: 286,
  breakdown: [
    { label: "Startup Revenue", valueCr: 126, pct: 44 },
    { label: "MSME Savings", valueCr: 72, pct: 25 },
    { label: "Jobs Value", valueCr: 54, pct: 19 },
    { label: "Follow-on Investment", valueCr: 34, pct: 12 },
  ],
} as const;

export const platformKpis = {
  fundsDeployedCr: 84,
  startupsRegistered: 248,
  jobsCreated: 4820,
  msmesBenefited: 1140,
  studentsMobilized: 18400,
  activeInnovationProjects: 612,
  roiIndex: 3.4,
} as const;

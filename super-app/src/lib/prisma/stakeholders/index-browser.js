
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  role: 'role',
  passwordHash: 'passwordHash',
  avatar: 'avatar',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  preferredLanguage: 'preferredLanguage',
  timezone: 'timezone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLoginAt: 'lastLoginAt',
  apiKey: 'apiKey'
};

exports.Prisma.StakeholderProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  designation: 'designation',
  alternateDesignations: 'alternateDesignations',
  organization: 'organization',
  organizationType: 'organizationType',
  department: 'department',
  bio: 'bio',
  dateOfBirth: 'dateOfBirth',
  gender: 'gender',
  education: 'education',
  expertise: 'expertise',
  specializations: 'specializations',
  certifications: 'certifications',
  yearsExperience: 'yearsExperience',
  careerHistory: 'careerHistory',
  teamSize: 'teamSize',
  teamComposition: 'teamComposition',
  budget: 'budget',
  jurisdiction: 'jurisdiction',
  decisionMakingAuthority: 'decisionMakingAuthority',
  keyResponsibilities: 'keyResponsibilities',
  reportingTo: 'reportingTo',
  district: 'district',
  taluk: 'taluk',
  village: 'village',
  address: 'address',
  landmark: 'landmark',
  pincode: 'pincode',
  latitude: 'latitude',
  longitude: 'longitude',
  interestTags: 'interestTags',
  coverageDistricts: 'coverageDistricts',
  coverageTaluks: 'coverageTaluks',
  coverageVillages: 'coverageVillages',
  serviceRadius: 'serviceRadius',
  officePhone: 'officePhone',
  officeMobile: 'officeMobile',
  officeEmail: 'officeEmail',
  officeAddress: 'officeAddress',
  personalMobile: 'personalMobile',
  personalEmail: 'personalEmail',
  whatsapp: 'whatsapp',
  telegram: 'telegram',
  linkedIn: 'linkedIn',
  twitter: 'twitter',
  facebook: 'facebook',
  instagram: 'instagram',
  researchGate: 'researchGate',
  googleScholar: 'googleScholar',
  website: 'website',
  organizationWebsite: 'organizationWebsite',
  preferredContactMethod: 'preferredContactMethod',
  availableHours: 'availableHours',
  tags: 'tags',
  keywords: 'keywords',
  communityAffiliation: 'communityAffiliation',
  casteCommunity: 'casteCommunity',
  languagesSpoken: 'languagesSpoken',
  culturalContext: 'culturalContext',
  landHolding: 'landHolding',
  cropsCultivated: 'cropsCultivated',
  farmingType: 'farmingType',
  irrigationSource: 'irrigationSource',
  boatType: 'boatType',
  fishingLicense: 'fishingLicense',
  catchType: 'catchType',
  serviceType: 'serviceType',
  patientsServed: 'patientsServed',
  healthFacility: 'healthFacility',
  tribe: 'tribe',
  tribalCard: 'tribalCard',
  forestRights: 'forestRights',
  ngoRegistration: 'ngoRegistration',
  ngoDarpanId: 'ngoDarpanId',
  donorAgencies: 'donorAgencies',
  employeeId: 'employeeId',
  cadre: 'cadre',
  postingHistory: 'postingHistory',
  transferDate: 'transferDate',
  populationServed: 'populationServed',
  geographicReach: 'geographicReach',
  annualBeneficiaries: 'annualBeneficiaries',
  keyAchievements: 'keyAchievements',
  awards: 'awards',
  publications: 'publications',
  infrastructure: 'infrastructure',
  vehiclesOwned: 'vehiclesOwned',
  technologyAccess: 'technologyAccess',
  fundingSource: 'fundingSource',
  annualBudget: 'annualBudget',
  partnerOrganizations: 'partnerOrganizations',
  networkMemberships: 'networkMemberships',
  collaborationInterest: 'collaborationInterest',
  mentoringCapability: 'mentoringCapability',
  trainingCapability: 'trainingCapability',
  topChallenges: 'topChallenges',
  resourceNeeds: 'resourceNeeds',
  capacityGaps: 'capacityGaps',
  priorityAreas: 'priorityAreas',
  innovationsPracticed: 'innovationsPracticed',
  successStories: 'successStories',
  replicableModels: 'replicableModels',
  verificationStatus: 'verificationStatus',
  verificationDate: 'verificationDate',
  verifiedBy: 'verifiedBy',
  verificationNotes: 'verificationNotes',
  dataQualityScore: 'dataQualityScore',
  lastVerified: 'lastVerified',
  dataSource: 'dataSource',
  collectedBy: 'collectedBy',
  collectionMethod: 'collectionMethod',
  addedBy: 'addedBy',
  totalInteractions: 'totalInteractions',
  lastInteraction: 'lastInteraction',
  engagementScore: 'engagementScore',
  responseRate: 'responseRate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  icon: 'icon',
  color: 'color',
  parentId: 'parentId',
  problemCount: 'problemCount',
  stakeholderCount: 'stakeholderCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProblemStatementScalarFieldEnum = {
  id: 'id',
  code: 'code',
  title: 'title',
  description: 'description',
  severity: 'severity',
  districts: 'districts',
  taluks: 'taluks',
  villages: 'villages',
  domain: 'domain',
  subDomain: 'subDomain',
  tags: 'tags',
  keywords: 'keywords',
  affectedPopulation: 'affectedPopulation',
  affectedDemographic: 'affectedDemographic',
  currentImpact: 'currentImpact',
  projectedImpact: 'projectedImpact',
  rootCauses: 'rootCauses',
  contributingFactors: 'contributingFactors',
  barriers: 'barriers',
  historicalContext: 'historicalContext',
  quantitativeData: 'quantitativeData',
  dataSource: 'dataSource',
  lastUpdated: 'lastUpdated',
  primaryStakeholders: 'primaryStakeholders',
  affectedGroups: 'affectedGroups',
  documents: 'documents',
  references: 'references',
  status: 'status',
  priority: 'priority',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SolutionScalarFieldEnum = {
  id: 'id',
  code: 'code',
  slug: 'slug',
  title: 'title',
  description: 'description',
  type: 'type',
  status: 'status',
  approach: 'approach',
  methodology: 'methodology',
  components: 'components',
  timeline: 'timeline',
  phases: 'phases',
  milestones: 'milestones',
  budget: 'budget',
  budgetBreakdown: 'budgetBreakdown',
  humanResources: 'humanResources',
  technicalResources: 'technicalResources',
  infrastructure: 'infrastructure',
  leadOrganization: 'leadOrganization',
  implementingPartners: 'implementingPartners',
  fundingPartners: 'fundingPartners',
  technicalPartners: 'technicalPartners',
  pilotResults: 'pilotResults',
  evidence: 'evidence',
  metrics: 'metrics',
  successIndicators: 'successIndicators',
  expectedImpact: 'expectedImpact',
  actualImpact: 'actualImpact',
  beneficiaries: 'beneficiaries',
  geographicReach: 'geographicReach',
  scalabilityAssessment: 'scalabilityAssessment',
  replicationPotential: 'replicationPotential',
  adaptationGuidelines: 'adaptationGuidelines',
  risks: 'risks',
  mitigationStrategies: 'mitigationStrategies',
  lessonsLearned: 'lessonsLearned',
  bestPractices: 'bestPractices',
  documentation: 'documentation',
  tags: 'tags',
  proposedBy: 'proposedBy',
  proposedDate: 'proposedDate',
  lastReviewed: 'lastReviewed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportingOrgScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  type: 'type',
  subType: 'subType',
  description: 'description',
  mission: 'mission',
  vision: 'vision',
  founded: 'founded',
  registrationNumber: 'registrationNumber',
  ngoDarpanId: 'ngoDarpanId',
  website: 'website',
  email: 'email',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  district: 'district',
  address: 'address',
  pincode: 'pincode',
  state: 'state',
  country: 'country',
  ceo: 'ceo',
  founder: 'founder',
  keyContacts: 'keyContacts',
  geographicReach: 'geographicReach',
  annualBudget: 'annualBudget',
  teamSize: 'teamSize',
  beneficiariesServed: 'beneficiariesServed',
  supportsStages: 'supportsStages',
  focusSectors: 'focusSectors',
  focusProblems: 'focusProblems',
  resourcesOffered: 'resourcesOffered',
  programsOffered: 'programsOffered',
  servicesOffered: 'servicesOffered',
  fundingRange: 'fundingRange',
  fundingType: 'fundingType',
  applicationProcess: 'applicationProcess',
  eligibilityCriteria: 'eligibilityCriteria',
  facilities: 'facilities',
  equipment: 'equipment',
  digitalResources: 'digitalResources',
  projectsSupported: 'projectsSupported',
  successStories: 'successStories',
  notableAlumni: 'notableAlumni',
  awards: 'awards',
  partnerOrganizations: 'partnerOrganizations',
  networkMemberships: 'networkMemberships',
  accreditations: 'accreditations',
  applicationDeadlines: 'applicationDeadlines',
  applicationUrl: 'applicationUrl',
  contactForApplication: 'contactForApplication',
  selectionProcess: 'selectionProcess',
  documents: 'documents',
  reports: 'reports',
  verified: 'verified',
  verifiedDate: 'verifiedDate',
  dataQuality: 'dataQuality',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportingOrgRelationScalarFieldEnum = {
  id: 'id',
  stakeholderId: 'stakeholderId',
  orgId: 'orgId',
  relationshipType: 'relationshipType',
  role: 'role',
  notes: 'notes',
  startDate: 'startDate',
  endDate: 'endDate',
  active: 'active',
  projectsCollaborated: 'projectsCollaborated',
  fundingReceived: 'fundingReceived',
  supportReceived: 'supportReceived',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StakeholderLinkScalarFieldEnum = {
  id: 'id',
  stakeholderAId: 'stakeholderAId',
  stakeholderBId: 'stakeholderBId',
  linkType: 'linkType',
  strength: 'strength',
  description: 'description',
  notes: 'notes',
  commonProblems: 'commonProblems',
  commonSolutions: 'commonSolutions',
  sharedProjects: 'sharedProjects',
  active: 'active',
  lastInteraction: 'lastInteraction',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  institution: 'institution',
  program: 'program',
  year: 'year',
  rollNumber: 'rollNumber',
  projectName: 'projectName',
  projectDescription: 'projectDescription',
  focusArea: 'focusArea',
  focusSectors: 'focusSectors',
  teamSize: 'teamSize',
  teamMembers: 'teamMembers',
  workingOnProblems: 'workingOnProblems',
  managerId: 'managerId',
  teamId: 'teamId',
  stage: 'stage',
  milestones: 'milestones',
  xp: 'xp',
  points: 'points',
  level: 'level',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  cohort: 'cohort',
  startDate: 'startDate',
  mentorId: 'mentorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoadmapStageScalarFieldEnum = {
  id: 'id',
  stageNumber: 'stageNumber',
  name: 'name',
  weeks: 'weeks',
  minimumScore: 'minimumScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoadmapToolScalarFieldEnum = {
  id: 'id',
  toolId: 'toolId',
  name: 'name',
  week: 'week',
  stageId: 'stageId',
  description: 'description',
  timeEstimateHours: 'timeEstimateHours',
  isLocked: 'isLocked',
  dependencies: 'dependencies',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoadmapTaskScalarFieldEnum = {
  id: 'id',
  description: 'description',
  deliverableType: 'deliverableType',
  validationCriteria: 'validationCriteria',
  toolId: 'toolId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TeamProgressScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  currentStageId: 'currentStageId',
  currentWeek: 'currentWeek',
  startedAt: 'startedAt',
  lastActive: 'lastActive',
  updatedAt: 'updatedAt'
};

exports.Prisma.StageProgressScalarFieldEnum = {
  id: 'id',
  teamProgressId: 'teamProgressId',
  stageNumber: 'stageNumber',
  status: 'status',
  completedAt: 'completedAt',
  score: 'score',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ToolProgressScalarFieldEnum = {
  id: 'id',
  teamProgressId: 'teamProgressId',
  toolId: 'toolId',
  status: 'status',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  data: 'data',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskProgressScalarFieldEnum = {
  id: 'id',
  toolProgressId: 'toolProgressId',
  taskId: 'taskId',
  status: 'status',
  submissionUrl: 'submissionUrl',
  submissionText: 'submissionText',
  submittedAt: 'submittedAt',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ValuePropositionScalarFieldEnum = {
  id: 'id',
  studentId: 'studentId',
  customerJobs: 'customerJobs',
  pains: 'pains',
  gains: 'gains',
  painRelievers: 'painRelievers',
  gainCreators: 'gainCreators',
  productsServices: 'productsServices',
  problemStatement: 'problemStatement',
  proposedSolution: 'proposedSolution',
  targetStakeholder: 'targetStakeholder',
  validationStatus: 'validationStatus',
  validationNotes: 'validationNotes',
  validatedBy: 'validatedBy',
  validatedDate: 'validatedDate',
  feedback: 'feedback',
  iterationNumber: 'iterationNumber',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ManagerProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  organization: 'organization',
  role: 'role',
  bio: 'bio',
  expertise: 'expertise',
  maxMentees: 'maxMentees',
  focusSectors: 'focusSectors',
  focusProblems: 'focusProblems',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResearcherProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  institution: 'institution',
  department: 'department',
  researchArea: 'researchArea',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InteractionScalarFieldEnum = {
  id: 'id',
  initiatorId: 'initiatorId',
  targetId: 'targetId',
  stakeholderId: 'stakeholderId',
  type: 'type',
  channel: 'channel',
  subject: 'subject',
  notes: 'notes',
  duration: 'duration',
  location: 'location',
  outcome: 'outcome',
  actionItems: 'actionItems',
  nextSteps: 'nextSteps',
  followUpDate: 'followUpDate',
  followUpCompleted: 'followUpCompleted',
  documents: 'documents',
  photos: 'photos',
  recordings: 'recordings',
  summary: 'summary',
  keyPoints: 'keyPoints',
  sentiment: 'sentiment',
  topics: 'topics',
  effectiveness: 'effectiveness',
  feedback: 'feedback',
  scheduledAt: 'scheduledAt',
  occurredAt: 'occurredAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  content: 'content',
  noteType: 'noteType',
  tags: 'tags',
  stakeholderId: 'stakeholderId',
  problemId: 'problemId',
  solutionId: 'solutionId',
  folder: 'folder',
  pinned: 'pinned',
  archived: 'archived',
  sharedWith: 'sharedWith',
  visibility: 'visibility',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CalendarEventScalarFieldEnum = {
  id: 'id',
  organizerId: 'organizerId',
  title: 'title',
  description: 'description',
  eventType: 'eventType',
  participantIds: 'participantIds',
  stakeholderIds: 'stakeholderIds',
  startTime: 'startTime',
  endTime: 'endTime',
  timezone: 'timezone',
  allDay: 'allDay',
  location: 'location',
  locationDetails: 'locationDetails',
  isVirtual: 'isVirtual',
  meetingLink: 'meetingLink',
  status: 'status',
  reminders: 'reminders',
  interactionId: 'interactionId',
  transcriptId: 'transcriptId',
  recurring: 'recurring',
  recurrenceRule: 'recurrenceRule',
  notes: 'notes',
  attachments: 'attachments',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TranscriptScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  transcriptType: 'transcriptType',
  stakeholderId: 'stakeholderId',
  calendarEventId: 'calendarEventId',
  participants: 'participants',
  interviewer: 'interviewer',
  interviewee: 'interviewee',
  originalFile: 'originalFile',
  fileType: 'fileType',
  fileSize: 'fileSize',
  fileName: 'fileName',
  rawText: 'rawText',
  processedText: 'processedText',
  processingStatus: 'processingStatus',
  processingError: 'processingError',
  summary: 'summary',
  keyPoints: 'keyPoints',
  topics: 'topics',
  actionItems: 'actionItems',
  insights: 'insights',
  quotes: 'quotes',
  recordedDate: 'recordedDate',
  duration: 'duration',
  language: 'language',
  quality: 'quality',
  tags: 'tags',
  sectors: 'sectors',
  problemAreas: 'problemAreas',
  uploadedBy: 'uploadedBy',
  visibility: 'visibility',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VectorEmbeddingScalarFieldEnum = {
  id: 'id',
  sourceType: 'sourceType',
  sourceId: 'sourceId',
  transcriptId: 'transcriptId',
  text: 'text',
  embedding: 'embedding',
  metadata: 'metadata',
  chunkIndex: 'chunkIndex',
  createdAt: 'createdAt'
};

exports.Prisma.ResearchReportScalarFieldEnum = {
  id: 'id',
  title: 'title',
  reportType: 'reportType',
  status: 'status',
  scope: 'scope',
  districts: 'districts',
  timeFrame: 'timeFrame',
  researchQuestions: 'researchQuestions',
  methodology: 'methodology',
  executiveSummary: 'executiveSummary',
  introduction: 'introduction',
  findings: 'findings',
  analysis: 'analysis',
  recommendations: 'recommendations',
  conclusions: 'conclusions',
  keyFindings: 'keyFindings',
  stakeholdersAnalyzed: 'stakeholdersAnalyzed',
  interactionsAnalyzed: 'interactionsAnalyzed',
  transcriptsAnalyzed: 'transcriptsAnalyzed',
  dataSources: 'dataSources',
  generatedByAI: 'generatedByAI',
  aiModel: 'aiModel',
  humanReviewed: 'humanReviewed',
  createdBy: 'createdBy',
  contributors: 'contributors',
  researcherId: 'researcherId',
  publishedDate: 'publishedDate',
  version: 'version',
  pdfUrl: 'pdfUrl',
  attachments: 'attachments',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudentJourneyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  sector: 'sector',
  stage: 'stage',
  trlLevel: 'trlLevel',
  complianceScore: 'complianceScore',
  pilotReadiness: 'pilotReadiness',
  weeklyReports: 'weeklyReports',
  loveabilityScore: 'loveabilityScore',
  lastIntelligenceSync: 'lastIntelligenceSync',
  problemStatementId: 'problemStatementId',
  metrics: 'metrics',
  milestones: 'milestones',
  blockers: 'blockers',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TRLEvidenceScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  trlLevel: 'trlLevel',
  evidenceType: 'evidenceType',
  evidenceUrl: 'evidenceUrl',
  evidenceText: 'evidenceText',
  aiScore: 'aiScore',
  aiRecommendations: 'aiRecommendations',
  reviewerNotes: 'reviewerNotes',
  status: 'status',
  submittedAt: 'submittedAt',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExperimentScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  title: 'title',
  type: 'type',
  hypothesis: 'hypothesis',
  methodology: 'methodology',
  successCriteria: 'successCriteria',
  metrics: 'metrics',
  findings: 'findings',
  dataUrl: 'dataUrl',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ComplianceTaskScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  title: 'title',
  category: 'category',
  riskLevel: 'riskLevel',
  regulatoryBody: 'regulatoryBody',
  description: 'description',
  certificationStatus: 'certificationStatus',
  evidenceUrls: 'evidenceUrls',
  dueDate: 'dueDate',
  completedAt: 'completedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PilotApplicationScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  partnerName: 'partnerName',
  partnerType: 'partnerType',
  title: 'title',
  description: 'description',
  userTarget: 'userTarget',
  revenueTarget: 'revenueTarget',
  duration: 'duration',
  kpis: 'kpis',
  weeklyReports: 'weeklyReports',
  status: 'status',
  appliedAt: 'appliedAt',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BudgetBreakdownScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  category: 'category',
  plannedAmount: 'plannedAmount',
  spentAmount: 'spentAmount',
  lineItems: 'lineItems',
  budgetPeriod: 'budgetPeriod',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoadmapMilestoneScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  title: 'title',
  description: 'description',
  category: 'category',
  startDate: 'startDate',
  endDate: 'endDate',
  duration: 'duration',
  status: 'status',
  progress: 'progress',
  dependsOn: 'dependsOn',
  aiSuggested: 'aiSuggested',
  recommendationType: 'recommendationType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ResourceBookingScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  resourceType: 'resourceType',
  resourceId: 'resourceId',
  bookingDate: 'bookingDate',
  duration: 'duration',
  status: 'status',
  estimatedCost: 'estimatedCost',
  actualCost: 'actualCost',
  purpose: 'purpose',
  outcome: 'outcome',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TestingLabScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  state: 'state',
  description: 'description',
  sectorSpecialization: 'sectorSpecialization',
  trlLevelSupported: 'trlLevelSupported',
  equipment: 'equipment',
  certifications: 'certifications',
  availability: 'availability',
  estimatedCost: 'estimatedCost',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  website: 'website',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MakerspaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  state: 'state',
  description: 'description',
  equipment: 'equipment',
  sectorFocus: 'sectorFocus',
  hourlyRate: 'hourlyRate',
  membershipOptions: 'membershipOptions',
  availability: 'availability',
  contactEmail: 'contactEmail',
  website: 'website',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FundingOpportunityScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  fundingSize: 'fundingSize',
  sectorFocus: 'sectorFocus',
  trlEligibility: 'trlEligibility',
  status: 'status',
  applicationDeadline: 'applicationDeadline',
  applicationUrl: 'applicationUrl',
  organizationName: 'organizationName',
  organizationType: 'organizationType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PitchingEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  eventDate: 'eventDate',
  location: 'location',
  sectorFocus: 'sectorFocus',
  prizePool: 'prizePool',
  attendees: 'attendees',
  status: 'status',
  registrationUrl: 'registrationUrl',
  trlMin: 'trlMin',
  trlMax: 'trlMax',
  attendanceStatus: 'attendanceStatus',
  attendingJourneyId: 'attendingJourneyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IncubatorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  type: 'type',
  description: 'description',
  sectorFocus: 'sectorFocus',
  fundingSupport: 'fundingSupport',
  fundingAmount: 'fundingAmount',
  status: 'status',
  applicationUrl: 'applicationUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExpertScalarFieldEnum = {
  id: 'id',
  name: 'name',
  specialization: 'specialization',
  domain: 'domain',
  rating: 'rating',
  sessionsCompleted: 'sessionsCompleted',
  availability: 'availability',
  hourlyRate: 'hourlyRate',
  subsidized: 'subsidized',
  contactEmail: 'contactEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GovernmentSchemeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  type: 'type',
  benefitAmount: 'benefitAmount',
  sectorFocus: 'sectorFocus',
  eligibilityCriteria: 'eligibilityCriteria',
  status: 'status',
  deadline: 'deadline',
  applicationUrl: 'applicationUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectorAPIScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  sector: 'sector',
  description: 'description',
  apiType: 'apiType',
  sandboxUrl: 'sandboxUrl',
  documentationUrl: 'documentationUrl',
  sandboxReady: 'sandboxReady',
  authRequired: 'authRequired',
  rateLimits: 'rateLimits',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SprintScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  sprintNumber: 'sprintNumber',
  name: 'name',
  stageNumber: 'stageNumber',
  weekRange: 'weekRange',
  trlGate: 'trlGate',
  crlIrlOutput: 'crlIrlOutput',
  status: 'status',
  gateChecks: 'gateChecks',
  trl4Criteria: 'trl4Criteria',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  blockedReason: 'blockedReason',
  mentorNote: 'mentorNote',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SprintToolSubmissionScalarFieldEnum = {
  id: 'id',
  sprintId: 'sprintId',
  toolId: 'toolId',
  toolName: 'toolName',
  trlContribution: 'trlContribution',
  crlDimension: 'crlDimension',
  irlDimension: 'irlDimension',
  maxPercent: 'maxPercent',
  iterationName: 'iterationName',
  iterationNumber: 'iterationNumber',
  isDraft: 'isDraft',
  submittedData: 'submittedData',
  status: 'status',
  gateCheck: 'gateCheck',
  isGateLevel: 'isGateLevel',
  prerequisitesMet: 'prerequisitesMet',
  blockedByToolId: 'blockedByToolId',
  blockedByToolName: 'blockedByToolName',
  fillHintsAvailable: 'fillHintsAvailable',
  resources: 'resources',
  managerScore: 'managerScore',
  managerNotes: 'managerNotes',
  rubricChecks: 'rubricChecks',
  reviewedBy: 'reviewedBy',
  reviewedAt: 'reviewedAt',
  aiScore: 'aiScore',
  assessmentNotes: 'assessmentNotes',
  submittedAt: 'submittedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CRLEvidenceScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  dimension: 'dimension',
  dimensionWeight: 'dimensionWeight',
  evidenceText: 'evidenceText',
  evidenceUrls: 'evidenceUrls',
  sprintToolsCited: 'sprintToolsCited',
  aiScore: 'aiScore',
  criterionScores: 'criterionScores',
  assessmentNotes: 'assessmentNotes',
  improvementGuidance: 'improvementGuidance',
  autoRejectReason: 'autoRejectReason',
  passed: 'passed',
  weightedScore: 'weightedScore',
  status: 'status',
  resubmissionCount: 'resubmissionCount',
  mentorNotified: 'mentorNotified',
  submittedAt: 'submittedAt',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IRLEvidenceScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  dimension: 'dimension',
  dimensionWeight: 'dimensionWeight',
  evidenceText: 'evidenceText',
  evidenceUrls: 'evidenceUrls',
  sprintToolsCited: 'sprintToolsCited',
  aiScore: 'aiScore',
  criterionScores: 'criterionScores',
  assessmentNotes: 'assessmentNotes',
  improvementGuidance: 'improvementGuidance',
  autoRejectReason: 'autoRejectReason',
  passed: 'passed',
  weightedScore: 'weightedScore',
  status: 'status',
  resubmissionCount: 'resubmissionCount',
  mentorNotified: 'mentorNotified',
  submittedAt: 'submittedAt',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RubricDefinitionScalarFieldEnum = {
  id: 'id',
  toolId: 'toolId',
  name: 'name',
  criteria: 'criteria',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NudgeEventScalarFieldEnum = {
  id: 'id',
  journeyId: 'journeyId',
  nudgeType: 'nudgeType',
  targetToolId: 'targetToolId',
  targetToolName: 'targetToolName',
  blockedByToolId: 'blockedByToolId',
  blockedByToolName: 'blockedByToolName',
  message: 'message',
  fillHints: 'fillHints',
  dismissed: 'dismissed',
  dismissedAt: 'dismissedAt',
  createdAt: 'createdAt'
};

exports.Prisma.SprintTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sprintNumber: 'sprintNumber',
  weekRange: 'weekRange',
  trlGate: 'trlGate',
  crlIrlOutput: 'crlIrlOutput',
  description: 'description',
  isPublic: 'isPublic',
  creatorId: 'creatorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SprintTemplateToolScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  toolId: 'toolId',
  toolName: 'toolName',
  isGateLevel: 'isGateLevel',
  trlContribution: 'trlContribution',
  resources: 'resources',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  STAKEHOLDER: 'STAKEHOLDER',
  STUDENT: 'STUDENT',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  RESEARCHER: 'RESEARCHER'
};

exports.Prisma.ModelName = {
  User: 'User',
  StakeholderProfile: 'StakeholderProfile',
  Sector: 'Sector',
  ProblemStatement: 'ProblemStatement',
  Solution: 'Solution',
  SupportingOrg: 'SupportingOrg',
  SupportingOrgRelation: 'SupportingOrgRelation',
  StakeholderLink: 'StakeholderLink',
  StudentProfile: 'StudentProfile',
  Team: 'Team',
  RoadmapStage: 'RoadmapStage',
  RoadmapTool: 'RoadmapTool',
  RoadmapTask: 'RoadmapTask',
  TeamProgress: 'TeamProgress',
  StageProgress: 'StageProgress',
  ToolProgress: 'ToolProgress',
  TaskProgress: 'TaskProgress',
  ValueProposition: 'ValueProposition',
  ManagerProfile: 'ManagerProfile',
  ResearcherProfile: 'ResearcherProfile',
  Interaction: 'Interaction',
  Note: 'Note',
  CalendarEvent: 'CalendarEvent',
  Transcript: 'Transcript',
  VectorEmbedding: 'VectorEmbedding',
  ResearchReport: 'ResearchReport',
  StudentJourney: 'StudentJourney',
  TRLEvidence: 'TRLEvidence',
  Experiment: 'Experiment',
  ComplianceTask: 'ComplianceTask',
  PilotApplication: 'PilotApplication',
  BudgetBreakdown: 'BudgetBreakdown',
  RoadmapMilestone: 'RoadmapMilestone',
  ResourceBooking: 'ResourceBooking',
  TestingLab: 'TestingLab',
  Makerspace: 'Makerspace',
  FundingOpportunity: 'FundingOpportunity',
  PitchingEvent: 'PitchingEvent',
  Incubator: 'Incubator',
  Expert: 'Expert',
  GovernmentScheme: 'GovernmentScheme',
  SectorAPI: 'SectorAPI',
  Sprint: 'Sprint',
  SprintToolSubmission: 'SprintToolSubmission',
  CRLEvidence: 'CRLEvidence',
  IRLEvidence: 'IRLEvidence',
  RubricDefinition: 'RubricDefinition',
  NudgeEvent: 'NudgeEvent',
  SprintTemplate: 'SprintTemplate',
  SprintTemplateTool: 'SprintTemplateTool'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

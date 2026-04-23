
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Downloads2\\preincubation\\super-app\\src\\lib\\prisma\\stakeholders",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "D:\\Downloads2\\preincubation\\super-app\\prisma\\stakeholders\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../../../prisma/stakeholders",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "STAKEHOLDERS_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// prisma/schema.prisma - COMPREHENSIVE VERSION\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../../src/lib/prisma/stakeholders\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"STAKEHOLDERS_DATABASE_URL\")\n}\n\n// ============ USER & AUTHENTICATION ============\n\nenum UserRole {\n  STAKEHOLDER\n  STUDENT\n  MANAGER\n  ADMIN\n  RESEARCHER\n}\n\nmodel User {\n  id                String   @id @default(cuid())\n  email             String   @unique\n  name              String\n  role              UserRole\n  passwordHash      String?\n  avatar            String?\n  phone             String?\n  alternatePhone    String?\n  preferredLanguage String?\n  timezone          String   @default(\"Asia/Kolkata\")\n\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n  lastLoginAt DateTime?\n\n  // Bring Your Own Key (Gemini)\n  apiKey String?\n\n  // Role-specific profiles\n  stakeholderProfile StakeholderProfile?\n  studentProfile     StudentProfile?\n  managerProfile     ManagerProfile?\n  researcherProfile  ResearcherProfile?\n  studentJourney     StudentJourney?\n\n  // Activities\n  interactionsAsInitiator Interaction[]        @relation(\"InitiatorInteractions\")\n  interactionsAsTarget    Interaction[]        @relation(\"TargetInteractions\")\n  calendarEvents          CalendarEvent[]\n  notes                   Note[]\n  researchReports         ResearchReport[] // Reports authored by user\n  createdStakeholders     StakeholderProfile[] @relation(\"CreatedBy\")\n\n  @@index([email])\n  @@index([role])\n}\n\n// ============ COMPREHENSIVE STAKEHOLDER PROFILE ============\n\nmodel StakeholderProfile {\n  id     String @id @default(cuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // ========== BASIC IDENTIFICATION ==========\n  designation           String\n  alternateDesignations String[]\n  organization          String?\n  organizationType      String? // Government, NGO, Private, Academic, Cooperative, Community\n  department            String?\n\n  // ========== BIOGRAPHICAL INFO ==========\n  bio         String?   @db.Text\n  dateOfBirth DateTime?\n  gender      String?\n  education   String[]\n\n  // ========== PROFESSIONAL DETAILS ==========\n  expertise       String[]\n  specializations String[]\n  certifications  String[]\n  yearsExperience Int?\n  careerHistory   Json?\n\n  // ========== WORK CONTEXT ==========\n  teamSize                Int?\n  teamComposition         Json?\n  budget                  Float?\n  jurisdiction            String[]\n  decisionMakingAuthority String?\n  keyResponsibilities     String[] @db.Text\n  reportingTo             String?\n\n  // ========== LOCATION & REACH ==========\n  // Primary Location\n  district  String // One of 9 districts\n  taluk     String?\n  village   String?\n  address   String? @db.Text\n  landmark  String?\n  pincode   String?\n  latitude  Float?\n  longitude Float?\n\n  // Categorization\n  interestTags String[]\n\n  // Operational Coverage\n  coverageDistricts String[]\n  coverageTaluks    String[]\n  coverageVillages  String[]\n  serviceRadius     Int?\n\n  // ========== CONTACT INFORMATION ==========\n  officePhone    String?\n  officeMobile   String?\n  officeEmail    String?\n  officeAddress  String? @db.Text\n  personalMobile String?\n  personalEmail  String?\n  whatsapp       String?\n  telegram       String?\n\n  // Social & Professional Networks\n  linkedIn            String?\n  twitter             String?\n  facebook            String?\n  instagram           String?\n  researchGate        String?\n  googleScholar       String?\n  website             String?\n  organizationWebsite String?\n\n  // Contact Preferences\n  preferredContactMethod String?\n  availableHours         String?\n\n  // ========== CATEGORIZATION & TAGGING ==========\n  sectors           Sector[]\n  problemStatements ProblemStatement[]\n  solutions         Solution[]\n  tags              String[]\n  keywords          String[]\n\n  // ========== COMMUNITY & DEMOGRAPHIC CONTEXT ==========\n  communityAffiliation String?\n  casteCommunity       String?\n  languagesSpoken      String[]\n  culturalContext      String?  @db.Text\n\n  // ========== ROLE-SPECIFIC ATTRIBUTES ==========\n  // For Farmers\n  landHolding      Float?\n  cropsCultivated  String[]\n  farmingType      String?\n  irrigationSource String[]\n\n  // For Fishermen\n  boatType       String?\n  fishingLicense String?\n  catchType      String[]\n\n  // For Healthcare Workers\n  serviceType    String?\n  patientsServed Int?\n  healthFacility String?\n\n  // For Tribal Members\n  tribe        String?\n  tribalCard   String?\n  forestRights String?\n\n  // For NGO Workers\n  ngoRegistration String?\n  ngoDarpanId     String?\n  donorAgencies   String[]\n\n  // For Government Officials\n  employeeId     String?\n  cadre          String?\n  postingHistory Json?\n  transferDate   DateTime?\n\n  // ========== IMPACT & METRICS ==========\n  populationServed    Int?\n  geographicReach     String?\n  annualBeneficiaries Int?\n  keyAchievements     String[] @db.Text\n  awards              String[]\n  publications        String[]\n\n  // ========== RESOURCES & CAPACITY ==========\n  infrastructure   String[]\n  vehiclesOwned    String[]\n  technologyAccess String[]\n  fundingSource    String[]\n  annualBudget     Float?\n\n  // ========== COLLABORATION & NETWORKING ==========\n  partnerOrganizations  String[]\n  networkMemberships    String[]\n  collaborationInterest String[]\n  mentoringCapability   Boolean  @default(false)\n  trainingCapability    Boolean  @default(false)\n\n  // ========== CHALLENGES & NEEDS ==========\n  topChallenges String[] @db.Text\n  resourceNeeds String[]\n  capacityGaps  String[]\n  priorityAreas String[]\n\n  // ========== INNOVATION & SOLUTIONS ==========\n  innovationsPracticed String[] @db.Text\n  successStories       String[] @db.Text\n  replicableModels     String[] @db.Text\n\n  // ========== VERIFICATION & QUALITY ==========\n  verificationStatus String    @default(\"pending\")\n  verificationDate   DateTime?\n  verifiedBy         String?\n  verificationNotes  String?   @db.Text\n  dataQualityScore   Int?\n  lastVerified       DateTime?\n\n  // ========== DATA PROVENANCE ==========\n  dataSource       String?\n  collectedBy      String?\n  collectionMethod String?\n  addedBy          String?\n  addedByUser      User?   @relation(\"CreatedBy\", fields: [addedBy], references: [id])\n\n  // ========== ENGAGEMENT TRACKING ==========\n  totalInteractions Int       @default(0)\n  lastInteraction   DateTime?\n  engagementScore   Int?\n  responseRate      Float?\n\n  // ========== RELATIONSHIPS ==========\n  interactions            Interaction[]\n  linkedStakeholders      StakeholderLink[]       @relation(\"StakeholderA\")\n  linkedByStakeholders    StakeholderLink[]       @relation(\"StakeholderB\")\n  supportingOrgs          SupportingOrgRelation[]\n  transcripts             Transcript[]\n  valuePropositionsTarget ValueProposition[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  // @@fulltext([bio, organization, designation])\n\n  @@index([district])\n  @@index([verificationStatus])\n  @@index([organizationType])\n}\n\n// ============ SECTOR TAXONOMY ============\n\nmodel Sector {\n  id          String   @id @default(cuid())\n  name        String   @unique\n  slug        String   @unique\n  description String?  @db.Text\n  icon        String?\n  color       String?\n  parentId    String?\n  parent      Sector?  @relation(\"SubSectors\", fields: [parentId], references: [id])\n  children    Sector[] @relation(\"SubSectors\")\n\n  // Relationships\n  stakeholders      StakeholderProfile[]\n  problemStatements ProblemStatement[]\n  solutions         Solution[]\n  researchReports   ResearchReport[]\n\n  // Metadata\n  problemCount     Int @default(0)\n  stakeholderCount Int @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([slug])\n}\n\n// ============ PROBLEM STATEMENTS ============\n\nmodel ProblemStatement {\n  id          String @id @default(cuid())\n  code        String @unique // e.g., \"PS_1.1\"\n  title       String\n  description String @db.Text\n  severity    String // Critical, High, Medium-High, Medium, Low\n\n  // Geographic Scope\n  districts String[]\n  taluks    String[]\n  villages  String[]\n\n  // Categorization\n  sectors   Sector[]\n  domain    String // e.g., \"Agriculture & Irrigation\"\n  subDomain String?\n  tags      String[]\n  keywords  String[]\n\n  // Impact Assessment\n  affectedPopulation  Int?\n  affectedDemographic String? // e.g., \"Small coffee growers\"\n  currentImpact       String? @db.Text\n  projectedImpact     String? @db.Text\n\n  // Context\n  rootCauses          String[] @db.Text\n  contributingFactors String[] @db.Text\n  barriers            String[] @db.Text\n  historicalContext   String?  @db.Text\n\n  // Metrics & Evidence\n  quantitativeData Json? // Structured data about the problem\n  dataSource       String?\n  lastUpdated      DateTime?\n\n  // Stakeholder Mapping\n  stakeholders        StakeholderProfile[]\n  primaryStakeholders String[] // Key contact IDs\n  affectedGroups      String[] // Types of people affected\n\n  // Solution Mapping\n  solutions Solution[]\n\n  studentJourneys StudentJourney[]\n\n  // Resources\n  documents  String[] // URLs or file paths\n  references String[] // Citations\n\n  // Status & Tracking\n  status   String @default(\"active\") // active, solved, monitoring\n  priority Int? // 1-10 priority ranking\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  // @@fulltext([title, description])\n\n  @@index([severity])\n  @@index([domain])\n}\n\n// ============ SOLUTIONS ============\n\nmodel Solution {\n  id          String  @id @default(cuid())\n  code        String  @unique // e.g., \"SOL_1.1.A\"\n  slug        String? @unique\n  title       String\n  description String  @db.Text\n  type        String // Technology, Policy, Process, Infrastructure, Training\n  status      String // Proposed, In-Progress, Implemented, Validated, Scaled\n\n  // Problem Mapping\n  problemStatements ProblemStatement[]\n\n  // Stakeholders\n  stakeholders StakeholderProfile[]\n\n  // Solution Framework\n  approach    String?  @db.Text\n  methodology String?  @db.Text\n  components  String[] @db.Text\n\n  // Implementation\n  timeline   String?\n  phases     Json? // Structured timeline data\n  milestones String[]\n\n  // Resources Required\n  budget             Float?\n  budgetBreakdown    Json?\n  humanResources     String[] @db.Text\n  technicalResources String[] @db.Text\n  infrastructure     String[] @db.Text\n\n  // Stakeholders & Partners\n  leadOrganization     String?\n  implementingPartners String[]\n  fundingPartners      String[]\n  technicalPartners    String[]\n\n  // Supporting Organizations\n  supportingOrgs SupportingOrg[]\n\n  // Evidence & Validation\n  pilotResults      String?  @db.Text\n  evidence          String[] // URLs or file paths\n  metrics           String?  @db.Text\n  successIndicators String[]\n\n  // Impact\n  expectedImpact  String?  @db.Text\n  actualImpact    String?  @db.Text\n  beneficiaries   Int?\n  geographicReach String[]\n\n  // Scalability\n  scalabilityAssessment String? @db.Text\n  replicationPotential  String? @db.Text\n  adaptationGuidelines  String? @db.Text\n\n  // Risk Assessment\n  risks                String[] @db.Text\n  mitigationStrategies String[] @db.Text\n\n  // Learning & Documentation\n  lessonsLearned String?  @db.Text\n  bestPractices  String[] @db.Text\n  documentation  String[] // URLs or file paths\n\n  // Categorization\n  sectors Sector[]\n  tags    String[]\n\n  // Ownership\n  proposedBy   String? // User ID\n  proposedDate DateTime?\n  lastReviewed DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  // @@fulltext([title, description, approach])\n\n  @@index([status])\n  @@index([type])\n}\n\n// ============ SUPPORTING ORGANIZATIONS ============\n\nmodel SupportingOrg {\n  id        String  @id @default(cuid())\n  name      String\n  shortName String?\n  type      String // Incubator, Accelerator, NGO, Government, Corporate, Academic, Research, Financial\n  subType   String? // More specific classification\n\n  // Organization Details\n  description        String? @db.Text\n  mission            String? @db.Text\n  vision             String? @db.Text\n  founded            Int? // Year\n  registrationNumber String?\n  ngoDarpanId        String?\n\n  // Contact Information\n  website        String?\n  email          String?\n  phone          String?\n  alternatePhone String?\n\n  // Location\n  district String?\n  address  String? @db.Text\n  pincode  String?\n  state    String?\n  country  String  @default(\"India\")\n\n  // Leadership\n  ceo         String?\n  founder     String?\n  keyContacts Json? // Array of contact persons\n\n  // Scale & Reach\n  geographicReach     String[] // Districts/states covered\n  annualBudget        Float?\n  teamSize            Int?\n  beneficiariesServed Int?\n\n  // Capabilities & Services\n  supportsStages String[] // Idea, Prototype, Pilot, Scale\n  focusSectors   String[]\n  focusProblems  String[] // Problem domains\n\n  resourcesOffered String[] // Funding, Mentorship, Infrastructure, Training, etc.\n  programsOffered  String[] // Specific programs\n  servicesOffered  String[] // Specific services\n\n  // Financial Support\n  fundingRange        String? // e.g., \"-------5L - -------50L\"\n  fundingType         String[] // Grant, Loan, Equity, Prize\n  applicationProcess  String?  @db.Text\n  eligibilityCriteria String?  @db.Text\n\n  // Infrastructure & Resources\n  facilities       String[]\n  equipment        String[]\n  digitalResources String[]\n\n  // Track Record\n  projectsSupported Int?\n  successStories    String[] @db.Text\n  notableAlumni     String[]\n  awards            String[]\n\n  // Network & Partnerships\n  partnerOrganizations String[]\n  networkMemberships   String[]\n  accreditations       String[]\n\n  // Application & Access\n  applicationDeadlines  Json? // Structured deadline data\n  applicationUrl        String?\n  contactForApplication String?\n  selectionProcess      String? @db.Text\n\n  // Documentation\n  documents String[] // URLs or file paths\n  reports   String[] // Annual reports, impact reports\n\n  // Relationships\n  solutions    Solution[]\n  stakeholders SupportingOrgRelation[]\n\n  // Metadata\n  verified     Boolean   @default(false)\n  verifiedDate DateTime?\n  dataQuality  Int? // 1-100 score\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  // @@fulltext([name, description, mission])\n\n  @@index([type])\n  @@index([district])\n}\n\nmodel SupportingOrgRelation {\n  id            String             @id @default(cuid())\n  stakeholder   StakeholderProfile @relation(fields: [stakeholderId], references: [id], onDelete: Cascade)\n  stakeholderId String\n  organization  SupportingOrg      @relation(fields: [orgId], references: [id], onDelete: Cascade)\n  orgId         String\n\n  relationshipType String // Partner, Beneficiary, Alumni, Advisor, Mentor, Funder\n  role             String? // Specific role in the relationship\n  notes            String?   @db.Text\n  startDate        DateTime?\n  endDate          DateTime?\n  active           Boolean   @default(true)\n\n  // Engagement Details\n  projectsCollaborated String[]\n  fundingReceived      Float?\n  supportReceived      String[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([stakeholderId, orgId])\n}\n\n// ============ STAKEHOLDER NETWORK ============\n\nmodel StakeholderLink {\n  id             String             @id @default(cuid())\n  stakeholderA   StakeholderProfile @relation(\"StakeholderA\", fields: [stakeholderAId], references: [id], onDelete: Cascade)\n  stakeholderAId String\n  stakeholderB   StakeholderProfile @relation(\"StakeholderB\", fields: [stakeholderBId], references: [id], onDelete: Cascade)\n  stakeholderBId String\n\n  linkType    String // Similar-Problem, Complementary, Competitor, Collaborator, Mentor-Mentee, Peer\n  strength    Int // 1-10 connection strength\n  description String? @db.Text\n  notes       String? @db.Text\n\n  // Collaboration Context\n  commonProblems  String[]\n  commonSolutions String[]\n  sharedProjects  String[]\n\n  // Status\n  active          Boolean   @default(true)\n  lastInteraction DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([stakeholderAId, stakeholderBId])\n  @@index([linkType])\n}\n\n// ============ STUDENT/ENTREPRENEUR PROFILES ============\n\nmodel StudentProfile {\n  id     String @id @default(cuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // Academic Info\n  institution String?\n  program     String?\n  year        Int?\n  rollNumber  String?\n\n  // Project Context\n  projectName        String?\n  projectDescription String?  @db.Text\n  focusArea          String?\n  focusSectors       String[]\n  teamSize           Int?\n  teamMembers        Json?\n\n  // Problem Focus\n  workingOnProblems String[] // Problem statement IDs\n\n  // Manager Assignment\n  managerId String?\n  manager   ManagerProfile? @relation(fields: [managerId], references: [id])\n\n  // Team Context\n  teamId String?\n  team   Team?   @relation(fields: [teamId], references: [id])\n\n  // Progress Tracking\n  stage      String? // Ideation, Research, Validation, Prototyping, Pilot, Scale\n  milestones Json?\n\n  // Value Propositions\n  valuePropositions ValueProposition[]\n\n  // Gamification\n  xp     Int @default(0)\n  points Int @default(0)\n  level  Int @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([teamId])\n}\n\n// ============ TEAM & ROADMAP ============\n\nmodel Team {\n  id        String   @id @default(cuid())\n  name      String\n  cohort    String?\n  startDate DateTime @default(now())\n\n  // Members\n  members StudentProfile[]\n\n  // Mento Assignment\n  mentorId String?\n  mentor   ManagerProfile? @relation(fields: [mentorId], references: [id])\n\n  // Progress\n  progress TeamProgress?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([mentorId])\n}\n\nmodel RoadmapStage {\n  id          String @id @default(cuid())\n  stageNumber Int    @unique // 1, 2, 3, 4\n  name        String\n  weeks       Int[] // [0,1,2]\n\n  // Content\n  tools RoadmapTool[]\n\n  // Completion Logic\n  minimumScore Int?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel RoadmapTool {\n  id     String @id @default(cuid())\n  toolId String @unique // \"mtp_ikigai\"\n  name   String\n  week   Int\n\n  // Relations\n  stageId String\n  stage   RoadmapStage @relation(fields: [stageId], references: [id])\n\n  tasks RoadmapTask[]\n\n  // Metadata\n  description       String? @db.Text\n  timeEstimateHours Int?\n  isLocked          Boolean @default(true)\n\n  // Dependencies\n  dependencies String[] // IDs of other tools\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([stageId])\n}\n\nmodel RoadmapTask {\n  id              String @id @default(cuid())\n  description     String\n  deliverableType String // \"canvas\", \"pdf\", \"link\"\n\n  // Validation\n  validationCriteria String[]\n\n  // Parent Tool\n  toolId String\n  tool   RoadmapTool @relation(fields: [toolId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([toolId])\n}\n\n// ============ PROGRESS TRACKING ============\n\nmodel TeamProgress {\n  id     String @id @default(cuid())\n  teamId String @unique\n  team   Team   @relation(fields: [teamId], references: [id], onDelete: Cascade)\n\n  // Current State\n  currentStageId Int @default(1)\n  currentWeek    Int @default(0)\n\n  // Metrics\n  startedAt  DateTime @default(now())\n  lastActive DateTime @default(now())\n\n  // Detailed Progress\n  toolProgress  ToolProgress[]\n  stageProgress StageProgress[]\n\n  updatedAt DateTime @updatedAt\n}\n\nmodel StageProgress {\n  id             String       @id @default(cuid())\n  teamProgressId String\n  teamProgress   TeamProgress @relation(fields: [teamProgressId], references: [id], onDelete: Cascade)\n\n  stageNumber Int\n  status      String @default(\"locked\") // locked, unlocked, in_progress, completed\n\n  completedAt DateTime?\n  score       Int?\n  feedback    String?   @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([teamProgressId, stageNumber])\n}\n\nmodel ToolProgress {\n  id             String       @id @default(cuid())\n  teamProgressId String\n  teamProgress   TeamProgress @relation(fields: [teamProgressId], references: [id], onDelete: Cascade)\n\n  toolId String // Reference to RoadmapTool.toolId\n  status String @default(\"locked\") // locked, unlocked, in_progress, completed\n\n  startedAt   DateTime?\n  completedAt DateTime?\n\n  // Storage for tool-specific data (e.g. Canvas data)\n  data Json?\n\n  // Task Tracking\n  taskProgress TaskProgress[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([teamProgressId, toolId])\n}\n\nmodel TaskProgress {\n  id             String       @id @default(cuid())\n  toolProgressId String\n  toolProgress   ToolProgress @relation(fields: [toolProgressId], references: [id], onDelete: Cascade)\n\n  taskId String // Reference to RoadmapTask.id\n  status String @default(\"pending\") // pending, submitted, approved, rejected\n\n  submissionUrl  String?\n  submissionText String? @db.Text\n\n  submittedAt DateTime?\n  feedback    String?   @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([toolProgressId, taskId])\n}\n\nmodel ValueProposition {\n  id        String         @id @default(cuid())\n  student   StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)\n  studentId String\n\n  // Value Proposition Canvas\n  // Customer Profile\n  customerJobs String[] @db.Text // Jobs to be done\n  pains        String[] @db.Text // Customer pains\n  gains        String[] @db.Text // Customer gains\n\n  // Value Map\n  painRelievers    String[] @db.Text // How product relieves pains\n  gainCreators     String[] @db.Text // How product creates gains\n  productsServices String[] @db.Text // Actual products/services\n\n  // Problem-Solution Fit\n  problemStatement String? // Problem statement ID\n  proposedSolution String? // Solution ID\n\n  // Stakeholder Validation\n  targetStakeholder        String? // StakeholderProfile ID\n  targetStakeholderProfile StakeholderProfile? @relation(fields: [targetStakeholder], references: [id])\n\n  // Validation Status\n  validationStatus String    @default(\"draft\") // draft, validated, needs-revision, rejected\n  validationNotes  String?   @db.Text\n  validatedBy      String? // User ID\n  validatedDate    DateTime?\n\n  // Feedback & Iterations\n  feedback        Json? // Structured feedback data\n  iterationNumber Int   @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([studentId])\n  @@index([validationStatus])\n}\n\n// ============ MANAGER/MENTOR PROFILES ============\n\nmodel ManagerProfile {\n  id     String @id @default(cuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // Professional Info\n  organization String?\n  role         String?\n  bio          String?  @db.Text\n  expertise    String[]\n\n  // Mentorship Capacity\n  maxMentees Int?\n  mentees    StudentProfile[]\n  teams      Team[]\n\n  // Focus Areas\n  focusSectors  String[]\n  focusProblems String[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel ResearcherProfile {\n  id     String @id @default(cuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // Research Context\n  institution  String?\n  department   String?\n  researchArea String[]\n\n  // Research Output\n  reports ResearchReport[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// ============ INTERACTION TRACKING ============\n\nmodel Interaction {\n  id String @id @default(cuid())\n\n  // Participants\n  initiator   User   @relation(\"InitiatorInteractions\", fields: [initiatorId], references: [id], onDelete: Cascade)\n  initiatorId String\n  target      User   @relation(\"TargetInteractions\", fields: [targetId], references: [id], onDelete: Cascade)\n  targetId    String\n\n  // Stakeholder Context\n  stakeholder   StakeholderProfile? @relation(fields: [stakeholderId], references: [id], onDelete: SetNull)\n  stakeholderId String?\n\n  // Interaction Details\n  type     String // Meeting, Call, Email, WhatsApp, Event, Workshop, Field-Visit\n  channel  String? // In-person, Virtual, Phone, Email, Social-Media\n  subject  String?\n  notes    String? @db.Text\n  duration Int? // in minutes\n  location String?\n\n  // Outcomes\n  outcome           String?   @db.Text\n  actionItems       String[]  @db.Text\n  nextSteps         String[]  @db.Text\n  followUpDate      DateTime?\n  followUpCompleted Boolean   @default(false)\n\n  // Attachments\n  documents  String[] // File paths or URLs\n  photos     String[]\n  recordings String[]\n\n  // AI Processing\n  summary   String?  @db.Text // AI-generated summary\n  keyPoints String[] // AI-extracted key points\n  sentiment String? // Positive, Neutral, Negative, Mixed\n  topics    String[] // AI-extracted topics\n\n  // Ratings & Feedback\n  effectiveness Int? // 1-10 rating\n  feedback      String? @db.Text\n\n  // Timeline\n  scheduledAt DateTime?\n  occurredAt  DateTime  @default(now())\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@index([initiatorId])\n  @@index([targetId])\n  @@index([stakeholderId])\n  @@index([occurredAt])\n  @@index([type])\n}\n\n// ============ NOTE TAKING ============\n\nmodel Note {\n  id       String @id @default(cuid())\n  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)\n  authorId String\n\n  // Note Content\n  title    String?\n  content  String  @db.Text\n  noteType String? // Observation, Insight, Todo, Reference\n\n  // Context\n  tags          String[]\n  stakeholderId String?\n  problemId     String?\n  solutionId    String?\n\n  // Organization\n  folder   String?\n  pinned   Boolean @default(false)\n  archived Boolean @default(false)\n\n  // Sharing\n  sharedWith String[] // User IDs\n  visibility String   @default(\"private\") // private, team, public\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  // @@fulltext([title, content])\n\n  @@index([authorId])\n}\n\n// ============ CALENDAR & EVENTS ============\n\nmodel CalendarEvent {\n  id          String @id @default(cuid())\n  organizer   User   @relation(fields: [organizerId], references: [id], onDelete: Cascade)\n  organizerId String\n\n  // Event Details\n  title       String\n  description String? @db.Text\n  eventType   String // Meeting, Interview, Workshop, Field-Visit, Conference\n\n  // Participants\n  participantIds String[] // User IDs\n  stakeholderIds String[] // StakeholderProfile IDs\n\n  // Timing\n  startTime DateTime\n  endTime   DateTime\n  timezone  String   @default(\"Asia/Kolkata\")\n  allDay    Boolean  @default(false)\n\n  // Location\n  location        String?\n  locationDetails String? @db.Text\n  isVirtual       Boolean @default(false)\n  meetingLink     String?\n\n  // Status\n  status String @default(\"scheduled\") // scheduled, confirmed, cancelled, completed\n\n  // Reminders\n  reminders Json? // Array of reminder times\n\n  // Associated Records\n  interactionId String? // Link to Interaction after completion\n  transcriptId  String? // Link to Transcript if recorded\n\n  // Recurrence\n  recurring      Boolean @default(false)\n  recurrenceRule String? // iCal RRULE format\n\n  // Metadata\n  notes       String?  @db.Text\n  attachments String[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([organizerId])\n  @@index([startTime])\n  @@index([status])\n}\n\n// ============ TRANSCRIPT MANAGEMENT ============\n\nmodel Transcript {\n  id String @id @default(cuid())\n\n  // Basic Info\n  title          String\n  description    String? @db.Text\n  transcriptType String // Interview, Meeting, Workshop, Focus-Group\n\n  // Context\n  stakeholder     StakeholderProfile? @relation(fields: [stakeholderId], references: [id])\n  stakeholderId   String?\n  calendarEventId String?\n\n  // Participants\n  participants Json? // Array of participant details\n  interviewer  String?\n  interviewee  String?\n\n  // File Management\n  originalFile String // S3/R2 path to original file\n  fileType     String // audio/mp3, video/mp4, application/pdf\n  fileSize     Int? // in bytes\n  fileName     String\n\n  // Content\n  rawText       String? @db.Text\n  processedText String? @db.Text\n\n  // Processing Status\n  processingStatus String  @default(\"pending\") // pending, processing, completed, failed\n  processingError  String? @db.Text\n\n  // AI Processing\n  summary     String?  @db.Text\n  keyPoints   String[]\n  topics      String[]\n  actionItems String[] @db.Text\n  insights    String[] @db.Text\n  quotes      String[] @db.Text\n\n  // Metadata\n  recordedDate DateTime?\n  duration     Int? // in seconds\n  language     String    @default(\"en\")\n  quality      String? // High, Medium, Low\n\n  // Tagging\n  tags         String[]\n  sectors      String[]\n  problemAreas String[]\n\n  // Embeddings for RAG\n  embeddings VectorEmbedding[]\n\n  // Access Control\n  uploadedBy String // User ID\n  visibility String @default(\"private\") // private, team, public\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([stakeholderId])\n  @@index([processingStatus])\n  @@index([recordedDate])\n}\n\nmodel VectorEmbedding {\n  id String @id @default(cuid())\n\n  // Source\n  sourceType   String // transcript, note, document\n  sourceId     String\n  transcript   Transcript? @relation(fields: [transcriptId], references: [id])\n  transcriptId String?\n\n  // Content\n  text      String  @db.Text\n  embedding Float[] // Vector embedding\n\n  // Metadata\n  metadata   Json? // Additional context\n  chunkIndex Int? // For chunked content\n\n  createdAt DateTime @default(now())\n\n  @@index([sourceId])\n  @@index([sourceType])\n}\n\n// ============ RESEARCH REPORTS ============\n\nmodel ResearchReport {\n  id String @id @default(cuid())\n\n  // Report Details\n  title      String\n  reportType String // Sector-Analysis, District-Profile, Problem-Deep-Dive, Solution-Assessment\n  status     String @default(\"draft\") // draft, in-review, published\n\n  // Scope\n  scope     Json? // Structured data about report scope\n  districts String[]\n  sectors   Sector[]\n  timeFrame Json? // { from: Date, to: Date }\n\n  // Research Questions\n  researchQuestions String[] @db.Text\n  methodology       String?  @db.Text\n\n  // Content Sections\n  executiveSummary String?  @db.Text\n  introduction     String?  @db.Text\n  findings         String?  @db.Text\n  analysis         String?  @db.Text\n  recommendations  String[] @db.Text\n  conclusions      String?  @db.Text\n\n  // Key Findings\n  keyFindings String[] @db.Text\n\n  // Data Sources\n  stakeholdersAnalyzed Int?\n  interactionsAnalyzed Int?\n  transcriptsAnalyzed  Int?\n  dataSources          String[]\n\n  // AI Generation\n  generatedByAI Boolean @default(false)\n  aiModel       String?\n  humanReviewed Boolean @default(false)\n\n  // Authorship\n  createdBy String // User ID\n  author    User   @relation(fields: [createdBy], references: [id])\n\n  contributors String[] // User IDs\n\n  // Researcher Profile\n  researcherId String?\n  researcher   ResearcherProfile? @relation(fields: [researcherId], references: [id])\n\n  // Publishing\n  publishedDate DateTime?\n  version       Int       @default(1)\n\n  // Files & Attachments\n  pdfUrl      String?\n  attachments String[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([reportType])\n  @@index([publishedDate])\n}\n\n// ============ INCUBATOR COFOUNDER MODULE ============\n\n// Core Journey Tracking Models\nmodel StudentJourney {\n  id     String @id @default(cuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  sector          String // energy, health, fintech, agritech, edtech, deeptech, smartcities\n  stage           String // idea, validation, pilot, scaling, growth\n  trlLevel        Int    @default(1) // 1-9\n  complianceScore Int    @default(0) // 0-100\n  pilotReadiness  Int    @default(0) // 0-100\n\n  // Intelligence Metrics\n  weeklyReports        Json?     @default(\"[]\") // Array of summaries\n  loveabilityScore     Int       @default(0) // 0-100\n  lastIntelligenceSync DateTime?\n\n  problemStatementId String?\n  problemStatement   ProblemStatement? @relation(fields: [problemStatementId], references: [id])\n\n  metrics    Json // { experiments_completed, partners_engaged, funding_raised }\n  milestones Json // Array of completed milestone IDs\n  blockers   Json? // Array of { blocker, impact, status }\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  trlEvidences      TRLEvidence[]\n  experiments       Experiment[]\n  complianceTasks   ComplianceTask[]\n  pilotApplications PilotApplication[]\n  budgetBreakdowns  BudgetBreakdown[]\n  roadmapMilestones RoadmapMilestone[]\n  resourceBookings  ResourceBooking[]\n  sprints           Sprint[]\n  crlEvidences      CRLEvidence[]\n  irlEvidences      IRLEvidence[]\n  nudgeEvents       NudgeEvent[]\n\n  @@index([userId])\n  @@index([sector])\n  @@index([stage])\n}\n\nmodel TRLEvidence {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  trlLevel     Int // 1-9\n  evidenceType String // document, video, test_results, pilot_data, patent, publication, competition_win\n  evidenceUrl  String?\n  evidenceText String  @db.Text\n\n  aiScore           Int? // 0-100 AI assessment score\n  aiRecommendations Json? // Array of recommendations from AI\n  reviewerNotes     String? @db.Text\n\n  status      String    @default(\"pending\") // pending, submitted, under_review, approved, rejected\n  submittedAt DateTime  @default(now())\n  reviewedAt  DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([trlLevel])\n  @@index([status])\n}\n\nmodel Experiment {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  title       String\n  type        String // digital_simulation, hardware_stress_test, market_validation, field_trial\n  hypothesis  String @db.Text\n  methodology String @db.Text\n\n  successCriteria Json // Array of { metric, threshold, importance }\n  metrics         Json // { success_rate, confidence, iterations, data_points }\n  findings        String? @db.Text\n  dataUrl         String?\n\n  status    String    @default(\"planned\") // planned, in_progress, completed, failed\n  startDate DateTime?\n  endDate   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([status])\n  @@index([type])\n}\n\nmodel ComplianceTask {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  title          String\n  category       String // regulatory, data_privacy, safety, environmental, financial, legal, sector_specific\n  riskLevel      String // low, medium, high, critical\n  regulatoryBody String? // FDA, SEBI, RBI, CDSCO, IRDAI, etc.\n\n  description         String @db.Text\n  certificationStatus String @default(\"not_started\") // not_started, in_progress, completed, expired\n  evidenceUrls        Json? // Array of document URLs\n\n  dueDate     DateTime?\n  completedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([category])\n  @@index([riskLevel])\n  @@index([certificationStatus])\n}\n\nmodel PilotApplication {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  partnerName String\n  partnerType String // corporate, government, institution, consortium\n\n  title         String\n  description   String   @db.Text\n  userTarget    Int?\n  revenueTarget Decimal? @db.Decimal(15, 2)\n  duration      Int? // Days\n\n  kpis          Json // { metric, target, actual, unit }\n  weeklyReports Json? // Array of { week, summary, metrics, files }\n\n  status    String    @default(\"available\") // available, applied, accepted, in_progress, completed, rejected\n  appliedAt DateTime?\n  startDate DateTime?\n  endDate   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([status])\n  @@index([partnerType])\n}\n\nmodel BudgetBreakdown {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  category      String // testing, compliance, pilot, manufacturing, operations, marketing\n  plannedAmount Decimal @db.Decimal(15, 2)\n  spentAmount   Decimal @default(0) @db.Decimal(15, 2)\n\n  lineItems    Json // Array of { item, amount, status }\n  budgetPeriod String // Q1_2026, FY_2026, etc.\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([category])\n}\n\nmodel RoadmapMilestone {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  title       String\n  description String? @db.Text\n  category    String // trl, compliance, experiment, pilot, funding, product\n\n  startDate DateTime\n  endDate   DateTime\n  duration  Int // Days\n\n  status   String @default(\"pending\") // pending, active, completed, delayed, blocked\n  progress Int    @default(0) // 0-100\n\n  dependsOn          Json? // Array of milestone IDs\n  aiSuggested        Boolean @default(false)\n  recommendationType String? // active, passive\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([category])\n  @@index([status])\n  @@index([startDate])\n}\n\nmodel ResourceBooking {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  resourceType String // testing_lab, makerspace, expert, funding, event\n  resourceId   String\n\n  bookingDate DateTime\n  duration    Int? // Hours or days\n  status      String   @default(\"requested\") // requested, confirmed, completed, cancelled\n\n  estimatedCost Decimal? @db.Decimal(15, 2)\n  actualCost    Decimal? @db.Decimal(15, 2)\n\n  purpose String? @db.Text\n  outcome String? @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([journeyId])\n  @@index([resourceType])\n  @@index([status])\n  @@index([bookingDate])\n}\n\n// Resource Network Models (Discovery/Directory)\nmodel TestingLab {\n  id          String  @id @default(cuid())\n  name        String\n  location    String\n  state       String\n  description String? @db.Text\n\n  sectorSpecialization Json // Array of sectors\n  trlLevelSupported    Json // Array of TRL levels\n  equipment            Json // Array of equipment names\n  certifications       Json // Array of certification names\n\n  availability  String  @default(\"available\") // available, limited, full\n  estimatedCost String?\n\n  contactEmail String?\n  contactPhone String?\n  website      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([state])\n  @@index([availability])\n}\n\nmodel Makerspace {\n  id          String  @id @default(cuid())\n  name        String\n  location    String\n  state       String\n  description String? @db.Text\n\n  equipment   Json // Array of equipment\n  sectorFocus Json // Array of sectors\n\n  hourlyRate        Decimal? @db.Decimal(10, 2)\n  membershipOptions Json? // { monthly, quarterly, annual }\n\n  availability String  @default(\"available\")\n  contactEmail String?\n  website      String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([state])\n  @@index([availability])\n}\n\nmodel FundingOpportunity {\n  id          String @id @default(cuid())\n  title       String\n  description String @db.Text\n\n  type           String // government_grant, venture_capital, challenge_based, csr_fund\n  fundingSize    String\n  sectorFocus    Json // Array of sectors\n  trlEligibility Json // Array of TRL levels\n\n  status              String    @default(\"open\") // open, closing_soon, closed\n  applicationDeadline DateTime?\n  applicationUrl      String?\n\n  organizationName String\n  organizationType String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([type])\n  @@index([applicationDeadline])\n}\n\nmodel PitchingEvent {\n  id          String  @id @default(cuid())\n  title       String\n  description String? @db.Text\n\n  type      String // demo_day, pitch_competition, investor_meetup\n  eventDate DateTime\n  location  String\n\n  sectorFocus Json // Array of sectors\n  prizePool   String?\n  attendees   String?\n\n  status          String  @default(\"upcoming\") // upcoming, open, closed\n  registrationUrl String?\n\n  trlMin Int @default(1) // earliest TRL this event is useful for\n  trlMax Int @default(9) // latest TRL this event is useful for\n\n  attendanceStatus   String? // registered | attended | won\n  attendingJourneyId String? // student's journey tracker\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([eventDate])\n  @@index([type])\n}\n\nmodel Incubator {\n  id          String @id @default(cuid())\n  name        String\n  location    String\n  type        String // incubator, accelerator\n  description String @db.Text\n\n  sectorFocus    Json // Array of sectors\n  fundingSupport Boolean @default(false)\n  fundingAmount  String?\n\n  status         String  @default(\"accepting\") // accepting, closed, rolling\n  applicationUrl String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([type])\n}\n\nmodel Expert {\n  id             String @id @default(cuid())\n  name           String\n  specialization String\n  domain         Json // Array: Regulatory, Technical, IP, Compliance, AI\n\n  rating            Decimal @default(0) @db.Decimal(3, 2)\n  sessionsCompleted Int     @default(0)\n\n  availability String  @default(\"available\") // available, limited, unavailable\n  hourlyRate   Decimal @db.Decimal(10, 2)\n  subsidized   Boolean @default(false)\n\n  contactEmail String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([availability])\n  @@index([subsidized])\n}\n\nmodel GovernmentScheme {\n  id          String @id @default(cuid())\n  title       String\n  description String @db.Text\n\n  type          String // startup_india, state_scheme, pli_scheme, capital_subsidy, tax_benefit\n  benefitAmount String\n  sectorFocus   Json // Array of sectors\n\n  eligibilityCriteria Json // { age, recognition, stage, etc. }\n  status              String    @default(\"active\") // active, expired\n  deadline            DateTime?\n\n  applicationUrl String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([type])\n  @@index([deadline])\n}\n\nmodel SectorAPI {\n  id          String @id @default(cuid())\n  name        String\n  category    String\n  sector      String // healthtech, fintech, agritech, energy, smartcities, deeptech\n  description String @db.Text\n\n  apiType          String // REST, GraphQL, WebSocket\n  sandboxUrl       String?\n  documentationUrl String\n\n  sandboxReady Boolean @default(false)\n  authRequired Boolean @default(true)\n  rateLimits   Json? // { requests_per_minute, requests_per_day }\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([sector])\n  @@index([sandboxReady])\n}\n\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n// SPRINT ENGINE -------- Stage Intelligence v7.1\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\nmodel Sprint {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  sprintNumber Int // 1--------9\n  name         String // e.g. \"Purpose & Problem Framing\"\n  stageNumber  Int // 1--------4\n  weekRange    String // e.g. \"0\", \"1\", \"3A\"\n  trlGate      String @db.Text\n  crlIrlOutput String @db.Text\n\n  // status lifecycle: locked -------- active -------- in_progress -------- gate_review -------- completed | blocked\n  status String @default(\"locked\")\n\n  // JSON array of { checkId: string, label: string, passed: boolean, confirmedAt?: string }\n  // Student must explicitly check each ------- item -------- never auto-inferred\n  gateChecks Json @default(\"[]\")\n\n  // TRL 4 specific: 4-criteria checklist stored here for sprint 9\n  trl4Criteria Json @default(\"[]\")\n\n  startedAt     DateTime?\n  completedAt   DateTime?\n  blockedReason String?\n  mentorNote    String?   @db.Text\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  toolSubmissions SprintToolSubmission[]\n\n  @@unique([journeyId, sprintNumber])\n  @@index([journeyId, status])\n}\n\nmodel SprintToolSubmission {\n  id       String @id @default(cuid())\n  sprintId String\n  sprint   Sprint @relation(fields: [sprintId], references: [id], onDelete: Cascade)\n\n  toolId          String // must match RoadmapTool.toolId\n  toolName        String\n  trlContribution String\n  crlDimension    String? // 'market_application' | 'customer_validation' | 'business_model'\n  irlDimension    String? // 'pitch_capability' | 'financial_modelling' | 'investor_engagement'\n  maxPercent      Int? // maximum % contribution this tool can unlock\n\n  // Support for multiple entries per tool\n  iterationName   String? // e.g. \"Customer Interview 1\"\n  iterationNumber Int     @default(1)\n  isDraft         Boolean @default(false)\n\n  // The actual canvas/form output saved by the student in this tool\n  submittedData Json?\n\n  // Gate status\n  status      String  @default(\"pending\") // pending | submitted | gate_passed | blocked\n  gateCheck   String  @db.Text // the gate check string from docs\n  isGateLevel Boolean @default(true) // if true, sprint cannot complete without this\n\n  // Nudge Agent fields\n  prerequisitesMet   Boolean @default(false)\n  blockedByToolId    String?\n  blockedByToolName  String?\n  fillHintsAvailable Boolean @default(false)\n  resources          Json? // Array of { title, url, type }\n\n  // Manager evaluation fields\n  managerScore Int? // 0---100 override score set by manager\n  managerNotes String?   @db.Text // structured feedback written by manager\n  rubricChecks Json? // Array of { label: string, passed: boolean, note: string }\n  // One entry per gateCheck bullet the manager ticks off\n  reviewedBy   String? // manager userId\n  reviewedAt   DateTime?\n\n  // AI evaluation fields\n  aiScore         Int? // 0-100 score generated by Gemini\n  assessmentNotes String? @db.Text // evaluation output from AI\n\n  submittedAt DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@index([sprintId, toolId])\n  @@index([sprintId, status])\n}\n\n// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n// CRL / IRL EVIDENCE GATES\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\nmodel CRLEvidence {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  // dimension: 'market_application' (30%) | 'customer_validation' (35%) | 'business_model' (35%)\n  dimension       String\n  dimensionWeight Int // 30 | 35 | 35\n\n  evidenceText     String @db.Text\n  // Array of { url: string, type: 'file'|'link', label: string }\n  evidenceUrls     Json   @default(\"[]\")\n  // Array of toolIds from SprintToolSubmission this evidence cites\n  sprintToolsCited Json   @default(\"[]\")\n\n  // Claude assessment output (mapped to Gemini output)\n  aiScore             Int? // 0--------100\n  criterionScores     Json? // { quality: int, sourcing: int, specificity: int, integrity: int }\n  assessmentNotes     String? @db.Text\n  improvementGuidance String? @db.Text\n  autoRejectReason    String? // e.g. \"Round-number TAM detected\"\n\n  // Pass rule: weighted total -------65 AND no dimension <30\n  passed        Boolean @default(false)\n  weightedScore Int?\n\n  status            String  @default(\"draft\") // draft|submitted|under_review|approved|rejected\n  resubmissionCount Int     @default(0)\n  mentorNotified    Boolean @default(false)\n\n  submittedAt DateTime?\n  reviewedAt  DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@index([journeyId, dimension])\n  @@index([journeyId, status])\n}\n\nmodel IRLEvidence {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  // dimension: 'pitch_capability' (40%) | 'financial_modelling' (30%) | 'investor_engagement' (30%)\n  dimension       String\n  dimensionWeight Int // 40 | 30 | 30\n\n  evidenceText     String @db.Text\n  evidenceUrls     Json   @default(\"[]\")\n  sprintToolsCited Json   @default(\"[]\")\n\n  aiScore             Int?\n  criterionScores     Json?\n  assessmentNotes     String? @db.Text\n  improvementGuidance String? @db.Text\n  autoRejectReason    String?\n\n  passed        Boolean @default(false)\n  weightedScore Int?\n\n  status            String  @default(\"draft\")\n  resubmissionCount Int     @default(0)\n  mentorNotified    Boolean @default(false)\n\n  submittedAt DateTime?\n  reviewedAt  DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@index([journeyId, dimension])\n}\n\nmodel RubricDefinition {\n  id        String   @id @default(cuid())\n  toolId    String   @unique // toolId from sprint-registry\n  name      String\n  criteria  Json // Array of { id, label, description, maxPoints }\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n// NUDGE AGENT LOG\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\nmodel NudgeEvent {\n  id        String         @id @default(cuid())\n  journeyId String\n  journey   StudentJourney @relation(fields: [journeyId], references: [id], onDelete: Cascade)\n\n  nudgeType         String // 'BLOCK' | 'WARN' | 'FILL_GUIDE'\n  targetToolId      String\n  targetToolName    String\n  blockedByToolId   String?\n  blockedByToolName String?\n  message           String  @db.Text\n  // Array of { fieldName: string, hint: string, sourceToolId: string, sourceToolName: string }\n  fillHints         Json?\n\n  dismissed   Boolean   @default(false)\n  dismissedAt DateTime?\n  createdAt   DateTime  @default(now())\n\n  @@index([journeyId, targetToolId])\n}\n\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n// SPRINT TEMPLATES (FOR MENTOR BUILDER)\n// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n\nmodel SprintTemplate {\n  id           String  @id @default(cuid())\n  name         String\n  sprintNumber Int\n  weekRange    String\n  trlGate      String? @db.Text\n  crlIrlOutput String? @db.Text\n\n  description String? @db.Text\n  isPublic    Boolean @default(false)\n  creatorId   String?\n\n  tools SprintTemplateTool[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel SprintTemplateTool {\n  id         String         @id @default(cuid())\n  templateId String\n  template   SprintTemplate @relation(fields: [templateId], references: [id], onDelete: Cascade)\n\n  toolId          String\n  toolName        String\n  isGateLevel     Boolean @default(false)\n  trlContribution String?\n  resources       Json? // Array of { title, url, type }\n\n  createdAt DateTime @default(now())\n}\n",
  "inlineSchemaHash": "15064fec9fa91fbe86bea4c9c5a8be9996d81cd628fb71d912b415972f724791",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"UserRole\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"alternatePhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredLanguage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timezone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastLoginAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"apiKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholderProfile\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderProfileToUser\"},{\"name\":\"studentProfile\",\"kind\":\"object\",\"type\":\"StudentProfile\",\"relationName\":\"StudentProfileToUser\"},{\"name\":\"managerProfile\",\"kind\":\"object\",\"type\":\"ManagerProfile\",\"relationName\":\"ManagerProfileToUser\"},{\"name\":\"researcherProfile\",\"kind\":\"object\",\"type\":\"ResearcherProfile\",\"relationName\":\"ResearcherProfileToUser\"},{\"name\":\"studentJourney\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"StudentJourneyToUser\"},{\"name\":\"interactionsAsInitiator\",\"kind\":\"object\",\"type\":\"Interaction\",\"relationName\":\"InitiatorInteractions\"},{\"name\":\"interactionsAsTarget\",\"kind\":\"object\",\"type\":\"Interaction\",\"relationName\":\"TargetInteractions\"},{\"name\":\"calendarEvents\",\"kind\":\"object\",\"type\":\"CalendarEvent\",\"relationName\":\"CalendarEventToUser\"},{\"name\":\"notes\",\"kind\":\"object\",\"type\":\"Note\",\"relationName\":\"NoteToUser\"},{\"name\":\"researchReports\",\"kind\":\"object\",\"type\":\"ResearchReport\",\"relationName\":\"ResearchReportToUser\"},{\"name\":\"createdStakeholders\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"CreatedBy\"}],\"dbName\":null},\"StakeholderProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"StakeholderProfileToUser\"},{\"name\":\"designation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"alternateDesignations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organization\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organizationType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dateOfBirth\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"gender\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"education\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expertise\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"specializations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"certifications\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"yearsExperience\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"careerHistory\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"teamSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"teamComposition\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"budget\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"jurisdiction\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"decisionMakingAuthority\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keyResponsibilities\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reportingTo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"district\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"taluk\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"village\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"landmark\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pincode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"interestTags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"coverageDistricts\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"coverageTaluks\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"coverageVillages\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"serviceRadius\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"officePhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"officeMobile\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"officeEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"officeAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"personalMobile\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"personalEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"whatsapp\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"telegram\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"linkedIn\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"twitter\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"facebook\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instagram\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"researchGate\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"googleScholar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"website\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organizationWebsite\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredContactMethod\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"availableHours\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectors\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"SectorToStakeholderProfile\"},{\"name\":\"problemStatements\",\"kind\":\"object\",\"type\":\"ProblemStatement\",\"relationName\":\"ProblemStatementToStakeholderProfile\"},{\"name\":\"solutions\",\"kind\":\"object\",\"type\":\"Solution\",\"relationName\":\"SolutionToStakeholderProfile\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keywords\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"communityAffiliation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"casteCommunity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"languagesSpoken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"culturalContext\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"landHolding\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"cropsCultivated\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"farmingType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"irrigationSource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"boatType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fishingLicense\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"catchType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"serviceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"patientsServed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"healthFacility\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tribe\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tribalCard\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"forestRights\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ngoRegistration\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ngoDarpanId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"donorAgencies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"employeeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cadre\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postingHistory\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"transferDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"populationServed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"geographicReach\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"annualBeneficiaries\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"keyAchievements\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"awards\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"publications\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"infrastructure\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vehiclesOwned\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technologyAccess\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingSource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"annualBudget\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"partnerOrganizations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"networkMemberships\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"collaborationInterest\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentoringCapability\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"trainingCapability\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"topChallenges\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resourceNeeds\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"capacityGaps\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"priorityAreas\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"innovationsPracticed\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"successStories\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"replicableModels\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"verificationStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"verificationDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"verifiedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"verificationNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dataQualityScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastVerified\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dataSource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"collectedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"collectionMethod\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"addedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"addedByUser\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CreatedBy\"},{\"name\":\"totalInteractions\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastInteraction\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"engagementScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"responseRate\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"interactions\",\"kind\":\"object\",\"type\":\"Interaction\",\"relationName\":\"InteractionToStakeholderProfile\"},{\"name\":\"linkedStakeholders\",\"kind\":\"object\",\"type\":\"StakeholderLink\",\"relationName\":\"StakeholderA\"},{\"name\":\"linkedByStakeholders\",\"kind\":\"object\",\"type\":\"StakeholderLink\",\"relationName\":\"StakeholderB\"},{\"name\":\"supportingOrgs\",\"kind\":\"object\",\"type\":\"SupportingOrgRelation\",\"relationName\":\"StakeholderProfileToSupportingOrgRelation\"},{\"name\":\"transcripts\",\"kind\":\"object\",\"type\":\"Transcript\",\"relationName\":\"StakeholderProfileToTranscript\"},{\"name\":\"valuePropositionsTarget\",\"kind\":\"object\",\"type\":\"ValueProposition\",\"relationName\":\"StakeholderProfileToValueProposition\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Sector\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"color\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"SubSectors\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"SubSectors\"},{\"name\":\"stakeholders\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"SectorToStakeholderProfile\"},{\"name\":\"problemStatements\",\"kind\":\"object\",\"type\":\"ProblemStatement\",\"relationName\":\"ProblemStatementToSector\"},{\"name\":\"solutions\",\"kind\":\"object\",\"type\":\"Solution\",\"relationName\":\"SectorToSolution\"},{\"name\":\"researchReports\",\"kind\":\"object\",\"type\":\"ResearchReport\",\"relationName\":\"ResearchReportToSector\"},{\"name\":\"problemCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"stakeholderCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ProblemStatement\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"severity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"districts\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"taluks\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"villages\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectors\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"ProblemStatementToSector\"},{\"name\":\"domain\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subDomain\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keywords\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"affectedPopulation\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"affectedDemographic\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"currentImpact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectedImpact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rootCauses\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contributingFactors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"barriers\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"historicalContext\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantitativeData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"dataSource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastUpdated\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"stakeholders\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"ProblemStatementToStakeholderProfile\"},{\"name\":\"primaryStakeholders\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"affectedGroups\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"solutions\",\"kind\":\"object\",\"type\":\"Solution\",\"relationName\":\"ProblemStatementToSolution\"},{\"name\":\"studentJourneys\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"ProblemStatementToStudentJourney\"},{\"name\":\"documents\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"references\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"priority\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Solution\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"problemStatements\",\"kind\":\"object\",\"type\":\"ProblemStatement\",\"relationName\":\"ProblemStatementToSolution\"},{\"name\":\"stakeholders\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"SolutionToStakeholderProfile\"},{\"name\":\"approach\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"methodology\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"components\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timeline\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phases\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"milestones\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"budget\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"budgetBreakdown\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"humanResources\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technicalResources\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"infrastructure\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"leadOrganization\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"implementingPartners\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingPartners\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technicalPartners\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"supportingOrgs\",\"kind\":\"object\",\"type\":\"SupportingOrg\",\"relationName\":\"SolutionToSupportingOrg\"},{\"name\":\"pilotResults\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidence\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"metrics\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"successIndicators\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expectedImpact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actualImpact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"beneficiaries\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"geographicReach\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scalabilityAssessment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"replicationPotential\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"adaptationGuidelines\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"risks\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mitigationStrategies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lessonsLearned\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bestPractices\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectors\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"SectorToSolution\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"proposedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"proposedDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastReviewed\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SupportingOrg\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"shortName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mission\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vision\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"founded\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"registrationNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ngoDarpanId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"website\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"alternatePhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"district\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pincode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ceo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"founder\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keyContacts\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"geographicReach\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"annualBudget\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"teamSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"beneficiariesServed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"supportsStages\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"focusSectors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"focusProblems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resourcesOffered\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"programsOffered\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"servicesOffered\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingRange\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"applicationProcess\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eligibilityCriteria\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"facilities\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"equipment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"digitalResources\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectsSupported\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"successStories\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notableAlumni\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"awards\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"partnerOrganizations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"networkMemberships\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"accreditations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"applicationDeadlines\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"applicationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactForApplication\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"selectionProcess\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documents\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reports\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"solutions\",\"kind\":\"object\",\"type\":\"Solution\",\"relationName\":\"SolutionToSupportingOrg\"},{\"name\":\"stakeholders\",\"kind\":\"object\",\"type\":\"SupportingOrgRelation\",\"relationName\":\"SupportingOrgToSupportingOrgRelation\"},{\"name\":\"verified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"verifiedDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dataQuality\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SupportingOrgRelation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholder\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderProfileToSupportingOrgRelation\"},{\"name\":\"stakeholderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organization\",\"kind\":\"object\",\"type\":\"SupportingOrg\",\"relationName\":\"SupportingOrgToSupportingOrgRelation\"},{\"name\":\"orgId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"relationshipType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"active\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"projectsCollaborated\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingReceived\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"supportReceived\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"StakeholderLink\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholderA\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderA\"},{\"name\":\"stakeholderAId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholderB\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderB\"},{\"name\":\"stakeholderBId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"linkType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"strength\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"commonProblems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"commonSolutions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sharedProjects\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"active\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastInteraction\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"StudentProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"StudentProfileToUser\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"program\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"year\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"rollNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectDescription\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"focusArea\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"focusSectors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"teamMembers\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"workingOnProblems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"managerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"manager\",\"kind\":\"object\",\"type\":\"ManagerProfile\",\"relationName\":\"ManagerProfileToStudentProfile\"},{\"name\":\"teamId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"team\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"StudentProfileToTeam\"},{\"name\":\"stage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"milestones\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"valuePropositions\",\"kind\":\"object\",\"type\":\"ValueProposition\",\"relationName\":\"StudentProfileToValueProposition\"},{\"name\":\"xp\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"points\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"level\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Team\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cohort\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"members\",\"kind\":\"object\",\"type\":\"StudentProfile\",\"relationName\":\"StudentProfileToTeam\"},{\"name\":\"mentorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentor\",\"kind\":\"object\",\"type\":\"ManagerProfile\",\"relationName\":\"ManagerProfileToTeam\"},{\"name\":\"progress\",\"kind\":\"object\",\"type\":\"TeamProgress\",\"relationName\":\"TeamToTeamProgress\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RoadmapStage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stageNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"weeks\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"tools\",\"kind\":\"object\",\"type\":\"RoadmapTool\",\"relationName\":\"RoadmapStageToRoadmapTool\"},{\"name\":\"minimumScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RoadmapTool\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"week\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"stageId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stage\",\"kind\":\"object\",\"type\":\"RoadmapStage\",\"relationName\":\"RoadmapStageToRoadmapTool\"},{\"name\":\"tasks\",\"kind\":\"object\",\"type\":\"RoadmapTask\",\"relationName\":\"RoadmapTaskToRoadmapTool\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timeEstimateHours\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isLocked\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"dependencies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RoadmapTask\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deliverableType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"validationCriteria\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tool\",\"kind\":\"object\",\"type\":\"RoadmapTool\",\"relationName\":\"RoadmapTaskToRoadmapTool\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"TeamProgress\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"team\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"TeamToTeamProgress\"},{\"name\":\"currentStageId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"currentWeek\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastActive\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"toolProgress\",\"kind\":\"object\",\"type\":\"ToolProgress\",\"relationName\":\"TeamProgressToToolProgress\"},{\"name\":\"stageProgress\",\"kind\":\"object\",\"type\":\"StageProgress\",\"relationName\":\"StageProgressToTeamProgress\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"StageProgress\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamProgressId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamProgress\",\"kind\":\"object\",\"type\":\"TeamProgress\",\"relationName\":\"StageProgressToTeamProgress\"},{\"name\":\"stageNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"feedback\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ToolProgress\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamProgressId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"teamProgress\",\"kind\":\"object\",\"type\":\"TeamProgress\",\"relationName\":\"TeamProgressToToolProgress\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"taskProgress\",\"kind\":\"object\",\"type\":\"TaskProgress\",\"relationName\":\"TaskProgressToToolProgress\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"TaskProgress\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolProgressId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolProgress\",\"kind\":\"object\",\"type\":\"ToolProgress\",\"relationName\":\"TaskProgressToToolProgress\"},{\"name\":\"taskId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submissionUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submissionText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"feedback\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ValueProposition\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"student\",\"kind\":\"object\",\"type\":\"StudentProfile\",\"relationName\":\"StudentProfileToValueProposition\"},{\"name\":\"studentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"customerJobs\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pains\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gains\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"painRelievers\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gainCreators\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productsServices\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"problemStatement\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"proposedSolution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetStakeholder\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetStakeholderProfile\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderProfileToValueProposition\"},{\"name\":\"validationStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"validationNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"validatedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"validatedDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"feedback\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"iterationNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ManagerProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ManagerProfileToUser\"},{\"name\":\"organization\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expertise\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"maxMentees\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"mentees\",\"kind\":\"object\",\"type\":\"StudentProfile\",\"relationName\":\"ManagerProfileToStudentProfile\"},{\"name\":\"teams\",\"kind\":\"object\",\"type\":\"Team\",\"relationName\":\"ManagerProfileToTeam\"},{\"name\":\"focusSectors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"focusProblems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ResearcherProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ResearcherProfileToUser\"},{\"name\":\"institution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"department\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"researchArea\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reports\",\"kind\":\"object\",\"type\":\"ResearchReport\",\"relationName\":\"ResearchReportToResearcherProfile\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Interaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"initiator\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"InitiatorInteractions\"},{\"name\":\"initiatorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"target\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TargetInteractions\"},{\"name\":\"targetId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholder\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"InteractionToStakeholderProfile\"},{\"name\":\"stakeholderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"channel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subject\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"duration\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"outcome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actionItems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"nextSteps\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"followUpDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"followUpCompleted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"documents\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photos\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recordings\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keyPoints\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentiment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"topics\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"effectiveness\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"feedback\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scheduledAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"occurredAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Note\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"NoteToUser\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"noteType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"problemId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"solutionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"folder\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pinned\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"archived\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"sharedWith\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"visibility\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CalendarEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organizer\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CalendarEventToUser\"},{\"name\":\"organizerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eventType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"participantIds\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholderIds\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endTime\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"timezone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"allDay\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locationDetails\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isVirtual\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"meetingLink\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reminders\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"interactionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transcriptId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recurring\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"recurrenceRule\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"attachments\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Transcript\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transcriptType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholder\",\"kind\":\"object\",\"type\":\"StakeholderProfile\",\"relationName\":\"StakeholderProfileToTranscript\"},{\"name\":\"stakeholderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"calendarEventId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"participants\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"interviewer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"interviewee\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"originalFile\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"fileName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rawText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"processedText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"processingStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"processingError\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keyPoints\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"topics\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actionItems\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"insights\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recordedDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"duration\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quality\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"problemAreas\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"embeddings\",\"kind\":\"object\",\"type\":\"VectorEmbedding\",\"relationName\":\"TranscriptToVectorEmbedding\"},{\"name\":\"uploadedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"visibility\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"VectorEmbedding\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sourceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"transcript\",\"kind\":\"object\",\"type\":\"Transcript\",\"relationName\":\"TranscriptToVectorEmbedding\"},{\"name\":\"transcriptId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"text\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"embedding\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"chunkIndex\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ResearchReport\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reportType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"scope\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"districts\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectors\",\"kind\":\"object\",\"type\":\"Sector\",\"relationName\":\"ResearchReportToSector\"},{\"name\":\"timeFrame\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"researchQuestions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"methodology\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"executiveSummary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"introduction\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"findings\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"analysis\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recommendations\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"conclusions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"keyFindings\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stakeholdersAnalyzed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"interactionsAnalyzed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"transcriptsAnalyzed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dataSources\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"generatedByAI\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"aiModel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"humanReviewed\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ResearchReportToUser\"},{\"name\":\"contributors\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"researcherId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"researcher\",\"kind\":\"object\",\"type\":\"ResearcherProfile\",\"relationName\":\"ResearchReportToResearcherProfile\"},{\"name\":\"publishedDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"pdfUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"attachments\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"StudentJourney\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"StudentJourneyToUser\"},{\"name\":\"sector\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trlLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"complianceScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"pilotReadiness\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"weeklyReports\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"loveabilityScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastIntelligenceSync\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"problemStatementId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"problemStatement\",\"kind\":\"object\",\"type\":\"ProblemStatement\",\"relationName\":\"ProblemStatementToStudentJourney\"},{\"name\":\"metrics\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"milestones\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"blockers\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"trlEvidences\",\"kind\":\"object\",\"type\":\"TRLEvidence\",\"relationName\":\"StudentJourneyToTRLEvidence\"},{\"name\":\"experiments\",\"kind\":\"object\",\"type\":\"Experiment\",\"relationName\":\"ExperimentToStudentJourney\"},{\"name\":\"complianceTasks\",\"kind\":\"object\",\"type\":\"ComplianceTask\",\"relationName\":\"ComplianceTaskToStudentJourney\"},{\"name\":\"pilotApplications\",\"kind\":\"object\",\"type\":\"PilotApplication\",\"relationName\":\"PilotApplicationToStudentJourney\"},{\"name\":\"budgetBreakdowns\",\"kind\":\"object\",\"type\":\"BudgetBreakdown\",\"relationName\":\"BudgetBreakdownToStudentJourney\"},{\"name\":\"roadmapMilestones\",\"kind\":\"object\",\"type\":\"RoadmapMilestone\",\"relationName\":\"RoadmapMilestoneToStudentJourney\"},{\"name\":\"resourceBookings\",\"kind\":\"object\",\"type\":\"ResourceBooking\",\"relationName\":\"ResourceBookingToStudentJourney\"},{\"name\":\"sprints\",\"kind\":\"object\",\"type\":\"Sprint\",\"relationName\":\"SprintToStudentJourney\"},{\"name\":\"crlEvidences\",\"kind\":\"object\",\"type\":\"CRLEvidence\",\"relationName\":\"CRLEvidenceToStudentJourney\"},{\"name\":\"irlEvidences\",\"kind\":\"object\",\"type\":\"IRLEvidence\",\"relationName\":\"IRLEvidenceToStudentJourney\"},{\"name\":\"nudgeEvents\",\"kind\":\"object\",\"type\":\"NudgeEvent\",\"relationName\":\"NudgeEventToStudentJourney\"}],\"dbName\":null},\"TRLEvidence\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"StudentJourneyToTRLEvidence\"},{\"name\":\"trlLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"evidenceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidenceUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidenceText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"aiScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"aiRecommendations\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"reviewerNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Experiment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"ExperimentToStudentJourney\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hypothesis\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"methodology\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"successCriteria\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"metrics\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"findings\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dataUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ComplianceTask\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"ComplianceTaskToStudentJourney\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"riskLevel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"regulatoryBody\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"certificationStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidenceUrls\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"dueDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PilotApplication\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"PilotApplicationToStudentJourney\"},{\"name\":\"partnerName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"partnerType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userTarget\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"revenueTarget\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"duration\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"kpis\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"weeklyReports\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"appliedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"BudgetBreakdown\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"BudgetBreakdownToStudentJourney\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"plannedAmount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"spentAmount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"lineItems\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"budgetPeriod\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RoadmapMilestone\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"RoadmapMilestoneToStudentJourney\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"duration\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"progress\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"dependsOn\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"aiSuggested\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"recommendationType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ResourceBooking\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"ResourceBookingToStudentJourney\"},{\"name\":\"resourceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resourceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bookingDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"duration\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"estimatedCost\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"actualCost\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"purpose\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"outcome\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"TestingLab\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectorSpecialization\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"trlLevelSupported\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"equipment\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"certifications\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"availability\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"estimatedCost\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactPhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"website\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Makerspace\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"state\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"equipment\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"sectorFocus\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"hourlyRate\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"membershipOptions\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"availability\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contactEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"website\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"FundingOpportunity\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fundingSize\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectorFocus\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"trlEligibility\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"applicationDeadline\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"applicationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organizationName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"organizationType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PitchingEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"eventDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectorFocus\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"prizePool\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"attendees\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"registrationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trlMin\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"trlMax\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"attendanceStatus\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"attendingJourneyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Incubator\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectorFocus\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"fundingSupport\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"fundingAmount\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"applicationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Expert\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"specialization\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"domain\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"sessionsCompleted\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"availability\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hourlyRate\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"subsidized\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"contactEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"GovernmentScheme\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"benefitAmount\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sectorFocus\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"eligibilityCriteria\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deadline\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"applicationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SectorAPI\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sector\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"apiType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sandboxUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"documentationUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sandboxReady\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"authRequired\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"rateLimits\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Sprint\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"SprintToStudentJourney\"},{\"name\":\"sprintNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stageNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"weekRange\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trlGate\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crlIrlOutput\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gateChecks\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"trl4Criteria\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"blockedReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentorNote\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"toolSubmissions\",\"kind\":\"object\",\"type\":\"SprintToolSubmission\",\"relationName\":\"SprintToSprintToolSubmission\"}],\"dbName\":null},\"SprintToolSubmission\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sprintId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sprint\",\"kind\":\"object\",\"type\":\"Sprint\",\"relationName\":\"SprintToSprintToolSubmission\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trlContribution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crlDimension\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"irlDimension\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"maxPercent\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"iterationName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"iterationNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isDraft\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"submittedData\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gateCheck\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isGateLevel\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"prerequisitesMet\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"blockedByToolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"blockedByToolName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fillHintsAvailable\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"resources\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"managerScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"managerNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rubricChecks\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"reviewedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reviewedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"aiScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"assessmentNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CRLEvidence\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"CRLEvidenceToStudentJourney\"},{\"name\":\"dimension\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dimensionWeight\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"evidenceText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidenceUrls\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"sprintToolsCited\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"aiScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"criterionScores\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"assessmentNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"improvementGuidance\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"autoRejectReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passed\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"weightedScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resubmissionCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"mentorNotified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"IRLEvidence\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"IRLEvidenceToStudentJourney\"},{\"name\":\"dimension\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"dimensionWeight\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"evidenceText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"evidenceUrls\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"sprintToolsCited\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"aiScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"criterionScores\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"assessmentNotes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"improvementGuidance\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"autoRejectReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passed\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"weightedScore\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resubmissionCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"mentorNotified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"submittedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviewedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RubricDefinition\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"criteria\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"NudgeEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"journey\",\"kind\":\"object\",\"type\":\"StudentJourney\",\"relationName\":\"NudgeEventToStudentJourney\"},{\"name\":\"nudgeType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetToolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"targetToolName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"blockedByToolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"blockedByToolName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fillHints\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"dismissed\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"dismissedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SprintTemplate\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sprintNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"weekRange\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trlGate\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crlIrlOutput\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isPublic\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"creatorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tools\",\"kind\":\"object\",\"type\":\"SprintTemplateTool\",\"relationName\":\"SprintTemplateToSprintTemplateTool\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SprintTemplateTool\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"template\",\"kind\":\"object\",\"type\":\"SprintTemplate\",\"relationName\":\"SprintTemplateToSprintTemplateTool\"},{\"name\":\"toolId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toolName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isGateLevel\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"trlContribution\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resources\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    STAKEHOLDERS_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['STAKEHOLDERS_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.STAKEHOLDERS_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)



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
  avatar: 'avatar',
  institution: 'institution',
  companyId: 'companyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  msmeIntelId: 'msmeIntelId',
  sectorIds: 'sectorIds',
  size: 'size',
  location: 'location',
  contactEmail: 'contactEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  shortDescription: 'shortDescription',
  fullDescription: 'fullDescription',
  aiEnhancedDescription: 'aiEnhancedDescription',
  creatorId: 'creatorId',
  teamMembers: 'teamMembers',
  institution: 'institution',
  projectType: 'projectType',
  ceedCategory: 'ceedCategory',
  ceedScore: 'ceedScore',
  flowData: 'flowData',
  demoUrl: 'demoUrl',
  repoUrl: 'repoUrl',
  videoUrl: 'videoUrl',
  documentationUrl: 'documentationUrl',
  deployments: 'deployments',
  activeUsers: 'activeUsers',
  timesSaved: 'timesSaved',
  roi: 'roi',
  status: 'status',
  complianceScore: 'complianceScore',
  isCompliant: 'isCompliant',
  publishedAt: 'publishedAt',
  views: 'views',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SectorTagScalarFieldEnum = {
  id: 'id',
  sectorId: 'sectorId',
  sectorName: 'sectorName',
  isPrimary: 'isPrimary',
  projectId: 'projectId'
};

exports.Prisma.OperationTagScalarFieldEnum = {
  id: 'id',
  operationId: 'operationId',
  operationName: 'operationName',
  category: 'category',
  projectId: 'projectId'
};

exports.Prisma.FunctionalityTagScalarFieldEnum = {
  id: 'id',
  functionalityId: 'functionalityId',
  functionalityName: 'functionalityName',
  description: 'description',
  projectId: 'projectId'
};

exports.Prisma.TechStackTagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  version: 'version',
  projectId: 'projectId'
};

exports.Prisma.ProblemStatementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  sectorId: 'sectorId',
  sectorName: 'sectorName',
  companyId: 'companyId',
  msmeIntelId: 'msmeIntelId',
  urgency: 'urgency',
  budget: 'budget',
  timeline: 'timeline',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectProblemStatementScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  problemStatementId: 'problemStatementId',
  fitScore: 'fitScore',
  fitExplanation: 'fitExplanation',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ProjectMediaScalarFieldEnum = {
  id: 'id',
  type: 'type',
  url: 'url',
  caption: 'caption',
  order: 'order',
  projectId: 'projectId',
  createdAt: 'createdAt'
};

exports.Prisma.ProjectStepScalarFieldEnum = {
  id: 'id',
  stepNumber: 'stepNumber',
  title: 'title',
  description: 'description',
  imageUrl: 'imageUrl',
  videoUrl: 'videoUrl',
  codeSnippet: 'codeSnippet',
  tips: 'tips',
  projectId: 'projectId'
};

exports.Prisma.ProjectPricingScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  model: 'model',
  basePrice: 'basePrice',
  monthlyPrice: 'monthlyPrice',
  yearlyPrice: 'yearlyPrice',
  pricePerUnit: 'pricePerUnit',
  unitType: 'unitType',
  freeQuota: 'freeQuota',
  implementationFee: 'implementationFee',
  estimatedHours: 'estimatedHours',
  customizationRate: 'customizationRate',
  supportIncluded: 'supportIncluded',
  supportFee: 'supportFee',
  currency: 'currency',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ComplianceFlagScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  ruleId: 'ruleId',
  ruleName: 'ruleName',
  severity: 'severity',
  category: 'category',
  message: 'message',
  suggestion: 'suggestion',
  autoFixable: 'autoFixable',
  autoFixCode: 'autoFixCode',
  isResolved: 'isResolved',
  resolvedAt: 'resolvedAt',
  resolvedBy: 'resolvedBy',
  resolution: 'resolution',
  createdAt: 'createdAt'
};

exports.Prisma.InquiryScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  userId: 'userId',
  companyId: 'companyId',
  contactName: 'contactName',
  contactEmail: 'contactEmail',
  contactPhone: 'contactPhone',
  companyName: 'companyName',
  type: 'type',
  message: 'message',
  requirements: 'requirements',
  budget: 'budget',
  timeline: 'timeline',
  attachments: 'attachments',
  status: 'status',
  response: 'response',
  respondedAt: 'respondedAt',
  sentToCompany: 'sentToCompany',
  sentAt: 'sentAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  userId: 'userId',
  rating: 'rating',
  title: 'title',
  content: 'content',
  isVerified: 'isVerified',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.AnalyticsEventScalarFieldEnum = {
  id: 'id',
  eventType: 'eventType',
  projectId: 'projectId',
  userId: 'userId',
  companyId: 'companyId',
  sectorId: 'sectorId',
  metadata: 'metadata',
  timestamp: 'timestamp'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
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
  STUDENT: 'STUDENT',
  COMPANY: 'COMPANY',
  ADMIN: 'ADMIN',
  REVIEWER: 'REVIEWER'
};

exports.CompanySize = exports.$Enums.CompanySize = {
  MICRO: 'MICRO',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM'
};

exports.ProjectType = exports.$Enums.ProjectType = {
  AUTOMATION: 'AUTOMATION',
  AGENTIC_WORKFLOW: 'AGENTIC_WORKFLOW',
  DASHBOARD: 'DASHBOARD',
  INTEGRATION: 'INTEGRATION',
  CHATBOT: 'CHATBOT',
  ML_MODEL: 'ML_MODEL',
  MOBILE_APP: 'MOBILE_APP',
  WEB_APP: 'WEB_APP',
  API: 'API',
  IOT_SOLUTION: 'IOT_SOLUTION'
};

exports.CEEDCategory = exports.$Enums.CEEDCategory = {
  CORE: 'CORE',
  EXPANSION: 'EXPANSION',
  EFFICIENCY: 'EFFICIENCY',
  DISRUPTION: 'DISRUPTION'
};

exports.ProjectStatus = exports.$Enums.ProjectStatus = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  IN_REVIEW: 'IN_REVIEW',
  FLAGGED: 'FLAGGED',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.TechCategory = exports.$Enums.TechCategory = {
  LANGUAGE: 'LANGUAGE',
  FRAMEWORK: 'FRAMEWORK',
  DATABASE: 'DATABASE',
  CLOUD: 'CLOUD',
  AI_ML: 'AI_ML',
  AUTOMATION: 'AUTOMATION',
  DEVOPS: 'DEVOPS',
  OTHER: 'OTHER'
};

exports.Urgency = exports.$Enums.Urgency = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.ProblemStatus = exports.$Enums.ProblemStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  MATCHED: 'MATCHED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED'
};

exports.MatchStatus = exports.$Enums.MatchStatus = {
  SUGGESTED: 'SUGGESTED',
  PENDING_REVIEW: 'PENDING_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CONNECTED: 'CONNECTED'
};

exports.MediaType = exports.$Enums.MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  GIF: 'GIF',
  DOCUMENT: 'DOCUMENT',
  DIAGRAM: 'DIAGRAM'
};

exports.PricingModel = exports.$Enums.PricingModel = {
  FREE: 'FREE',
  ONE_TIME: 'ONE_TIME',
  SUBSCRIPTION: 'SUBSCRIPTION',
  USAGE_BASED: 'USAGE_BASED',
  CUSTOM: 'CUSTOM',
  CONTACT: 'CONTACT'
};

exports.FlagSeverity = exports.$Enums.FlagSeverity = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL'
};

exports.FlagCategory = exports.$Enums.FlagCategory = {
  CONTENT: 'CONTENT',
  SECURITY: 'SECURITY',
  LICENSING: 'LICENSING',
  DOCUMENTATION: 'DOCUMENTATION',
  TECHNICAL: 'TECHNICAL',
  LEGAL: 'LEGAL',
  QUALITY: 'QUALITY'
};

exports.InquiryType = exports.$Enums.InquiryType = {
  DEMO_REQUEST: 'DEMO_REQUEST',
  PRICING_INQUIRY: 'PRICING_INQUIRY',
  CUSTOMIZATION: 'CUSTOMIZATION',
  IMPLEMENTATION: 'IMPLEMENTATION',
  PARTNERSHIP: 'PARTNERSHIP',
  GENERAL: 'GENERAL'
};

exports.InquiryStatus = exports.$Enums.InquiryStatus = {
  NEW: 'NEW',
  VIEWED: 'VIEWED',
  IN_PROGRESS: 'IN_PROGRESS',
  RESPONDED: 'RESPONDED',
  CONVERTED: 'CONVERTED',
  CLOSED: 'CLOSED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Company: 'Company',
  Project: 'Project',
  SectorTag: 'SectorTag',
  OperationTag: 'OperationTag',
  FunctionalityTag: 'FunctionalityTag',
  TechStackTag: 'TechStackTag',
  ProblemStatement: 'ProblemStatement',
  ProjectProblemStatement: 'ProjectProblemStatement',
  ProjectMedia: 'ProjectMedia',
  ProjectStep: 'ProjectStep',
  ProjectPricing: 'ProjectPricing',
  ComplianceFlag: 'ComplianceFlag',
  Inquiry: 'Inquiry',
  Review: 'Review',
  Favorite: 'Favorite',
  AnalyticsEvent: 'AnalyticsEvent'
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

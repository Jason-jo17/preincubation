// lib/types/prd.ts
export type PRDStatus = 'draft' | 'published' | 'open' | 'evaluating' | 'closed';
export type SubmissionStatus = 'submitted' | 'under_review' | 'shortlisted' | 'won' | 'rejected';

export interface BuildForXPRD {
  id: string;
  company_automation_interest_id: string;
  company_id: string;
  automation_need_id: string;
  sector_id: string;
  mosi_session_id?: string;
  
  prd_code: string;
  title: string;
  slug: string;
  
  executive_summary: string;
  problem_statement: ProblemStatement;
  objectives: PRDObjective[];
  scope: PRDScope;
  
  functional_requirements: FunctionalRequirement[];
  non_functional_requirements: NonFunctionalRequirement[];
  technical_specifications: TechnicalSpecifications;
  user_stories: UserStory[];
  
  success_metrics: PRDSuccessMetrics;
  timeline_milestones: TimelineMilestone[];
  evaluation_criteria: EvaluationCriteria;
  resources_provided: ResourcesProvided;
  constraints_guidelines: ConstraintsGuidelines;
  
  competition_type: 'ideation' | 'makeathon' | 'gig' | 'pre_incubation';
  trl_level_expected: string;
  prize_pool: PrizePool;
  program_id?: string;
  
  status: PRDStatus;
  version: number;
  
  submission_deadline: string;
  evaluation_start_date: string;
  results_announcement_date: string;
}

export interface ProblemStatement {
  overview: string;
  impact: string;
  stakeholders_affected: string[];
  root_causes: string[];
  current_workarounds: string[];
  cost_of_inaction: string;
}

export interface PRDObjective {
  title: string;
  description: string;
  is_primary: boolean;
}

export interface PRDScope {
  in_scope: string[];
  out_of_scope: string[];
}

export interface FunctionalRequirement {
  id: string;
  category: string;
  requirement: string;
  priority: 'Must Have' | 'Should Have' | 'Could Have' | 'Nice to Have';
  acceptance_criteria: string[];
  dependencies: string[];
}

export interface NonFunctionalRequirement {
  id: string;
  category: string;
  requirement: string;
  priority: string;
}

export interface TechnicalSpecifications {
  architecture?: string;
  tech_stack?: string[];
  integrations?: string[];
  data_model?: string;
}

export interface UserStory {
  role: string;
  action: string;
  outcome: string;
  acceptance_criteria: string[];
}

export interface PRDSuccessMetrics {
  primary: string[];
  secondary: string[];
}

export interface TimelineMilestone {
  event: string;
  date: string;
  description: string;
}

export interface EvaluationCriteria {
  technical: CriterionDetail[];
  functional: CriterionDetail[];
  innovation: CriterionDetail[];
  presentation?: CriterionDetail[];
}

export interface CriterionDetail {
  criterion: string;
  weight: number;
  description: string;
}

export interface ResourcesProvided {
  data_sets?: string[];
  apis?: string[];
  documentation?: string[];
}

export interface ConstraintsGuidelines {
  constraints: string[];
  guidelines: string[];
}

export interface PrizePool {
  total?: string;
  currency?: string;
  breakdown?: string[];
}

export interface StudentSubmission {
  id: string;
  prd_id: string;
  student_id: string;
  team_id?: string;
  
  submission_code: string;
  title: string;
  
  executive_summary: string;
  solution_approach: Record<string, any>;
  technical_implementation: Record<string, any>;
  demo_links: Record<string, string>;
  repository_links: Record<string, string>;
  deliverables: { title: string; link: string; description: string }[];
  requirements_coverage: { requirement_id: string; status: string; comments: string }[];
  self_assessment: Record<string, any>;
  business_viability: Record<string, any>;
  
  status: SubmissionStatus;
  preliminary_score?: number;
  final_score?: number;
  rank?: number;
  
  submitted_at: string;
}

export type AutomationType = 
  | 'process_automation'
  | 'predictive_analytics'
  | 'computer_vision'
  | 'nlp_automation'
  | 'iot_integration'
  | 'supply_chain_automation'
  | 'customer_automation'
  | 'financial_automation';

export type AutomationInterestStatus = 
  | 'interested'
  | 'context_added'
  | 'ice_review'
  | 'approved'
  | 'rejected'
  | 'revision_requested';

export interface SectorAutomationNeed {
  id: string;
  sector_id: string;
  regional_context_id?: string;
  
  title: string;
  slug: string;
  description: string;
  
  automation_type: AutomationType;
  ceed_quadrant: 'core' | 'expansion' | 'efficiency' | 'disruption';
  
  impact_level: 'transformative' | 'high' | 'medium' | 'incremental';
  estimated_roi_percentage: number;
  implementation_complexity: 'low' | 'medium' | 'high' | 'very_high';
  time_to_value_weeks: number;
  
  target_company_size: string[];
  target_employee_range: string;
  target_revenue_range: string;
  prerequisite_tech_maturity: string;
  
  tech_stack_suggested: TechStackSuggestion;
  data_requirements: DataRequirements;
  research_citations: ResearchCitation[];
  industry_benchmarks: IndustryBenchmark;
  
  status: 'draft' | 'research' | 'validated' | 'published' | 'archived';
  is_featured: boolean;
  priority_rank: number;
  tags: string[];
  discovery_insight?: {
    session_id: string;
    rationale: string;
    confidence: number;
    quote?: string;
  };
}

export interface TechStackSuggestion {
  primary: string[];
  secondary: string[];
  edge?: string[];
}

export interface DataRequirements {
  structured?: string[];
  unstructured?: string[];
  real_time?: string[];
}

export interface ResearchCitation {
  title: string;
  source: string;
  url?: string;
  year?: number;
}

export interface IndustryBenchmark {
  metric: string;
  current_avg: string;
  potential_improvement: string;
}

export interface CompanyAutomationInterest {
  id: string;
  company_id: string;
  automation_need_id: string;
  
  status: AutomationInterestStatus;
  
  current_pain_points: string[];
  current_process_description: string;
  desired_outcomes: string[];
  budget_range: string;
  timeline_preference: string;
  
  existing_systems: Record<string, any>;
  data_availability: Record<string, any>;
  constraints: string[];
  success_metrics: Record<string, any>;
  
  poc_name: string;
  poc_email: string;
  poc_phone: string;
  poc_designation: string;
  
  additional_context: string;
  
  ice_approval_status: 'pending' | 'approved' | 'rejected' | 'revision_requested';
  ice_comments?: string;
  
  interested_at: string;
  context_added_at?: string;
}

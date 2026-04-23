export type CompanyStage = 'Seed' | 'Early' | 'Growth' | 'Expansion' | 'Mature' | 'Scale-up' | 'Established';
export type CompanySector = 'advanced_manufacturing' | 'fintech' | 'agritech' | 'Aerospace' | 'Manufacturing' | 'Logistics' | 'Technology' | 'Agriculture' | 'Finance' | 'Healthcare';

export interface Company {
  id: string;
  name: string;
  description?: string;
  sector: CompanySector;
  sub_sector?: string;
  stage: CompanyStage;
  revenue?: string;
  revenue_current?: number;
  revenue_growth_rate?: number;
  employees?: string;
  employee_count?: number;
  geography?: string;
  headquarters_city?: string;
  headquarters_state?: string;
  founded_year?: number;
  foundedYear?: number;
  tags?: string[];
  logo?: string;
  website?: string;
  current_stage?: number;
  rag_status?: 'red' | 'amber' | 'green';
  created_at?: string;
  updated_at?: string;
}

export interface CompanyRecord extends Company {
  company: string; // Mapping for MOSI UI compatibility
  address: string;
  pincode: string;
  domain: string;
}

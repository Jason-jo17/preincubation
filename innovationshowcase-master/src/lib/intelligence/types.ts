// src/lib/intelligence/types.ts

export interface IntelligenceCompany {
  id: string;
  name: string;
  website?: string;
  category: string;
  subcategory?: string;
  description: string;
  sector: string;
  location: string;
  teamSize?: string;
  founded?: number;
  fundingStatus?: string;
  clients?: string;
  contact?: string;
}

export interface SectorGap {
  id: string;
  sector_id: string;
  title: string;
  slug: string;
  description: string;
  automation_type: string;
  ceed_quadrant: 'efficiency' | 'core' | 'disruption' | 'transformative';
  impact_level: 'low' | 'medium' | 'high' | 'transformative';
  estimated_roi_percentage?: number;
  implementation_complexity?: 'low' | 'medium' | 'high' | 'very_high';
  time_to_value_weeks?: number;
  tech_stack_suggested?: any;
  status: string;
  is_featured: boolean;
  priority_rank: number;
  tags?: string[];
}

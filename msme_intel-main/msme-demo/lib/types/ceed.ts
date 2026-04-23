// lib/types/ceed.ts
export interface CEEDAnalysis {
  id: string;
  company_id: string;
  sector_id: string;
  
  // Quadrant Scores (0-100)
  core_score: number;
  expansion_score: number;
  efficiency_score: number;
  disruption_score: number;
  
  primary_quadrant: 'core' | 'expansion' | 'efficiency' | 'disruption';
  secondary_quadrant: 'core' | 'expansion' | 'efficiency' | 'disruption';
  
  core_assessment: CEEDQuadrantAssessment;
  expansion_assessment: CEEDQuadrantAssessment;
  efficiency_assessment: CEEDQuadrantAssessment;
  disruption_assessment: CEEDQuadrantAssessment;
  
  automation_readiness_score: number;
  automation_priority_level: 'critical' | 'high' | 'medium' | 'low';
  estimated_automation_roi: number;
  
  analyzed_at: string;
  confidence_score: number;
}

export interface CEEDQuadrantAssessment {
  score: number;
  sub_scores: Record<string, number>;
  evidence: string[];
  gaps: string[];
  opportunities: string[];
  automation_opportunities?: {
    area: string;
    current_state: string;
    automation_potential: string;
    estimated_impact: string;
  }[];
  disruptive_opportunities?: {
    opportunity: string;
    potential_impact: string;
    barriers: string[];
  }[];
}

export interface SubSector {
  name: string;
  description: string;
  market_size: number;
  cagr: number;
  growth_drivers: string[];
  key_players: string[];
  msme_opportunity_score: number;
  citation_ids: string[];
}

export interface GrowthDriver {
  name: string;
  type: string;
  impact_level: string;
  description: string;
  estimated_impact_percentage: number;
  citation_ids: string[];
}

export interface Opportunity {
  title: string;
  type: string;
  description: string;
  market_size_estimate: number;
  overall_score: number;
  capital_requirement: string;
  time_to_market_months: number;
  citation_ids?: string[];
}

export interface Policy {
  name: string;
  type: string;
  description: string;
  impact: string;
  status: string;
  citation_ids: string[];
}

export interface Risk {
  name: string;
  category: string;
  severity: string;
  probability: number;
  description: string;
  mitigation: string[];
  citation_ids: string[];
}

export interface Competitor {
  name: string;
  type: string;
  revenue: number;
  market_share: number;
  key_strengths: string[];
  citation_ids: string[];
}

export interface MarketStatsHistory {
  year: number;
  market_size: number;
  growth_rate: number;
  citation_ids?: string[];
}

export interface EmergingCompany {
  id: string;
  name: string;
  description: string;
}

export interface Citation {
  id: string;
  citation_key: string;
  citation_number: number;
  source_type: string;
  source_name: string;
  publication_year: number;
  title: string;
  url: string;
  reliability_score: number;
  tags: string[];
  geographic_focus: string[];
  excerpt: string;
}

export interface DetailedSectorThesis {
  id: string;
  display_name: string;
  status: string;
  research_date: string;
  executive_summary: string;
  key_findings: string[];
  investment_thesis: string;
  market_stats: {
    current_size: number;
    current_size_display: string;
    forecast_size: number;
    forecast_size_display: string;
    cagr: number;
    forecast_year: number;
    currency: string;
  };
  market_structure: {
    total_companies: number;
    msme_percentage: number;
    organized_split: {
      organized: number;
      unorganized: number;
    };
    geographic_distribution: Record<string, number>;
  };
  market_segments: string[];
  sub_sectors: SubSector[];
  growth_drivers: GrowthDriver[];
  opportunities: Opportunity[];
  policies: Policy[];
  risks: Risk[];
  competitors: Competitor[];
  market_stats_history: MarketStatsHistory[];
  emerging_companies: EmergingCompany[];
  citations: Citation[];
}

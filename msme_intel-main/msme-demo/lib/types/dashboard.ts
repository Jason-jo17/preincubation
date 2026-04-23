export interface DashboardMetrics {
    total_companies: number;
    total_companies_change: number; // Percentage change from last period
    avg_growth_rate: number; // CAGR
    avg_growth_rate_change: number;
    total_portfolio_value: number; // In Crores
    portfolio_value_change: number;
    gap_analysis_coverage: number; // Percentage
    gap_analysis_coverage_change: number;
}

export interface FunnelConversionData {
    stage_1_uploaded: number;
    stage_2_scored: number;
    stage_3_financials: number;
    stage_4_rag_classified: number;
    stage_5_gap_analyzed: number;
    stage_6_roadmap_generated: number;
    conversion_rates: {
        stage_1_to_2: number;
        stage_2_to_3: number;
        stage_3_to_4: number;
        stage_4_to_5: number;
        stage_5_to_6: number;
    };
}

export interface FinancialTrendData {
    date: string; // YYYY-MM
    revenue: number;
    profit: number;
    investment: number;
}

export interface SectorDistribution {
    sector: string;
    count: number;
    percentage: number;
    total_value: number; // Portfolio value in this sector
    avg_score: number; // Avg thesis score
}

export interface RAGDistribution {
    green: number;
    amber: number;
    red: number;
}

export interface TopPerformer {
    id: string;
    name: string;
    sector: string;
    overall_score: number;
    rag_status: 'green' | 'amber' | 'red';
    revenue: number;
    growth_rate: number;
    stage: number;
}

export interface RecentActivity {
    id: string;
    company_id: string;
    company_name: string;
    action: string;
    stage_from: number;
    stage_to: number;
    timestamp: string;
    details?: string;
}

export interface GeographicDistribution {
    state: string;
    count: number;
    total_value: number;
    avg_score: number;
}

export interface DashboardFilters {
    date_range: {
        from: Date | undefined;
        to: Date | undefined;
    };
    sectors: string[];
    stages: number[];
    rag_status: ('green' | 'amber' | 'red')[];
    search_query: string;
}

export interface MarketShareGrowthData {
    id: string;
    name: string;
    sector: string;
    growth: number;
    marketShare: number;
    revenue: number;
}

export interface ComplianceMetrics {
    overall_health_score: number;
    statutory_filing_coverage: number; 
    verified_sector_alignment: number; 
    last_audit_completion: number; 
    red_flag_count: number;
    risk_distribution: {
        high: number;
        medium: number;
        low: number;
    };
    sector_mismatches: Array<{
        sector: string;
        count: number;
    }>;
}

export interface RiskFactor {
    id: string;
    factor: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    affected_companies: number;
}

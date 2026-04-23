export type CompanyStage = 'seed' | 'early' | 'growth' | 'mature';
export type CompanySector = 'advanced_manufacturing' | 'fintech' | 'agritech' | 'edtech' | 'aerospace';

export interface Company {
    id: string;
    name: string;
    sector: CompanySector;
    sub_sector: string;
    stage: CompanyStage;
    founded_year: number;
    headquarters_city: string;
    headquarters_state: string;
    website?: string;
    employee_count?: number;
    revenue_current?: number;
    revenue_growth_rate?: number;
    created_at: string;
    updated_at: string;
}

export interface CompanyFinancials {
    id: string;
    company_id: string;
    fiscal_year: string;
    revenue: number;
    gross_profit?: number;
    net_profit?: number;
    total_assets?: number;
    total_liabilities?: number;
    growth_rate?: number;
}

export interface FundingRound {
    id: string;
    company_id: string;
    round_type: string;
    amount_raised: number;
    valuation?: number;
    announced_date: string;
    lead_investors?: string[];
}

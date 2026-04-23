export type CompanyStage = 'seed' | 'early' | 'growth' | 'mature';
export type CompanySector = 'advanced_manufacturing' | 'fintech' | 'agritech' | 'edtech' | 'aerospace' | 'bfsi' | 'logistics' | 'automation' | 'oil_gas_petro' | 'port-logistics' | 'it-ites' | 'healthcare' | 'food-processing' | 'cashew' | 'engineering' | 'construction' | 'marine-eng' | 'hospitality' | 'tile-refractories' | 'auto-components' | 'printing-packaging' | 'rubber-plastic' | 'jewelry' | 'retail' | 'manufacturing-engineering-nagpur' | 'light-engineering-cnc' | 'aerospace-defense-nagpur' | 'solar-clean-tech-nagpur' | 'mining-equipment-spm' | 'food-processing-nagpur' | 'logistics-multimodal-nagpur' | 'aerospace-defense' | 'auto-ancillaries' | 'textiles' | 'steel-metals' | 'mining-minerals' | 'power-energy' | 'education-research' | 'electronics-electrical' | 'chemicals-pharma' | 'retail-trade' | 'printing-publishing' | 'hospitality-tourism';

export interface Company {
    id: string;
    slug?: string;
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
    current_stage?: number;
    rag_status?: 'red' | 'amber' | 'green';
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

export interface CompanyMCA {
    company_id: string;
    cin: string;
    roc: string;
    registration_date: string;
    category: string;
    sub_category: string;
    class: string;
    authorized_capital: number;
    paid_up_capital: number;
    last_agm_date?: string;
    balance_sheet_date?: string;
    directors?: string[];
}

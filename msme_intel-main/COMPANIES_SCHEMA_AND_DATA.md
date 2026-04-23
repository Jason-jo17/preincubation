# detailed-company.ts

```typescript
export interface DetailedCompany extends Company {
    legal_name?: string;
    cin?: string;
    gstin?: string;
    pan?: string;
    company_status?: string;
    registration_date?: string;
    registered_office_address?: string;
    authorized_capital?: number;
    paid_up_capital?: number;
    net_worth?: number;
    corporate_office_address?: string;
    industry_classification?: string;
    linkedin_url?: string;
    company_type?: string;
    listing_status?: string;
    stock_codes?: Record<string, string>;
    promoter_holding_percentage?: number;
    market_cap?: number;
    overall_score?: number;
    latest_revenue?: number;
    latest_net_profit?: number;
    revenue_growth_yoy?: number;
    data_confidence?: string;
    last_research_date?: string;
    notes?: string;
    financials?: DetailedFinancials[];
    founders?: CompanyFounder[];
    leadership?: CompanyLeader[];
    board?: BoardComposition;
    talent?: TalentMetrics;
    brand?: BrandMetrics;
    products?: CompanyProduct[];
    innovation?: InnovationMetrics;
    clients?: CompanyClient[];
    client_demographics?: ClientDemographics;
    gap_analysis?: GapAnalysis;
}

export interface DetailedFinancials {
    fiscal_year: string;
    revenue: number;
    revenue_from_operations?: number;
    net_profit: number;
    net_margin_percentage?: number;
    ebitda?: number;
    ebitda_margin_percentage?: number;
    shareholders_equity?: number;
    long_term_debt?: number;
    short_term_debt?: number;
    debt_to_equity_ratio?: number;
    revenue_growth_yoy?: number;
    segment_breakdown?: Record<string, number>;
    data_source?: string;
    confidence?: string;
}

export interface CompanyFounder {
    name: string;
    age?: number;
    current_role?: string;
    years_in_sector?: number;
    tenure_years?: number;
    education?: string;
    background?: string;
    equity_stake?: number;
    is_promoter?: boolean;
    linkedin_url?: string;
    notable_achievements?: string[];
}

export interface CompanyLeader {
    name: string;
    role: string;
    tenure_years?: number;
    total_experience_years?: number;
    education?: string;
    background?: string;
    is_executive_director?: boolean;
    is_independent_director?: boolean;
}

export interface BoardComposition {
    total_board_members: number;
    executive_directors: number;
    independent_directors: number;
    succession_plan_exists?: boolean;
    succession_plan_details?: string;
    governance_score?: number;
}

export interface TalentMetrics {
    total_employees: number;
    permanent_employees?: number;
    employee_growth_yoy?: number;
    glassdoor_rating?: number;
    glassdoor_review_count?: number;
    glassdoor_ceo_approval?: number;
    glassdoor_recommend_to_friend?: number;
    glassdoor_top_pros?: string[];
    glassdoor_top_cons?: string[];
    critical_skills_missing?: string[];
    high_turnover_roles?: string[];
}

export interface BrandMetrics {
    brand_awareness_level?: string;
    primary_markets?: string[];
    certifications?: any[]; // JSONB content
    awards?: any[]; // JSONB content
    marketing_sophistication?: string;
    tagline?: string;
    differentiation_claim?: string;
}

export interface CompanyProduct {
    product_name: string;
    category: string;
    description: string;
    target_application?: string;
    certifications?: string[];
    oem_approvals?: string[];
}

export interface InnovationMetrics {
    fiscal_year?: string;
    rd_investment_percentage?: number;
    rd_team_size?: number;
    patents_filed?: number;
    patents_granted?: number;
    new_products_launched?: any[];
    technology_partners?: string[];
    industry_4_adoption?: string;
}

export interface CompanyClient {
    client_name: string;
    client_sector?: string;
    client_type?: string;
    revenue_contribution_percentage?: number;
    is_top_3_client?: boolean;
    products_services?: string[];
    has_long_term_contract?: boolean;
    relationship_duration_years?: number;
}

export interface ClientDemographics {
    top_3_clients_percentage?: number;
    concentration_risk?: string;
    defense_govt_percentage?: number;
    civil_aviation_percentage?: number;
    domestic_india_percentage?: number;
    export_percentage?: number;
    oem_percentage?: number;
}

export interface GapAnalysis {
    overall_gap_score: number;
    investment_readiness: string;

    market_saturation_score?: number;
    market_saturation_diagnosis?: string;
    market_saturation_assessment?: string;
    market_saturation_evidence?: string;

    founder_quality_score?: number;
    founder_quality_assessment?: string;
    founder_quality_red_flags?: string[];
    founder_quality_green_flags?: string[];

    business_maturity_score?: number;
    business_maturity_assessment?: string;

    market_opportunity_score?: number;
    market_opportunity_assessment?: string;
    tam?: number;
    sam?: number;
    som?: number;
    current_penetration_percentage?: number;

    leadership_quality_score?: number;
    leadership_quality_assessment?: string;
    leadership_gaps?: string[];

    innovation_differentiator_score?: number;
    innovation_assessment?: string;
    innovation_gaps?: string[];

    talent_pool_score?: number;
    talent_assessment?: string;
    talent_gaps?: string[];

    brand_identity_score?: number;
    brand_assessment?: string;
    brand_gaps?: string[];

    critical_gaps?: string[];
    moderate_gaps?: string[];
    key_strengths?: string[];

    immediate_actions?: string[];
    short_term_recommendations?: string[];
    medium_term_recommendations?: string[];

    time_to_opportunity_months?: number;
    probability_of_success_percentage?: number;
}
```

# Example Data (Aequs Limited)

```typescript
    {
        id: 'aeq-001',
        name: 'Aequs Limited',
        legal_name: 'Aequs Limitied (formerly Aequs Private Limited)',
        cin: 'U35100KA2006PTC039290',
        gstin: '29AAICA6657B1Z6',
        pan: 'AAICA6657B',
        company_status: 'Active',
        authorized_capital: 500.0,
        paid_up_capital: 350.5,
        net_worth: 850.0,
        founded_year: 2006,
        registration_date: '2006-03-27',
        headquarters_city: 'Bengaluru',
        headquarters_state: 'Karnataka',
        registered_office_address: 'Aequs Tower, No. 55, Whitefield Main Road, Mahadevapura Post, Bengaluru – 560048, Karnataka',
        sector: 'aerospace',
        sub_sector: 'Precision Components & Assemblies',
        industry_classification: 'Aerospace Manufacturing',
        website: 'https://www.aequs.com',
        linkedin_url: 'https://www.linkedin.com/company/aequs',
        employee_count: 4000,
        company_type: 'Public Limited Company',
        listing_status: 'Listed',
        stock_codes: { "BSE": "543943", "NSE": "AEQUS" },
        promoter_holding_percentage: 45.2,
        market_cap: 7700.00,
        stage: 'growth',
        current_stage: 6,
        rag_status: 'amber',
        overall_score: 78,
        latest_revenue: 959.21,
        latest_net_profit: -102.35,
        revenue_growth_yoy: -2.94,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        data_confidence: 'HIGH',

        financials: [
            {
                fiscal_year: 'FY2024-25',
                revenue: 959.21,
                revenue_from_operations: 924.61,
                net_profit: -102.35,
                net_margin_percentage: -10.67,
                long_term_debt: 630.86,
                revenue_growth_yoy: -2.94,
                segment_breakdown: { "aerospace": 88.23, "consumer": 11.77 },
                data_source: 'IPO Prospectus, Annual Report',
                confidence: 'HIGH'
            },
            {
                fiscal_year: 'FY2023-24',
                revenue: 988.30,
                revenue_from_operations: 965.07,
                net_profit: -14.24,
                data_source: 'Annual Report',
                confidence: 'HIGH'
            }
        ],

        founders: [
            {
                name: 'Aravind Shivaputrappa Melligeri',
                age: 52,
                current_role: 'Executive Chairman & CEO',
                years_in_sector: 28,
                tenure_years: 24,
                education: 'BE (Mechanical) NIT Karnataka, MS (Robotics) Penn State University',
                background: '25+ years aerospace experience. Co-founded QuEST Global (1997). Founded Aequs in 2000.',
                equity_stake: 45.2,
                is_promoter: true,
                notable_achievements: ['Outstanding Engineering Alumnus Penn State 2023', 'Co-founder QuEST Global']
            }
        ],

        leadership: [
            { name: 'Rajeev Kaul', role: 'Managing Director', tenure_years: 18, total_experience_years: 22, education: 'BA Mathematics Delhi University, CA ICAI' },
            { name: 'Dinesh V. Iyer', role: 'Chief Financial Officer', tenure_years: 3, total_experience_years: 20 },
            { name: 'Ravi Guttal', role: 'CTO & Sr. VP Engineering', tenure_years: 10, total_experience_years: 25 },
            { name: 'Mohamed Bouzidi', role: 'President – Aerospace', tenure_years: 8, total_experience_years: 30 }
        ],

        board: {
            total_board_members: 8,
            executive_directors: 2,
            independent_directors: 3,
            succession_plan_exists: false,
            succession_plan_details: 'No documented succession plan. Founder age 52 with no named successor.',
            governance_score: 72
        },

        talent: {
            total_employees: 4000,
            permanent_employees: 3500,
            employee_growth_yoy: 25.0,
            glassdoor_rating: 3.5,
            glassdoor_review_count: 185,
            glassdoor_top_pros: ['Supportive top management', 'Visionary leadership'],
            glassdoor_top_cons: ['Below-market salaries', '6-day work week'],
            critical_skills_missing: ['CTO role vacant', 'Digital marketing team'],
            high_turnover_roles: ['Engineering roles', 'Senior management']
        },

        brand: {
            brand_awareness_level: 'National',
            primary_markets: ['India', 'USA', 'Europe', 'Asia'],
            certifications: [
                { "name": "AS9100", "version": "Rev D", "certified": true },
                { "name": "NADCAP", "scope": "Chemical Processing", "certified": true },
                { "name": "Boeing Approved" },
                { "name": "Airbus Approved" }
            ],
            awards: [
                { "award": "Airbus Accredited SQIP Award", "year": 2024 },
                { "award": "CII 75 Most Innovative Companies", "year": 2023 }
            ],
            tagline: 'Ecosystems of Efficiency',
            differentiation_claim: 'Only precision component manufacturer in India with full vertical integration in single SEZ'
        },

        products: [
            { product_name: 'Engine Case Machining', category: 'Components', description: 'Precision-machined engine components', target_application: 'Airbus A320, A350', certifications: ['AS9100D'] },
            { product_name: 'Landing Gear Components', category: 'Components', description: 'Landing system components', target_application: 'Multiple aircraft programs' },
            { product_name: 'Over Wing Exit Door Assemblies', category: 'Assemblies', description: 'Complete door assemblies for A321neo', target_application: 'Airbus A321neo' }
        ],

        innovation: {
            fiscal_year: 'FY2024',
            rd_investment_percentage: 3.2,
            rd_team_size: 120,
            patents_filed: 7,
            patents_granted: 5,
            technology_partners: ['Aubert & Duval', 'Magellan Aerospace', 'Saab AB'],
            industry_4_adoption: 'Advanced'
        },

        clients: [
            { client_name: 'Airbus', client_sector: 'Civil Aviation', client_type: 'OEM', revenue_contribution_percentage: 35.0, is_top_3_client: true, has_long_term_contract: true },
            { client_name: 'Boeing', client_sector: 'Civil Aviation', client_type: 'OEM', revenue_contribution_percentage: 20.0, is_top_3_client: true, has_long_term_contract: true },
            { client_name: 'Safran', client_sector: 'Aerospace', client_type: 'OEM', revenue_contribution_percentage: 15.0, is_top_3_client: true }
        ],

        client_demographics: {
            top_3_clients_percentage: 70.0,
            concentration_risk: 'HIGH',
            civil_aviation_percentage: 88.0,
            export_percentage: 78.0
        },

        gap_analysis: {
            overall_gap_score: 75,
            investment_readiness: 'Caution',

            market_saturation_score: 78,
            market_saturation_diagnosis: 'Low Penetration',
            market_saturation_assessment: 'Aequs has captured only ~1.9% of its ₹50,000 Cr TAM with current ₹959 Cr revenue. Aerospace segment growing 50% YoY indicates strong growth runway.',
            market_saturation_evidence: 'Revenue ₹959 Cr vs TAM ₹50,000 Cr = 1.92% penetration. Target $1B (₹8,300 Cr) in 5 years.',

            founder_quality_score: 72,
            founder_quality_assessment: 'Strong technical founder with 28 years sector experience but at age 52 with no documented succession plan, key person risk is emerging.',
            founder_quality_red_flags: [
                'No documented succession plan',
                'Founder age 52 with 24-year tenure',
                'Over-reliance on founder vision',
                'No named successor for CEO role'
            ],
            founder_quality_green_flags: [
                '28 years aerospace sector experience',
                '45% equity stake shows commitment',
                'Successful track record (QuEST Global co-founder)',
                'Attracted top-tier investors'
            ],

            business_maturity_score: 82,
            business_maturity_assessment: 'Operational since 2000 with established systems. Tier-1 status with Airbus/Boeing. AS9100 Rev D, NADCAP certifications. Consistent losses indicate business model refinement needed.',

            market_opportunity_score: 88,
            market_opportunity_assessment: 'Massive addressable market driven by India aviation boom, PLI scheme, and China+1 shift.',
            tam: 50000.00,
            sam: 8000.00,
            som: 2000.00,
            current_penetration_percentage: 1.92,

            leadership_quality_score: 68,
            leadership_quality_assessment: 'Experienced leadership team but succession planning gaps and CTO role vacant.',
            leadership_gaps: ['No succession plan', 'CTO role vacant', 'Weak second-line leadership'],

            innovation_differentiator_score: 76,
            innovation_assessment: 'Industry-leading infrastructure (10,000-ton press) but R&D at 3.2% vs industry 5% is low.',
            innovation_gaps: ['R&D investment at 3.2%', 'Only 7 patents filed', 'Limited IP portfolio'],

            talent_pool_score: 78,
            talent_assessment: 'Large workforce with specialized talent. High attrition (18%) and below-market comp are risks.',
            talent_gaps: ['High engineering attrition', 'Below-market salaries', 'Work-life balance concerns'],

            brand_identity_score: 70,
            brand_assessment: 'Strong industry recognition (Airbus Awards) but weak consumer/digital presence.',
            brand_gaps: ['Limited brand awareness outside aerospace', 'Weak digital marketing'],

            critical_gaps: [
                'No succession plan for 52-year-old founder',
                'Three consecutive years of net losses',
                'High debt load (₹631 Cr)',
                'Revenue concentration: 88% aerospace, 70% top 3 clients',
                'CTO position vacant'
            ],
            moderate_gaps: [
                'Consumer segment dragging profitability',
                'R&D investment below industry average',
                'Weak digital marketing'
            ],
            key_strengths: [
                'Tier-1 supplier to Airbus (10-year contract)',
                'Only integrated aerospace ecosystem in India',
                'India\'s largest 10,000-ton forging press',
                'AS9100, NADCAP certifications'
            ],

            immediate_actions: [
                'Document formal succession plan',
                'Hire CTO immediately',
                'Separate consumer segment P&L',
                'Apply for PLI scheme funding'
            ],
            short_term_recommendations: [
                'Achieve profitability over growth',
                'Launch talent retention program',
                'Diversify client base'
            ],
            medium_term_recommendations: [
                'Scale to $500M aerospace revenue',
                'Establish US manufacturing presence',
                'Develop proprietary IP'
            ],

            time_to_opportunity_months: 18,
            probability_of_success_percentage: 72.5
        }
    }
```

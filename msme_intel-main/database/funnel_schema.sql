-- ============================================================================
-- FUNNEL STAGE TRACKING
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_funnel_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Stage Progression
    current_stage INTEGER NOT NULL DEFAULT 1, -- 1-6
    stage_1_uploaded_at TIMESTAMP WITH TIME ZONE,
    stage_2_scored_at TIMESTAMP WITH TIME ZONE,
    stage_3_financials_at TIMESTAMP WITH TIME ZONE,
    stage_4_rag_classified_at TIMESTAMP WITH TIME ZONE,
    stage_5_gap_analyzed_at TIMESTAMP WITH TIME ZONE,
    stage_6_roadmap_generated_at TIMESTAMP WITH TIME ZONE,
    
    -- Stage Status
    stage_1_status TEXT DEFAULT 'pending', -- pending, complete, failed
    stage_2_status TEXT DEFAULT 'pending',
    stage_3_status TEXT DEFAULT 'pending',
    stage_4_status TEXT DEFAULT 'pending',
    stage_5_status TEXT DEFAULT 'pending',
    stage_6_status TEXT DEFAULT 'pending',
    
    -- Filter Decisions
    passed_stage_2_filter BOOLEAN, -- Score >= 40
    passed_stage_3_filter BOOLEAN, -- Complete financials
    passed_stage_4_filter BOOLEAN, -- Amber or Green RAG
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_funnel_current_stage ON company_funnel_stages(current_stage);
CREATE INDEX IF NOT EXISTS idx_funnel_company ON company_funnel_stages(company_id);

-- ============================================================================
-- THESIS SCORING
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_thesis_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    thesis_id UUID NOT NULL REFERENCES sector_thesis(id) ON DELETE CASCADE,
    
    -- Overall Score
    overall_score NUMERIC(5,2) NOT NULL, -- 0-100
    
    -- Component Scores
    market_alignment_score NUMERIC(5,2), -- How well company aligns with market opportunity
    growth_potential_score NUMERIC(5,2), -- Based on sector CAGR and company stage
    policy_advantage_score NUMERIC(5,2), -- Alignment with PLI/govt schemes
    competitive_position_score NUMERIC(5,2), -- Position in competitive landscape
    innovation_readiness_score NUMERIC(5,2), -- Tech adoption, IP, etc.
    
    -- Proofs & Evidence
    scoring_rationale JSONB, -- Detailed breakdown
    evidence_points JSONB, -- Specific data points supporting score
    
    -- Matched Opportunities
    matched_opportunities UUID[], -- Array of sector_opportunity IDs
    matched_policies UUID[], -- Array of sector_policy IDs
    
    -- Recommendations
    key_strengths TEXT[],
    key_gaps TEXT[],
    immediate_actions TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_company_thesis_score UNIQUE (company_id, thesis_id)
);

CREATE INDEX IF NOT EXISTS idx_thesis_scores_company ON company_thesis_scores(company_id);
-- CREATE INDEX IF NOT EXISTS idx_thesis_scores_overall ON company_thesis_scores(overall_score DESC);

-- ============================================================================
-- FINANCIAL DATA (Enhanced)
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_financials_extended (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    fiscal_year TEXT NOT NULL,
    
    -- Income Statement
    revenue NUMERIC(15,2) NOT NULL,
    cost_of_goods_sold NUMERIC(15,2),
    gross_profit NUMERIC(15,2),
    operating_expenses NUMERIC(15,2),
    ebitda NUMERIC(15,2),
    net_profit NUMERIC(15,2),
    
    -- Balance Sheet
    total_assets NUMERIC(15,2),
    current_assets NUMERIC(15,2),
    fixed_assets NUMERIC(15,2),
    total_liabilities NUMERIC(15,2),
    current_liabilities NUMERIC(15,2),
    long_term_debt NUMERIC(15,2),
    shareholders_equity NUMERIC(15,2),
    
    -- Cash Flow
    operating_cash_flow NUMERIC(15,2),
    investing_cash_flow NUMERIC(15,2),
    financing_cash_flow NUMERIC(15,2),
    free_cash_flow NUMERIC(15,2),
    
    -- Ratios (auto-calculated)
    gross_margin_percentage NUMERIC(5,2),
    net_margin_percentage NUMERIC(5,2),
    current_ratio NUMERIC(5,2),
    debt_to_equity NUMERIC(5,2),
    roe NUMERIC(5,2), -- Return on Equity
    
    -- Growth Metrics
    revenue_growth_yoy NUMERIC(5,2),
    profit_growth_yoy NUMERIC(5,2),
    
    -- Data Source
    data_source TEXT, -- 'mca', 'direct_transaction', 'manual', 'csv_import'
    data_quality_score INTEGER, -- 0-10
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_company_fiscal_year UNIQUE (company_id, fiscal_year)
);

CREATE INDEX IF NOT EXISTS idx_financials_company ON company_financials_extended(company_id);
-- CREATE INDEX IF NOT EXISTS idx_financials_year ON company_financials_extended(fiscal_year DESC);

-- ============================================================================
-- RAG CLASSIFICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_rag_classification (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- RAG Status
    rag_status TEXT NOT NULL, -- 'red', 'amber', 'green'
    rag_category TEXT NOT NULL, -- 'stretched_fit', 'best_fit', 'best_bet'
    confidence_score NUMERIC(3,2), -- 0.00-1.00
    
    -- Classification Rationale
    classification_reasoning TEXT NOT NULL,
    risk_factors TEXT[],
    opportunity_factors TEXT[],
    
    -- Detailed Scores
    market_opportunity_score NUMERIC(5,2), -- Based on sector thesis
    company_readiness_score NUMERIC(5,2), -- Based on diagnostics
    execution_risk_score NUMERIC(5,2), -- 0-100 (lower is better)
    
    -- Fit Analysis
    fit_analysis JSONB, -- {
                        --   "product_market_fit": "high",
                        --   "timing": "optimal",
                        --   "competitive_advantage": "moderate"
                        -- }
    
    -- Decision
    recommendation TEXT, -- 'proceed', 'proceed_with_caution', 'defer', 'reject'
    recommended_actions TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_company_rag UNIQUE (company_id)
);

CREATE INDEX IF NOT EXISTS idx_rag_status ON company_rag_classification(rag_status);
CREATE INDEX IF NOT EXISTS idx_rag_category ON company_rag_classification(rag_category);
CREATE INDEX IF NOT EXISTS idx_rag_recommendation ON company_rag_classification(recommendation);

-- ============================================================================
-- GAP ANALYSIS (Enhanced with Market Saturation)
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_gap_analysis_extended (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Market Saturation Analysis
    market_saturation_score NUMERIC(5,2), -- 0-100 (100 = fully saturated)
    revenue_vs_market_potential NUMERIC(5,2), -- Company rev / Addressable market
    saturation_diagnosis TEXT, -- 'low_penetration', 'growing', 'saturated', 'declining'
    market_share_estimate NUMERIC(5,2), -- Estimated % of market
    
    -- Diagnostic Factors
    founder_quality_score NUMERIC(5,2), -- 0-100
    founder_assessment TEXT,
    founder_red_flags TEXT[],
    founder_green_flags TEXT[],
    
    years_in_business INTEGER,
    business_maturity_score NUMERIC(5,2),
    
    market_opportunity_score NUMERIC(5,2),
    tam_sam_som JSONB, -- {"tam": 1000000, "sam": 200000, "som": 50000}
    
    leadership_quality_score NUMERIC(5,2),
    leadership_assessment TEXT,
    succession_plan_exists BOOLEAN,
    leadership_gaps TEXT[],
    
    innovation_differentiator_score NUMERIC(5,2),
    innovation_assessment TEXT,
    ip_portfolio_strength TEXT, -- 'none', 'weak', 'moderate', 'strong'
    r_and_d_investment_percentage NUMERIC(5,2),
    
    talent_pool_score NUMERIC(5,2),
    talent_assessment TEXT,
    key_person_risk BOOLEAN,
    talent_gaps TEXT[],
    
    brand_identity_score NUMERIC(5,2),
    brand_assessment TEXT,
    brand_recognition TEXT, -- 'unknown', 'local', 'regional', 'national'
    marketing_maturity TEXT, -- 'none', 'basic', 'intermediate', 'advanced'
    
    -- Overall Gap Analysis
    critical_gaps TEXT[],
    moderate_gaps TEXT[],
    strengths TEXT[],
    
    -- Opportunity Sizing
    addressable_opportunity NUMERIC(15,2), -- Revenue potential in ₹
    time_to_opportunity_months INTEGER,
    probability_of_success NUMERIC(3,2), -- 0.00-1.00
    
    -- Supporting Evidence
    evidence_documents JSONB, -- References to uploaded docs
    data_sources TEXT[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_company_gap_analysis UNIQUE (company_id, analysis_date)
);

CREATE INDEX IF NOT EXISTS idx_gap_analysis_company ON company_gap_analysis_extended(company_id);
CREATE INDEX IF NOT EXISTS idx_gap_saturation ON company_gap_analysis_extended(market_saturation_score);

-- ============================================================================
-- ROADMAP WITH COST-BENEFIT
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_roadmaps_with_roi (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Roadmap Basics
    framework TEXT NOT NULL, -- 'exo', 'lean_startup', 'okr'
    duration_months INTEGER DEFAULT 6,
    strategic_objectives TEXT[],
    
    -- Milestones (from previous schema)
    milestones JSONB NOT NULL,
    
    -- Cost-Benefit Analysis
    total_investment_required NUMERIC(15,2),
    investment_breakdown JSONB, -- {
                                --   "technology": 500000,
                                --   "talent": 1000000,
                                --   "marketing": 300000
                                -- }
    
    -- Expected Benefits
    expected_revenue_increase NUMERIC(15,2),
    expected_margin_improvement NUMERIC(5,2),
    expected_market_share_gain NUMERIC(5,2),
    
    -- ROI Calculation
    total_benefits NUMERIC(15,2),
    net_benefit NUMERIC(15,2), -- Benefits - Costs
    roi_percentage NUMERIC(5,2), -- (Net Benefit / Investment) * 100
    payback_period_months INTEGER,
    
    -- Risk-Adjusted Returns
    probability_weighted_roi NUMERIC(5,2),
    best_case_roi NUMERIC(5,2),
    worst_case_roi NUMERIC(5,2),
    
    -- Working with Company Analysis
    engagement_model TEXT, -- 'consulting', 'investment', 'partnership', 'advisory'
    our_value_add TEXT[],
    company_commitments_required TEXT[],
    success_metrics JSONB,
    
    -- Timeline & Resources
    resource_requirements JSONB,
    implementation_timeline JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roadmaps_company ON company_roadmaps_with_roi(company_id);
-- CREATE INDEX IF NOT EXISTS idx_roadmaps_roi ON company_roadmaps_with_roi(roi_percentage DESC);

-- ============================================================================
-- MCA DATA INTEGRATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS mca_company_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- MCA Identifiers
    cin TEXT UNIQUE, -- Corporate Identification Number
    registration_number TEXT,
    pan TEXT,
    
    -- Company Details
    registered_name TEXT,
    incorporation_date DATE,
    company_class TEXT,
    company_category TEXT,
    
    -- Status
    company_status TEXT, -- 'active', 'strike_off', 'amalgamated', 'dissolved'
    authorized_capital NUMERIC(15,2),
    paid_up_capital NUMERIC(15,2),
    
    -- Directors
    directors JSONB, -- Array of director details
    number_of_directors INTEGER,
    
    -- Charges
    total_charges INTEGER,
    charges_satisfied INTEGER,
    
    -- Filing Status
    last_agm_date DATE,
    last_financial_year_end DATE,
    balance_sheet_filed BOOLEAN,
    
    -- Compliance
    compliance_score INTEGER, -- 0-100
    compliance_red_flags TEXT[],
    
    -- Data Sync
    last_synced_at TIMESTAMP WITH TIME ZONE,
    sync_status TEXT, -- 'success', 'partial', 'failed'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mca_cin ON mca_company_data(cin);
CREATE INDEX IF NOT EXISTS idx_mca_company ON mca_company_data(company_id);

-- ============================================================================
-- DIRECT TRANSACTION DATA
-- ============================================================================

CREATE TABLE IF NOT EXISTS company_transaction_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    transaction_date DATE NOT NULL,
    transaction_type TEXT NOT NULL, -- 'sale', 'purchase', 'expense', 'receipt'
    
    amount NUMERIC(15,2) NOT NULL,
    category TEXT,
    counterparty TEXT,
    
    -- Aggregated Insights
    monthly_revenue NUMERIC(15,2), -- Auto-calculated
    monthly_expenses NUMERIC(15,2),
    monthly_profit NUMERIC(15,2),
    
    -- Data Source
    source TEXT, -- 'bank_statement', 'accounting_software', 'manual'
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_company ON company_transaction_data(company_id);
-- CREATE INDEX IF NOT EXISTS idx_transactions_date ON company_transaction_data(transaction_date DESC);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate CAGR from financials
-- CREATE OR REPLACE FUNCTION calculate_company_cagr(p_company_id UUID, p_years INTEGER DEFAULT 3)
-- RETURNS NUMERIC AS $$
-- DECLARE
--     v_latest_revenue NUMERIC;
--     v_earliest_revenue NUMERIC;
--     v_cagr NUMERIC;
-- BEGIN
--     -- Get latest revenue
--     SELECT revenue INTO v_latest_revenue
--     FROM company_financials_extended
--     WHERE company_id = p_company_id
--     ORDER BY fiscal_year DESC
--     LIMIT 1;
    
--     -- Get revenue from N years ago
--     SELECT revenue INTO v_earliest_revenue
--     FROM company_financials_extended
--     WHERE company_id = p_company_id
--     ORDER BY fiscal_year ASC
--     LIMIT 1 OFFSET (p_years - 1);
    
--     -- Calculate CAGR: ((End Value / Start Value)^(1/years)) - 1
--     IF v_earliest_revenue > 0 AND v_latest_revenue > 0 THEN
--         v_cagr := ((POWER(v_latest_revenue / v_earliest_revenue, 1.0 / p_years)) - 1) * 100;
--         RETURN ROUND(v_cagr, 2);
--     ELSE
--         RETURN NULL;
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;

-- Function to advance company through funnel
-- CREATE OR REPLACE FUNCTION advance_funnel_stage(
--     p_company_id UUID,
--     p_to_stage INTEGER
-- )
-- RETURNS BOOLEAN AS $$
-- BEGIN
--     UPDATE company_funnel_stages
--     SET 
--         current_stage = p_to_stage,
--         updated_at = NOW()
--     WHERE company_id = p_company_id;
    
--     RETURN FOUND;
-- END;
-- $$ LANGUAGE plpgsql;

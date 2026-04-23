-- MOSI AI Synthesis | Aequs Limited Mock Data (CEED Harmonized)
-- Run this in the Supabase SQL Editor AFTER init_db.sql

DO $$ 
DECLARE
    v_sector_id UUID;
    v_company_id UUID;
    v_session_id UUID;
BEGIN
    -- 1. Ensure Sector exists
    SELECT id INTO v_sector_id FROM sectors WHERE name ILIKE '%Aerospace%' LIMIT 1;
    
    IF v_sector_id IS NULL THEN
        INSERT INTO sectors (name, description) 
        VALUES ('Aerospace', 'Aviation, aircraft components, and defense aerospace') 
        RETURNING id INTO v_sector_id;
    END IF;

    -- 2. Upsert Aequs Limited
    v_company_id := 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    
    INSERT INTO companies (
        id, name, primary_sector_id, stage, website, description, 
        founded_year, employee_count, headquarters_location, funnel_stage
    ) VALUES (
        v_company_id, 
        'Aequs Limited', 
        v_sector_id, 
        'growth', 
        'https://www.aequs.com', 
        'Only precision component manufacturer in India with full vertical integration in single SEZ', 
        2006, 
        4000, 
        'Bengaluru, Karnataka', 
        'gap_analysis'
    ) ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id INTO v_company_id;

    -- 3. Financials
    INSERT INTO company_financials (
        company_id, fiscal_year, revenue_inr_lakhs, profit_inr_lakhs, 
        revenue_growth_yoy, net_profit_margin
    ) VALUES (
        v_company_id, 2024, 95921.00, -10235.00, -2.94, -10.67
    ) ON CONFLICT (company_id, fiscal_year) DO NOTHING;

    -- 4. Leadership
    INSERT INTO company_leadership (company_id, name, role, bio) VALUES
        (v_company_id, 'Aravind Shivaputrappa Melligeri', 'Executive Chairman & CEO', '25+ years aerospace experience. Co-founded QuEST Global.'),
        (v_company_id, 'Rajeev Kaul', 'Managing Director', '22 years total experience. CA ICAI.')
    ON CONFLICT (company_id, name) DO NOTHING;
            
    -- 5. Gap Analysis
    INSERT INTO gap_analysis (
        company_id, rag_score, overall_potential_score, confidence_level, 
        key_strengths, critical_gaps
    ) VALUES (
        v_company_id, 'amber', 78, 'high',
        '["Tier-1 supplier to Airbus", "Integrated aerospace ecosystem"]'::JSONB,
        '["No succession plan for 52-year-old founder", "Three consecutive years of net losses", "CTO position vacant"]'::JSONB
    ) ON CONFLICT (company_id) DO NOTHING;

    -- 6. Insert a Mock Session for the Analysis
    v_session_id := '99999999-9999-9999-9999-999999999999'; -- Fixed ID for demo
    
    INSERT INTO sessions (id, stakeholder_id, status, date, summary)
    VALUES (
        v_session_id, 
        NULL, 
        'Review',
        'Oct 24, 2024',
        'Interview with CEO Aravind Melligeri focusing on scaling the aerospace segment.'
    ) ON CONFLICT (id) DO NOTHING;

    -- 7. CEED Opportunities
    
    -- Opportunity 1: Spin-off Consumer Segment (Core)
    INSERT INTO opportunities (
        session_id, title, description, tag, 
        problem_clarity, budget_score, origin, 
        actively_seeking, skillset, toolset, mindset
    ) VALUES (
        v_session_id,
        'Spin-off Consumer Segment',
        'Strategically separate the consumer manufacturing segment to focus entirely on core aerospace.',
        'Core', 4, 3, 'Customer', true,
        '["Financial Restructuring"]'::JSONB, '["ERP Split"]'::JSONB, '["Visionary Focus"]'::JSONB
    ) ON CONFLICT DO NOTHING;

    -- Opportunity 2: Automated RFQ Processing (Efficiency)
    INSERT INTO opportunities (
        session_id, title, description, tag, 
        problem_clarity, budget_score, origin, 
        actively_seeking, skillset, toolset, mindset
    ) VALUES (
        v_session_id, 
        'Automated RFQ Processing',
        'Build an NLP-driven quoting pipeline to reduce the manual delay in quoting.',
        'Efficiency', 3, 4, 'Interviewer', true,
        '["NLP", "Sales Automation"]'::JSONB, '["Python", "FastAPI"]'::JSONB, '["Efficiency"]'::JSONB
    ) ON CONFLICT DO NOTHING;

    -- 8. Market Context
    INSERT INTO company_market_context (
        company_id, market_saturation, market_share_percentage, 
        market_diagnosis, ocean_strategy, analysis_case, recommended_focus
    ) VALUES (
        v_company_id, 25.0, 1.92, 'not_saturated', 'growth', 1, ARRAY['core', 'efficiency']
    ) ON CONFLICT (company_id) DO UPDATE SET market_diagnosis = EXCLUDED.market_diagnosis;

    RAISE NOTICE '🚀 Aequs Mock Discovery Intelligence Injected!';
END $$;

-- MOSI Intelligence Platform | Seed Data
-- Run this in the Supabase SQL Editor AFTER init_db.sql

DO $$ 
DECLARE
    v_sector_id UUID;
    v_company_id UUID;
    v_session_id UUID;
BEGIN
    -- 1. SECTOR SEEDING
    INSERT INTO sectors (name, description) 
    VALUES ('Aerospace', 'Aviation, aircraft components, and defense aerospace') 
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id INTO v_sector_id;

    INSERT INTO sectors (name, description) 
    VALUES ('AgriTech', 'Precision farming, drone monitoring, and automated irrigation')
    ON CONFLICT (name) DO NOTHING;

    INSERT INTO sectors (name, description) 
    VALUES ('HealthTech', 'Medical devices, digital diagnostics, and patient monitoring')
    ON CONFLICT (name) DO NOTHING;

    INSERT INTO sectors (name, description) 
    VALUES ('Logistics', 'Smart warehousing, last-mile delivery, and supply chain automation')
    ON CONFLICT (name) DO NOTHING;


    -- 2. COMPANY SEEDING (Aequs Limited)
    -- Fixed UUID for consistency
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

    -- 3. FINANCIALS
    INSERT INTO company_financials (
        company_id, fiscal_year, revenue_inr_lakhs, profit_inr_lakhs, 
        revenue_growth_yoy, net_profit_margin
    ) VALUES (
        v_company_id, 2024, 95921.00, -10235.00, -2.94, -10.67
    ) ON CONFLICT (company_id, fiscal_year) DO NOTHING;

    -- 4. LEADERSHIP
    INSERT INTO company_leadership (company_id, name, role, bio) VALUES
        (v_company_id, 'Aravind Shivaputrappa Melligeri', 'Executive Chairman & CEO', '25+ years aerospace experience. Co-founded QuEST Global.'),
        (v_company_id, 'Rajeev Kaul', 'Managing Director', '22 years total experience. CA ICAI.')
    ON CONFLICT (company_id, name) DO NOTHING;

    -- 5. GAP ANALYSIS
    INSERT INTO gap_analysis (
        company_id, rag_score, overall_potential_score, confidence_level, 
        key_strengths, critical_gaps
    ) VALUES (
        v_company_id, 'amber', 78, 'high',
        '["Tier-1 supplier to Airbus", "Integrated aerospace ecosystem"]'::JSONB,
        '["No succession plan for 52-year-old founder", "Three consecutive years of net losses", "CTO position vacant"]'::JSONB
    ) ON CONFLICT (company_id) DO NOTHING;

    -- 6. MARKET CONTEXT
    INSERT INTO company_market_context (
        company_id, market_saturation, market_share_percentage, 
        market_diagnosis, ocean_strategy, analysis_case, recommended_focus
    ) VALUES (
        v_company_id, 25.0, 1.92, 'not_saturated', 'growth', 1, ARRAY['core', 'efficiency']
    ) ON CONFLICT (company_id) DO UPDATE SET market_diagnosis = EXCLUDED.market_diagnosis;

    RAISE NOTICE '🚀 Seed Data Injected Successfully!';
END $$;

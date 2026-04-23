-- MOSI Intelligence Platform | Demo Environment Setup
-- 1. Sign up at http://localhost:3000/signup first.
-- 2. Once registered, run this script to populate your dashboard.

DO $$ 
DECLARE
    v_sector_id UUID;
    v_company_id UUID;
    v_session_id UUID;
    v_user_id UUID;
BEGIN
    -- 0. USER SETUP (REPLACE WITH YOUR ACTUAL AUTH.USERS ID IF KNOWN)
    -- This promotes the latest signed-up user to a 'researcher' role in the profiles table.
    -- If you want to target a specific email, you can look it up in Supabase Auth.
    SELECT id INTO v_user_id FROM auth.users ORDER BY created_at DESC LIMIT 1;
    
    IF v_user_id IS NOT NULL THEN
        INSERT INTO profiles (id, full_name, role)
        VALUES (v_user_id, 'Principal Researcher (Demo)', 'researcher')
        ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;
        RAISE NOTICE '✅ Profile updated for user ID: %', v_user_id;
    END IF;

    -- 1. SECTOR SEEDING
    INSERT INTO sectors (name, description) 
    VALUES ('Aerospace', 'Aviation, aircraft components, and defense aerospace') 
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id INTO v_sector_id;

    INSERT INTO sectors (name, description) 
    VALUES ('Sustainability', 'Eco-friendly manufacturing and green logistics')
    ON CONFLICT (name) DO NOTHING;

    -- 2. COMPANY SEEDING (Aequs Limited)
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

    -- 3. FINANCIALS & LEADERSHIP
    INSERT INTO company_financials (company_id, fiscal_year, revenue_inr_lakhs, profit_inr_lakhs, revenue_growth_yoy, net_profit_margin) 
    VALUES (v_company_id, 2024, 95921.00, -10235.00, -2.94, -10.67) 
    ON CONFLICT (company_id, fiscal_year) DO NOTHING;

    INSERT INTO company_leadership (company_id, name, role, bio) 
    VALUES (v_company_id, 'Aravind Shivaputrappa Melligeri', 'CEO', '25+ years aerospace experience.')
    ON CONFLICT (company_id, name) DO NOTHING;

    -- 4. MOCK INTERVIEW SESSION
    v_session_id := '99999999-9999-9999-9999-999999999999';
    
    INSERT INTO sessions (id, user_id, status, date, summary)
    VALUES (v_session_id, v_user_id, 'Review', 'Oct 24, 2024', 'Strategic review focusing on core aerospace profitability.')
    ON CONFLICT (id) DO UPDATE SET user_id = EXCLUDED.user_id;

    -- 5. CEED OPPORTUNITIES (AI Extracted)
    INSERT INTO opportunities (session_id, title, description, tag, problem_clarity, budget_score, origin, actively_seeking)
    VALUES (v_session_id, 'Spin-off Consumer Segment', 'Focusing entirely on core aerospace.', 'Core', 4, 3, 'Customer', true)
    ON CONFLICT DO NOTHING;

    INSERT INTO opportunities (session_id, title, description, tag, problem_clarity, budget_score, origin, actively_seeking)
    VALUES (v_session_id, 'Automated RFQ Processing', 'NLP-driven quoting pipeline for efficiency.', 'Efficiency', 3, 4, 'Interviewer', true)
    ON CONFLICT DO NOTHING;

    -- 6. MARKET CONTEXT
    INSERT INTO company_market_context (company_id, market_saturation, market_share_percentage, market_diagnosis, ocean_strategy, analysis_case, recommended_focus)
    VALUES (v_company_id, 25.0, 1.92, 'not_saturated', 'growth', 1, ARRAY['core', 'efficiency'])
    ON CONFLICT (company_id) DO UPDATE SET market_diagnosis = EXCLUDED.market_diagnosis;

    RAISE NOTICE '🚀 Demo Environment Seeded Successfully!';
END $$;

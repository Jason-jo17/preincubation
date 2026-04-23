-- MOSI Strategic Interviews Seed Script
-- Provides 3 High-Fidelity Mock Sessions

DO $$
DECLARE
    v_user_id UUID;
    v_aequs_id UUID;
    v_techforge_id UUID;
    v_farmtech_id UUID;
    v_session_1 UUID;
    v_session_2 UUID;
    v_session_3 UUID;
    v_stakeholder_1 UUID;
    v_stakeholder_2 UUID;
    v_stakeholder_3 UUID;
BEGIN
    -- 1. Get current user
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    
    -- 2. Link Companies (Ensure they exist and get IDs)
    SELECT id INTO v_aequs_id FROM companies WHERE name = 'Aequs Limited' LIMIT 1;
    SELECT id INTO v_techforge_id FROM companies WHERE name = 'TechForge Manufacturing' LIMIT 1;
    SELECT id INTO v_farmtech_id FROM companies WHERE name = 'FarmTech Solutions' LIMIT 1;

    -- 3. Ensure Stakeholders exist
    INSERT INTO stakeholders (user_id, name, role, email, company, sector) VALUES
    (v_user_id, 'Vikram Singh', 'Operations Head', 'vikram.s@aequs.com', 'Aequs Limited', 'Aerospace'),
    (v_user_id, 'Karthik N.', 'Quality lead', 'karthik.n@techforge.io', 'TechForge Manufacturing', 'Advanced Manufacturing'),
    (v_user_id, 'Dr. Aruna P.', 'R&D Director', 'aruna@farmtech.ag', 'FarmTech Solutions', 'Agritech')
    ON CONFLICT (email) DO UPDATE SET user_id = EXCLUDED.user_id;

    SELECT id INTO v_stakeholder_1 FROM stakeholders WHERE email = 'vikram.s@aequs.com' LIMIT 1;
    SELECT id INTO v_stakeholder_2 FROM stakeholders WHERE email = 'karthik.n@techforge.io' LIMIT 1;
    SELECT id INTO v_stakeholder_3 FROM stakeholders WHERE email = 'aruna@farmtech.ag' LIMIT 1;

    -- 4. Session 1: Aequs Manufacturing Floor Optimization
    INSERT INTO sessions (user_id, stakeholder_id, status, date, duration, summary, sentiment)
    VALUES (v_user_id, v_stakeholder_1, 'Completed', CURRENT_DATE - INTERVAL '1 day', 45, 'Deep dive into precision manufacturing bottlenecks and vertical integration efficiency.', 'Positive')
    RETURNING id INTO v_session_1;

    INSERT INTO opportunities (session_id, title, description, tag, problem_clarity, budget_score)
    VALUES 
    (v_session_1, 'Vertical Integration Bottleneck', 'Identifying single-SEZ manufacturing delays in raw material flow.', 'Evidence', 4, 3),
    (v_session_1, 'Digital Twin for Machining', 'Need for real-time visualization of precision component machining to reduce scrap.', 'Design', 2, 5)
    ON CONFLICT DO NOTHING;

    -- 5. Session 2: TechForge Electronics Yield
    INSERT INTO sessions (user_id, stakeholder_id, status, date, duration, summary, sentiment)
    VALUES (v_user_id, v_stakeholder_2, 'Completed', CURRENT_DATE - INTERVAL '3 days', 30, 'Discussion on electronic assembly line speed and defect rates.', 'Neutral')
    RETURNING id INTO v_session_2;

    INSERT INTO opportunities (session_id, title, description, tag, problem_clarity, budget_score)
    VALUES 
    (v_session_2, 'High Defect Rate in Soldering', 'Excessive rework and manual inspection slowing down the line speed.', 'Curiosity', 5, 2),
    (v_session_2, 'AI Vision for Inspection', 'Automating defect detection using high-speed cameras on the assembly line.', 'Evidence', 3, 4)
    ON CONFLICT DO NOTHING;

    -- 6. Session 3: FarmTech IoT Connectivity
    INSERT INTO sessions (user_id, stakeholder_id, status, date, duration, summary, sentiment)
    VALUES (v_user_id, v_stakeholder_3, 'Completed', CURRENT_DATE - INTERVAL '7 days', 60, 'Strategic roadmap for scaling IoT sensors across 1000+ farm clusters.', 'Very Positive')
    RETURNING id INTO v_session_3;

    INSERT INTO opportunities (session_id, title, description, tag, problem_clarity, budget_score)
    VALUES 
    (v_session_3, 'Rural Low-Bandwidth Sync', 'Challenge of syncing farm data in areas with intermittent 4G/5G coverage.', 'Empathy', 2, 4),
    (v_session_3, 'Predictive Yield Modeling', 'Integrating soil sensor data with satellite imagery for 95% yield accuracy.', 'Design', 4, 5)
    ON CONFLICT DO NOTHING;

    RAISE NOTICE '🚀 MOSI Strategic Interviews Seeded Successfully!';
END $$;

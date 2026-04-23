-- MOSI Repository Seed Script
-- Provides 30+ Companies and Stakeholders

DO $$
DECLARE
    v_user_id UUID;
    v_sector_mfg UUID;
    v_sector_fintech UUID;
    v_sector_agritech UUID;
    v_sector_aerospace UUID;
BEGIN
    -- 1. Get current user (you must be logged in for this to work effectively in one go)
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    
    -- 2. Ensure Sectors Exist
    INSERT INTO sectors (name, description) VALUES 
    ('Aerospace', 'Aviation and defense manufacturing'),
    ('Advanced Manufacturing', 'Precision engineering and electronics'),
    ('Fintech', 'Financial technology and payments'),
    ('Agritech', 'Agricultural technology and farm management')
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;

    SELECT id INTO v_sector_aerospace FROM sectors WHERE name = 'Aerospace' LIMIT 1;
    SELECT id INTO v_sector_mfg FROM sectors WHERE name = 'Advanced Manufacturing' LIMIT 1;
    SELECT id INTO v_sector_fintech FROM sectors WHERE name = 'Fintech' LIMIT 1;
    SELECT id INTO v_sector_agritech FROM sectors WHERE name = 'Agritech' LIMIT 1;

    -- 3. Insert Companies (Advanced Manufacturing)
    INSERT INTO companies (user_id, name, primary_sector_id, stage, website, description, founded_year, employee_count, headquarters_location, funnel_stage)
    VALUES 
    (v_user_id, 'TechForge Manufacturing', v_sector_mfg, 'growth', 'https://techforge.example.com', 'Electronics manufacturing scale-up', 2018, 85, 'Bangalore, Karnataka', 'discovery'),
    (v_user_id, 'Precision Components Ltd', v_sector_mfg, 'mature', 'https://precision.example.com', 'Auto components major', 2016, 120, 'Pune, Maharashtra', 'discovery'),
    (v_user_id, 'NanoTech Innovations', v_sector_mfg, 'early', 'https://nanotech.example.com', 'Nanotechnology in electronics', 2020, 45, 'Chennai, Tamil Nadu', 'discovery'),
    (v_user_id, 'SmartFactory Systems', v_sector_mfg, 'growth', 'https://smartfactory.example.com', 'Industrial automation solutions', 2019, 65, 'Ahmedabad, Gujarat', 'discovery'),
    (v_user_id, 'GreenMetal Works', v_sector_mfg, 'mature', 'https://greenmetal.example.com', 'Sustainable precision engineering', 2017, 95, 'Mumbai, Maharashtra', 'discovery')
    ON CONFLICT (name) DO UPDATE SET user_id = EXCLUDED.user_id;

    -- 4. Insert Companies (Fintech)
    INSERT INTO companies (user_id, name, primary_sector_id, stage, website, description, founded_year, employee_count, headquarters_location, funnel_stage)
    VALUES 
    (v_user_id, 'PayEase Solutions', v_sector_fintech, 'growth', 'https://payease.example.com', 'Next-gen payment gateway', 2019, 120, 'Mumbai, Maharashtra', 'discovery'),
    (v_user_id, 'LendSmart Technologies', v_sector_fintech, 'growth', 'https://lendsmart.example.com', 'AI-driven lending platform', 2020, 85, 'Bangalore, Karnataka', 'discovery'),
    (v_user_id, 'WealthTech Advisors', v_sector_fintech, 'mature', 'https://wealthtech.example.com', 'Digital wealth management', 2018, 95, 'Mumbai, Maharashtra', 'discovery'),
    (v_user_id, 'InsureTech Plus', v_sector_fintech, 'early', 'https://insuretech.example.com', 'Digital insurance broker', 2021, 45, 'Pune, Maharashtra', 'discovery')
    ON CONFLICT (name) DO UPDATE SET user_id = EXCLUDED.user_id;

    -- 5. Insert Companies (Agritech)
    INSERT INTO companies (user_id, name, primary_sector_id, stage, website, description, founded_year, employee_count, headquarters_location, funnel_stage)
    VALUES 
    (v_user_id, 'FarmTech Solutions', v_sector_agritech, 'growth', 'https://farmtech.example.com', 'Precision agriculture IoT', 2019, 75, 'Pune, Maharashtra', 'discovery'),
    (v_user_id, 'AgroData Analytics', v_sector_agritech, 'growth', 'https://agrodata.example.com', 'Big data for crop yields', 2020, 48, 'Bangalore, Karnataka', 'discovery'),
    (v_user_id, 'CropGuard AI', v_sector_agritech, 'early', 'https://cropguard.example.com', 'AI for pest detection', 2021, 32, 'Nashik, Maharashtra', 'discovery')
    ON CONFLICT (name) DO UPDATE SET user_id = EXCLUDED.user_id;

    -- 6. Insert Stakeholders
    INSERT INTO stakeholders (user_id, name, role, email, company, sector)
    VALUES 
    (v_user_id, 'Rahul Sharma', 'VP Engineering', 'rahul@techforge.io', 'TechForge Manufacturing', 'Advanced Manufacturing'),
    (v_user_id, 'Anita Desai', 'CEO', 'anita@precision.co', 'Precision Components Ltd', 'Advanced Manufacturing'),
    (v_user_id, 'Siddharth V.', 'CTO', 'sid@farmtech.ag', 'FarmTech Solutions', 'Agritech'),
    (v_user_id, 'Meera Reddy', 'Founder', 'meera@payease.com', 'PayEase Solutions', 'Fintech')
    ON CONFLICT (email) DO UPDATE SET user_id = EXCLUDED.user_id;

    RAISE NOTICE '🚀 MOSI Repository Seeded Successfully!';
END $$;

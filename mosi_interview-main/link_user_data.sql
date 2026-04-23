-- 🚀 MOSI Data Ownership Linker
-- This script links existing mock data to your currently authenticated user.
-- Run this in the Supabase SQL Editor AFTER you have logged in.

DO $$
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'demo@mosi.ai'; -- Change this to your login email if different
BEGIN
    -- 1. Get the target User ID
    -- We try to find the specific email, otherwise fall back to the most recent user
    SELECT id INTO v_user_id 
    FROM auth.users 
    WHERE email = v_user_email
    ORDER BY created_at DESC 
    LIMIT 1;

    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM auth.users ORDER BY created_at DESC LIMIT 1;
    END IF;

    IF v_user_id IS NOT NULL THEN
        RAISE NOTICE 'Linking data to User ID: %', v_user_id;

        -- 2. Link Companies
        UPDATE companies SET user_id = v_user_id WHERE user_id IS NULL;
        
        -- 3. Link Stakeholders
        UPDATE stakeholders SET user_id = v_user_id WHERE user_id IS NULL;

        -- 4. Link Interview Sessions
        UPDATE interview_sessions SET user_id = v_user_id WHERE user_id IS NULL;

        -- 5. Link Strategic Opportunities / Discoveries
        UPDATE discovery_insights SET user_id = v_user_id WHERE user_id IS NULL;
        UPDATE automation_needs SET user_id = v_user_id WHERE user_id IS NULL;

        RAISE NOTICE '✅ Successfully linked all mock data to user!';
    ELSE
        RAISE WARNING '❌ No user found in auth.users. Please sign up or log in first.';
    END IF;
END $$;

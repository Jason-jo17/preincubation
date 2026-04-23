-- MOSI Production Fix: Admin RLS Bypass Policies
-- Run this in Supabase SQL Editor

DO $$
BEGIN
    -- Sessions: Admin full access
    DROP POLICY IF EXISTS "Admins see all sessions" ON sessions;
    CREATE POLICY "Admins see all sessions" ON sessions FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
    
    DROP POLICY IF EXISTS "Admins update all sessions" ON sessions;
    CREATE POLICY "Admins update all sessions" ON sessions FOR UPDATE
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
    
    DROP POLICY IF EXISTS "Admins delete all sessions" ON sessions;
    CREATE POLICY "Admins delete all sessions" ON sessions FOR DELETE
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    -- Stakeholders: Admin access
    DROP POLICY IF EXISTS "Admins see all stakeholders" ON stakeholders;
    CREATE POLICY "Admins see all stakeholders" ON stakeholders FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    DROP POLICY IF EXISTS "Admins delete all stakeholders" ON stakeholders;
    CREATE POLICY "Admins delete all stakeholders" ON stakeholders FOR DELETE
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    -- Profiles: Admin access
    DROP POLICY IF EXISTS "Admins see all profiles" ON profiles;
    CREATE POLICY "Admins see all profiles" ON profiles FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    -- Opportunities: Admin access
    DROP POLICY IF EXISTS "Admins see all opportunities" ON opportunities;
    CREATE POLICY "Admins see all opportunities" ON opportunities FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    -- Evidence: Admin access
    DROP POLICY IF EXISTS "Admins see all evidence" ON evidence;
    CREATE POLICY "Admins see all evidence" ON evidence FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

    RAISE NOTICE '✅ Admin RLS policies created successfully!';
END $$;

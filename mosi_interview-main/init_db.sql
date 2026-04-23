-- MOSI Intelligence Platform | Full Database Schema (V3 - Hardened Idempotent)
-- Run this in the Supabase SQL Editor (https://ivsdadfpzhjbkvzulyhu.supabase.co)

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES (Base setup)
CREATE TABLE IF NOT EXISTS sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL UNIQUE,
    primary_sector_id UUID REFERENCES sectors(id),
    stage TEXT,
    website TEXT,
    description TEXT,
    founded_year INTEGER,
    employee_count INTEGER,
    headquarters_location TEXT,
    funnel_stage TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_financials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    fiscal_year INTEGER,
    revenue_inr_lakhs NUMERIC,
    profit_inr_lakhs NUMERIC,
    revenue_growth_yoy NUMERIC,
    net_profit_margin NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gap_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    rag_score TEXT,
    overall_potential_score INTEGER,
    confidence_level TEXT,
    key_strengths JSONB DEFAULT '[]'::JSONB,
    critical_gaps JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stakeholders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    role TEXT,
    phone TEXT,
    email TEXT UNIQUE,
    linkedin TEXT,
    company TEXT,
    sector TEXT,
    products TEXT,
    employees TEXT,
    revenue TEXT,
    years_in_business TEXT,
    geography TEXT,
    domain TEXT,
    address TEXT,
    pincode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    stakeholder_id UUID REFERENCES stakeholders(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'Recording',
    date TEXT,
    duration INTEGER DEFAULT 0,
    audio_settings JSONB DEFAULT '{"audio":true, "video":true}'::JSONB,
    recording_url TEXT,
    summary TEXT,
    transcript JSONB DEFAULT '[]'::JSONB,
    sentiment TEXT,
    next_steps JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    tag TEXT, 
    timestamp INTEGER DEFAULT 0,
    problem_clarity INTEGER DEFAULT 2,
    budget_score INTEGER DEFAULT 2,
    is_paid BOOLEAN DEFAULT FALSE,
    duration TEXT,
    origin TEXT DEFAULT 'Customer',
    actively_seeking BOOLEAN DEFAULT TRUE,
    skillset JSONB DEFAULT '[]'::JSONB,
    toolset JSONB DEFAULT '[]'::JSONB,
    mindset JSONB DEFAULT '[]'::JSONB,
    assessment_matrix JSONB DEFAULT '{"clarity":2, "awareness":2, "attempts":2, "intensity":2}'::JSONB,
    notes TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    type TEXT,
    url TEXT NOT NULL,
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role TEXT DEFAULT 'researcher',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_market_context (
    company_id UUID PRIMARY KEY REFERENCES companies(id) ON DELETE CASCADE,
    market_saturation NUMERIC,
    market_share_percentage NUMERIC,
    market_diagnosis TEXT,
    ocean_strategy TEXT,
    analysis_case INTEGER,
    recommended_focus TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CONSTRAINT REPAIR (Vital for Upserting Mock Data)
DO $$
BEGIN
    -- Companies: Ensure name is unique for ON CONFLICT (name)
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'companies_name_key') THEN
        ALTER TABLE companies ADD CONSTRAINT companies_name_key UNIQUE (name);
    END IF;

    -- Financials: Unique per year
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'company_financials_company_id_fiscal_year_key') THEN
        ALTER TABLE company_financials ADD CONSTRAINT company_financials_company_id_fiscal_year_key UNIQUE (company_id, fiscal_year);
    END IF;

    -- Leadership: Unique per person per company
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'company_leadership_company_id_name_key') THEN
        ALTER TABLE company_leadership ADD CONSTRAINT company_leadership_company_id_name_key UNIQUE (company_id, name);
    END IF;

    -- Gap Analysis: One per company
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gap_analysis_company_id_key') THEN
        ALTER TABLE gap_analysis ADD CONSTRAINT gap_analysis_company_id_key UNIQUE (company_id);
    END IF;
END $$;

-- 4. SECURITY (RLS & Policies)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stakeholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Idempotent Policy Creation
DO $$
BEGIN
    DROP POLICY IF EXISTS "Profiles are self-viewable" ON profiles;
    CREATE POLICY "Profiles are self-viewable" ON profiles FOR SELECT USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Profiles are self-editable" ON profiles;
    CREATE POLICY "Profiles are self-editable" ON profiles FOR UPDATE USING (auth.uid() = id);

    DROP POLICY IF EXISTS "Researchers see own stakeholders" ON stakeholders;
    CREATE POLICY "Researchers see own stakeholders" ON stakeholders FOR ALL USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Researchers see own sessions" ON sessions;
    CREATE POLICY "Researchers see own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "See opportunities of own sessions" ON opportunities;
    CREATE POLICY "See opportunities of own sessions" ON opportunities FOR ALL 
    USING (EXISTS (SELECT 1 FROM sessions WHERE sessions.id = opportunities.session_id AND sessions.user_id = auth.uid()));

    DROP POLICY IF EXISTS "See evidence of own sessions" ON evidence;
    CREATE POLICY "See evidence of own sessions" ON evidence FOR ALL 
    USING (EXISTS (SELECT 1 FROM sessions WHERE sessions.id = evidence.session_id AND sessions.user_id = auth.uid()));

    DROP POLICY IF EXISTS "Public Read for Sectors" ON sectors;
    CREATE POLICY "Public Read for Sectors" ON sectors FOR SELECT TO authenticated USING (true);

    DROP POLICY IF EXISTS "Public Read for Companies" ON companies;
    CREATE POLICY "Public Read for Companies" ON companies FOR SELECT TO authenticated USING (true);
END $$;

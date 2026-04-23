-- MOSI Interview Intelligence Engine - Database Schema
-- Integrates raw interview discovery with MSME CEED framework

-- 1. MOSI Stakeholders (Extends MSME contact data with discovery metrics)
CREATE TABLE IF NOT EXISTS mosi_stakeholders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    user_id UUID, -- Researcher mapping

    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(255),
    
    -- Business Context
    company_name VARCHAR(255), -- As mentioned in interview
    sector VARCHAR(100),
    employees VARCHAR(50),
    revenue VARCHAR(50),
    geography VARCHAR(255),
    domain VARCHAR(255),
    address TEXT,
    pincode VARCHAR(20),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. MOSI Interview Sessions
CREATE TABLE IF NOT EXISTS mosi_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stakeholder_id UUID REFERENCES mosi_stakeholders(id) ON DELETE CASCADE,
    user_id UUID, -- Researcher mapping
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    
    status VARCHAR(20) DEFAULT 'Review', -- Scheduled, Recording, Review, Published
    date VARCHAR(50), -- Formatted date string from MOSI
    duration INTEGER, -- In seconds
    
    -- Audio/Video Settings (JSON)
    audio_settings JSONB DEFAULT '{"audio": true, "video": true}',
    
    summary TEXT,
    transcript JSONB DEFAULT '[]', -- Array of TranscriptParagraph
    recording_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    serialized_state JSONB DEFAULT NULL, -- Full Zustand dump if needed
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MOSI Opportunities (Structured Strategic Findings)
CREATE TABLE IF NOT EXISTS mosi_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES mosi_sessions(id) ON DELETE CASCADE,
    
    timestamp INTEGER, -- Seconds into the interview
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tag VARCHAR(20), -- Core, Efficiency, Expansion, Disrupt
    
    -- Rubric Scoring (1-4)
    problem_clarity INTEGER,
    budget_score INTEGER,
    
    -- Logistics & Matching
    is_paid BOOLEAN DEFAULT false,
    reward_amount VARCHAR(100),
    working_hours INTEGER,
    duration_commitment VARCHAR(50),
    
    origin VARCHAR(20), -- Customer, Interviewer
    actively_seeking BOOLEAN DEFAULT true,
    
    -- Talent Attributes (JSON arrays)
    skillset JSONB DEFAULT '[]',
    toolset JSONB DEFAULT '[]',
    mindset JSONB DEFAULT '[]',
    
    -- Qualitative Score (clariy, awareness, attempts, intensity)
    assessment_matrix JSONB DEFAULT '{"clarity": 2, "awareness": 2, "attempts": 2, "intensity": 2}',
    
    notes TEXT,
    status VARCHAR(20) DEFAULT 'Pending', -- Approved, Hidden, Pending
    comment TEXT, -- Researcher notes for this specific opp
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MOSI Evidence Pieces
CREATE TABLE IF NOT EXISTS mosi_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES mosi_sessions(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES mosi_opportunities(id) ON DELETE CASCADE,
    
    type VARCHAR(20), -- image, video, link, file
    url TEXT NOT NULL,
    title VARCHAR(255),
    timestamp INTEGER, -- Alignment with session timeline
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Unified Opportunities (Bridge for MSME PRD Engine)
CREATE TABLE IF NOT EXISTS unified_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES mosi_sessions(id),
    company_id UUID REFERENCES companies(id),
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ceed_tag VARCHAR(20), -- Normalizing 'Disrupt' to 'Disruption' potentially
    
    problem_clarity INTEGER,
    budget_availability INTEGER,
    is_paid_project BOOLEAN DEFAULT false,
    budget_amount NUMERIC(15, 2),
    working_hours_defined INTEGER,
    owner_origin VARCHAR(20),
    customer_actively_seeking BOOLEAN DEFAULT true,
    
    skillset JSONB DEFAULT '[]',
    toolset JSONB DEFAULT '[]',
    mindset JSONB DEFAULT '[]',
    duration_weeks INTEGER DEFAULT 4,
    
    sync_status VARCHAR(20) DEFAULT 'synced',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for performance
CREATE INDEX idx_mosi_sessions_stakeholder ON mosi_sessions(stakeholder_id);
CREATE INDEX idx_mosi_sessions_company ON mosi_sessions(company_id);
CREATE INDEX idx_mosi_opps_session ON mosi_opportunities(session_id);
CREATE INDEX idx_mosi_evidence_session ON mosi_evidence(session_id);
CREATE INDEX idx_mosi_evidence_opp ON mosi_evidence(opportunity_id);
CREATE INDEX idx_unified_opps_company ON unified_opportunities(company_id);

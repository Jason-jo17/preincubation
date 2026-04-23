-- Company portal users
CREATE TABLE IF NOT EXISTS company_portal_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'company_owner',
    password_hash VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    invite_token VARCHAR(100),
    invite_expires_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON company_portal_users(company_id);
CREATE INDEX ON company_portal_users(email);

-- Data dispute / evidence submissions
CREATE TABLE IF NOT EXISTS company_data_disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    submitted_by_user_id UUID REFERENCES company_portal_users(id),
    field_name VARCHAR(100) NOT NULL,
    tab VARCHAR(50) NOT NULL,
    disputed_value TEXT,            -- what the platform currently shows
    correct_value TEXT,             -- what company claims is correct
    evidence_type VARCHAR(50),      -- 'document' | 'url' | 'text'
    evidence_url TEXT,              -- URL to supporting document
    evidence_text TEXT,             -- text explanation
    evidence_file_path TEXT,        -- uploaded file path in Supabase Storage
    status VARCHAR(30) DEFAULT 'pending',  -- pending | reviewed | accepted | rejected
    reviewed_by VARCHAR(100),       -- analyst who reviewed
    review_notes TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON company_data_disputes(company_id, status);

-- Expert profiles
CREATE TABLE IF NOT EXISTS expert_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(100) NOT NULL UNIQUE,  -- maps to auth user
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    domains TEXT[] NOT NULL,         -- sector domains expert covers
    credentials TEXT,
    linkedin_url VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expert roadmap validations
CREATE TABLE IF NOT EXISTS roadmap_expert_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roadmap_id UUID NOT NULL REFERENCES company_roadmaps(id) ON DELETE CASCADE,
    expert_id UUID NOT NULL REFERENCES expert_profiles(id),
    company_id UUID NOT NULL REFERENCES companies(id),
    status VARCHAR(30) DEFAULT 'pending',  -- pending | in_review | complete
    
    -- Phase-level validation
    phase_validations JSONB DEFAULT '[]',  
    -- [{phase_number, validated: bool, comment, suggested_changes: []}]
    
    -- Expert additions
    expert_additions JSONB DEFAULT '[]',
    -- [{type: 'milestone'|'initiative'|'resource'|'risk', content: {}, rationale: str}]
    
    -- Overall review
    overall_verdict VARCHAR(30),  -- 'approved' | 'approved_with_changes' | 'needs_revision'
    overall_comment TEXT,
    confidence_score INTEGER CHECK (confidence_score BETWEEN 1 AND 10),
    
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX ON roadmap_expert_reviews(roadmap_id);
CREATE INDEX ON roadmap_expert_reviews(expert_id);

-- Intelligence Jobs
CREATE TABLE IF NOT EXISTS intelligence_jobs (
    id UUID PRIMARY KEY,
    region_label VARCHAR(200),
    filename VARCHAR(255),
    total_companies INTEGER,
    status VARCHAR(30) DEFAULT 'processing',
    raw_data JSONB DEFAULT '[]',
    sector_distribution JSONB,
    size_distribution JSONB,
    geo_distribution JSONB,
    ecosystem_gaps JSONB,
    competitor_clusters JSONB,
    opportunities JSONB,
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

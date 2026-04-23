-- BuildForX Automation Needs Engine - Database Schema
-- Adds CEED analysis, automation needs, PRDs, and submission tracking

-- CEED Analysis Table
CREATE TABLE IF NOT EXISTS ceed_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    sector_id UUID REFERENCES sectors(id) ON DELETE CASCADE,
    
    -- Quadrant Scores (0-100)
    core_score INTEGER DEFAULT 0,
    expansion_score INTEGER DEFAULT 0,
    efficiency_score INTEGER DEFAULT 0,
    disruption_score INTEGER DEFAULT 0,
    
    primary_quadrant VARCHAR(20) NOT NULL,
    secondary_quadrant VARCHAR(20),
    
    -- Detailed assessment (JSON arrays/objects)
    core_assessment JSONB DEFAULT '{}',
    expansion_assessment JSONB DEFAULT '{}',
    efficiency_assessment JSONB DEFAULT '{}',
    disruption_assessment JSONB DEFAULT '{}',
    
    automation_readiness_score INTEGER DEFAULT 0,
    automation_priority_level VARCHAR(20) DEFAULT 'low', -- critical, high, medium, low
    estimated_automation_roi NUMERIC(5, 2) DEFAULT 0,
    
    confidence_score NUMERIC(4, 3) DEFAULT 0,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sector Automation Needs Repository
CREATE TABLE IF NOT EXISTS sector_automation_needs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sector_id UUID REFERENCES sectors(id) ON DELETE CASCADE,
    regional_context_id UUID NULL, -- Optional link to regional intel
    
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    
    automation_type VARCHAR(50) NOT NULL, -- process_automation, predictive_analytics, etc.
    ceed_quadrant VARCHAR(20) NOT NULL, -- core, expansion, efficiency, disruption
    
    impact_level VARCHAR(20) NOT NULL, -- transformative, high, medium, incremental
    estimated_roi_percentage INTEGER DEFAULT 0,
    implementation_complexity VARCHAR(20) DEFAULT 'medium', -- low, medium, high, very_high
    time_to_value_weeks INTEGER DEFAULT 0,
    
    target_company_size JSONB DEFAULT '[]', -- ["Small", "Medium"]
    target_employee_range VARCHAR(50),
    target_revenue_range VARCHAR(50),
    prerequisite_tech_maturity TEXT,
    
    tech_stack_suggested JSONB DEFAULT '{}',
    data_requirements JSONB DEFAULT '{}',
    research_citations JSONB DEFAULT '[]',
    industry_benchmarks JSONB DEFAULT '{}',
    
    status VARCHAR(20) DEFAULT 'draft', -- draft, research, validated, published, archived
    is_featured BOOLEAN DEFAULT false,
    priority_rank INTEGER DEFAULT 0,
    tags JSONB DEFAULT '[]',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Automation Interests
CREATE TABLE IF NOT EXISTS company_automation_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    automation_need_id UUID REFERENCES sector_automation_needs(id) ON DELETE CASCADE,
    
    status VARCHAR(20) DEFAULT 'interested', -- interested, context_added, ice_review, approved, rejected
    
    -- Company-specific context
    current_pain_points JSONB DEFAULT '[]',
    current_process_description TEXT,
    desired_outcomes JSONB DEFAULT '[]',
    budget_range VARCHAR(50),
    timeline_preference VARCHAR(50),
    
    existing_systems JSONB DEFAULT '{}',
    data_availability JSONB DEFAULT '{}',
    constraints JSONB DEFAULT '[]',
    success_metrics JSONB DEFAULT '{}',
    
    -- Point of Contact
    poc_name VARCHAR(255),
    poc_email VARCHAR(255),
    poc_phone VARCHAR(50),
    poc_designation VARCHAR(255),
    
    additional_context TEXT,
    
    -- Approval
    ice_approval_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, revision_requested
    ice_comments TEXT,
    
    interested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    context_added_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BuildForX PRD Table
CREATE TABLE IF NOT EXISTS buildforx_prds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_automation_interest_id UUID REFERENCES company_automation_interests(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    automation_need_id UUID REFERENCES sector_automation_needs(id) ON DELETE CASCADE,
    sector_id UUID REFERENCES sectors(id) ON DELETE CASCADE,
    
    prd_code VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    
    executive_summary TEXT,
    problem_statement JSONB DEFAULT '{}',
    objectives JSONB DEFAULT '[]',
    scope JSONB DEFAULT '{}',
    
    functional_requirements JSONB DEFAULT '[]',
    non_functional_requirements JSONB DEFAULT '[]',
    technical_specifications JSONB DEFAULT '{}',
    user_stories JSONB DEFAULT '[]',
    
    success_metrics JSONB DEFAULT '{}',
    timeline_milestones JSONB DEFAULT '[]',
    evaluation_criteria JSONB DEFAULT '{}',
    resources_provided JSONB DEFAULT '{}',
    constraints_guidelines JSONB DEFAULT '{}',
    
    competition_type VARCHAR(50) DEFAULT 'makeathon', -- ideation, makeathon, gig, pre_incubation
    trl_level_expected VARCHAR(50) DEFAULT 'TRL 3-4',
    prize_pool JSONB DEFAULT '{}',
    program_id UUID NULL,
    
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, open, evaluating, closed
    version INTEGER DEFAULT 1,
    
    submission_deadline TIMESTAMP WITH TIME ZONE,
    evaluation_start_date TIMESTAMP WITH TIME ZONE,
    results_announcement_date TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Submissions
CREATE TABLE IF NOT EXISTS student_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prd_id UUID REFERENCES buildforx_prds(id) ON DELETE CASCADE,
    student_id UUID NULL, -- To be linked with student talent pool
    team_id UUID NULL,
    
    submission_code VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    
    executive_summary TEXT,
    solution_approach JSONB DEFAULT '{}',
    technical_implementation JSONB DEFAULT '{}',
    demo_links JSONB DEFAULT '{}',
    repository_links JSONB DEFAULT '{}',
    deliverables JSONB DEFAULT '[]',
    requirements_coverage JSONB DEFAULT '[]',
    self_assessment JSONB DEFAULT '{}',
    business_viability JSONB DEFAULT '{}',
    
    status VARCHAR(20) DEFAULT 'submitted', -- submitted, under_review, shortlisted, won, rejected
    preliminary_score NUMERIC(5, 2),
    final_score NUMERIC(5, 2),
    rank INTEGER,
    
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company Evaluations
CREATE TABLE IF NOT EXISTS company_evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES student_submissions(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    score_breakdown JSONB DEFAULT '{}',
    overall_score NUMERIC(5, 2),
    comments TEXT,
    
    interest_in_pilot BOOLEAN DEFAULT false,
    pilot_rationale TEXT,
    
    evaluated_by VARCHAR(255),
    evaluated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX idx_ceed_analysis_company ON ceed_analysis(company_id);
CREATE INDEX idx_ceed_analysis_quadrant ON ceed_analysis(primary_quadrant);
CREATE INDEX idx_automation_needs_sector ON sector_automation_needs(sector_id);
CREATE INDEX idx_automation_needs_quadrant ON sector_automation_needs(ceed_quadrant);
CREATE INDEX idx_automation_interest_company ON company_automation_interests(company_id);
CREATE INDEX idx_automation_interest_status ON company_automation_interests(status);
CREATE INDEX idx_buildforx_prd_company ON buildforx_prds(company_id);
CREATE INDEX idx_buildforx_prd_status ON buildforx_prds(status);
CREATE INDEX idx_submissions_prd ON student_submissions(prd_id);
CREATE INDEX idx_evaluations_submission ON company_evaluations(submission_id);

-- RPC for sector quadrant distribution
CREATE OR REPLACE FUNCTION get_sector_quadrant_distribution(p_sector_id UUID)
RETURNS TABLE (quadrant VARCHAR, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT primary_quadrant as quadrant, COUNT(*) as count
    FROM ceed_analysis
    WHERE sector_id = p_sector_id
    GROUP BY primary_quadrant;
END;
$$ LANGUAGE plpgsql;

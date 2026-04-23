-- MSME Intelligence Platform - Database Schema
-- PostgreSQL + pgvector

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Sectors table
CREATE TABLE sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    primary_sector_id UUID REFERENCES sectors(id),
    stage VARCHAR(50), -- seed, early, growth, mature
    website VARCHAR(255),
    description TEXT,
    founded_year INTEGER,
    employee_count INTEGER,
    headquarters_location VARCHAR(255),
    funnel_stage VARCHAR(50) DEFAULT 'lead', -- lead, screened, financial_review, gap_analysis, roadmap
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company financials
CREATE TABLE company_financials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    fiscal_year INTEGER NOT NULL,
    revenue_inr_lakhs DECIMAL(15, 2),
    profit_inr_lakhs DECIMAL(15, 2),
    funding_raised_inr_lakhs DECIMAL(15, 2),
    valuation_inr_cr DECIMAL(15, 2),
    -- New Detailed Financials
    cagr DECIMAL(5, 2),
    ebitda_margin DECIMAL(5, 2),
    net_profit_margin DECIMAL(5, 2),
    balance_sheet_summary JSONB, -- { "assets": ..., "liabilities": ..., "equity": ... }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, fiscal_year)
);

-- Company leadership
CREATE TABLE company_leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    bio TEXT,
    linkedin_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gap analysis results
CREATE TABLE gap_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- RAG classification
    rag_score VARCHAR(10) CHECK (rag_score IN ('green', 'amber', 'red')),
    overall_potential_score INTEGER CHECK (overall_potential_score BETWEEN 0 AND 100),
    confidence_level VARCHAR(20) CHECK (confidence_level IN ('high', 'medium', 'low')),
    screening_classification VARCHAR(50), -- stretched_fit, best_fit, best_bet, rejected
    
    -- 6 Verticals (0-100 scores)
    hr_talent_score INTEGER CHECK (hr_talent_score BETWEEN 0 AND 100),
    marketing_sales_score INTEGER CHECK (marketing_sales_score BETWEEN 0 AND 100),
    operations_score INTEGER CHECK (operations_score BETWEEN 0 AND 100),
    finance_score INTEGER CHECK (finance_score BETWEEN 0 AND 100),
    ip_innovation_score INTEGER CHECK (ip_innovation_score BETWEEN 0 AND 100),
    strategy_score INTEGER CHECK (strategy_score BETWEEN 0 AND 100),
    
    -- 9 Dimensions (0-100 scores)
    access_to_market_score INTEGER CHECK (access_to_market_score BETWEEN 0 AND 100),
    access_to_finance_score INTEGER CHECK (access_to_finance_score BETWEEN 0 AND 100),
    succession_gap_score INTEGER CHECK (succession_gap_score BETWEEN 0 AND 100),
    leadership_appetite_score INTEGER CHECK (leadership_appetite_score BETWEEN 0 AND 100),
    market_saturation_score INTEGER CHECK (market_saturation_score BETWEEN 0 AND 100),
    innovation_gap_score INTEGER CHECK (innovation_gap_score BETWEEN 0 AND 100),
    market_breakthrough_score INTEGER CHECK (market_breakthrough_score BETWEEN 0 AND 100),
    systems_processes_score INTEGER CHECK (systems_processes_score BETWEEN 0 AND 100),
    ip_creation_score INTEGER CHECK (ip_creation_score BETWEEN 0 AND 100),
    
    -- Additional scores
    financial_health_score INTEGER CHECK (financial_health_score BETWEEN 0 AND 100),
    market_opportunity_score INTEGER CHECK (market_opportunity_score BETWEEN 0 AND 100),
    
    -- Insights (JSON arrays)
    key_strengths JSONB,
    critical_gaps JSONB,
    top_opportunities JSONB,
    priority_actions JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company roadmaps
CREATE TABLE company_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    gap_analysis_id UUID REFERENCES gap_analysis(id),
    title VARCHAR(255) NOT NULL,
    executive_summary TEXT,
    frameworks JSONB, -- ["ExO", "OKR", ...]
    phases JSONB, -- Full roadmap structure
    gtm_strategy JSONB,
    resource_requirements JSONB,
    expected_outcomes JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sector thesis documents
CREATE TABLE sector_thesis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sector_id UUID REFERENCES sectors(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sector thesis vectors for semantic search
CREATE TABLE sector_thesis_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thesis_id UUID REFERENCES sector_thesis(id) ON DELETE CASCADE,
    chunk_text TEXT NOT NULL,
    embedding vector(1536), -- OpenAI text-embedding-3-small dimension
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ecosystem services
CREATE TABLE ecosystem_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- consulting, funding, technology, talent, etc.
    description TEXT,
    website VARCHAR(255),
    contact_email VARCHAR(255),
    service_tags JSONB, -- ["hr", "finance", "marketing", ...]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thesis Analysis (Screening Layer)
CREATE TABLE thesis_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    thesis_id UUID REFERENCES sector_thesis(id),
    alignment_score INTEGER CHECK (alignment_score BETWEEN 0 AND 100),
    proof_points TEXT, -- markdown list of proofs found in company data
    source_data VARCHAR(100), -- 'traxn', 'mca', 'website', 'manual'
    status VARCHAR(50), -- 'analyzed', 'pending', 'failed'
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Company-Service matches
CREATE TABLE company_service_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    service_id UUID REFERENCES ecosystem_services(id) ON DELETE CASCADE,
    gap_analysis_id UUID REFERENCES gap_analysis(id),
    relevance_score DECIMAL(5, 2) CHECK (relevance_score BETWEEN 0 AND 100),
    matching_rationale TEXT,
    status VARCHAR(50) DEFAULT 'suggested', -- suggested, contacted, engaged, completed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_companies_sector ON companies(primary_sector_id);
CREATE INDEX idx_companies_stage ON companies(stage);
CREATE INDEX idx_gap_analysis_company ON gap_analysis(company_id);
CREATE INDEX idx_gap_analysis_rag ON gap_analysis(rag_score);
CREATE INDEX idx_roadmaps_company ON company_roadmaps(company_id);
CREATE INDEX idx_thesis_vectors_embedding ON sector_thesis_vectors USING ivfflat (embedding vector_cosine_ops);

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_sector_thesis(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  sector_filter uuid
)
RETURNS TABLE (
  id uuid,
  chunk_text text,
  similarity float
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    stv.id,
    stv.chunk_text,
    1 - (stv.embedding <=> query_embedding) as similarity
  FROM sector_thesis_vectors stv
  JOIN sector_thesis st ON stv.thesis_id = st.id
  WHERE st.sector_id = sector_filter
    AND 1 - (stv.embedding <=> query_embedding) > match_threshold
  ORDER BY stv.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Insert sample sectors
INSERT INTO sectors (name, description) VALUES
('Technology', 'Software, SaaS, IT services'),
('Manufacturing', 'Industrial production, engineering'),
('Healthcare', 'Medical devices, health tech, pharma'),
('Education', 'EdTech, training, skill development'),
('Agriculture', 'AgriTech, food processing'),
('Financial Services', 'FinTech, banking, insurance');

export type CitationSourceType = 'report' | 'news' | 'government' | 'academic' | 'industry' | 'data_aggregator' | 'education';

export interface Citation {
    id: string;
    citation_key: string;
    citation_number: number;
    source_type: CitationSourceType;
    source_name: string;
    author?: string;
    publication_year: number;
    publication_date?: string;
    title: string;
    url: string;
    reliability_score: number;
    excerpt?: string;
    tags?: string[];
    geographic_focus?: string[];
}

export interface SectorThesis {
    id: string;
    display_name: string;
    status: 'draft' | 'published' | 'archived';
    research_date: string;

    // Content with inline citations
    executive_summary: string;
    investment_thesis: string;
    key_findings: string[];

    market_stats: {
        current_size: number;
        current_size_display: string;
        forecast_size: number;
        forecast_size_display: string;
        cagr: number;
        forecast_year: number;
        currency: string;
    };

    market_structure: {
        total_companies: number;
        msme_percentage: number;
        organized_split: { organized: number; unorganized: number };
        geographic_distribution: Record<string, number>;
    };

    market_segments: string[]; // Legacy simple list

    sub_sectors: {
        name: string;
        description: string;
        market_size: number;
        cagr: number;
        growth_drivers: string[];
        key_players: string[];
        msme_opportunity_score: number;
        citation_ids?: string[];
    }[];

    growth_drivers: {
        name: string;
        type: 'policy' | 'market' | 'technology' | 'demand_side' | 'supply_side' | 'competitive_advantage' | 'infrastructure';
        impact_level: 'high' | 'medium' | 'low';
        description: string;
        estimated_impact_percentage?: number;
        citation_ids?: string[];
    }[];

    opportunities: {
        title: string;
        type: 'manufacturing' | 'service' | 'trading' | 'product';
        description: string;
        market_size_estimate: number;     // e.g. in Cr
        overall_score: number;            // 1-10
        capital_requirement: string;      // "10-50L"
        time_to_market_months: number;
        citation_ids?: string[];
    }[];

    policies: {
        name: string;
        type: string;
        description: string;
        impact: 'High' | 'Medium' | 'Low';
        status: 'active' | 'expired' | 'upcoming';
        citation_ids?: string[];
    }[];

    risks: {
        name: string;
        category: 'policy' | 'market' | 'technology' | 'financial' | 'capability';
        severity: 'high' | 'medium' | 'low';
        probability: number; // 0-1
        description: string;
        mitigation?: string[];
        citation_ids?: string[];
    }[];

    competitors: {
        name: string;
        type: 'startup' | 'listed' | 'private_sector' | 'psu' | 'public_sector';
        revenue: number; // Cr
        market_share: number; // %
        key_strengths: string[];
        citation_ids?: string[];
    }[];

    market_stats_history: {
        year: number;
        market_size: number;
        growth_rate: number;
        citation_ids?: string[];
    }[];

    // New: List of all citations used in this thesis
    citations?: Citation[];

    // New: Featured companies for tagging
    emerging_companies?: {
        id: string;
        name: string;
        description?: string;
    }[];

    // Regional context for sector-specific regional intelligence
    region?: string;

    // Infrastructure metrics
    quality_infrastructure?: {
        nabl_labs: string[];
        calibration_services?: string;
        cfcs?: string[];
        gaps?: string[];
    };

    training_infrastructure?: {
        premier_institutions: string[];
        siemens_coe_vnit?: {
            investment: string | number;
            labs: number;
            coverage: string[];
        };
        vedic_training_centre?: string;
        itis?: string[];
        cnc_training_providers?: string[];
    };

    industry_associations?: {
        name: string;
        founded?: number;
        members?: string | number;
        affiliations?: string[];
        role: string;
    }[];
}

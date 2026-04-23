export type RoadmapFramework = 'ExO' | 'OKR' | 'Lean Startup' | 'Blue Ocean Strategy';

export interface RoadmapInitiative {
    name: string;
    description: string;
    owner: string;
    timeline: string;
    deliverables: string[];
}

export interface RoadmapPhase {
    phase_number: number;
    phase_name: string;
    objectives: string[];
    initiatives: RoadmapInitiative[];
    milestones: string[];
    success_metrics: string[];
}

export interface GTMStrategy {
    target_segments: string[];
    distribution_channels: string[];
    pricing_strategy: string;
    marketing_tactics: string[];
}

export interface Roadmap {
    id?: string;
    company_id: string;
    gap_analysis_id?: string;
    created_at?: string;
    title: string;
    executive_summary: string;
    frameworks: string[];
    framework?: string; // single framework alias for demo compat
    duration_months: number;
    phases: RoadmapPhase[];
    // Flattened milestones for demo compat
    milestones?: Array<{
        id: string;
        title: string;
        description: string;
        target_month: number;
        priority: 'critical' | 'high' | 'medium' | 'low';
        estimated_cost?: number;
        dependencies?: string[];
        success_metrics: string[];
    }>;
    gtm_strategy: GTMStrategy;
    resource_requirements: {
        budget_inr_lakhs: number;
        team: Array<{ role: string; when: string }>;
        technology: string[];
        // compat aliases
        financial?: string;
        human?: string;
        technological?: string;
    };
    expected_outcomes: {
        metrics: { revenue_target_inr_cr?: number; customer_target?: number; market_share_target_pct?: number };
        success_criteria: string[];
    };
    strategic_objectives?: string[]; // alias for phase objectives
    risks?: string[];
}

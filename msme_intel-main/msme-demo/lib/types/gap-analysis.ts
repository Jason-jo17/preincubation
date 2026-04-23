export type RAGScore = 'red' | 'amber' | 'green';

export interface VerticalAnalysis {
    vertical_name: string;
    score: number;
    strengths: string[];
    gaps: string[];
    opportunities: string[];
}

export interface DimensionScore {
    dimension_name: string;
    score: number;
    rag_status: RAGScore;
    description: string;
}

export interface GapAnalysis {
    id?: string;
    company_id: string;
    analysis_date?: string;
    created_at?: string;
    // Flat scores (from DB)
    rag_score: RAGScore;
    overall_potential_score: number;
    overall_score: number; // alias for overall_potential_score
    confidence_level: 'high' | 'medium' | 'low';
    // Vertical flat scores
    hr_talent_score: number;
    marketing_sales_score: number;
    operations_score: number;
    finance_score: number;
    ip_innovation_score: number;
    strategy_score: number;
    // Nested structures (normalized)
    vertical_analyses: VerticalAnalysis[];
    dimension_scores: DimensionScore[];
    rag_distribution: { red: number; amber: number; green: number };
    // Insights
    key_strengths: string[];
    critical_gaps: string[];
    top_opportunities: string[];
    priority_actions: string[];
    recommendations: string[]; // alias for priority_actions
}

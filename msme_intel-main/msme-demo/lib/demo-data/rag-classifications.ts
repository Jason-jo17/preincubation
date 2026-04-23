
export const DEMO_RAG_RESULTS = {
    'comp-001': {
        rag_status: 'green',
        rag_category: 'best_bet',
        confidence_score: 0.92,
        reasoning: "Exceptional alignment with sector thesis and strong financial health (35% growth). PLI eligibility provides clear competitive advantage.",
        recommendation: "Prioritize for immediate investment / lending. Focus on PLI application support."
    },
    'comp-002': {
        rag_status: 'amber',
        rag_category: 'best_fit',
        confidence_score: 0.85,
        reasoning: "Strong fundamentals but heavy reliance on ICE market creates medium-term risk. EV transition plan is critical.",
        recommendation: "Proceed with conditional approval linked to EV roadmap milestones."
    },
    'comp-011': {
        rag_status: 'green',
        rag_category: 'best_bet',
        confidence_score: 0.88,
        reasoning: "High-growth potential in digital payments. Current losses are typical for stage; unit economics are positive.",
        recommendation: "Strategic investment recommended. Verify CAC assumptions."
    },
};

export function getDemoRAG(companyId: string) {
    const defaultRes = {
        rag_status: 'amber',
        rag_category: 'best_fit',
        confidence_score: 0.75 + Math.random() * 0.15,
        reasoning: "Balanced profile with some execution risks identified. Market opportunity is verified.",
        recommendation: "Proceed with standard due diligence."
    };
    return DEMO_RAG_RESULTS[companyId as keyof typeof DEMO_RAG_RESULTS] || defaultRes;
}

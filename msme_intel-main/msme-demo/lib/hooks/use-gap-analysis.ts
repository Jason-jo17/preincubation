'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGapAnalysis, runGapAnalysis } from '@/lib/api/gap-analysis';
import { isDemoMode } from '@/lib/config';
import { DEMO_GAP_ANALYSES } from '@/lib/demo-data/gap-analyses';

export function useGapAnalysis(companyId: string) {
    return useQuery({
        queryKey: ['gap-analysis', companyId],
        queryFn: async () => {
            if (isDemoMode) {
                // Return demo data — normalize to canonical GapAnalysis type
                const raw = DEMO_GAP_ANALYSES[companyId as keyof typeof DEMO_GAP_ANALYSES];
                if (!raw) return null;
                return {
                    id: `demo-ga-${companyId}`,
                    company_id: companyId,
                    analysis_date: new Date().toISOString(),
                    rag_score: raw.rag_distribution.red > raw.rag_distribution.green ? 'red' :
                               raw.rag_distribution.green > 3 ? 'green' : 'amber',
                    overall_potential_score: raw.overall_score,
                    overall_score: raw.overall_score,
                    confidence_level: 'high',
                    hr_talent_score: raw.talent_pool_score ?? 70,
                    marketing_sales_score: raw.brand_identity_score ?? 60,
                    operations_score: raw.business_maturity_score ?? 70,
                    finance_score: raw.market_opportunity_score ?? 75,
                    ip_innovation_score: raw.innovation_differentiator_score ?? 65,
                    strategy_score: raw.founder_quality_score ?? 80,
                    vertical_analyses: raw.vertical_analyses ?? [],
                    dimension_scores: [],
                    rag_distribution: raw.rag_distribution,
                    key_strengths: raw.key_strengths ?? [],
                    critical_gaps: raw.top_opportunities ?? [],
                    top_opportunities: raw.top_opportunities ?? [],
                    priority_actions: [],
                    recommendations: [],
                };
            }
            return getGapAnalysis(companyId);
        },
        enabled: !!companyId,
    });
}

export function useRunGapAnalysis() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (companyId: string) => {
            if (isDemoMode) {
                return DEMO_GAP_ANALYSES[companyId as keyof typeof DEMO_GAP_ANALYSES] as any;
            }
            return runGapAnalysis(companyId);
        },
        onSuccess: (_, companyId) => {
            queryClient.invalidateQueries({ queryKey: ['gap-analysis', companyId] });
        },
    });
}

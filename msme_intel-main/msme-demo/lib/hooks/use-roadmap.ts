'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoadmap, generateRoadmap } from '@/lib/api/roadmaps';
import { isDemoMode } from '@/lib/config';
import { DEMO_ROADMAPS } from '@/lib/demo-data/roadmaps';

export function useRoadmap(companyId: string) {
    return useQuery({
        queryKey: ['roadmap', companyId],
        queryFn: async () => {
            if (isDemoMode) {
                const raw = DEMO_ROADMAPS[companyId as keyof typeof DEMO_ROADMAPS];
                if (!raw) return null;
                return {
                    id: `demo-rm-${companyId}`,
                    company_id: companyId,
                    title: `6-Month Growth Roadmap`,
                    executive_summary: 'AI-generated strategic roadmap based on gap analysis.',
                    frameworks: ['ExO', 'OKR'],
                    framework: 'ExO',
                    duration_months: 6,
                    phases: [],
                    milestones: raw.milestones ?? [],
                    gtm_strategy: { target_segments: [], distribution_channels: [], pricing_strategy: '', marketing_tactics: [] },
                    resource_requirements: {
                        budget_inr_lakhs: raw.investment_lakhs ?? 25,
                        team: [],
                        technology: [],
                        financial: `₹${raw.investment_lakhs ?? 25}L`,
                        human: 'TBD',
                        technological: 'TBD'
                    },
                    expected_outcomes: {
                        metrics: { revenue_target_inr_cr: raw.net_benefit_lakhs ? raw.net_benefit_lakhs / 100 : 1 },
                        success_criteria: [`${raw.roi ?? 200}% ROI in ${raw.payback_months ?? 12} months`]
                    },
                    strategic_objectives: [],
                    risks: [],
                };
            }
            return getRoadmap(companyId);
        },
        enabled: !!companyId,
    });
}

export function useGenerateRoadmap() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (companyId: string) => {
            if (isDemoMode) {
                return DEMO_ROADMAPS[companyId as keyof typeof DEMO_ROADMAPS] as any;
            }
            return generateRoadmap(companyId);
        },
        onSuccess: (_, companyId) => {
            queryClient.invalidateQueries({ queryKey: ['roadmap', companyId] });
        },
    });
}

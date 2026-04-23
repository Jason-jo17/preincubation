'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGapAnalysis, runGapAnalysis } from '@/lib/api/gap-analysis';

export function useGapAnalysis(companyId: string) {
    return useQuery({
        queryKey: ['gap-analysis', companyId],
        queryFn: () => getGapAnalysis(companyId),
        enabled: !!companyId,
    });
}

export function useRunGapAnalysis() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (companyId: string) => runGapAnalysis(companyId),
        onSuccess: (data, companyId) => {
            queryClient.invalidateQueries({ queryKey: ['gap-analysis', companyId] });
        },
    });
}

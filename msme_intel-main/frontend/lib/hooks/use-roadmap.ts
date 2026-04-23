'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoadmap, generateRoadmap } from '@/lib/api/roadmaps';

export function useRoadmap(companyId: string) {
    return useQuery({
        queryKey: ['roadmap', companyId],
        queryFn: () => getRoadmap(companyId),
        enabled: !!companyId,
    });
}

export function useGenerateRoadmap() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (companyId: string) => generateRoadmap(companyId),
        onSuccess: (data, companyId) => {
            queryClient.invalidateQueries({ queryKey: ['roadmap', companyId] });
        },
    });
}

import { apiClient } from './client';
import { GapAnalysis } from '@/lib/types/gap-analysis';

export async function getGapAnalysis(companyId: string): Promise<GapAnalysis> {
    return apiClient<GapAnalysis>(`/api/companies/${companyId}/gap-analysis`);
}

export async function runGapAnalysis(companyId: string): Promise<GapAnalysis> {
    return apiClient<GapAnalysis>(`/api/companies/${companyId}/gap-analysis/run`, {
        method: 'POST',
    });
}

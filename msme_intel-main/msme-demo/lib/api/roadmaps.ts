import { apiClient } from './client';
import { Roadmap } from '@/lib/types/roadmap';

export async function getRoadmap(companyId: string): Promise<Roadmap> {
    return apiClient<Roadmap>(`/api/companies/${companyId}/roadmap`);
}

export async function generateRoadmap(companyId: string): Promise<Roadmap> {
    return apiClient<Roadmap>(`/api/companies/${companyId}/roadmap/generate`, {
        method: 'POST',
    });
}

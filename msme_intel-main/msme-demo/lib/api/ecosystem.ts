import { apiClient } from './client';

export interface EcosystemProvider {
    id: string;
    name: string;
    service_type: string;
    description: string;
    match_score: number;
    website: string;
    contact_email: string;
}

export async function getEcosystemMatches(companyId: string): Promise<EcosystemProvider[]> {
    return apiClient<EcosystemProvider[]>(`/api/companies/${companyId}/ecosystem-matches`);
}

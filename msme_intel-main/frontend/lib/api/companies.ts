import { apiClient } from './client';
import { Company } from '@/lib/types/company';

export async function getCompanies(filters?: {
    sector?: string;
    stage?: string;
    search?: string;
}): Promise<Company[]> {
    const params = new URLSearchParams();
    if (filters?.sector) params.append('sector', filters.sector);
    if (filters?.stage) params.append('stage', filters.stage);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    return apiClient<Company[]>(`/api/companies${queryString ? `?${queryString}` : ''}`);
}

export async function getCompany(id: string): Promise<Company> {
    return apiClient<Company>(`/api/companies/${id}`);
}

export async function createCompany(data: Partial<Company>): Promise<Company> {
    return apiClient<Company>('/api/companies', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    return apiClient<Company>(`/api/companies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

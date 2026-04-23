import { apiClient } from './client';

export interface SearchResult {
    id: string;
    title: string;
    content: string;
    type: 'company' | 'insight' | 'market_data';
    score: number;
}

export async function searchPlatform(query: string): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query });
    return apiClient<SearchResult[]>(`/api/search?${params.toString()}`);
}

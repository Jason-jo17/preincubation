'use client';

import { useQuery } from '@tanstack/react-query';
import { searchPlatform } from '@/lib/api/search';
import { useState } from 'react';
import { useDebounce } from './use-debounce';
import { isDemoMode } from '@/lib/config';
import { searchKnowledgeBase } from '@/lib/demo-data/search-index';

export function useSearch(initialQuery: string = '') {
    const [query, setQuery] = useState(initialQuery);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: async () => {
            if (isDemoMode) {
                // In demo, we search the local knowledge base
                const result = searchKnowledgeBase(debouncedQuery);
                return result ? [result] : [];
            }
            return searchPlatform(debouncedQuery);
        },
        enabled: debouncedQuery.length > 2,
    });

    return {
        query,
        setQuery,
        results: data,
        isLoading,
        error,
    };
}

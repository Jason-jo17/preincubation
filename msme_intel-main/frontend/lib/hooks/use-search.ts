'use client';

import { useQuery } from '@tanstack/react-query';
import { searchPlatform } from '@/lib/api/search';
import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce'; // We'll implement this too

export function useSearch(initialQuery: string = '') {
    const [query, setQuery] = useState(initialQuery);
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchPlatform(debouncedQuery),
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

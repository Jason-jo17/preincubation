'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCompanies, getCompany, createCompany, updateCompany } from '@/lib/api/companies';
import { Company } from '@/lib/types/company';

export function useCompanies(filters?: {
    sector?: string;
    stage?: string;
    search?: string;
}) {
    return useQuery({
        queryKey: ['companies', filters],
        queryFn: () => getCompanies(filters),
    });
}

export function useCompany(id: string) {
    return useQuery({
        queryKey: ['companies', id],
        queryFn: () => getCompany(id),
        enabled: !!id,
    });
}

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<Company>) => createCompany(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
}

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Company> }) =>
            updateCompany(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['companies', data.id] });
        },
    });
}

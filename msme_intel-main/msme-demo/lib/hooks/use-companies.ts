'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCompanies, getCompany, createCompany, updateCompany } from '@/lib/api/companies';
import { Company } from '@/lib/types/company';
import { isDemoMode } from '@/lib/config';
import { getCompaniesByFilter, getCompanyById } from '@/lib/demo-data/companies';
import { getUUID } from '@/lib/id-mapper';

export function useCompanies(filters?: {
    sector?: string;
    stage?: string;
    region?: string;
    search?: string;
}) {
    return useQuery({
        queryKey: ['companies', filters],
        queryFn: async () => {
            if (isDemoMode) {
                return getCompaniesByFilter(filters || {});
            }
            return getCompanies(filters);
        },
    });
}

export function useCompany(id: string) {
    return useQuery({
        queryKey: ['companies', id],
        queryFn: async () => {
            if (isDemoMode) {
                const company = getCompanyById(id);
                if (!company) throw new Error('Company not found');
                return company;
            }
            // Translate Demo ID to Database UUID if needed
            const dbId = getUUID(id);
            return getCompany(dbId);
        },
        enabled: !!id,
    });
}

export function useCreateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<Company>) => {
            if (isDemoMode) {
                return { id: `demo-${Date.now()}`, ...data } as Company;
            }
            return createCompany(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        },
    });
}

export function useUpdateCompany() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Company> }) => {
            if (isDemoMode) {
                return { id, ...data } as Company;
            }
            return updateCompany(id, data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['companies', data.id] });
        },
    });
}

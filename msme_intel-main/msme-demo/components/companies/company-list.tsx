'use client';

import { Company } from '@/lib/types/company';
import { CompanyCard } from './company-card';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { EmptyState } from '@/components/shared/empty-state';
import { Building2 } from 'lucide-react';

interface CompanyListProps {
    companies?: Company[];
    isLoading: boolean;
}

export function CompanyList({ companies, isLoading }: CompanyListProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <LoadingSkeleton count={6} />
            </div>
        );
    }

    if (!companies || companies.length === 0) {
        return (
            <EmptyState
                icon={Building2}
                title="No companies found"
                description="Get started by adding your first company or adjusting your filters."
            />
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
            ))}
        </div>
    );
}

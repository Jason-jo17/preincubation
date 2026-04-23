'use client';

import { useState } from 'react';
import { useCompanies } from '@/lib/hooks/use-companies';
import { isDemoMode } from '@/lib/config';
import { CompanyList } from '@/components/companies/company-list';
import { CompanyFilters } from '@/components/companies/company-filters';
import { PageHeader } from '@/components/shared/page-header';

export default function CompaniesPage() {
    const [filters, setFilters] = useState<any>({
        sector: undefined,
        stage: undefined,
        region: undefined,
        search: '',
    });

    const { data: companies = [], isLoading } = useCompanies(filters);

    return (
        <div className="space-y-6 page-transition">
            <PageHeader
                title="Companies"
                description={isDemoMode ? "Explore our expanded portfolio of 40+ MSME companies across key industrial sectors." : "Manage and analyze your MSME portfolio."}
            />

            <CompanyFilters filters={filters} onFiltersChange={setFilters} />

            <CompanyList companies={companies} isLoading={isLoading} />
        </div>
    );
}

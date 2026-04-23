'use client';

import { useState } from 'react';
import { useCompanies } from '@/lib/hooks/use-companies';
import { CompanyList } from '@/components/companies/company-list';
import { CompanyFilters } from '@/components/companies/company-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';

export default function CompaniesPage() {
    const [filters, setFilters] = useState({
        sector: null,
        stage: null,
        search: '',
    });

    const { data: companies, isLoading } = useCompanies(filters as any);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Companies"
                description="Manage and analyze your portfolio of MSME companies."
                action={
                    <Link href="/companies/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Company
                        </Button>
                    </Link>
                }
            />

            <CompanyFilters filters={filters} onFiltersChange={setFilters} />

            <CompanyList companies={companies} isLoading={isLoading} />
        </div>
    );
}

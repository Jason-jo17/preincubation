'use client';

import { PageHeader } from '@/components/shared/page-header';
import { CategoryCard } from '@/components/ecosystem/category-card';
import { AddPartnerModal } from '@/components/ecosystem/add-partner-modal';
import { getEcosystemCategories } from '@/lib/demo-data/ecosystem-providers';
import { useEcosystemStore } from '@/lib/hooks/use-ecosystem';

import { EcosystemStats } from '@/components/ecosystem/ecosystem-stats';
import { FundingOpportunities } from '@/components/ecosystem/funding-opportunities';

export default function EcosystemPage() {
    const { activeEcosystem } = useEcosystemStore();
    const categories = getEcosystemCategories(activeEcosystem);

    return (
        <div className="space-y-8">
            <PageHeader
                title={`${activeEcosystem === 'maharashtra' ? 'Maharashtra' : 'National'} Ecosystem`}
                description="Connect with trusted service providers, access funding, and explore partnership opportunities."
                action={<AddPartnerModal />}
            />

            {/* Browse by Category Section (Top) */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">Browse by Category</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>

            {/* Analytics & Opportunities (Bottom) */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <EcosystemStats />
                </div>
                <div>
                    <FundingOpportunities />
                </div>
            </div>
        </div>
    );
}

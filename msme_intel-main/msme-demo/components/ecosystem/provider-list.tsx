'use client';

import { EcosystemProvider } from '@/lib/api/ecosystem';
import { ProviderCard } from './provider-card';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { EmptyState } from '@/components/shared/empty-state';
import { Network } from 'lucide-react';

interface ProviderListProps {
    providers?: EcosystemProvider[];
    isLoading: boolean;
}

export function ProviderList({ providers, isLoading }: ProviderListProps) {
    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <LoadingSkeleton count={6} />
            </div>
        )
    }

    if (!providers || providers.length === 0) {
        return (
            <EmptyState
                icon={Network}
                title="No service providers found"
                description="Try adjusting your search criteria to find relevant partners in the ecosystem."
            />
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
            ))}
        </div>
    );
}

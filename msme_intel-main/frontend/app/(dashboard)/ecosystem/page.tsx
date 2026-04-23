'use client';

import { PageHeader } from '@/components/shared/page-header';
import { ProviderList } from '@/components/ecosystem/provider-list';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EcosystemProvider } from '@/lib/api/ecosystem';

// Creating a dummy hook/call here since we haven't implemented the hook natively yet 
// but we defined the API function.
// For now, we'll just mock the data fetch or use a simple effect.
const MOCK_PROVIDERS: EcosystemProvider[] = [
    {
        id: '1',
        name: 'TechSolutions Inc.',
        service_type: 'Digital Transformation',
        description: 'Specializing in cloud migration and ERP implementation for manufacturing MSMEs.',
        match_score: 95,
        website: 'https://example.com',
        contact_email: 'contact@example.com'
    },
    {
        id: '2',
        name: 'GrowthCapital Partners',
        service_type: 'Financial Services',
        description: 'Providing working capital loans and growth financing for early-stage startups.',
        match_score: 88,
        website: 'https://example.com',
        contact_email: 'contact@example.com'
    },
    {
        id: '3',
        name: 'TalentRecruit',
        service_type: 'HR & Talent',
        description: 'Helping companies scale their teams with top-tier technical talent.',
        match_score: 82,
        website: 'https://example.com',
        contact_email: 'contact@example.com'
    },
    {
        id: '4',
        name: 'MarketReach Agency',
        service_type: 'Marketing',
        description: 'Full-service digital marketing agency focused on B2B lead generation.',
        match_score: 75,
        website: 'https://example.com',
        contact_email: 'contact@example.com'
    }
];

export default function EcosystemPage() {
    const [search, setSearch] = useState('');
    const [providers, setProviders] = useState<EcosystemProvider[]>(MOCK_PROVIDERS);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate search filtering
        setLoading(true);
        const timer = setTimeout(() => {
            const filtered = MOCK_PROVIDERS.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.service_type.toLowerCase().includes(search.toLowerCase())
            );
            setProviders(filtered);
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Ecosystem Directory"
                description="Connect with trusted service providers and partners tailored to your needs."
                action={
                    <div className="relative w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search providers..."
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                }
            />

            <ProviderList providers={providers} isLoading={loading} />
        </div>
    );
}

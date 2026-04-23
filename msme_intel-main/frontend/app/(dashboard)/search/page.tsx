'use client';

import { PageHeader } from '@/components/shared/page-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchResults } from '@/components/search/search-results';
import { useSearch } from '@/lib/hooks/use-search';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

export default function SearchPage() {
    const { query, setQuery, results, isLoading, error } = useSearch('');

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold tracking-tight">Search Platform</h1>
                <p className="text-muted-foreground text-lg">
                    Find companies, market insights, and financial data across the entire platform.
                </p>

                <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        className="pl-12 h-12 text-lg"
                        placeholder="Search..."
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    <LoadingSkeleton count={3} />
                ) : error ? (
                    <div className="text-center text-red-500">
                        Failed to load search results. Please try again.
                    </div>
                ) : (
                    results && <SearchResults results={results} />
                )}
            </div>
        </div>
    );
}

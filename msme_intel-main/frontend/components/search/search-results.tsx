'use client';

import { SearchResult } from '@/lib/api/search';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsProps {
    results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'company': return Building2;
            case 'insight': return TrendingUp;
            case 'market_data': return FileText;
            default: return FileText;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'company': return 'default'; // primary
            case 'insight': return 'secondary';
            case 'market_data': return 'outline';
            default: return 'outline';
        }
    };

    if (!results || results.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No results found. Try adjusting your search query.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {results.map((result) => {
                const Icon = getIcon(result.type);
                return (
                    <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <Icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-base">{result.title}</h4>
                                    <Badge variant={getTypeColor(result.type) as any} className="capitalize">{result.type.replace('_', ' ')}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{result.content}</p>

                                {result.type === 'company' && (
                                    <div className="pt-2">
                                        <Link href={`/companies/${result.id}`} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                            View Company <ArrowRight className="ml-1 h-3 w-3" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

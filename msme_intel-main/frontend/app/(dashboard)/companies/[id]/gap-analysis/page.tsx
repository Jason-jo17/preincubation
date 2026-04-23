'use client';

import { useParams } from 'next/navigation';
import { useGapAnalysis, useRunGapAnalysis } from '@/lib/hooks/use-gap-analysis';
import { useCompany } from '@/lib/hooks/use-companies';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { GapRadarChart } from '@/components/gap-analysis/gap-radar-chart';
import { GapVerticalCards } from '@/components/gap-analysis/gap-vertical-cards';
import { GapSummary } from '@/components/gap-analysis/gap-summary';
import { GapRecommendations } from '@/components/gap-analysis/gap-recommendations';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function GapAnalysisPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: company } = useCompany(id);
    const { data: analysis, isLoading, refetch } = useGapAnalysis(id);
    const runAnalysis = useRunGapAnalysis();

    const handleRunAnalysis = async () => {
        await runAnalysis.mutateAsync(id);
    };

    if (isLoading) return <div className="space-y-6"><LoadingSkeleton count={3} /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Link href={`/companies/${id}`} className="hover:text-foreground flex items-center gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Company
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Gap Analysis Report</h1>
                    <p className="text-muted-foreground">
                        AI-driven analysis of {company?.name || 'Company'} across 6 operational verticals.
                    </p>
                </div>
                <Button onClick={handleRunAnalysis} disabled={runAnalysis.isPending}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${runAnalysis.isPending ? 'animate-spin' : ''}`} />
                    Run New Analysis
                </Button>
            </div>

            {!analysis ? (
                <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
                    <h3 className="text-lg font-semibold mb-2">No Analysis Found</h3>
                    <p className="text-muted-foreground mb-6">Run your first gap analysis to generate insights.</p>
                    <Button onClick={handleRunAnalysis}>Run Analysis</Button>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <GapRadarChart analysis={analysis} />
                        <GapSummary analysis={analysis} />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Vertical Deep Dive</h3>
                        <GapVerticalCards analysis={analysis} />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Strategic Recommendations</h3>
                        <GapRecommendations analysis={analysis} />
                    </div>
                </>
            )}
        </div>
    );
}

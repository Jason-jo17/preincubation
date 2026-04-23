'use client';

import { useParams } from 'next/navigation';
import { useRoadmap, useGenerateRoadmap } from '@/lib/hooks/use-roadmap';
import { useCompany } from '@/lib/hooks/use-companies';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { RoadmapTimeline } from '@/components/roadmap/roadmap-timeline';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { RefreshCw, Download, ArrowLeft, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RoadmapPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: company } = useCompany(id);
    const { data: roadmap, isLoading: roadmapLoading } = useRoadmap(id);
    const generateRoadmap = useGenerateRoadmap();

    const handleGenerate = async () => {
        await generateRoadmap.mutateAsync(id);
    };

    const frameworks = {
        exo: 'Exponential Organizations (ExO)',
        lean_startup: 'Lean Startup',
        okr: 'Objectives and Key Results (OKR)',
        blue_ocean: 'Blue Ocean Strategy'
    };

    if (roadmapLoading) return <div className="space-y-6"><LoadingSkeleton count={3} /></div>;

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
                    <h1 className="text-3xl font-bold tracking-tight">Strategic Roadmap</h1>
                    {roadmap && (
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-sm py-1 px-3">
                                <Lightbulb className="mr-2 h-3 w-3" />
                                {frameworks[roadmap.framework]}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Duration: {roadmap.duration_months} Months</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                    <Button onClick={handleGenerate} disabled={generateRoadmap.isPending}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${generateRoadmap.isPending ? 'animate-spin' : ''}`} />
                        Regenerate Plan
                    </Button>
                </div>
            </div>

            {!roadmap ? (
                <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/10">
                    <h3 className="text-lg font-semibold mb-2">No Roadmap Generated</h3>
                    <p className="text-muted-foreground mb-6">Generate a strategic roadmap based on the gap analysis.</p>
                    <Button onClick={handleGenerate}>Generate Roadmap</Button>
                </div>
            ) : (
                <div className="max-w-4xl">
                    <RoadmapTimeline roadmap={roadmap} />
                </div>
            )}
        </div>
    );
}

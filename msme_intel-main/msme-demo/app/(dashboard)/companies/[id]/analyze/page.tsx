
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { AnimatedLoading } from '@/components/shared/animated-loading';
import { simulateLoading } from '@/lib/utils/simulate-loading';
import { getDemoGapAnalysis } from '@/lib/demo-data/gap-analyses';
import { GapRadarChart } from '@/components/gap-analysis/gap-radar-chart';
import { GapVerticalCards } from '@/components/gap-analysis/gap-vertical-cards';
import { GapSummary } from '@/components/gap-analysis/gap-summary';
import { GapRecommendations } from '@/components/gap-analysis/gap-recommendations';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function GapAnalysisPage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [analysis, setAnalysis] = useState<any>(null);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const loadAnalysis = async () => {
            // Simulate animation delay
            await simulateLoading(3000);

            // Normalize ID: "1" -> "comp-001"
            const rawId = params.id;
            const companyId = rawId.startsWith('comp-') ? rawId : `comp-${rawId.padStart(3, '0')}`;

            const data = getDemoGapAnalysis(companyId);
            if (data) {
                setAnalysis(data);
                toast({
                    title: "Analysis Complete",
                    description: "AI-driven gap analysis has been generated successfully.",
                })
            }
            setIsLoading(false);
        };

        loadAnalysis();
    }, [params.id, toast]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-3xl mx-auto pt-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Analyzing Company Profile</h2>
                    <p className="text-muted-foreground">Our AI agents are evaluating 6 operational verticals...</p>
                </div>
                <AnimatedLoading type="analysis" />
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold">Analysis Not Available</h2>
                    <p className="text-muted-foreground">Demo analysis is only available for select companies (e.g., TechForge).</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 page-transition">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <PageHeader
                    title="Gap Analysis Results"
                    description={`Comprehensive operational assessment for ${params.id}`}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <GapSummary analysis={analysis} />
                <GapRadarChart analysis={analysis} />
            </div>

            <GapVerticalCards analysis={analysis} />

            <GapRecommendations analysis={analysis} />
        </div>
    );
}

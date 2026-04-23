'use client';

import { useParams, useRouter } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { GapRadarChart } from '@/components/funnel/gap-radar-chart';
import { LOADING_MESSAGES } from '@/components/demo/animated-loading';
import { StepLoader, messagesToSteps } from '@/components/demo/step-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompanyById } from '@/lib/demo-data/companies';
import { getDemoGapAnalysis } from '@/lib/demo-data/gap-analyses';
import { NEW_COMPANIES } from '@/lib/demo-data/new-companies';

export default function DemoGapMsgPage() {
    const params = useParams();
    const router = useRouter();
    const rawId = params.company_id as string;
    const normalizedId = /^\d+$/.test(rawId) ? `comp-${rawId.padStart(3, '0')}` : rawId;
    const companyId = normalizedId;

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        const comp = getCompanyById(companyId) || NEW_COMPANIES.find((c: any) => c.id === companyId);
        if (comp) setCompany(comp);
    }, [companyId]);

    const handleLoadingComplete = () => {
        // Redirect to detailed gap analysis view
        router.push(`/companies/${companyId}?tab=gap-analysis`);
    };

    const handleProceed = () => {
        router.push(`/companies/${companyId}?tab=roadmap`);
    };

    if (!company) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold tracking-tight">Diagnostic Gap Analysis</h1>
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">DEMO MODE</span>
                    </div>
                    <p className="text-muted-foreground">Deep-dive assessment across 8 strategic dimensions.</p>
                </div>
            </div>

            <FunnelProgress
                currentStage={5}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: 'complete',
                    stage_3_status: 'complete',
                    stage_4_status: 'complete',
                    stage_5_status: result ? 'complete' : 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{
                    passed_stage_2_filter: true,
                    passed_stage_4_filter: true
                }}
            />

            {loading ? (
                <Card>
                    <CardContent>
                        <StepLoader
                            steps={messagesToSteps(LOADING_MESSAGES.gap_analysis)}
                            onComplete={handleLoadingComplete}
                            minDuration={800}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="lg:col-span-2">
                        <GapRadarChart gapAnalysis={result} />
                    </div>

                    <div className="space-y-6">
                        <Card className="border-l-4 border-l-amber-500">
                            <CardHeader>
                                <CardTitle className="text-lg">Top Priority</CardTitle>
                                <CardDescription>{result.top_priority}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">{result.top_priority_score}/100</div>
                                <p className="text-sm text-muted-foreground">
                                    Critical gap identified. Addressing this will have the highest impact on valuation.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-green-500">
                            <CardHeader>
                                <CardTitle className="text-lg">Key Asset</CardTitle>
                                <CardDescription>{result.key_asset}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-2">{result.key_asset_score}/100</div>
                                <p className="text-sm text-muted-foreground">
                                    Strongest competitive advantage. Leverage this for market positioning.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Analysis Methodology</CardTitle>
                                <CardDescription>Steps completed by AI Analyst</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {LOADING_MESSAGES.gap_analysis.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Button className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all" onClick={handleProceed}>
                            Generate Strategic Roadmap <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

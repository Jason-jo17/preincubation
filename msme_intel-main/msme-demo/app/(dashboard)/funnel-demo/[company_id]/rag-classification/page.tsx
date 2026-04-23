'use client';

import { useParams, useRouter } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { RAGBadge } from '@/components/funnel/rag-badge';
import { LOADING_MESSAGES } from '@/components/demo/animated-loading';
import { StepLoader, messagesToSteps } from '@/components/demo/step-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompanyById } from '@/lib/demo-data/companies';
import { getDemoRAG } from '@/lib/demo-data/rag-classifications';

export default function DemoRAGPage() {
    const params = useParams();
    const router = useRouter();
    const companyId = params.company_id as string;

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        const comp = getCompanyById(companyId);
        if (comp) setCompany(comp);
    }, [companyId]);

    const handleLoadingComplete = () => {
        setResult(getDemoRAG(companyId));
        setLoading(false);
    };

    const handleProceed = () => {
        router.push(`/funnel-demo/${companyId}/gap-analysis`);
    };

    if (!company) return <div className="p-8">Loading company...</div>;

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold tracking-tight">RAG Classification</h1>
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">DEMO MODE</span>
                </div>
                <p className="text-muted-foreground">Automated risk-adjusted growth classification.</p>
            </div>

            <FunnelProgress
                currentStage={4}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: 'complete',
                    stage_3_status: 'complete',
                    stage_4_status: result ? 'complete' : 'pending',
                    stage_5_status: 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{
                    passed_stage_2_filter: true,
                    passed_stage_4_filter: result ? (result.rag_status !== 'red') : undefined
                }}
            />

            {loading ? (
                <Card>
                    <CardContent>
                        <StepLoader
                            steps={messagesToSteps(LOADING_MESSAGES.rag_classification)}
                            onComplete={handleLoadingComplete}
                            minDuration={800}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto animate-in fade-in zoom-in duration-500">
                    <Card className={`md:col-span-2 border-2 ${result.rag_status === 'green' ? 'border-green-500/30 bg-green-50/10' :
                        result.rag_status === 'amber' ? 'border-amber-500/30 bg-amber-50/10' :
                            'border-red-500/30 bg-red-50/10'
                        }`}>
                        <CardHeader className="text-center pb-2">
                            <CardDescription>AI Classification Result</CardDescription>
                            <div className="flex justify-center pt-2 scale-125">
                                <RAGBadge
                                    status={result.rag_status as any}
                                    category={result.rag_category as any}
                                    size="lg"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="text-center max-w-2xl mx-auto">
                                <p className="text-lg font-medium mt-4">&quot;{result.reasoning}&quot;</p>
                            <div className="mt-4 flex justify-center items-center gap-2 text-sm text-muted-foreground">
                                <span>Confidence Score:</span>
                                <span className="font-bold text-foreground">{(result.confidence_score * 100).toFixed(0)}%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Strategic Fit Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Core capabilities match sector thesis requirements.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Financial health supports growth projection.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    <span>Positive unit economics verified.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Risk Flags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm">
                                {result.rag_status === 'amber' ? (
                                    <>
                                        <li className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                            <span>Market concentration risk detected.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                            <span>Competition intensity increasing.</span>
                                        </li>
                                    </>
                                ) : (
                                    <li className="flex items-start gap-2">
                                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>No critical red flags identified.</span>
                                    </li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                        <Button variant="outline" onClick={() => router.push('/funnel-demo')}>Save & Exit</Button>
                        <Button onClick={handleProceed} size="lg">
                            Evaluate Gap Analysis <span className="ml-2">→</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

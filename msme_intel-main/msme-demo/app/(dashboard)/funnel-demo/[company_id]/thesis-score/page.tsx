'use client';

import { useParams, useRouter } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { LOADING_MESSAGES } from '@/components/demo/animated-loading';
import { StepLoader, messagesToSteps } from '@/components/demo/step-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { simulateThesisScoring, DEMO_THESIS_SCORES } from '@/lib/demo-data/thesis-scores';
import { getCompanyById } from '@/lib/demo-data/companies';

export default function DemoThesisScorePage() {
    const params = useParams();
    const router = useRouter();
    const companyId = params.company_id as string;

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        // Load company details
        const comp = getCompanyById(companyId);
        if (comp) setCompany(comp);

        // If already scored in our "state" (simulated by checking if we navigated back), load immediately
        // For demo efffect, usually nice to require a click unless 'completed' stage.
        // Let's rely on user click for the "Wow" factor of animation.
    }, [companyId]);

    const handleAnalyze = () => {
        setLoading(true);
    };

    const handleLoadingComplete = async () => {
        const data = await simulateThesisScoring(companyId);
        setResult(data);
        setLoading(false);
    };

    if (!company) return <div className="p-8">Loading company...</div>;

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold tracking-tight">Thesis Scoring</h1>
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">DEMO MODE</span>
                </div>
                <p className="text-muted-foreground">Analyzing <span className="font-semibold text-primary">{company.name}</span> against sector thesis.</p>
            </div>

            <FunnelProgress
                currentStage={2}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: result ? 'complete' : 'pending',
                    stage_3_status: 'pending',
                    stage_4_status: 'pending',
                    stage_5_status: 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{ // Mock pass
                    passed_stage_2_filter: result?.overall_score >= 40
                }}
            />

            {loading ? (
                <Card>
                    <CardContent>
                        <StepLoader
                            steps={messagesToSteps(LOADING_MESSAGES.thesis_scoring)}
                            onComplete={handleLoadingComplete}
                            minDuration={800}
                        />
                    </CardContent>
                </Card>
            ) : !result ? (
                <Card className="max-w-xl mx-auto text-center py-12">
                    <CardHeader>
                        <div className="text-6xl mb-4">🤖</div>
                        <CardTitle>AI Thesis Analysis</CardTitle>
                        <CardDescription>
                            Click below to have our GenAI agents analyze {company.name} against the
                            <span className="font-medium text-foreground"> {company.sector.replace('_', ' ')} </span>
                            sector thesis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" onClick={handleAnalyze} className="w-full sm:w-auto">
                            Run Analysis (Simulation)
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    {/* Scores Dashboard */}
                    <div className="grid gap-6 md:grid-cols-12">
                        {/* Overall Score */}
                        <Card className="md:col-span-4 bg-primary/5 border-primary/20 flex flex-col justify-center text-center">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-muted-foreground">Overall Thesis Fit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold text-primary mb-2">
                                    {Math.round(result.overall_score)}<span className="text-2xl text-muted-foreground">/100</span>
                                </div>
                                <Badge variant={result.overall_score >= 70 ? "default" : "secondary"}>
                                    {result.overall_score >= 70 ? "High Alignment" : "Moderate Alignment"}
                                </Badge>
                            </CardContent>
                        </Card>

                        {/* Component Scores */}
                        <Card className="md:col-span-8">
                            <CardHeader><CardTitle>Dimension Scores</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "Market Alignment", score: result.market_alignment_score, desc: "Fit with sector growth trends" },
                                    { label: "Policy Advantage", score: result.policy_advantage_score, desc: "Alignment with govt schemes" },
                                    { label: "Innovation Readiness", score: result.innovation_readiness_score, desc: "Tech adoption level" },
                                ].map((item) => (
                                    <div key={item.label} className="space-y-1">
                                        <div className="flex justify-between items-end">
                                            <span className="font-medium">{item.label}</span>
                                            <span className="font-bold">{Math.round(item.score)}%</span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all duration-1000 ease-out"
                                                style={{ width: `${item.score}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* AI Insights - Rationale */}
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Scoring Rationale</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            <div className="bg-muted/30 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">🚀 Growth Potential</h4>
                                        <p className="text-sm text-muted-foreground italic">&quot;{result.scoring_rationale.growth_potential}&quot;</p>
                            </div>
                            <div className="bg-muted/30 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">🏛️ Policy Advantage</h4>
                                        <p className="text-sm text-muted-foreground italic">&quot;{result.scoring_rationale.policy_advantages}&quot;</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => router.push('/funnel-demo')}>Back to Dashboard</Button>
                        <Button onClick={() => router.push(`/funnel-demo/${companyId}/financials`)}>Proceed to Financials</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

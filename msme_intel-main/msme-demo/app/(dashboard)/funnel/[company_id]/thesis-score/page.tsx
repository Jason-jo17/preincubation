'use client';

import { useParams } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock API Call
async function scoreCompany(id: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {
        overall_score: 78,
        market_alignment_score: 85,
        growth_potential_score: 75,
        policy_advantage_score: 60,
        competitive_position_score: 80,
        innovation_readiness_score: 90,
        scoring_rationale: {
            market_alignment: "Strong alignment with emerging clean energy trends."
        },
        key_strengths: ["Innovative Product line", "Strong Technical Team"],
        key_gaps: ["Limited marketing reach"],
        passed_filter: true
    };
}

export default function ThesisScorePage() {
    const params = useParams();
    const companyId = params.id as string;
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleScoring = async () => {
        setLoading(true);
        try {
            const data = await scoreCompany(companyId);
            setResult(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Thesis Scoring</h1>
                <p className="text-muted-foreground">Stage 2: AI-driven sector thesis alignment.</p>
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
                passedFilters={{
                    passed_stage_2_filter: result?.passed_filter
                }}
            />

            {!result ? (
                <Card className="max-w-xl mx-auto text-center py-10">
                    <CardHeader>
                        <CardTitle>Ready to Analyze</CardTitle>
                        <CardDescription>
                            We will analyze this company against our proprietary sector thesis
                            using GenAI to determine strategic fit.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" onClick={handleScoring} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing Thesis...
                                </>
                            ) : (
                                "Start Thesis Scoring"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="md:col-span-2 bg-slate-50 dark:bg-slate-900 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg">Overall Thesis Score</CardTitle>
                                <CardDescription>Policy & Market Alignment</CardDescription>
                            </div>
                            <div className="text-4xl font-bold text-primary">{result.overall_score}/100</div>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Component Scores</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "Market Alignment", score: result.market_alignment_score },
                                { label: "Growth Potential", score: result.growth_potential_score },
                                { label: "Innovation", score: result.innovation_readiness_score },
                                { label: "Policy Advantage", score: result.policy_advantage_score },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>{item.label}</span>
                                        <span>{item.score}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-secondary">
                                        <div className="h-full rounded-full bg-primary" style={{ width: `${item.score}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Key Strengths</h4>
                                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                                    {result.key_strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Key Gaps</h4>
                                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                                    {result.key_gaps.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="md:col-span-2 flex justify-end">
                        <Button size="lg" onClick={() => window.location.href = `/funnel/${companyId}/financials`}>
                            Proceed to Financial Analysis
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

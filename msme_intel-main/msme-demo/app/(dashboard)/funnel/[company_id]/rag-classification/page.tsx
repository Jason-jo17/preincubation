'use client';

import { useParams } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { RAGBadge } from '@/components/funnel/rag-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export default function RAGClassificationPage() {
    const params = useParams();
    const companyId = params.id as string;

    // Mock Result
    const classification = {
        rag_status: 'amber',
        rag_category: 'best_fit',
        confidence_score: 0.85,
        reasoning: "Strong market alignment and technology readiness, but currently lacks scale in revenue.",
        recommendation: "Proceed with caution. Validate easy financing options."
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">RAG Classification</h1>
                <p className="text-muted-foreground">Stage 4: Automated risk and fit assessment.</p>
            </div>

            <FunnelProgress
                currentStage={4}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: 'complete',
                    stage_3_status: 'complete',
                    stage_4_status: 'complete', // Assuming auto-classified
                    stage_5_status: 'pending',
                    stage_6_status: 'pending'
                }}
                passedFilters={{
                    passed_stage_2_filter: true,
                    passed_stage_4_filter: true // Amber/Green passes
                }}
            />

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="md:col-span-2 border-amber-500/20 bg-amber-500/5">
                    <CardHeader className="text-center pb-2">
                        <CardDescription>AI Recommendation</CardDescription>
                        <div className="flex justify-center pt-2">
                            <RAGBadge
                                status={classification.rag_status as any}
                                category={classification.rag_category as any}
                                size="lg"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="text-center max-w-2xl mx-auto">
                        <p className="text-lg font-medium mt-2">{classification.reasoning}</p>
                        <p className="text-muted-foreground mt-2 text-sm">Confidence Score: {classification.confidence_score * 100}%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Why matches?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                <span>Core technology aligns with Industry 4.0 thesis.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                <span>Healthy gross margins (45%).</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Risk Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <X className="h-4 w-4 text-red-500 mt-0.5" />
                                <span>Revenue scale under ₹1Cr.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <X className="h-4 w-4 text-amber-500 mt-0.5" />
                                <span>Regional dependency (South only).</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 flex justify-end gap-4">
                    <Button variant="outline">Flag for Manual Review</Button>
                    <Button onClick={() => window.location.href = `/funnel/${companyId}/gap-analysis`}>
                        Generate Gap Analysis
                    </Button>
                </div>
            </div>
        </div>
    );
}

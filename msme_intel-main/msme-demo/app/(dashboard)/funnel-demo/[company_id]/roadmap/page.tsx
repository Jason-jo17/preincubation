'use client';

import { useParams } from 'next/navigation';
import { FunnelProgress } from '@/components/funnel/funnel-progress';
import { LOADING_MESSAGES } from '@/components/demo/animated-loading';
import { StepLoader, messagesToSteps } from '@/components/demo/step-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCcw, Download, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCompanyById } from '@/lib/demo-data/companies';
import { getDemoRoadmap } from '@/lib/demo-data/roadmaps';

export default function DemoRoadmapPage() {
    const params = useParams();
    const companyId = params.company_id as string;

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);

    useEffect(() => {
        const comp = getCompanyById(companyId);
        if (comp) setCompany(comp);
    }, [companyId]);

    const handleLoadingComplete = () => {
        setResult(getDemoRoadmap(companyId));
        setLoading(false);
    };

    if (!company) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold tracking-tight">Strategic Roadmap</h1>
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">DEMO MODE</span>
                    </div>
                    <p className="text-muted-foreground">Actionable execution plan with ROI projections.</p>
                </div>
                <Button variant="outline" disabled={loading}>
                    <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>

            <FunnelProgress
                currentStage={6}
                stageStatuses={{
                    stage_1_status: 'complete',
                    stage_2_status: 'complete',
                    stage_3_status: 'complete',
                    stage_4_status: 'complete',
                    stage_5_status: 'complete',
                    stage_6_status: result ? 'complete' : 'pending'
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
                            steps={messagesToSteps(LOADING_MESSAGES.roadmap_generation)}
                            onComplete={handleLoadingComplete}
                            minDuration={800}
                        />
                    </CardContent>
                </Card>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <Tabs defaultValue="roadmap" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                            <TabsTrigger value="roadmap">6-Month Roadmap</TabsTrigger>
                            <TabsTrigger value="roi">Cost-Benefit & ROI</TabsTrigger>
                        </TabsList>

                        <TabsContent value="roadmap" className="mt-6 space-y-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="relative border-l-2 border-muted ml-4 space-y-10 pb-4">
                                        {result.milestones.map((item: any, i: number) => (
                                            <div key={i} className="relative pl-8 group">
                                                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold text-primary">{item.month}</span>
                                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                                    <div className="flex gap-2 items-center">
                                                        <Badge variant="outline" className="w-fit">{item.type}</Badge>
                                                        {i === 0 && <span className="text-xs text-green-600 flex items-center font-medium"><CheckCircle2 className="h-3 w-3 mr-1" /> Immediate Action</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="roi" className="mt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Investment Required</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-4xl font-bold mb-2">₹ {result.investment_lakhs} L</div>
                                        <p className="text-sm text-muted-foreground">Estimated capital injection required over 6 months.</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-green-50/50 border-green-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-green-600" />
                                            Projected Returns (18 Months)
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-4xl font-bold mb-2 text-green-700">₹ {result.net_benefit_lakhs} L</div>
                                        <div className="mt-4 space-y-3 text-sm">
                                            <div className="flex justify-between font-medium items-center p-2 bg-green-100/50 rounded">
                                                <span>ROI</span>
                                                <span className="text-lg font-bold text-green-800">{result.roi}%</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2">
                                                <span>Payback Period</span>
                                                <span className="font-semibold">{result.payback_months} Months</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
        </div>
    );
}

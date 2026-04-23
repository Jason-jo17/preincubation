'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCompanies } from '@/lib/hooks/use-companies';
import { isDemoMode } from '@/lib/config';

export default function DemoFunnelOverviewPage() {
    const router = useRouter();

    const { data: companies = [], isLoading } = useCompanies();

    // Stats
    const totalCompanies = companies.length;
    const stage5Plus = companies.filter(c => (c.current_stage || 0) >= 5).length;
    const stage6Plus = companies.filter(c => (c.current_stage || 0) >= 6).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold tracking-tight">Funnel Dashboard</h1>
                        {isDemoMode && (
                            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">DEMO MODE</span>
                        )}
                    </div>
                    <p className="text-muted-foreground">Manage and track companies through the 6-stage analysis process.</p>
                </div>
                <Button onClick={() => router.push('/funnel-demo/upload')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Companies
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCompanies}</div>
                        <p className="text-xs text-muted-foreground">{isDemoMode ? '30 loaded in demo' : 'Total live companies'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Gap Analysis Ready</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stage5Plus}</div>
                        <p className="text-xs text-muted-foreground">Passed RAG checks</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium">Roadmaps Generated</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stage6Plus}</div>
                        <p className="text-xs text-muted-foreground">High-potential MSMEs</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Real-time tracking of funnel progression.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {companies.slice(0, 8).map((company) => (
                            <div
                                key={company.id}
                                className="grid grid-cols-[1fr_200px_100px] items-center gap-4 rounded-lg border p-3 transition-all hover:bg-muted/50 cursor-pointer group"
                                onClick={() => router.push(`/funnel-demo/${company.id}/${getStageSlug(company.current_stage)}`)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold">{company.name}</span>
                                    <div className="flex gap-2 text-xs text-muted-foreground">
                                        <span>{company.sector.replace('_', ' ')}</span>
                                        <span>•</span>
                                        <span>{company.headquarters_city}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-1000"
                                            style={{ width: `${((company.current_stage || 1) / 6) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium whitespace-nowrap">Stage {company.current_stage || 1}</span>
                                </div>
                                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">View All {totalCompanies} Companies</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function getStageSlug(stageNum: number | undefined) {
    if (!stageNum) return 'upload';
    const map = {
        1: 'upload',
        2: 'thesis-score',
        3: 'financials',
        4: 'rag-classification',
        5: 'gap-analysis',
        6: 'roadmap'
    };
    return map[stageNum as keyof typeof map] || 'upload';
}

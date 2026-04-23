'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FunnelOverviewPage() {
    const router = useRouter();

    // Mock data for funnel overview - replace with API call later
    // const { data: companies, isLoading } = useQuery({ queryKey: ['funnel-companies'], ... });

    const recentCompanies = [
        { id: 'a2e10480-1000-41d4-a7ae-446655440001', name: 'Aequs Limited', stage: 'Gap Analysis', stageNum: 5, status: 'Action Required', lastUpdated: '10 mins ago' },
        { id: 'd2e10480-2000-41d4-a7ae-446655440002', name: 'Dynamatic Technologies', stage: 'Gap Analysis', stageNum: 5, status: 'In Progress', lastUpdated: '1 hour ago' },
        { id: 'c2e10480-3000-41d4-a7ae-446655440003', name: 'Taneja Aerospace', stage: 'Gap Analysis', stageNum: 5, status: 'Ready for Review', lastUpdated: '2 hours ago' },
        { id: '1', name: 'TechFlow Solutions', stage: 'Gap Analysis', stageNum: 5, status: 'In Progress', lastUpdated: '5 hours ago' },
        { id: '2', name: 'AgriGrowth India', stage: 'Thesis Score', stageNum: 2, status: 'Pending Review', lastUpdated: '1 day ago' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">MSME Analysis Funnel</h1>
                    <p className="text-muted-foreground">Manage and track companies through the 6-stage analysis process.</p>
                </div>
                <Button onClick={() => router.push('/funnel/upload')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Companies
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-muted-foreground">+12 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Ready for Gap Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Awaiting detailed review</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Roadmaps Generated</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-xs text-muted-foreground">High-potential MSMEs</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Companies currently moving through the funnel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentCompanies.map((company) => (
                            <div
                                key={company.id}
                                className="grid grid-cols-[1fr_200px_100px] items-center gap-4 rounded-lg border p-4 transition-all hover:bg-muted/50 cursor-pointer"
                                onClick={() => router.push(`/funnel/${company.id}/${getStageSlug(company.stageNum)}`)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold">{company.name}</span>
                                    <span className="text-sm text-muted-foreground">Last updated 2 hours ago</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${(company.stageNum / 6) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium whitespace-nowrap">{company.stage}</span>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function getStageSlug(stageNum: number) {
    const map = {
        1: 'upload', // Technically goes to next step or stays? Let's say upload is done, go to thesis
        2: 'thesis-score',
        3: 'financials',
        4: 'rag-classification',
        5: 'gap-analysis',
        6: 'roadmap'
    };
    // If completed stage X, usually want to view that or continue to X+1.
    // For simplicity, link to the stage they are currently ON.
    return map[stageNum as keyof typeof map] || 'upload';
}

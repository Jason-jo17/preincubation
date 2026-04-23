import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

import { NEW_COMPANIES } from '@/data/new-companies';

export default function FunnelOverviewPage() {
    const navigate = useNavigate();

    const recentCompanies = NEW_COMPANIES.map(c => ({
        id: c.id,
        name: c.name,
        stage: c.gap_analysis?.investment_readiness ? `Ready: ${c.gap_analysis.investment_readiness}` : 'Dossier Progress',
        stageNum: c.current_stage || 1,
        status: c.rag_status,
        lastUpdated: 'Verified'
    }));

    const stats = {
        total: NEW_COMPANIES.length,
        pending: NEW_COMPANIES.filter(c => !c.gap_analysis || c.overall_score < 50).length,
        delivered: NEW_COMPANIES.filter(c => c.roadmap?.phases?.length > 0).length
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-6xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Market Pipeline Management</h1>
                        <p className="text-muted-foreground mt-1">Manage and track MSME candidates through the 6-stage lifecycle funnel.</p>
                    </div>
                    <Button onClick={() => navigate('#')} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md gap-2 rounded-xl">
                        <PlusCircle className="h-4 w-4" />
                        Ingest Dataset
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Active Pipeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-foreground">{stats.total}</div>
                            <p className="text-xs text-primary font-bold mt-1">Registry candidates</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Awaiting Gap Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-warning">{stats.pending}</div>
                            <p className="text-xs text-muted-foreground mt-1">Pending AI compliance check</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Roadmaps Delivered</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-success">{stats.delivered}</div>
                            <p className="text-xs text-muted-foreground mt-1">Fully mobilized MSMEs</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border shadow-md">
                    <CardHeader className="border-b border-border bg-muted/20">
                        <CardTitle className="text-lg">Recent Mobilization Activity</CardTitle>
                        <CardDescription>Companies currently advancing through the intelligence pipeline.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {recentCompanies.map((company) => (
                                <div
                                    key={company.id}
                                    className="grid grid-cols-[1fr_200px_100px] items-center gap-4 rounded-xl border p-4 transition-all hover:bg-muted/40 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
                                    onClick={() => navigate(`/ceo/companies/${company.id}`)}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground">{company.name}</span>
                                        <span className="text-xs text-muted-foreground font-medium">{company.lastUpdated}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{company.stage}</span>
                                        <div className="h-2 w-32 rounded-full bg-secondary overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${(company.stageNum / 6) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

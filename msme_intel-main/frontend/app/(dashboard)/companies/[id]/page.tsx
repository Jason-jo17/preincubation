'use client';

import { useParams } from 'next/navigation';
import { useCompany } from '@/lib/hooks/use-companies';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanyStats } from '@/components/companies/company-stats';
import { FinancialTrendChart } from '@/components/charts/financial-trend-chart';
import { FundingTimeline } from '@/components/companies/funding-timeline';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { Badge } from '@/components/ui/badge';
import { Edit, FileText, Map as MapIcon, Network } from 'lucide-react';
import Link from 'next/link';

export default function CompanyDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: company, isLoading, error } = useCompany(id);

    if (isLoading) return <div className="space-y-6"><LoadingSkeleton count={3} /></div>;
    if (error || !company) return <div>Company not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
                        <Badge variant="outline" className="capitalize">{company.stage}</Badge>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                        {company.sector} • {company.sub_sector} • {company.headquarters_city}, {company.headquarters_state}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Company
                    </Button>
                    <Link href={`/companies/${id}/gap-analysis`}>
                        <Button variant="default" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Gap Analysis
                        </Button>
                    </Link>
                </div>
            </div>

            <CompanyStats company={company} />

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4">
                            <FinancialTrendChart />
                        </div>
                        <div className="col-span-3">
                            <FundingTimeline fundingRounds={[]} /> {/* Mocking empty array for now */}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="financials">
                    <div className="rounded-md border p-4">
                        <h3 className="text-lg font-medium mb-4">Detailed Financials</h3>
                        <p className="text-sm text-muted-foreground">Financial tables coming soon...</p>
                    </div>
                </TabsContent>
                <TabsContent value="roadmap">
                    <div className="rounded-md border p-4">
                        <h3 className="text-lg font-medium mb-4">Strategic Roadmap</h3>
                        <div className="flex justify-center p-8">
                            <Link href={`/companies/${id}/roadmap`}>
                                <Button>
                                    View Full Roadmap
                                </Button>
                            </Link>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

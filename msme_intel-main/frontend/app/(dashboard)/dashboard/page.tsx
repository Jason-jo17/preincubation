import { PageHeader } from '@/components/shared/page-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { FinancialTrendChart } from '@/components/charts/financial-trend-chart';
import { SectorDistributionChart } from '@/components/charts/sector-distribution';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Overview of your MSME portfolio and key metrics."
                action={
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                }
            />

            {/* High-level stats */}
            <DashboardStats />

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <FinancialTrendChart />
                </div>
                <div className="col-span-3">
                    <SectorDistributionChart />
                </div>
            </div>
        </div>
    );
}

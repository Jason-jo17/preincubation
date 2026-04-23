import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Company, CompanyFinancials } from '@/lib/types/company';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatters';
import { BadgeDollarSign, TrendingUp, Users, Wallet } from 'lucide-react';

interface CompanyStatsProps {
    company: Company;
    financials?: CompanyFinancials; // Latest financials
}

export function CompanyStats({ company, financials }: CompanyStatsProps) {
    const stats = [
        {
            title: 'Current Revenue',
            value: company.revenue_current ? formatCurrency(company.revenue_current) : 'N/A',
            icon: BadgeDollarSign,
            subtext: company.revenue_growth_rate ? `${formatPercent(company.revenue_growth_rate)} Growth` : undefined
        },
        {
            title: 'Gross Profit',
            value: financials?.gross_profit ? formatCurrency(financials.gross_profit) : 'N/A',
            icon: Wallet,
            subtext: 'Latest FY'
        },
        {
            title: 'Employees',
            value: company.employee_count ? formatNumber(company.employee_count) : 'N/A',
            icon: Users,
            subtext: 'Full-time equivalent'
        },
        {
            title: 'Growth Rate',
            value: company.revenue_growth_rate ? formatPercent(company.revenue_growth_rate) : 'N/A',
            icon: TrendingUp,
            subtext: 'Year over Year'
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {stat.subtext && (
                            <p className="text-xs text-muted-foreground">
                                {stat.subtext}
                            </p>
                        )}

                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

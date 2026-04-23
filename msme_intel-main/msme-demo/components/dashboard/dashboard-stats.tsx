import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';

const stats = [
    {
        title: 'Total Revenue',
        value: formatCurrency(12500000),
        icon: DollarSign,
        description: '+20.1% from last month',
    },
    {
        title: 'Active Companies',
        value: '2,350',
        icon: Building2,
        description: '+180 new companies',
    },
    {
        title: 'Avg. Growth Rate',
        value: '12.5%',
        icon: TrendingUp,
        description: '+2.4% from last quarter',
    },
    {
        title: 'Total Employees',
        value: formatNumber(45231),
        icon: Users,
        description: '+4% from last month',
    },
];

export function DashboardStats() {
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
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

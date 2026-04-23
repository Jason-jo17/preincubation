import { Company } from '@/lib/types/company';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';
import { SECTORS } from '@/lib/constants/sectors';

interface CompanyCardProps {
    company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
    const sectorColor = SECTORS.find((s) => s.value === company.sector)?.color || 'hsl(var(--primary))';

    return (
        <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <div className="h-2 w-full" style={{ backgroundColor: sectorColor }} />
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{company.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{company.sub_sector}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                        {company.stage}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{company.headquarters_city}, {company.headquarters_state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{company.employee_count ? formatNumber(company.employee_count) : '-'} emp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{company.revenue_growth_rate ? `${company.revenue_growth_rate}% Growth` : '-'}</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <p className="text-xs text-muted-foreground">
                            Revenue: <span className="font-medium text-foreground">{company.revenue_current ? formatCurrency(company.revenue_current) : 'N/A'}</span>
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
                <Link href={`/companies/${company.id}`} className="w-full">
                    <Button variant="ghost" className="w-full justify-between">
                        View Details
                        <span aria-hidden="true">&rarr;</span>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

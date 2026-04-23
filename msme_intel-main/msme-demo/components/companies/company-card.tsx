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
    const ragColors = {
        green: '#10B981', // emerald-500
        amber: '#F59E0B', // amber-500
        red: '#EF4444',   // red-500
    };
    const stripColor = company.rag_status ? ragColors[company.rag_status] : (SECTORS.find((s) => s.value === company.sector)?.color || 'hsl(var(--primary))');

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md border-slate-200/60">
            <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 border border-slate-200/50">
                            <Building2 className="h-4.5 w-4.5 text-slate-500" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-semibold leading-tight">{company.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">{company.sub_sector}</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="capitalize text-[10px] h-5 px-1.5 font-bold bg-slate-100 text-slate-600 border-none">
                        {company.stage}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 pt-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate">{company.headquarters_city}, {company.headquarters_state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <span>{company.employee_count ? formatNumber(company.employee_count) : '-'} emp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-medium text-emerald-600">{company.revenue_growth_rate ? `${company.revenue_growth_rate}%` : '-'} Growth</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="font-bold text-slate-900">{company.revenue_current ? formatCurrency(company.revenue_current) : 'N/A'}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/companies/${company.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full h-8 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-600 transition-all">
                        View Profile
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

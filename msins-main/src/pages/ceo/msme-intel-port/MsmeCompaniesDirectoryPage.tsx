import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, Filter, MapPin, Target, Activity, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NEW_COMPANIES } from '@/data/new-companies';

const REGISTRY = NEW_COMPANIES.map(company => ({
    id: company.id,
    name: company.name,
    sector: company.sector?.replace(/_/g, ' ')?.replace(/\b\w/g, l => l.toUpperCase()) || 'General MSME',
    region: company.regional_context?.region_name.split(' ')[0] || 'Nagpur',
    employees: company.talent?.headcount || 'N/A',
    revenue: company.financials[0] ? `₹${company.financials[0].revenue}Cr` : 'N/A',
    status: company.gap_analysis?.investment_readiness ? `Ready: ${company.gap_analysis.investment_readiness}` : company.stage,
    rag: company.rag_status
}));

export default function MsmeCompaniesDirectoryPage() {
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const isMsmeShell = pathname.startsWith('/msme');
    const routePrefix = isMsmeShell ? '/msme' : '/ceo';
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = REGISTRY.filter(c => {
        if (isMsmeShell && c.id !== 'nav-011') return false;
        
        return (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.sector.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !c.name.toLowerCase().includes('open category');
    });

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Regional MSME Portfolio</h1>
                        <p className="text-muted-foreground mt-1">Explore and manage the centralized registry of analyzed companies across Maharashtra.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 font-bold shadow-sm">
                            <Filter className="h-4 w-4" /> Filter Registry
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md gap-2 font-bold">
                            <Building2 className="h-4 w-4" /> Inject New Entity
                        </Button>
                    </div>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search by company name, sector, or region..." 
                        className="pl-10 h-12 text-lg border-border bg-background shadow-sm focus-visible:ring-primary/30 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-24 text-center border-2 border-dashed border-border rounded-xl bg-muted/10">
                        <Building2 className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-bold">No MSMEs found</h3>
                        <p className="text-muted-foreground mt-2">Adjust your search parameters or synchronize new data via the Discovery Engine.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((company) => (
                            <Card key={company.id} className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border-border group" onClick={() => navigate(`${routePrefix}/companies/${company.id}`)}>
                                <div className={`h-2 w-full ${company.rag === 'green' ? 'bg-success' : company.rag === 'amber' ? 'bg-warning' : 'bg-destructive'}`} />
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{company.name}</h3>
                                            <Badge variant="outline" className="mt-2 text-[10px] uppercase font-black tracking-widest text-muted-foreground">{company.sector}</Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-border">
                                        <div className="flex items-center text-sm">
                                            <MapPin className="h-4 w-4 mr-3 text-primary/70" />
                                            <span className="font-medium text-foreground">{company.region}, Maharashtra</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Users className="h-4 w-4 mr-3 text-primary/70" />
                                            <span className="font-medium text-foreground">{company.employees} Personnel</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Activity className="h-4 w-4 mr-3 text-primary/70" />
                                            <span className="font-medium text-foreground">Turnover: {company.revenue}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Target className="h-4 w-4 mr-3 text-primary/70" />
                                            <span className="font-medium text-foreground">Funnel: <span className="font-black text-primary">{company.status}</span></span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-border/50">
                                        <Button variant="secondary" className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={(e) => { e.stopPropagation(); navigate(`${routePrefix}/companies/${company.id}`); }}>
                                            Access Dossier
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

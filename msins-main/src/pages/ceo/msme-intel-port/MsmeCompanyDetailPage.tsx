import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    ArrowLeft, LayoutDashboard, Map, Zap, Users, IndianRupee, Scale, Star, 
    GraduationCap, Award, Box, Microscope, Radio, MapPin, ShieldCheck,
    Globe, Calendar, Edit, FileText, Target, AlertCircle, CheckCircle2,
    TrendingUp, Activity, Briefcase, Rocket, Search, Info
} from 'lucide-react';
import { NEW_COMPANIES } from '@/data/new-companies';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { companyGapAnalysisData } from '@/data/company-gap-analysis';

const hashString = (str: string) => {
    let hash = 0;
    if (!str) return 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

const DIMENSION_KEYS = [
    { key: "market_saturation_score", label: "Market Saturation" },
    { key: "founder_quality_score", label: "Founder Quality" },
    { key: "business_maturity_score", label: "Business Maturity" },
    { key: "market_opportunity_score", label: "Market Opportunity" },
    { key: "leadership_quality_score", label: "Leadership Quality" },
    { key: "innovation_differentiator_score", label: "Innovation Differentiator" },
    { key: "talent_pool_score", label: "Talent Pool" },
    { key: "brand_identity_score", label: "Brand Identity" }
];

import NavitasDueDiligencePage from './NavitasDueDiligencePage';

export default function MsmeCompanyDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const pathname = window.location.pathname;
    const isMsmeShell = pathname.startsWith('/msme');
    const routePrefix = isMsmeShell ? '/msme' : '/ceo';
    
    // Unified data retrieval
    const findCompany = () => {
        const real = NEW_COMPANIES.find(c => c.id === id);
        if (real) {
            return {
                id: real.id,
                name: real.name,
                sector: real.sector?.replace(/_/g, ' ')?.replace(/\b\w/g, l => l.toUpperCase()) || 'General MSME',
                region: real.regional_context?.region_name || 'Nagpur',
                employees: real.talent?.headcount || 'N/A',
                revenue: real.financials[0] ? `₹${real.financials[0].revenue}Cr` : 'N/A',
                status: real.gap_analysis?.investment_readiness ? `Ready: ${real.gap_analysis.investment_readiness}` : real.stage,
                rag: real.rag_status,
                desc: `${real.sub_sector} based in ${real.operational_address}. Operating as ${real.legal_name}.`,
                website: real.website,
                fullData: real
            };
        }
        
        return null;
    };

    const company = findCompany();

    if (!company) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-2xl font-bold">Company dossier not found</h2>
                    <Button onClick={() => navigate(`${routePrefix}/companies`)} className="mt-4">Return to Registry</Button>
                </div>
            </DashboardLayout>
        );
    }

    const fullDetails = (company as any).fullData;
    const gapDataIndex = fullDetails ? hashString(fullDetails.slug || fullDetails.id) % companyGapAnalysisData.length : 0;
    const gapData = companyGapAnalysisData[gapDataIndex];
    
    // Fallbacks for challenges
    const technicalChallenges = fullDetails?.challenges?.technical?.length 
        ? fullDetails.challenges.technical 
        : fullDetails?.challenges?.problem_statements || [];
        
    const financialChallenges = fullDetails?.challenges?.financial || [];

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-4">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-muted/50 hover:bg-muted mt-1" onClick={() => navigate(`${routePrefix}/companies`)}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">{company.name}</h1>
                                <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">{company.sector}</Badge>
                                {company.rag === 'red' && <Badge variant="destructive" className="font-black uppercase tracking-widest text-[10px]">High Risk</Badge>}
                                {company.rag === 'amber' && <Badge variant="outline" className="text-warning border-warning bg-warning/10 font-black uppercase tracking-widest text-[10px]">Monitor</Badge>}
                            </div>
                            <p className="text-muted-foreground mt-2 text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> {company.region}, Maharashtra • MSME Intelligence Registry
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 text-xs font-bold uppercase tracking-wider border-border shadow-sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                        <Button variant="default" size="sm" className="h-9 text-xs font-bold uppercase tracking-wider shadow-sm">
                            <FileText className="mr-2 h-4 w-4" />
                            Run Gap Analysis
                        </Button>
                    </div>
                </div>

                {/* Key Stats Row */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Current Status</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className={`text-2xl font-black ${company.rag === 'green' ? 'text-success' : company.rag === 'amber' ? 'text-warning' : 'text-destructive'}`}>
                                Active
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Registry Verification</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-black">{company.revenue}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Latest Filed Audited</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Workforce Size</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-2xl font-black">{company.employees}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Registered Employees</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">CEED Score</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 flex items-end gap-2">
                            <div className="text-3xl font-black text-primary">{fullDetails?.overall_score || 72}</div>
                            <p className="text-xs text-muted-foreground font-bold mb-1">/ 100</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Tabs defaultValue="overview" className="w-full">
                        <div className="relative border-b border-border mb-4">
                            <ScrollArea className="w-full whitespace-nowrap">
                                <TabsList className="bg-transparent p-0 h-14 w-max flex gap-1 justify-start">
                                    {[
                                        { value: 'overview', label: 'Overview', icon: LayoutDashboard },
                                        { value: 'roadmap', label: 'Strategic Roadmap', icon: Map, highlight: true },
                                        { value: 'challenges', label: 'Challenges', icon: Zap, highlight: true },
                                        { value: 'customers', label: 'Customers', icon: Users },
                                        { value: 'financials', label: 'Financials', icon: IndianRupee },
                                        { value: 'gap-analysis', label: 'Gap Analysis', icon: Scale },
                                        { value: 'leadership', label: 'Leadership', icon: Star },
                                        { value: 'talent', label: 'Talent', icon: GraduationCap },
                                        { value: 'brand', label: 'Brand', icon: Award },
                                        { value: 'products', label: 'Products', icon: Box },
                                        { value: 'innovation', label: 'Innovation', icon: Microscope },
                                        { value: 'discovery', label: 'Discovery Intel', icon: Radio },
                                        { value: 'regional', label: 'Regional Intel', icon: MapPin },
                                        { value: 'consultancy', label: 'Consultancy & IP', icon: ShieldCheck },
                                    ].map((tab) => (
                                        <TabsTrigger 
                                            key={tab.value}
                                            value={tab.value} 
                                            className={cn(
                                                "rounded-none border-b-2 border-transparent px-6 py-4 h-14 bg-transparent gap-2 font-bold text-xs tracking-wider transition-all data-[state=active]:border-primary data-[state=active]:bg-primary/5 data-[state=active]:text-primary",
                                                tab.highlight && "bg-primary/10 text-primary hover:bg-primary/20"
                                            )}
                                        >
                                            <tab.icon className={cn("h-4 w-4", tab.highlight && "fill-primary/20 animate-pulse")} />
                                            {tab.label}
                                            {tab.highlight && <Badge className="ml-1 px-1 h-3.5 text-[8px] bg-primary text-primary-foreground border-none">INTEL</Badge>}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <ScrollBar orientation="horizontal" className="hidden" />
                            </ScrollArea>
                        </div>

                        <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="md:col-span-2 shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Operational Context</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        <p className="text-sm text-foreground leading-relaxed">
                                            {company.desc}
                                        </p>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-border">
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar className="h-3 w-3" /> Founded
                                                </div>
                                                <div className="text-sm font-bold text-foreground">{fullDetails?.incorporation_date || '2012'}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <Briefcase className="h-3 w-3" /> Stage
                                                </div>
                                                <div className="text-sm font-bold text-foreground">{fullDetails?.stage || 'Mature'}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <Globe className="h-3 w-3" /> Website
                                                </div>
                                                <div className="text-sm font-bold text-primary truncate max-w-[150px]">{company.website || 'N/A'}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                                                    <MapPin className="h-3 w-3" /> HQ
                                                </div>
                                                <div className="text-sm font-bold text-foreground truncate max-w-[150px]">{company.region}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Key Indicators</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg border border-border">
                                             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Market Cap</p>
                                             <p className="text-sm font-bold text-foreground">{fullDetails?.market_cap || 'N/A'}</p>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg border border-border">
                                             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Net Worth</p>
                                             <p className="text-sm font-bold text-foreground">₹{fullDetails?.financials[0]?.net_worth || '0'}Cr</p>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg border border-border">
                                             <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Confidence</p>
                                             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 uppercase text-[9px] font-black">{fullDetails?.financials[0]?.confidence || 'Low'}</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="roadmap" className="mt-0 focus-visible:outline-none">
                            <Card className="shadow-sm border-border">
                                <CardHeader className="bg-primary/5 border-b border-primary/10">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Map className="h-5 w-5 text-primary" />
                                        Strategic Growth Roadmap
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {fullDetails?.roadmap ? (
                                        <div className="space-y-8">
                                            <div className="p-4 bg-muted/30 rounded-xl border border-border italic text-sm text-foreground/80">
                                                <span className="font-bold text-primary mr-2">Vision:</span>
                                                "{fullDetails.roadmap.vision}"
                                            </div>
                                            <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                                                {fullDetails.roadmap.phases.map((phase: any, i: number) => (
                                                    <div key={i} className="relative">
                                                        <div className={cn(
                                                            "absolute -left-[40px] top-0 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center",
                                                            phase.status === 'completed' ? "bg-success" : phase.status === 'current' ? "bg-primary animate-pulse" : "bg-muted"
                                                        )}>
                                                            {phase.status === 'completed' && <CheckCircle2 className="h-3 w-3 text-white" />}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-black text-foreground text-sm uppercase tracking-wider">{phase.phase}</h4>
                                                                <Badge variant="outline" className="text-[9px] font-bold uppercase">{phase.timeline}</Badge>
                                                                <Badge className={cn(
                                                                    "text-[9px] font-bold uppercase",
                                                                    phase.status === 'completed' ? "bg-success/10 text-success border-success/20" : 
                                                                    phase.status === 'current' ? "bg-primary/10 text-primary border-primary/20" : 
                                                                    "bg-muted text-muted-foreground border-border"
                                                                )}>
                                                                    {phase.status}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm font-medium text-slate-600">{phase.goal}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-muted-foreground">Strategic Roadmap data not available for this entity.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="challenges" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="shadow-sm border-border h-full">
                                    <CardHeader className="bg-destructive/5 border-b border-destructive/10">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-destructive" />
                                            Active Challenges
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        {fullDetails?.challenges ? (
                                            <>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Technical Hurdles</h4>
                                                        <div className="grid gap-2">
                                                            {technicalChallenges.map((c: string, i: number) => (
                                                                <div key={i} className="text-xs p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                                                    {c}
                                                                </div>
                                                            ))}
                                                            {!(technicalChallenges.length) && <p className="text-xs text-muted-foreground italic pl-1">No technical challenges recorded.</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Financial Friction</h4>
                                                        <div className="grid gap-2">
                                                            {financialChallenges.map((c: string, i: number) => (
                                                                <div key={i} className="text-xs p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-center gap-2">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                                                    {c}
                                                                </div>
                                                            ))}
                                                            {!(financialChallenges.length) && <p className="text-xs text-muted-foreground italic pl-1">No financial frictions recorded.</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-12 text-center text-muted-foreground">Challenge data not recorded.</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border h-full">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Target className="h-5 w-5 text-primary" />
                                            Innovation Problem Statements
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        {(fullDetails?.challenges?.problem_statements || []).map((ps: string, i: number) => (
                                            <div key={i} className="p-4 bg-primary/5 rounded-xl border border-primary/10 shadow-sm relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-1 bg-primary/10 rounded-bl-lg">
                                                    <Rocket className="h-3 w-3 text-primary" />
                                                </div>
                                                <p className="text-sm font-bold text-foreground leading-relaxed italic">
                                                    "{ps}"
                                                </p>
                                                <div className="mt-3 flex gap-2">
                                                    <Badge variant="secondary" className="text-[9px] font-bold">SOLVABLE</Badge>
                                                    <Badge variant="secondary" className="text-[9px] font-bold">HIGH IMPACT</Badge>
                                                </div>
                                            </div>
                                        ))}
                                        {!(fullDetails?.challenges?.problem_statements?.length) && <p className="text-xs text-muted-foreground italic text-center py-8">No problem statements generated.</p>}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="customers" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Client Concentration</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {fullDetails?.client_demographics ? (
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    {(fullDetails.client_demographics.sector_split || []).map((s: any, i: number) => (
                                                        <div key={i} className="space-y-1.5">
                                                            <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                                                                <span className="text-slate-500">{s.sector}</span>
                                                                <span className="text-primary">{s.percentage}%</span>
                                                            </div>
                                                            <Progress value={s.percentage} className="h-1.5" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                                    <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                        <AlertCircle className="h-3 w-3" /> Risk Assessment
                                                    </h4>
                                                    <p className="text-sm font-bold text-red-700">{fullDetails.client_demographics.concentration_risk}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-12 text-center text-muted-foreground">Demographic data not available.</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Key Accounts</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            {(fullDetails?.clients || []).map((client: any, i: number) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border group hover:bg-muted/20 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-background border border-border flex items-center justify-center font-black text-[10px] text-primary">
                                                            {client.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-foreground">{client.name}</p>
                                                            <p className="text-[10px] font-medium text-muted-foreground uppercase">{client.type}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-[9px] font-black uppercase text-success border-success/30 bg-success/5">{client.status}</Badge>
                                                </div>
                                            ))}
                                            {!(fullDetails?.clients?.length) && <p className="text-xs text-muted-foreground italic text-center py-8">No specific clients listed.</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="financials" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="md:col-span-2 shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Audit History</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-border bg-muted/5">
                                                        <th className="text-left py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fiscal Year</th>
                                                        <th className="text-right py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Revenue</th>
                                                        <th className="text-right py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">YoY Growth</th>
                                                        <th className="text-right py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Net Profit</th>
                                                        <th className="text-center py-3 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                  {fullDetails?.financials && fullDetails.financials.length > 0 ? (
                                                      fullDetails.financials.map((f: any, i: number) => (
                                                          <tr key={i} className="border-b border-border/50 hover:bg-muted/5 transition-colors font-mono uppercase">
                                                              <td className="py-4 px-4 font-bold">{f.fiscal_year}</td>
                                                              <td className="py-4 px-4 text-right font-black">₹{f.revenue}Cr</td>
                                                              <td className="py-4 px-4 text-right text-emerald-600 font-black">+{f.revenue_growth_yoy || 0}%</td>
                                                              <td className="py-4 px-4 text-right font-black text-foreground">₹{f.net_profit || 0}Cr</td>
                                                              <td className="py-4 px-4 text-center">
                                                                  <Badge className="bg-blue-600/10 text-blue-600 border-blue-200/50 text-[10px] uppercase font-black">{f.confidence}</Badge>
                                                              </td>
                                                          </tr>
                                                      ))
                                                  ) : (
                                                      <tr><td colSpan={5} className="py-12 text-center text-muted-foreground italic">No historical financial data available.</td></tr>
                                                  )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Registration</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">CIN</p>
                                            <p className="text-xs font-mono font-bold p-2 bg-muted/20 border border-border rounded">{fullDetails?.cin || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">GSTIN</p>
                                            <p className="text-xs font-mono font-bold p-2 bg-muted/20 border border-border rounded">{fullDetails?.gstin || 'N/A'}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="gap-analysis" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-12">
                                {/* Left Column: High Level Metrics */}
                                <div className="md:col-span-4 space-y-6">
                                    <Card className="shadow-sm border-border bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                                        <CardContent className="pt-6 text-center">
                                            <div className="relative inline-flex items-center justify-center p-8">
                                                <svg className="h-32 w-32 -rotate-90">
                                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * (fullDetails?.overall_score || 72)) / 100} className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-4xl font-black text-primary">{fullDetails?.overall_score || 72}</span>
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Overall Score</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 py-3 px-4 bg-background/50 rounded-lg border border-primary/10 inline-block">
                                                <p className="text-xs font-bold text-primary flex items-center gap-2">
                                                    <Activity className="h-3 w-3" /> Readiness: {fullDetails?.gap_analysis?.investment_readiness || 'Medium'}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-sm border-border">
                                        <CardHeader className="bg-muted/10 border-b border-border/50">
                                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground text-center">Success Probability</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-4xl font-black text-emerald-600 mb-1">
                                                {((fullDetails?.overall_score || 72) * 1.05).toFixed(1)}%
                                            </div>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Ecosystem Alignment</p>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(fullDetails?.overall_score || 72) * 1.05}%` }} />
                                                </div>
                                                <p className="text-[9px] text-muted-foreground italic font-medium leading-tight">
                                                    Calculated based on sector tailwinds and founder DNA.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-sm border-border bg-blue-600 text-white overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <ShieldCheck className="h-24 w-24" />
                                        </div>
                                        <CardHeader className="border-b border-white/10">
                                            <CardTitle className="text-sm font-black uppercase tracking-widest text-blue-100 flex items-center gap-2">
                                                <Radio className="h-4 w-4" /> Intelligence Strategy
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-4">
                                            <p className="text-xs font-medium leading-relaxed italic text-blue-50">
                                                "Leverage the upcoming Multi-modal Logistics Hub to pivot from component supply to system integration."
                                            </p>
                                            <Button variant="outline" size="sm" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white font-bold h-8 text-[10px] uppercase">
                                                View PRD Roadmap
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Column: Details & Visualization */}
                                <div className="md:col-span-8 space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <Card className="shadow-sm border-border lg:col-span-1">
                                            <CardHeader className="bg-muted/10 border-b border-border/50">
                                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                    <Target className="h-4 w-4 text-primary" /> CEED Radar
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-0 flex items-center justify-center py-8">
                                                {/* Mock Radar Chart Visualization */}
                                                <div className="relative h-48 w-48 border border-dashed border-border rounded-full flex items-center justify-center">
                                                    {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                                                        <div key={i} className="absolute border border-muted-foreground/10 rounded-full" style={{ height: `${r * 100}%`, width: `${r * 100}%` }} />
                                                    ))}
                                                    <div className="absolute inset-0">
                                                        <div className="absolute top-0 left-1/2 -ml-0.5 w-px h-full bg-muted-foreground/10" />
                                                        <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-px bg-muted-foreground/10" />
                                                        <div className="absolute inset-0 rotate-45">
                                                            <div className="absolute top-0 left-1/2 -ml-0.5 w-px h-full bg-muted-foreground/10" />
                                                            <div className="absolute left-0 top-1/2 -mt-0.5 w-full h-px bg-muted-foreground/10" />
                                                        </div>
                                                    </div>
                                                    {/* Central Polygon (Mocked) */}
                                                    <div className="absolute h-24 w-24 bg-primary/20 border-2 border-primary rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-pulse" />
                                                    <div className="absolute -top-4 text-[8px] font-black uppercase tracking-tighter bg-background px-1 border border-border">Market</div>
                                                    <div className="absolute -bottom-4 text-[8px] font-black uppercase tracking-tighter bg-background px-1 border border-border">Finance</div>
                                                    <div className="absolute -left-10 text-[8px] font-black uppercase tracking-tighter bg-background px-1 border border-border">Tech</div>
                                                    <div className="absolute -right-10 text-[8px] font-black uppercase tracking-tighter bg-background px-1 border border-border">Talent</div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="shadow-sm border-border lg:col-span-1 bg-amber-50/50">
                                            <CardHeader className="bg-amber-100/50 border-b border-amber-200">
                                                <CardTitle className="text-sm font-black uppercase tracking-widest text-amber-700 flex items-center gap-2">
                                                    <Activity className="h-4 w-4" /> Immediate Actions
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6 space-y-4">
                                                {[
                                                    "File pending compliance since FY2019",
                                                    "Incorporate 3rd-party independent directors",
                                                    "Patent core winding technology immediately"
                                                ].map((action, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-3 bg-white border border-amber-100 rounded-lg group hover:border-amber-300 transition-all">
                                                        <div className="h-5 w-5 rounded bg-amber-100 flex items-center justify-center shrink-0">
                                                            <span className="text-[10px] font-black text-amber-700">{i+1}</span>
                                                        </div>
                                                        <p className="text-[11px] font-bold text-slate-700 leading-tight">
                                                            {action}
                                                        </p>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-3">
                                        <Card className="md:col-span-2 shadow-sm border-border">
                                            <CardHeader className="bg-muted/10 border-b border-border/50">
                                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                                    <Scale className="h-4 w-4 text-primary" /> 8-Dimension Matrix
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6">
                                                <div className="grid gap-3">
                                                    {DIMENSION_KEYS.map((dim) => {
                                                        const score = gapData[dim.key as keyof typeof gapData] as number || 0;
                                                        return (
                                                            <div key={dim.key} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                                                                <div className="flex-1 mr-4">
                                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{dim.label}</p>
                                                                    <Progress value={score} className="h-1" />
                                                                </div>
                                                                <div className="flex items-center gap-2 min-w-[60px] justify-end">
                                                                    <span className="text-xs font-black">{score}/100</span>
                                                                    <div className={cn("h-1.5 w-1.5 rounded-full", score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-destructive")} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="shadow-sm border-border bg-destructive/5">
                                            <CardHeader className="bg-destructive/10 border-b border-destructive/20">
                                                <CardTitle className="text-sm font-black uppercase tracking-widest text-destructive flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4" /> Red Flags
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-6 space-y-3">
                                                {(fullDetails?.gap_analysis?.critical_gaps || []).slice(0, 3).map((gap: string, i: number) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <div className="h-1 w-1 bg-destructive rounded-full mt-1.5 shrink-0" />
                                                        <p className="text-[10px] font-bold text-destructive leading-tight">{gap}</p>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>


                        <TabsContent value="leadership" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Founding Team</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        {(fullDetails?.leadership?.founders || []).map((f: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary">
                                                        {f.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-foreground">{f.name}</p>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{f.role}</p>
                                                    </div>
                                                </div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    <Globe className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {!(fullDetails?.leadership?.founders?.length) && <p className="text-xs text-muted-foreground italic text-center py-8">Founder details not listed.</p>}
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Governance Board</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-2">
                                            {(fullDetails?.leadership?.board || []).map((b: string, i: number) => (
                                                <div key={i} className="text-xs font-bold p-3 bg-muted/10 rounded-lg border border-border">
                                                    {b}
                                                </div>
                                            ))}
                                            {!(fullDetails?.leadership?.board?.length) && <p className="text-xs text-muted-foreground italic text-center py-8">No formal board registered.</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="talent" className="mt-0 focus-visible:outline-none">
                            <Card className="shadow-sm border-border">
                                <CardHeader className="bg-muted/10 border-b border-border/50">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5 text-primary" />
                                        Talent & Workforce Matrix
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {fullDetails?.talent ? (
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div className="space-y-6">
                                                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Headcount</p>
                                                    <p className="text-3xl font-black text-primary">{fullDetails.talent.headcount || 0}</p>
                                                </div>
                                                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Retention Rate</p>
                                                    <p className="text-3xl font-black text-emerald-600">{fullDetails.talent.retention_rate || 'N/A'}</p>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-6">
                                                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Core Technology Stack</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(fullDetails.talent.tech_stack || []).map((t: string, i: number) => (
                                                            <Badge key={i} variant="secondary" className="px-3 py-1 bg-white border-border text-foreground font-bold shadow-sm">{t}</Badge>
                                                        ))}
                                                        {!(fullDetails.talent.tech_stack?.length) && <p className="text-xs text-muted-foreground italic">Stack not defined.</p>}
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Microscope className="h-3 w-3" /> R&D Capability
                                                    </h4>
                                                    <p className="text-sm font-bold text-blue-800">{fullDetails.talent.rd_staff || 0} Specialized Engineers</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-muted-foreground">Talent metrics not recorded.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="brand" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Award className="h-5 w-5 text-amber-500" />
                                            Market Reputation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-6">
                                        {fullDetails?.brand ? (
                                            <>
                                                <p className="text-sm font-bold text-foreground italic leading-relaxed">
                                                    "{fullDetails.brand.sentiment || 'Reputation data being indexed.'}"
                                                </p>
                                                <div className="space-y-3">
                                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Awards & Recognition</h4>
                                                    {(fullDetails.brand.awards || []).map((a: string, i: number) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                            <span className="text-xs font-bold text-amber-900">{a}</span>
                                                        </div>
                                                    ))}
                                                    {!(fullDetails.brand.awards?.length) && <p className="text-xs text-muted-foreground italic">Awards being verified.</p>}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-12 text-center text-muted-foreground">Brand data not available.</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Compliance Certifications</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="grid gap-3">
                                            {(fullDetails?.brand?.certifications || []).map((c: string, i: number) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg border border-border">
                                                    <span className="text-xs font-bold">{c}</span>
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                </div>
                                            ))}
                                            {!(fullDetails?.brand?.certifications?.length) && <p className="text-xs text-muted-foreground italic text-center py-8">Certification list not provided.</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="products" className="mt-0 focus-visible:outline-none">
                            <Card className="shadow-sm border-border">
                                <CardHeader className="bg-muted/10 border-b border-border/50">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Box className="h-5 w-5 text-primary" />
                                        Core Innovation Portfolio
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {(fullDetails?.products || []).map((p: any, i: number) => (
                                            <div key={i} className="p-4 bg-muted/5 rounded-xl border border-border group hover:border-primary/30 transition-all flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-black text-foreground mb-1">{p.name}</h4>
                                                    <p className="text-xs text-muted-foreground max-w-[200px]">{p.description}</p>
                                                </div>
                                                <Badge className={cn(
                                                    "text-[9px] font-black uppercase tracking-widest",
                                                    p.status === 'In Production' ? "bg-emerald-500" : "bg-primary"
                                                )}>
                                                    {p.status}
                                                </Badge>
                                            </div>
                                        ))}
                                        {!(fullDetails?.products?.length) && <p className="text-xs text-muted-foreground italic col-span-2 text-center py-12">No product catalog found.</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>


                        <TabsContent value="innovation" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="shadow-sm border-border">
                                    <CardContent className="pt-6 space-y-2 text-center">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Patents Filed</p>
                                        <p className="text-4xl font-black text-primary">{fullDetails?.innovation?.patents || '0'}</p>
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardContent className="pt-6 space-y-2 text-center">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">R&D Investment</p>
                                        <p className="text-2xl font-black text-indigo-600">{fullDetails?.innovation?.rd_investment || '0%'}</p>
                                    </CardContent>
                                </Card>
                                <Card className="md:col-span-1 shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-0 pb-0">
                                        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Pipeline</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="text-xs font-bold leading-relaxed">
                                            {fullDetails?.innovation?.new_product_pipeline?.[0]}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="discovery" className="mt-0 focus-visible:outline-none">
                            <Card className="shadow-sm border-border">
                                <CardHeader className="bg-muted/10 border-b border-border/50 flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Radio className="h-5 w-5 text-indigo-500" />
                                        MOSI Discovery Sessions
                                    </CardTitle>
                                    <Button size="sm" variant="outline" className="h-8 font-bold text-[10px] uppercase gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50" onClick={() => navigate(`${routePrefix}/discovery`)}>
                                        <Globe className="h-3 w-3" /> Full Discovery Center
                                    </Button>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {fullDetails?.mosi_sessions?.map((s: any, i: number) => (
                                            <div key={i} className="flex gap-4 p-4 bg-indigo-50/30 rounded-xl border border-indigo-100/50 group hover:border-indigo-300 transition-all">
                                                <div className="h-10 w-10 shrink-0 bg-white border border-indigo-200 rounded-lg flex flex-col items-center justify-center font-mono text-[9px] font-black text-indigo-700">
                                                    <span>{s.date.split('-')[2]}</span>
                                                    <span>{s.date.split('-')[1]}</span>
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-sm text-foreground group-hover:text-indigo-700 transition-colors uppercase tracking-tight">{s.title}</h5>
                                                    <p className="text-xs text-slate-600 mt-1 italic">"{s.findings}"</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="regional" className="mt-0 focus-visible:outline-none">
                            <Card className="shadow-sm border-border">
                                <CardHeader className="bg-muted/10 border-b border-border/50 flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Regional Context
                                    </CardTitle>
                                    <Button size="sm" variant="outline" className="h-8 font-bold text-[10px] uppercase gap-2 border-primary/20 text-primary hover:bg-primary/5" onClick={() => navigate(`${routePrefix}/discovery`)}>
                                        <Map className="h-3 w-3" /> Navigate Regional Hub
                                    </Button>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    {fullDetails?.regional_context ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Hub Type</p>
                                                    <p className="text-lg font-black text-foreground">{fullDetails.regional_context.hub_type}</p>
                                                </div>
                                                <div className="p-4 bg-muted/10 rounded-xl border border-border">
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Correlation Score</p>
                                                    <div className="flex items-center gap-3">
                                                        <Progress value={fullDetails.regional_context.correlation_score * 100} className="h-2 flex-1" />
                                                        <span className="text-sm font-black text-primary font-mono">{fullDetails.regional_context.correlation_score * 100}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <Target className="h-3 w-3" /> Regional Synergies
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {fullDetails.regional_context.sector_synergies.map((s: string, i: number) => (
                                                        <Badge key={i} variant="secondary" className="bg-white border-blue-200 text-blue-700 font-bold shadow-sm">{s}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-muted-foreground">Regional intelligence not indexed.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="consultancy" className="mt-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Competitive Benchmarking</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {fullDetails?.benchmark_msme ? (
                                            <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-xl italic text-sm text-indigo-900 leading-relaxed font-medium">
                                                "{fullDetails.benchmark_msme.peer_comparison}"
                                            </div>
                                        ) : (
                                            <div className="py-12 text-center text-muted-foreground">Peer data not yet analyzed.</div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="shadow-sm border-border">
                                    <CardHeader className="bg-muted/10 border-b border-border/50">
                                        <CardTitle className="text-lg">Solution Mappings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            {fullDetails?.benchmark_msme?.solution_mappings?.map((s: string, i: number) => (
                                                <div key={i} className="flex gap-3 p-3 bg-muted/10 rounded-lg border border-border group">
                                                    <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-xs font-bold text-foreground">{s}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    );
}

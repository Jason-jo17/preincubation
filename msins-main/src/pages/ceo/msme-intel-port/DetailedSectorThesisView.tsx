import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Target, CheckCircle2, Download, Zap, Microscope, TrendingUp, Building2, AlertTriangle, Scale, BookOpen, Link as LinkIcon, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DetailedSectorThesis } from '@/types/msme-sector-registry';

// Mock Automation Hub Data since it wasn't strictly provided in JSON
const MOCK_AUTOMATION_HUB = [
    {
        title: "Predictive Maintenance (AI)",
        domain: "Operations Integration",
        impact: "High",
        roi: "35% Cost Reduction",
        description: "AI-driven sensors tracking asset fatigue in real-time to prevent unplanned downtime."
    },
    {
        title: "Automated Quality Inspection",
        domain: "Quality Assurance",
        impact: "Critical",
        roi: "60% Time Saved",
        description: "Computer vision mapping micro-fractures and defects in critical infrastructure."
    },
    {
        title: "Generative Design Optimization",
        domain: "R&D",
        impact: "Medium",
        roi: "15% Weight Reduction",
        description: "Algorithmic generation of optimal designs minimizing material usage while maintaining strength."
    }
];

interface DetailedSectorThesisViewProps {
    thesis: DetailedSectorThesis;
}

export default function DetailedSectorThesisView({ thesis }: DetailedSectorThesisViewProps) {
    const navigate = useNavigate();
    const sector = thesis;

    const handleBack = () => {
        const basePath = window.location.pathname.startsWith('/ceo') ? '/ceo/thesis' : '/msme/thesis';
        navigate(basePath);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in duration-500">
                {/* Header section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-muted/50 hover:bg-muted" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">{sector.display_name} Thesis</h1>
                                <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">Verified By BOPPL</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm font-medium">Published: {sector.research_date}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2 font-bold shadow-sm">
                        <Download className="h-4 w-4" /> Download PDF Dossier
                    </Button>
                </div>

                {/* 1. Key Metrics Header (Top Row) */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Current Market Size</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black">{sector.market_stats.current_size_display}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Base Year 2024</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Forecast Size</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black text-primary">{sector.market_stats.forecast_size_display}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Projected to {sector.market_stats.forecast_year}</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border border-b-4 border-b-success">
                        <CardHeader className="pb-2 bg-success/5">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">CAGR</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black text-success">{sector.market_stats.cagr}%</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Compound Annual Growth</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Total Companies</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black">{sector.market_structure.total_companies}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Active Entities</p>
                        </CardContent>
                    </Card>
                </div>

                {/* 2. Executive Overview (Middle Row) */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 shadow-sm border-border">
                        <CardHeader className="bg-primary/5 border-b border-border/50">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Target className="h-5 w-5 text-primary" />
                                Executive Summary & Investment Thesis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <p className="text-sm font-medium leading-relaxed text-foreground">
                                {sector.executive_summary}
                            </p>
                            <Separator />
                            <div>
                                <h4 className="font-bold text-sm tracking-tight mb-2 uppercase text-muted-foreground flex items-center gap-2">
                                    <Scale className="h-4 w-4" /> Core Investment Thesis
                                </h4>
                                <p className="text-sm text-foreground leading-relaxed italic border-l-2 border-primary pl-4 py-2 bg-muted/20">
                                    {sector.investment_thesis}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-border">
                        <CardHeader className="bg-muted/10 border-b border-border/50">
                            <CardTitle className="text-lg">Key Findings</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                {sector.key_findings?.map((finding, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                        <span className="text-xs font-semibold text-foreground/90">{finding}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. Deep Dive Tabs Interface (7 Tabs) */}
                <div className="mt-8 border border-border rounded-xl shadow-sm bg-card overflow-hidden">
                    <Tabs defaultValue="subsectors" className="w-full">
                        <TabsList className="w-full justify-start border-b border-border rounded-none bg-muted/10 p-0 h-14 overflow-x-auto flex-nowrap hide-scrollbar">
                            <TabsTrigger value="subsectors" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider">Sub-Sectors</TabsTrigger>
                            <TabsTrigger value="drivers" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider">Growth Drivers</TabsTrigger>
                            <TabsTrigger value="opportunities" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-700 data-[state=active]:bg-emerald-50 bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider transition-colors">Opportunities</TabsTrigger>
                            <TabsTrigger value="automation" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 data-[state=active]:text-amber-700 data-[state=active]:bg-amber-50 bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider transition-colors">Automation Hub</TabsTrigger>
                            <TabsTrigger value="ecosystem" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider">Ecosystem</TabsTrigger>
                            <TabsTrigger value="risks" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-destructive data-[state=active]:text-destructive data-[state=active]:bg-destructive/5 bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider transition-colors">Risks & Policy</TabsTrigger>
                            <TabsTrigger value="references" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-6 py-4 font-bold text-xs uppercase tracking-wider">Sources</TabsTrigger>
                        </TabsList>

                        {/* Tab 1: Sub-Sectors */}
                        <TabsContent value="subsectors" className="p-6 m-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {sector.sub_sectors?.map((sub, i) => (
                                    <Card key={i} className="shadow-sm border-border hover:shadow-md transition-all">
                                        <CardHeader className="bg-muted/10 border-b border-border pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-md font-bold">{sub.name}</CardTitle>
                                                <Badge variant="outline" className="bg-primary/5 font-black text-primary">${sub.market_size}M</Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-4">
                                            <p className="text-xs text-muted-foreground leading-relaxed">{sub.description}</p>
                                            <div className="flex justify-between items-center bg-muted/20 p-2 rounded-md border border-border">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CAGR</span>
                                                <span className="text-sm font-black text-success">{sub.cagr}%</span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Top Players</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {sub.key_players?.map((kp, j) => (
                                                        <Badge key={j} variant="secondary" className="text-[10px]">{kp}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab 2: Growth Drivers */}
                        <TabsContent value="drivers" className="p-6 m-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2">
                                {sector.growth_drivers?.map((driver, i) => (
                                    <Card key={i} className="shadow-sm border-border relative overflow-hidden group hover:border-primary/50 transition-colors">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <TrendingUp className="h-32 w-32 text-primary" />
                                        </div>
                                        <CardHeader className="pb-3 border-b border-border/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[9px] font-black tracking-widest">{driver.type}</Badge>
                                            </div>
                                            <CardTitle className="text-lg">{driver.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-4 relative z-10">
                                            <p className="text-sm font-medium leading-relaxed">{driver.description}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Estimated Impact</span>
                                                        <span className="text-[10px] font-black text-primary">{driver.estimated_impact_percentage}%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${driver.estimated_impact_percentage}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab 3: Opportunities */}
                        <TabsContent value="opportunities" className="p-6 m-0 focus-visible:outline-none">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                                {sector.opportunities?.map((opp, i) => (
                                    <Card key={i} className="border-emerald-200 bg-emerald-50/30 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5">
                                            <Target className="h-40 w-40 text-emerald-600" />
                                        </div>
                                        <CardHeader className="pb-3 border-b border-emerald-100">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 uppercase text-[9px] font-black tracking-widest">
                                                    {opp.type} Opportunity
                                                </Badge>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl font-black text-emerald-700">{opp.overall_score}</span>
                                                    <span className="text-[10px] font-bold text-emerald-600/70">/ 10</span>
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl text-emerald-950">{opp.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-5 relative z-10">
                                            <p className="text-sm font-medium text-emerald-900/80 leading-relaxed">{opp.description}</p>
                                            
                                            <div className="grid grid-cols-3 gap-2 bg-white/60 p-3 rounded-lg border border-emerald-100">
                                                <div className="space-y-1 text-center border-r border-emerald-100">
                                                    <div className="text-[9px] uppercase font-bold tracking-widest text-emerald-600">Market</div>
                                                    <div className="text-sm font-black text-emerald-900">${opp.market_size_estimate}M</div>
                                                </div>
                                                <div className="space-y-1 text-center border-r border-emerald-100">
                                                    <div className="text-[9px] uppercase font-bold tracking-widest text-emerald-600">Capex</div>
                                                    <div className="text-sm font-black text-emerald-900">{opp.capital_requirement}</div>
                                                </div>
                                                <div className="space-y-1 text-center">
                                                    <div className="text-[9px] uppercase font-bold tracking-widest text-emerald-600">TTM</div>
                                                    <div className="text-sm font-black text-emerald-900">{opp.time_to_market_months}mo</div>
                                                </div>
                                            </div>
                                            
                                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm">
                                                View Implementation Roadmap
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab 4: Automation Hub */}
                        <TabsContent value="automation" className="p-6 m-0 focus-visible:outline-none">
                            <div className="grid gap-6">
                                {MOCK_AUTOMATION_HUB.map((auto, i) => (
                                    <div key={i} className="flex flex-col md:flex-row gap-6 p-5 border border-amber-200 bg-amber-50/50 rounded-xl">
                                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-amber-100 rounded-full border-2 border-amber-200">
                                            <Microscope className="h-8 w-8 text-amber-600" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-amber-950">{auto.title}</h3>
                                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">{auto.domain}</Badge>
                                            </div>
                                            <p className="text-sm font-medium text-amber-900/80">{auto.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 flex flex-col justify-center space-y-2 md:w-48 bg-white/60 p-3 rounded-lg border border-amber-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Impact</span>
                                                <span className="text-xs font-black text-amber-900">{auto.impact}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Projected ROI</span>
                                                <span className="text-xs font-black text-amber-900">{auto.roi}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Tab 5: Ecosystem */}
                        <TabsContent value="ecosystem" className="p-6 m-0 focus-visible:outline-none space-y-8">
                            <div>
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-primary" /> Competitive Landscape
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {sector.competitors?.map((comp, i) => (
                                        <Card key={i} className="shadow-sm border-border">
                                            <CardHeader className="pb-2 bg-muted/10 border-b border-border/50">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle className="text-md">{comp.name}</CardTitle>
                                                    <Badge variant="outline" className="uppercase text-[9px] font-black">{comp.type.replace('_', ' ')}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-4 grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Market Share</div>
                                                    <div className="text-lg font-black">{comp.market_share}%</div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Est. Rev</div>
                                                    <div className="text-lg font-black">${comp.revenue}M</div>
                                                </div>
                                                <div className="col-span-2 space-y-2 mt-2">
                                                    <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Key Strengths</div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {comp.key_strengths?.map((str, j) => (
                                                            <Badge key={j} variant="secondary" className="bg-muted text-foreground/80 hover:bg-muted font-semibold text-[10px]">
                                                                {str}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" /> Featured Emerging Leaders
                                </h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {sector.emerging_companies?.map((co, i) => (
                                        <div key={i} className="p-4 border border-border rounded-xl bg-card hover:border-primary/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center font-black">
                                                    <Building2 className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{co.name}</h4>
                                                    <p className="text-[10px] text-muted-foreground font-mono">{co.id}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground font-medium">{co.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Tab 6: Risks & Policy */}
                        <TabsContent value="risks" className="p-6 m-0 focus-visible:outline-none">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-black flex items-center gap-2 border-b border-border pb-2">
                                        <BookOpen className="h-5 w-5 text-primary" /> Key Policies
                                    </h3>
                                    <div className="space-y-4">
                                        {sector.policies?.map((pol, i) => (
                                            <div key={i} className="p-4 border border-border rounded-xl bg-muted/5 relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-md">{pol.name}</h4>
                                                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary">{pol.type}</span>
                                                    </div>
                                                    <Badge variant="outline" className={pol.status === 'active' ? 'bg-success/10 text-success border-success/30' : ''}>
                                                        {pol.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm mt-3 text-muted-foreground">{pol.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-lg font-black flex items-center gap-2 border-b border-border pb-2">
                                        <AlertTriangle className="h-5 w-5 text-destructive" /> Risk Factors
                                    </h3>
                                    <div className="space-y-4">
                                        {sector.risks?.map((risk, i) => (
                                            <div key={i} className="p-4 border border-destructive/20 rounded-xl bg-destructive/5 relative overflow-hidden">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-md text-destructive">{risk.name}</h4>
                                                    <Badge variant="destructive" className="uppercase text-[9px] font-black">{risk.severity}</Badge>
                                                </div>
                                                <p className="text-sm mt-3 text-foreground/80 font-medium">{risk.description}</p>
                                                <div className="mt-4 pt-4 border-t border-destructive/10">
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-destructive/70 mb-2 block">Actionable Mitigations</span>
                                                    <ul className="list-disc pl-4 space-y-1">
                                                        {risk.mitigation?.map((mit, j) => (
                                                            <li key={j} className="text-xs font-semibold text-destructive/90">{mit}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Tab 7: Sources */}
                        <TabsContent value="references" className="p-6 m-0 focus-visible:outline-none">
                            <div className="space-y-4">
                                {sector.citations?.map((cit, i) => (
                                    <div key={i} className="p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="font-mono text-[10px]">[^{cit.citation_number}]</Badge>
                                                <h4 className="font-bold text-sm">{cit.title} ({cit.publication_year})</h4>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="font-bold">{cit.source_name}</span>
                                                <span>•</span>
                                                <span className="uppercase tracking-widest text-[9px] font-black">{cit.source_type}</span>
                                            </div>
                                            <p className="text-xs italic border-l-2 border-primary/30 pl-2 mt-2">"{cit.excerpt}"</p>
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {cit.tags?.map((tag, j) => (
                                                    <span key={j} className="text-[9px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase tracking-widest">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <a href={cit.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0">
                                            <LinkIcon className="h-3 w-3" /> View Source
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    );
}

import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Target, CheckCircle2, Shield, AlertTriangle, Zap, Download } from 'lucide-react';
import { MH_SECTORS_DATA } from '@/lib/data/msme-sectors-data';
import DetailedSectorThesisView from './DetailedSectorThesisView';
import { AEROSPACE_SECTOR_THESIS } from '@/lib/data/aerospace-sector-thesis';
import { PORT_SECTOR_THESIS } from '@/lib/data/port-sector-thesis';

const THESIS_MAP: Record<string, any> = {
    'aerospace': AEROSPACE_SECTOR_THESIS,
    'port-logistics': PORT_SECTOR_THESIS,
};

export default function SectorThesisDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // GUARD: If this is a newly digitized sector, return the highly specific 7-tab component
    if (id && THESIS_MAP[id]) {
        return <DetailedSectorThesisView thesis={THESIS_MAP[id]} />;
    }

    // Find matching sector by code (Legacy path)
    const sectorDef = MH_SECTORS_DATA.find(s => s.sector_code === id);
    const sector = sectorDef || MH_SECTORS_DATA[0];

    const cagr = sector.overview.gsdp_contribution_percent || '12.5';
    
    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-muted/50 hover:bg-muted" onClick={() => navigate(-1)}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">{sector.sector_name} Thesis</h1>
                                <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">Verified By BOPPL</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm font-medium">Published: Oct 2025 • Active Regional Strategy</p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2 font-bold shadow-sm">
                        <Download className="h-4 w-4" /> Download PDF Dossier
                    </Button>
                </div>

                {/* Key Stats Row */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Market Size</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black">₹{sector.overview.market_size_maharashtra_inr_cr}<span className="text-lg text-muted-foreground font-bold">Cr</span></div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Estimated (MH)</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Employment</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black text-primary">{sector.overview.employment_direct}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Direct Jobs</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border border-b-4 border-b-success">
                        <CardHeader className="pb-2 bg-success/5">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">GSDP Rank</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black text-success">{cagr}%</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">State Contribution</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="pb-2 bg-muted/10">
                            <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">Identified Nodes</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="text-3xl font-black">{sector.overview.number_of_msmes_approx}</div>
                            <p className="text-xs text-muted-foreground mt-1 font-bold">Active MSME Entities</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Executive Summary & Key Findings */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 shadow-sm border-border">
                        <CardHeader className="bg-primary/5 border-b border-border/50">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Target className="h-5 w-5 text-primary" />
                                Sector Overview & Execution Context
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <p className="text-sm font-medium leading-relaxed text-foreground">
                                Maharashtra's {sector.sector_name} sector represents {sector.overview.maharashtra_share_of_national_market_percent}% of the national market footprint. 
                                Operating primarily across {sector.overview.key_clusters.join(", ")}, the ecosystem houses an estimated {sector.msme_landscape?.msme_count_approx || 'sizable number'} of MSMEs specializing in critical value-add operations. 
                                The sector shows a {sector.technology_adoption?.current_level || 'variable'} tech readiness level.
                            </p>
                            <Separator />
                            <div>
                                <h4 className="font-bold text-sm tracking-tight mb-2 uppercase text-muted-foreground">Typical Operational Profile</h4>
                                <p className="text-sm text-foreground leading-relaxed italic border-l-2 border-primary pl-4 py-1">
                                    {sector.msme_landscape?.typical_msme_activities?.join(" • ") || "Diverse operational capabilities mapping to broader tier-1 structures."}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm border-border">
                        <CardHeader className="bg-muted/10 border-b border-border/50">
                            <CardTitle className="text-lg">Key Players Mapping</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                {sector.major_players?.slice(0, 4).map((p, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
                                        <div className="space-y-0.5">
                                            <span className="text-sm font-bold block">{p.company_name}</span>
                                            <span className="text-xs text-muted-foreground">{p.location} • {p.category}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Tabs defaultValue="opportunities" className="w-full">
                        <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                            <TabsTrigger value="opportunities" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-4 py-3 font-bold">Growth Vectors</TabsTrigger>
                            <TabsTrigger value="risks" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none bg-transparent px-4 py-3 font-bold">Vulnerabilities</TabsTrigger>
                        </TabsList>

                        <TabsContent value="opportunities" className="pt-6 space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {sector.growth_drivers?.map((driver, i) => (
                                    <Card key={i} className="relative overflow-hidden group border-border hover:border-success/50 transition-colors shadow-sm">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Zap className="h-24 w-24 text-success" />
                                        </div>
                                        <CardHeader className="pb-2 bg-success/5 border-b border-success/10">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-success border-success/30 bg-success/10">
                                                        Strategic Driver
                                                    </Badge>
                                                    <CardTitle className="text-lg font-bold">{driver}</CardTitle>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pt-6">
                                            <p className="text-sm text-foreground leading-relaxed font-semibold">
                                                This vector unlocks scale potential by expanding end-market accessibility for localized sub-contractors and directly improving macro yield rates.
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="risks" className="pt-6 space-y-6">
                             <div className="grid gap-6 md:grid-cols-2">
                                {sector.pain_points?.map((pain, i) => (
                                    <Card key={i} className="shadow-sm border-border">
                                        <CardHeader className="bg-destructive/5 border-b border-destructive/10">
                                            <CardTitle className="flex items-start gap-2 text-md leading-tight">
                                                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                                                {pain}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-5 pt-6">
                                            <div className="space-y-3">
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    Represents a systemic gap negatively impacting the compounding trajectory of regional tier-3 and tier-4 participants.
                                                </p>
                                                <div className="bg-muted/20 p-3 flex rounded-lg text-xs border border-border">
                                                    <span className="font-bold text-foreground mr-1 uppercase tracking-widest text-[9px] mt-[1px]">Mitigation logic: </span>
                                                    <span className="text-muted-foreground font-medium flex-1">Require strategic policy or focused capital deployment frameworks to offset baseline decay.</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                             </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </DashboardLayout>
    );
}

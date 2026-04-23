'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { REGIONAL_DATA } from '@/lib/demo-data/regional';
import { NEW_COMPANIES } from '@/lib/demo-data/new-companies';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Zap, 
    TrendingUp, 
    Target, 
    AlertCircle, 
    CheckCircle2, 
    Globe, 
    Building2,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export default function RegionalSectorDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sectorId = params.sectorId as string;
    const regionId = searchParams.get('region') || 'mangalore';
    
    if (!isMounted) return null;

    const regionData = REGIONAL_DATA[regionId];
    const sector = regionData?.priority_sectors?.find(s => s.id === sectorId);

    // Filter regional companies that match this sector
    // We use sub_sector or description matching as the data matures
    const regionalMSMEs = NEW_COMPANIES.filter(company => {
        const isSameRegion = company.headquarters_city?.toLowerCase().includes(regionId.toLowerCase());
        
        // Basic sector matching logic
        const matchesSector = 
            company.sector?.toLowerCase() === sectorId.toLowerCase() ||
            company.sub_sector?.toLowerCase().includes(sectorId.replace('-', ' ').toLowerCase()) ||
            (sectorId === 'aerospace-defense' && (company.id === 'ata-001' || (company.sector as any) === 'manufacturing')) ||
            (sectorId === 'food-processing' && company.sector === 'agritech');
            
        return isSameRegion && matchesSector;
    });

    if (!sector) {
        return (
            <div className="p-20 text-center">
                <h2 className="text-2xl font-bold">Sector not found</h2>
                <Link href="/regional">
                    <Button variant="link" className="mt-4">Back to Regional Intel</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Breadcrumb / Back */}
            <Link href="/regional" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to {regionData.region_name} Hub
            </Link>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase text-[10px] font-black">
                            {regionData.region_name}
                        </Badge>
                        <Badge variant="secondary" className="uppercase text-[10px] font-black">
                            {sector.adoption_level} Tech Adoption
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">{sector.name}</h1>
                    <p className="text-xl text-blue-600 font-bold">{sector.metrics}</p>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl min-w-[240px]">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Regional Rank</div>
                    <div className="text-3xl font-black">#{regionData.ai_opportunity_ranking?.find((r: any) => sector.name.toLowerCase().includes(r.sector.toLowerCase()) || r.sector.toLowerCase().includes(sector.name.toLowerCase()))?.rank ?? 'N/A'}</div>
                    <div className="text-[10px] text-blue-400 font-bold uppercase mt-1">AI Implementation Priority</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Intelligence & Gaps */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-white to-slate-50/50 overflow-hidden">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-600" />
                                Industrial Intelligence Deep-Dive
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-slate-600 leading-relaxed font-medium">
                                The {sector.name} sector in {regionData.region_name} is a critical economic anchor, characterized by a mix of legacy operations and emerging digital opportunities. 
                                Our analysis identifies significant synergy with local infrastructure and {regionData.sector_synergies.slice(0, 3).join(', ')}.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-wider">Anchor Corporations</div>
                                    <div className="flex flex-wrap gap-2">
                                        {sector.anchor_companies.map(anchor => (
                                            <Badge key={anchor} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-bold">
                                                {anchor}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-5 bg-white rounded-2xl border border-red-100 shadow-sm">
                                    <div className="text-[10px] font-black text-red-400 uppercase mb-3 tracking-wider">Critical Capability Gaps</div>
                                    <ul className="space-y-2">
                                        {sector.gaps.map((gap, i) => (
                                            <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                                <AlertCircle className="h-3 w-3 text-red-500" />
                                                {gap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Globe className="h-32 w-32" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2 text-blue-400">
                                <TrendingUp className="h-5 w-5" />
                                Strategic Roadmap & Market Growth
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Growth Forecast</div>
                                    <div className="text-2xl font-black">+12.5%</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase">CAGR (2025-2030)</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[10px] font-black text-blue-300 uppercase mb-1">MSME Participation</div>
                                    <div className="text-2xl font-black">{Math.floor(Math.random() * 40) + 30}%</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase">Value Chain Share</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Export intensity</div>
                                    <div className="text-2xl font-black">High</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase">Global Trade Index</div>
                                </div>
                            </div>
                            <Separator className="bg-white/10" />
                            <div className="space-y-4">
                                <h4 className="font-bold text-blue-300">Regional Development Policy</h4>
                                <p className="text-sm text-slate-300 leading-relaxed italic">
                                    &quot;Under the Nagpur Industrial Policy or Maharashtra Package Scheme of Incentives (PSI) 2019, this cluster qualifies for specific technology upgrade incentives and credit-linked subsidies to bridge the automation gap.&quot;
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: AI & Digital Opportunities */}
                <div className="space-y-6">
                    <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-300" />
                                AI Implementation Map
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            {sector.ai_opportunities.map((opp, i) => (
                                <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/15 transition-colors group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="h-6 w-6 rounded-full bg-amber-300 text-slate-900 text-[10px] flex items-center justify-center font-black">
                                            {i + 1}
                                        </div>
                                        <Badge variant="outline" className="border-white/20 text-white text-[9px]">
                                            {(65 + (i * 7) % 30).toFixed(0)}% ROI
                                        </Badge>
                                    </div>
                                    <div className="font-black text-sm mb-1">{opp}</div>
                                    <div className="text-[10px] text-blue-200 font-medium">Targeted automation for MSME efficiency</div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full text-xs font-bold text-white hover:bg-white/10">
                                Join Implementation Cohort <TrendingUp className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-indigo-100 shadow-lg border-2 border-dashed">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">
                                Connection Network
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: 'KCCI Working Group', role: 'Policy Advocacy' },
                                { name: 'KDEM Cluster Head', role: 'Tech Implementation' },
                                { name: 'NITK Research Hub', role: 'Innovation Partner' }
                            ].map(conn => (
                                <div key={conn.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border shadow-sm">
                                        <Users className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">{conn.name}</div>
                                        <div className="text-[9px] text-slate-500 font-bold uppercase">{conn.role}</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Regional MSME Portfolio Section */}
            {regionalMSMEs.length > 0 && (
                <div className="space-y-6 pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 italic uppercase">Strategic MSME Portfolio</h2>
                            <p className="text-slate-500 font-bold text-sm">Deep-dive intelligence for {sector.name} companies in {regionData.region_name}</p>
                        </div>
                        <Badge className="bg-blue-600 text-white font-black">{regionalMSMEs.length} ACTIVE PROFILES</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regionalMSMEs.map(company => (
                            <Link key={company.id} href={`/companies/${company.id}`}>
                                <Card className="group hover:border-blue-500 transition-all hover:shadow-2xl cursor-pointer bg-white overflow-hidden border-2 border-slate-100">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className={
                                                company.rag_status === 'green' ? 'bg-green-50 text-green-700 border-green-200 uppercase text-[9px]' :
                                                company.rag_status === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200 uppercase text-[9px]' :
                                                'bg-red-50 text-red-700 border-red-200 uppercase text-[9px]'
                                            }>
                                                {company.rag_status} Status
                                            </Badge>
                                            <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors uppercase">View Intel →</span>
                                        </div>
                                        <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">{company.name}</CardTitle>
                                        <CardDescription className="text-xs font-bold text-slate-500">{company.sub_sector || company.sector}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Overall Score</div>
                                                <div className="text-xl font-black text-slate-900">{company.overall_score || 0}%</div>
                                            </div>
                                            <div>
                                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">Growth (YoY)</div>
                                                <div className="text-xl font-black text-blue-600">{company.revenue_growth_yoy || 0}%</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-500"></div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

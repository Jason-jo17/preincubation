'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
    Network, 
    Building2, 
    TrendingUp, 
    Map, 
    Users, 
    Zap, 
    Ship, 
    Droplets, 
    Cpu, 
    Utensils, 
    Stethoscope, 
    Waves,
    ArrowUpRight,
    Search,
    MapPin,
    Building
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageContainer } from '@/components/shared/page-container';
import { ContentCard } from '@/components/shared/content-card';
import { MetricCard } from '@/components/dashboard/metric-card';
import { REGIONAL_DATA } from '@/lib/demo-data/regional';
import { cn } from '@/lib/utils';

export default function RegionalIntelPage() {
    const [selectedRegionId, setSelectedRegionId] = useState('nagpur');
    const data = REGIONAL_DATA[selectedRegionId] || REGIONAL_DATA['nagpur'];

    const getSectorIcon = (sectorId: string) => {
        switch (sectorId) {
            case 'healthcare': return Stethoscope;
            case 'fisheries': return Waves;
            case 'aerospace-defense': return Zap;
            case 'logistics': return Ship;
            case 'it-ites': return Cpu;
            case 'food-processing': return Utensils;
            default: return Building2;
        }
    };

    return (
        <PageContainer 
            title="Regional Intelligence Hub" 
            description="Strategic economic correlation and industrial synergy markers across clusters"
            actions={
                <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Hub Location:</span>
                    <Select value={selectedRegionId} onValueChange={setSelectedRegionId}>
                        <SelectTrigger className="w-[180px] h-8 border-none shadow-none font-bold text-blue-600 focus:ring-0 text-xs">
                            <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                            <SelectItem value="mangalore" className="text-xs font-medium">Dakshina Kannada</SelectItem>
                            <SelectItem value="blr-bel" className="text-xs font-medium">Bangalore-Belagavi</SelectItem>
                            <SelectItem value="nagpur" className="text-xs font-medium">Nagpur / Vidarbha</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            }
        >
            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(data.economic_indicators).map(([key, value], idx) => (
                    <MetricCard 
                        key={idx}
                        title={key}
                        value={value}
                        icon={<Building className="h-4 w-4" />}
                        description="Regional Baseline"
                    />
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Insight Section */}
                <div className="lg:col-span-2 space-y-6">
                    <ContentCard 
                        title={`${data.region_name} Ecosystem Analysis`}
                        description={`Deep industrial map and infrastructure dependencies • ${data.hub_type}`}
                        headerActions={
                             <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[9px] font-bold tracking-wider px-2">
                                {data.hub_type}
                            </Badge>
                        }
                    >
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                                <div className="text-center px-4">
                                    <div className="text-4xl font-bold text-slate-900 tracking-tighter">{(data.correlation_score * 100).toFixed(0)}%</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Ecosystem Synergy</div>
                                </div>
                                <Separator orientation="vertical" className="hidden md:block h-12 bg-slate-200" />
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                        {data.region_name} represents a high-density industrial corridor where anchor-led growth creates significant downstream MSME opportunities.
                                    </p>
                                    {data.executive_summary && (
                                        <p className="text-[11px] text-slate-500 italic leading-snug">
                                            "{data.executive_summary}"
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Regional Comparison Section */}
                            {data.comparison_data && (
                                <div className="p-5 bg-blue-50/30 border border-blue-100 rounded-2xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Regional Comparison: vs {data.comparison_data.target_city}</h4>
                                        <Badge className="bg-blue-600 text-white text-[8px]">STRATEGIC DELTA</Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {Object.entries(data.comparison_data.metrics).map(([key, val]) => (
                                            <div key={key} className="space-y-1">
                                                <div className="text-[9px] text-slate-400 font-bold uppercase">{key}</div>
                                                <div className="text-xs font-semibold text-slate-700">{val as string}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 border-t border-blue-100/50 flex flex-wrap gap-4">
                                        <div className="space-y-1">
                                            <div className="text-[8px] text-emerald-600 font-bold uppercase">Unique to {data.region_name.split(' ')[0]}</div>
                                            <div className="flex gap-1.5">
                                                {data.comparison_data.unique_to_region.map(u => (
                                                    <span key={u} className="text-[10px] text-emerald-700 font-medium px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100">{u}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Priority Sectors Grid */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        <Network className="h-4 w-4 text-blue-600" /> Key Industrial Clusters
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{data.priority_sectors?.length || 0} Sectors Mapped</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {data.priority_sectors?.map((sector) => {
                                        const Icon = getSectorIcon(sector.id);
                                        return (
                                            <Link 
                                                key={sector.id} 
                                                href={`/regional/sectors/${sector.id}?region=${selectedRegionId}`}
                                                className="group p-4 bg-white border border-slate-200/60 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all no-underline"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                                        <Icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                                                    </div>
                                                    <div className={cn(
                                                        "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                                                        sector.adoption_level === 'high' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                                                    )}>
                                                        {sector.adoption_level} ADOPTION
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{sector.name}</h4>
                                                <div className="text-[11px] text-blue-600 font-bold mb-3">{sector.metrics}</div>
                                                
                                                <div className="space-y-2 pt-2 border-t border-slate-50">
                                                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Primary Anchors</div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {sector.anchor_companies.map(c => (
                                                            <span key={c} className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100/50">{c}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </ContentCard>
                </div>

                {/* Right Column: AI & Market Intel */}
                <div className="space-y-6">
                    <ContentCard 
                        title="Strategic Priorities" 
                        description="AI implementation opportunity ranking"
                        headerActions={<Zap className="h-4 w-4 text-amber-500" />}
                    >
                        <div className="space-y-4">
                            {data.ai_opportunity_ranking?.map((opp) => (
                                <div key={opp.rank} className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl group hover:bg-white hover:shadow-sm hover:border-blue-100 transition-all">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-6 w-6 rounded-lg bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                                            {opp.rank}
                                        </div>
                                        <div className="text-xs font-bold text-slate-800 uppercase tracking-tight">{opp.sector}</div>
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-normal font-medium">
                                        {opp.rationale}
                                    </p>
                                </div>
                            ))}
                            {data.research_prompts && (
                                <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Search className="h-3.5 w-3.5 text-amber-600" />
                                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Deep Research Prompts</span>
                                    </div>
                                    <div className="space-y-2">
                                        {data.research_prompts.map((p, i) => (
                                            <div key={i} className="text-[10px] text-amber-900 leading-tight p-2 bg-white/50 rounded border border-amber-100/50">
                                                <span className="font-bold">{p.sector}:</span> {p.prompt}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Button variant="ghost" className="w-full h-9 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2">
                                Access Full Tech Roadmap <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </ContentCard>

                    <div className="p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden group shadow-lg">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                             <Search className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Search className="h-3.5 w-3.5 text-blue-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Market Insight</span>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">The {data.region_name.split(' ')[0]} Landscape</h3>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                A globally connected industrial base where traditional manufacturing coexists with emerging digital exports.
                            </p>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                                <div className="text-[9px] font-bold text-blue-300 uppercase tracking-[0.2em]">Target Outcome (2030)</div>
                                <div className="text-2xl font-bold tracking-tighter">₹40,000 Cr</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase">Regional Tech Potential</div>
                            </div>
                        </div>
                    </div>

                    <ContentCard title="Key Stakeholders" description="Regulatory and trade entities">
                         <div className="space-y-3 mt-2">
                            {data.stakeholders?.map(stake => (
                                <div key={stake.name} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all group">
                                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100">
                                        <Building className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-xs text-slate-900 leading-none">{stake.name}</div>
                                        <div className="text-[10px] text-slate-400 font-medium truncate mt-1">{stake.full}</div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </ContentCard>
                </div>
            </div>
        </PageContainer>
    );
}

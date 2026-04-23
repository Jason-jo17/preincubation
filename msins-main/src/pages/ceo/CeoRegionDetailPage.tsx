import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
    Network, 
    Building2, 
    Zap, 
    Ship, 
    Cpu, 
    Utensils, 
    Stethoscope, 
    Waves,
    ArrowUpRight,
    Search,
    Building,
    ArrowRight,
    SearchCode,
    Lightbulb,
    BarChart3,
    ArrowLeftRight,
    TrendingUp,
    ShieldAlert
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { REGIONAL_DATA } from '@/data/regional-data';
import { NAGPUR_TOTAL_CHALLENGES } from '@/data/nagpur-next-data';
import { cn } from '@/lib/utils';

// High-fidelity Indicator Card
function RegionalIndicatorCard({ label, value, baseline = "Regional Baseline" }: { label: string; value: string; baseline?: string }) {
  return (
    <Card className="border-slate-200/50 shadow-sm bg-white/50 backdrop-blur-sm group hover:border-blue-400 hover:shadow-md transition-all">
      <CardContent className="pt-5 flex flex-col items-start gap-1">
        <div className="flex w-full items-start justify-between mb-3">
          <div className="p-1.5 bg-slate-100 rounded-md text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <Building className="h-4 w-4" />
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-1">{baseline}</p>
      </CardContent>
    </Card>
  );
}

// Cluster Snapshot Card
function ClusterSnapshotCard({ sector, regionId }: { sector: any; regionId: string }) {
  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'aerospace-defense': return Zap;
      case 'auto-ancillaries': return Cpu;
      case 'textiles': return Network;
      case 'healthcare': return Stethoscope;
      case 'it-ites': return Cpu;
      case 'food-processing': return Utensils;
      default: return Building2;
    }
  };

  const Icon = getSectorIcon(sector.id);

  return (
    <Link 
      to={`/ceo/sector/${sector.id}?region=${regionId}`}
      className="group p-5 bg-white border border-slate-200/60 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all no-underline block relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors" />
      
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
          <Icon className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
        </div>
        <Badge variant="outline" className={cn(
          "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
          sector.adoption_level === 'high' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
          sector.adoption_level === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
          'bg-slate-50 text-slate-500 border-slate-200'
        )}>
          {sector.adoption_level} ADOPTION
        </Badge>
      </div>

      <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">{sector.name}</h4>
      <div className="text-[11px] text-blue-600 font-bold mb-4">{sector.metrics}</div>
      
      <div className="space-y-3 pt-3 border-t border-slate-100 relative z-10">
        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Primary Anchors</div>
        <div className="flex flex-wrap gap-1.5">
          {sector.anchor_companies.slice(0, 4).map((c: string) => (
            <span key={c} className="text-[10px] font-semibold bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100 transition-colors group-hover:bg-white">
              {c}
            </span>
          ))}
          {sector.anchor_companies.length > 4 && (
            <span className="text-[10px] font-semibold text-slate-400 px-2 py-1">+{sector.anchor_companies.length - 4} more</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CeoRegionDetailPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    
    // Default to nagpur if not found
    const selectedRegionId = slug && REGIONAL_DATA[slug] ? slug : 'nagpur';
    const data = REGIONAL_DATA[selectedRegionId];

    if (!data) {
        return (
          <DashboardLayout>
            <div className="space-y-3 p-8">
              <h1 className="text-xl font-bold">Region not found</h1>
              <Button asChild><Link to="/ceo/regional-hub">Back to Hub</Link></Button>
            </div>
          </DashboardLayout>
        );
      }

    const synergyPercent = (data.correlation_score * 100).toFixed(0);

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Discovery Intelligence Hub</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Strategic economic correlation and industrial synergy markers across clusters</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Hub Location:</span>
                    <Select value={selectedRegionId} onValueChange={(val) => navigate(`/ceo/region/${val}`)}>
                        <SelectTrigger className="w-[180px] h-8 border-none shadow-none font-bold text-blue-600 focus:ring-0 text-xs">
                            <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200">
                            <SelectItem value="nagpur" className="text-xs font-semibold">Nagpur / Vidarbha</SelectItem>
                            <SelectItem value="mumbai" className="text-xs font-semibold">Mumbai (MMR)</SelectItem>
                            <SelectItem value="pune" className="text-xs font-semibold">Pune Hub</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Top Indicator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <RegionalIndicatorCard label="INVESTMENT COMMITTED" value={data.economic_indicators["Investment Committed"] || data.economic_indicators["GSDP Contribution"]} />
                <RegionalIndicatorCard label={selectedRegionId === 'nagpur' ? "MIHAN SEZ INVESTMENT" : "FINANCIAL CONTROL"} value={data.economic_indicators["MIHAN SEZ Investment"] || data.economic_indicators["Financial Control"]} />
                <RegionalIndicatorCard label={selectedRegionId === 'nagpur' ? "INDUSTRIAL WORKFORCE" : "PORT CAPACITY"} value={data.economic_indicators["Industrial Workforce"] || data.economic_indicators["Port Capacity"]} />
                <RegionalIndicatorCard label={selectedRegionId === 'nagpur' ? "MIDC MSME UNITS" : "MSME DENSITY"} value={data.economic_indicators["MIDC MSME Units"] || data.economic_indicators["MSME Density"]} />
            </div>

            {/* Bottom Indicator Grid (Secondary) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <RegionalIndicatorCard label={selectedRegionId === 'nagpur' ? "POWER CAPACITY" : "IT SECTOR VALUE"} value={data.economic_indicators["Power Capacity"] || data.economic_indicators["IT Sector Value"]} />
                <RegionalIndicatorCard label={selectedRegionId === 'nagpur' ? "INPULSE INNOVATION PRDs" : "INFRASTRUCTURE FOCUS"} value={selectedRegionId === 'nagpur' ? String(NAGPUR_TOTAL_CHALLENGES) : (data.economic_indicators["Infrastructure Focus"] || "N/A")} />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Ecosystem Analysis Box */}
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg font-bold text-slate-900">{data.region_name} Ecosystem Analysis</CardTitle>
                                <CardDescription className="text-xs text-slate-500 font-medium mt-1">
                                    Deep industrial map and infrastructure dependencies • {data.hub_type}
                                </CardDescription>
                            </div>
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[9px] font-bold tracking-widest px-2.5 py-1">
                                {data.hub_type}
                            </Badge>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-col md:flex-row items-center gap-10 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <div className="relative shrink-0 flex flex-col items-center">
                                    <div className="text-5xl font-bold text-slate-900 tracking-tighter">{synergyPercent}%</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">ECOSYSTEM</div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                                        {data.region_name} represents a high-density industrial corridor where anchor-led growth creates significant downstream MSME opportunities.
                                    </p>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">
                                        {data.executive_summary}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Regional Comparison */}
                    {data.comparison_data && (
                        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-800">
                                    REGIONAL COMPARISON: VS {data.comparison_data.target_city.toUpperCase()}
                                </CardTitle>
                                <Badge className="bg-blue-600 text-white border-blue-600 uppercase text-[10px] font-bold tracking-wider px-2">
                                    STRATEGIC DELTA
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Object.entries(data.comparison_data.metrics).map(([label, value]: any) => (
                                        <div key={label} className="space-y-1">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                                            <p className="text-xs font-bold text-slate-800">{value}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3">UNIQUE TO {data.region_name.split(' ')[0].toUpperCase()}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.comparison_data.unique_to_region.map((u: string) => (
                                            <Badge key={u} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] py-1 px-3 rounded-md">
                                                {u}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Industrial Clusters Snapshot */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between px-1">
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                              <Network className="h-4 w-4 text-blue-600" /> KEY INDUSTRIAL CLUSTERS
                          </h3>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {data.priority_sectors?.length || 0} SECTORS MAPPED
                          </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.priority_sectors?.map((sector: any) => (
                          <ClusterSnapshotCard key={sector.id} sector={sector} regionId={selectedRegionId} />
                        ))}
                      </div>
                      <div className="flex justify-center pt-2">
                        <Button variant="outline" size="sm" className="rounded-xl px-8 font-bold text-xs uppercase tracking-wider border-slate-300">
                            Explore Industrial Map <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                </div>

                {/* Right Column: Priorities & Prompts */}
                <div className="space-y-6">
                    {/* Strategic Priorities */}
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-base font-bold text-slate-900">Strategic Priorities</CardTitle>
                            <Zap className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardDescription className="px-6 pb-2 -mt-2 text-xs font-medium text-slate-500">
                            AI implementation opportunity ranking
                        </CardDescription>
                        <CardContent className="pt-2 space-y-4">
                            {data.ai_opportunity_ranking?.map((opp: any) => (
                                <div key={opp.rank} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-sm hover:border-blue-200 transition-all group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-7 w-7 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                                            {opp.rank}
                                        </div>
                                        <div className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{opp.sector}</div>
                                    </div>
                                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                                        {opp.rationale}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Deep Research Prompts */}
                    <Card className="border-orange-100 bg-orange-50/30 overflow-hidden">
                      <CardHeader className="pb-3 border-b border-orange-100/50">
                        <CardTitle className="text-xs font-bold text-orange-900 uppercase tracking-widest flex items-center gap-2">
                          <Search className="h-3.5 w-3.5 text-orange-600" /> DEEP RESEARCH PROMPTS
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y divide-orange-100/50">
                          {data.research_prompts?.map((item: any, idx: number) => (
                            <div key={idx} className="p-4 hover:bg-orange-50 transition-colors">
                              <p className="text-[11px] font-bold mb-1"><span className="text-orange-900">{item.sector}:</span></p>
                              <p className="text-xs text-orange-800 leading-normal font-medium italic opacity-85">
                                "{item.prompt}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Secondary Market Insight Card */}
                    <div className="p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden group shadow-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                             <Search className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 space-y-5">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Search className="h-3.5 w-3.5 text-blue-400" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Regional Tech Potential</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">The {data.region_name.split(' ')[0]} Landscape</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                A globally connected industrial base where traditional manufacturing coexists with emerging digital exports.
                            </p>
                            <div className="pt-4 flex items-baseline gap-2">
                                <span className="text-4xl font-bold tracking-tighter">₹40k Cr</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Target (2030)</span>
                            </div>
                            <Button className="w-full bg-white text-slate-900 hover:bg-white/90 font-bold text-xs uppercase tracking-widest rounded-xl">
                                Full Regional Report
                            </Button>
                        </div>
                    </div>

                    {/* Stakeholders Small List */}
                    <Card className="border-slate-200 shadow-sm bg-white">
                        <CardHeader className="py-4 border-b border-slate-50">
                            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Stakeholders</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-50">
                                {data.stakeholders?.map((stake: any) => (
                                    <div key={stake.name} className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="h-9 w-9 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                                            <Building className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-xs text-slate-900 leading-none mb-1">{stake.name}</div>
                                            <div className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{stake.full}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}


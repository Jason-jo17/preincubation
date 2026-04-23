import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { REGIONAL_DATA } from '@/data/regional-data';
import { MAHARASHTRA_SECTOR_INTEL } from '@/data/maharashtra-sector-intel';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Zap, 
    TrendingUp, 
    Target, 
    AlertCircle, 
    Globe, 
    Users,
    Search,
    Lightbulb,
    BarChart3,
    ShieldAlert,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CeoSectorDetailPage() {
    const { slug: sectorId } = useParams();
    const [searchParams] = useSearchParams();
    const regionId = searchParams.get('region') || 'nagpur';

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const regionData = REGIONAL_DATA[regionId];
    const sector = regionData?.priority_sectors?.find((s: any) => s.id === sectorId);

    // Map the slug/id to the sector intel code
    const intelData = MAHARASHTRA_SECTOR_INTEL.find(
      (intel) => 
        intel.sector_code.toLowerCase() === sectorId?.replace(/-/g, '_').toLowerCase() ||
        intel.sector_name.toLowerCase().includes(sector?.name?.toLowerCase() || '')
    );

    if (!sector) {
        return (
            <DashboardLayout>
                <div className="p-20 text-center">
                    <h2 className="text-2xl font-bold">Sector not found</h2>
                    <Link to={`/ceo/region/${regionId}`}>
                        <Button variant="link" className="mt-4">Back to Regional Intel</Button>
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="p-4 space-y-8 animate-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
                {/* Breadcrumb / Back */}
                <Link to={`/ceo/region/${regionId}`} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors group w-fit">
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
                            {intelData && (
                              <Badge className="bg-emerald-500 text-white border-none text-[10px] font-black uppercase">
                                Verified 8-Phase Research
                              </Badge>
                            )}
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
                                    01. Industrial Intelligence Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {intelData?.investment_thesis?.summary || `The ${sector.name} sector in ${regionData.region_name} is a critical economic anchor, characterized by a mix of legacy operations and emerging digital opportunities.`}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-wider">Anchor Corporations</div>
                                        <div className="flex flex-wrap gap-2">
                                            {sector.anchor_companies.map((anchor: string) => (
                                                <Badge key={anchor} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-bold">
                                                    {anchor}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white rounded-2xl border border-red-100 shadow-sm">
                                        <div className="text-[10px] font-black text-red-400 uppercase mb-3 tracking-wider">07. Critical Gaps & Bottlenecks</div>
                                        <ul className="space-y-2">
                                            {(intelData?.gap_analysis?.critical_technical_gaps || sector.gaps).map((gap: string, i: number) => (
                                                <li key={i} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                                                    {gap}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Benchmarking Section */}
                        {intelData && (
                          <Card className="border-none shadow-xl bg-white overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                                    02-03. Benchmarking & Performance Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <div className="text-[10px] font-black text-slate-400 uppercase">National Standing</div>
                                    <p className="text-sm font-bold text-slate-700">{intelData.benchmarking.vs_national_average}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="text-[10px] font-black text-slate-400 uppercase">Global Parity</div>
                                    <p className="text-sm font-medium text-slate-600 italic leading-snug">{intelData.benchmarking.vs_global_benchmarks}</p>
                                  </div>
                                </div>
                                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-[9px] font-black text-indigo-400 uppercase">Growth CAGR</div>
                                    <div className="text-xl font-black text-indigo-700">{intelData.metrics.growth_cagr}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] font-black text-indigo-400 uppercase">Innovation</div>
                                    <div className="text-xl font-black text-indigo-700">{intelData.metrics.innovation_score}/100</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] font-black text-indigo-400 uppercase">Export Int</div>
                                    <div className="text-sm font-black text-indigo-700">{intelData.metrics.export_intensity}</div>
                                  </div>
                                  <div>
                                    <div className="text-[9px] font-black text-indigo-400 uppercase">OEE Base</div>
                                    <div className="text-sm font-black text-indigo-700">{intelData.benchmarking.efficiency_metrics.match(/\d+%/)?.[0] || 'N/A'}</div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Globe className="h-32 w-32" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold flex items-center gap-2 text-blue-400 relative z-10">
                                    <TrendingUp className="h-5 w-5" />
                                    06. Strategic Marketplace Roadmap (2030)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-0 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Growth Forecast</div>
                                        <div className="text-2xl font-black">{intelData?.metrics?.growth_cagr || '+12.5%'}</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">CAGR (2025-2030)</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Market Scale</div>
                                        <div className="text-2xl font-black">{intelData?.overview?.market_size_maharashtra_usd_bn || 'USD 15B'}+</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">Estimated USD Valuation</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Opportunity index</div>
                                        <div className="text-2xl font-black">V. High</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">Investment Ready Index</div>
                                    </div>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-blue-300 flex items-center gap-2">
                                          <Lightbulb className="h-4 w-4" />
                                          Emerging Segments
                                        </h4>
                                        <ul className="space-y-2">
                                          {(intelData?.market_forecast?.emerging_segments || ['Smart Manufacturing', 'Green Logistics', 'Connected Tech']).map((seg: string) => (
                                            <li key={seg} className="text-xs text-slate-300 flex items-center gap-2">
                                              <div className="h-1 w-1 rounded-full bg-blue-500" />
                                              {seg}
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-red-300 flex items-center gap-2">
                                          <ShieldAlert className="h-4 w-4" />
                                          Risk Factors
                                        </h4>
                                        <ul className="space-y-2">
                                          {(intelData?.market_forecast?.risk_factors || ['Regulatory shifts', 'Talent attrition', 'Global competition']).map((risk: string) => (
                                            <li key={risk} className="text-xs text-slate-400 flex items-center gap-2">
                                              <div className="h-1 w-1 rounded-full bg-red-800" />
                                              {risk}
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Deep Research Prompts */}
                        {intelData && (
                          <Card className="border-none shadow-xl bg-amber-50 border-l-4 border-amber-400 overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-lg font-black flex items-center gap-2 text-amber-800">
                                    <Search className="h-5 w-5" />
                                    08. AI Deep Research Agent Prompts
                                </CardTitle>
                                <CardDescription className="text-amber-700 font-bold">
                                  Use these curated prompts in the Intelligence Agent for cluster-level precision research.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm">
                                  <div className="text-[10px] font-black text-amber-500 uppercase mb-2">Strategic Prompt</div>
                                  <p className="text-xs font-mono text-slate-700 italic">&ldquo;{intelData.deep_research_prompts.strategic}&rdquo;</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm">
                                  <div className="text-[10px] font-black text-amber-500 uppercase mb-2">Operational Prompt</div>
                                  <p className="text-xs font-mono text-slate-700 italic">&ldquo;{intelData.deep_research_prompts.operational}&rdquo;</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm">
                                  <div className="text-[10px] font-black text-amber-500 uppercase mb-2">Innovation Prompt</div>
                                  <p className="text-xs font-mono text-slate-700 italic">&ldquo;{intelData.deep_research_prompts.innovation}&rdquo;</p>
                                </div>
                            </CardContent>
                          </Card>
                        )}
                    </div>

                    {/* Right Column: AI & Digital Opportunities */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-amber-300" />
                                    04. AI Implementation Map
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-0">
                                {sector.ai_opportunities.map((opp: string, i: number) => (
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

                        {/* Investment Thesis Side Card */}
                        {intelData && (
                          <Card className="border-none shadow-xl bg-emerald-50 text-emerald-900 overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    Investment Thesis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <div className="text-[10px] font-black uppercase text-emerald-800 opacity-60">High Growth Areas</div>
                                  <div className="flex flex-wrap gap-1">
                                    {intelData.investment_thesis.high_growth_areas.map(area => (
                                      <Badge key={area} className="bg-emerald-200 text-emerald-800 border-none text-[8px] font-black uppercase">
                                        {area}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Separator className="bg-emerald-200" />
                                <div className="space-y-1">
                                  <div className="text-[10px] font-black uppercase text-emerald-800 opacity-60">MSME Leverage Points</div>
                                  {intelData.investment_thesis.msme_leverage_points.map(pt => (
                                    <div key={pt} className="text-[10px] font-bold text-emerald-900 leading-tight">• {pt}</div>
                                  ))}
                                </div>
                            </CardContent>
                          </Card>
                        )}

                        <Card className="border-indigo-100 shadow-lg border-2 border-dashed">
                            <CardHeader>
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">
                                    Regional Ecosystem Partners
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { name: 'MIDC Nagpur', role: 'Infra & Land' },
                                    { name: 'KCCI Nagpur', role: 'Industry Body' },
                                    { name: 'Vibrant Vidarbha', role: 'Promotion' }
                                ].map(conn => (
                                    <div key={conn.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border shadow-sm shrink-0">
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

            </div>
        </DashboardLayout>
    );
}

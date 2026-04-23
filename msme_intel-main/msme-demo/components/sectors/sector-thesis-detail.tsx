
'use client';

import { SectorThesis } from '@/lib/types/sector-thesis';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2, Shield, Building2, AlertTriangle, Zap, ArrowRight, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectorAutomationList } from '@/components/sectors/sector-automation-list';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SectorThesisDetailProps {
    thesis: SectorThesis;
}

export function SectorThesisDetail({ thesis }: SectorThesisDetailProps) {
    // Parse text to find citations [^n] and replace with clickable superscripts
    const renderTextWithCitations = (text: string) => {
        if (!text) return null;

        // Split text by citation pattern
        const parts = text.split(/(\[\^\d+\])/g);

        return parts.map((part, index) => {
            const match = part.match(/^\[\^(\d+)\]$/);
            if (match) {
                const citationId = match[1];
                return (
                    <sup key={index} className="ml-0.5 text-xs text-blue-500 font-medium cursor-pointer hover:underline">
                        <a href={`#citation-${citationId}`}>
                            [{citationId}]
                        </a>
                    </sup>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Key Stats Row */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Current Market Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{thesis.market_stats.current_size_display}</div>
                        <p className="text-xs text-muted-foreground">Base Year Estimate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Forecast ({thesis.market_stats.forecast_year})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{thesis.market_stats.forecast_size_display}</div>
                        <p className="text-xs text-muted-foreground">Target Size</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">CAGR</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+{thesis.market_stats.cagr}%</div>
                        <p className="text-xs text-muted-foreground">Compound Annual Growth</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{thesis.market_structure.total_companies}</div>
                        <p className="text-xs text-muted-foreground">Active Entities</p>
                    </CardContent>
                </Card>
            </div>

            {/* Executive Summary & Key Findings */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 bg-slate-50 border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Executive Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-lg leading-relaxed text-slate-700">
                            {renderTextWithCitations(thesis.executive_summary)}
                        </p>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-2">Investment Thesis</h4>
                            <p className="text-slate-600">{renderTextWithCitations(thesis.investment_thesis)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Key Findings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {thesis.key_findings.map((finding, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                                    <span className="text-sm">{renderTextWithCitations(finding)}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>


            <Tabs defaultValue="subsectors" className="w-full">
                <TabsList className="grid w-full grid-cols-7 mb-6">
                    <TabsTrigger value="subsectors">Sub-Sectors</TabsTrigger>
                    <TabsTrigger value="drivers">Growth Drivers</TabsTrigger>
                    <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                    <TabsTrigger value="automation" className="bg-amber-500/10 text-amber-400 font-bold italic">Automation Hub</TabsTrigger>
                    <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
                    <TabsTrigger value="risks">Risks & Policy</TabsTrigger>
                    <TabsTrigger value="references" className="flex items-center gap-1">
                        Sources
                        <Badge variant="secondary" className="px-1.5 h-5 text-[10px]">{thesis.citations?.length || 0}</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="subsectors" className="space-y-6">
                    {thesis.sub_sectors.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {thesis.sub_sectors.map((sector, idx) => (
                                <Card key={idx} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{sector.name}</CardTitle>
                                        <CardDescription>{sector.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Market Size</span>
                                            <span className="font-medium">{thesis.market_stats.currency} {sector.market_size} Cr</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">CAGR</span>
                                            <span className="font-medium text-green-600">+{sector.cagr}%</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs font-semibold text-muted-foreground">Top Players</span>
                                            <div className="flex flex-wrap gap-1">
                                                {sector.key_players.map((p, i) => (
                                                    <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {sector.citation_ids && (
                                            <div className="text-[10px] text-muted-foreground mt-2 pt-2 border-t">
                                                Ref: {sector.citation_ids.map(cId => {
                                                    const cit = thesis.citations?.find(c => c.id === cId);
                                                    return cit ? `[${cit.citation_number}] ` : '';
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : <div className="p-8 text-center text-muted-foreground">No sub-sector data available.</div>}
                </TabsContent>

                <TabsContent value="drivers" className="space-y-6">
                    {thesis.growth_drivers.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {thesis.growth_drivers.map((driver, idx) => (
                                <Card key={idx}>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-base">{driver.name}</CardTitle>
                                            <Badge variant={driver.impact_level === 'high' ? 'default' : 'secondary'}>
                                                {driver.type.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-slate-600 mb-2">{driver.description}</p>
                                        {driver.estimated_impact_percentage && (
                                            <div className="text-xs font-medium text-primary mb-2">
                                                Est. Impact: {driver.estimated_impact_percentage}%
                                            </div>
                                        )}
                                        {driver.citation_ids && (
                                            <div className="text-[10px] text-muted-foreground pt-1">
                                                Sources: {driver.citation_ids.map(cId => {
                                                    const cit = thesis.citations?.find(c => c.id === cId);
                                                    return cit ? `[${cit.citation_number}] ` : '';
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : <div className="p-8 text-center text-muted-foreground">No growth driver data available.</div>}
                </TabsContent>

                <TabsContent value="opportunities" className="space-y-6">
                    {thesis.opportunities && thesis.opportunities.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2">
                            {thesis.opportunities.map((opp, idx) => (
                                <Card key={idx} className="relative overflow-hidden group border-l-4 border-l-emerald-500">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Zap className="h-12 w-12 text-emerald-600" />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest text-emerald-600 border-emerald-200 bg-emerald-50">
                                                    {opp.type}
                                                </Badge>
                                                <CardTitle className="text-xl font-bold">{opp.title}</CardTitle>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-3xl font-black text-emerald-600">{opp.overall_score}<span className="text-sm font-medium text-slate-400">/10</span></div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Opportunity Score</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            {renderTextWithCitations(opp.description)}
                                        </p>
                                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Size</p>
                                                <p className="text-sm font-bold text-slate-900">₹{opp.market_size_estimate} Cr</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Capital Req.</p>
                                                <p className="text-sm font-bold text-slate-900">{opp.capital_requirement}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Time to Mkt</p>
                                                <p className="text-sm font-bold text-slate-900">{opp.time_to_market_months} Months</p>
                                            </div>
                                        </div>
                                        {opp.citation_ids && (
                                            <div className="text-[10px] text-muted-foreground pt-1">
                                                Data Source: {opp.citation_ids.map(cId => {
                                                    const cit = thesis.citations?.find(c => c.id === cId);
                                                    return cit ? `[${cit.citation_number}] ` : '';
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                    <div className="p-4 pt-0 bg-slate-50/50 flex justify-end">
                                        <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold uppercase tracking-widest text-[10px] gap-2">
                                            View Implementation Roadmap <ArrowRight className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed">
                            <CardContent className="py-20 text-center space-y-4">
                                <Search className="h-12 w-12 text-slate-300 mx-auto opacity-20" />
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-400">Analysis In Progress</h3>
                                    <p className="text-sm text-slate-400 max-w-sm mx-auto">Specific MSME opportunities for this sector are being evaluated based on current market trends and policy shifts.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                    <SectorAutomationList sectorId={thesis.id} />
                </TabsContent>

                <TabsContent value="ecosystem" className="space-y-6">
                    {/* Emerging Companies (New) */}
                    {thesis.emerging_companies && thesis.emerging_companies.length > 0 && (
                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-600" />
                                    Featured Emerging Leaders
                                </CardTitle>
                                <CardDescription>High-growth companies driving innovation in this sector.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    {thesis.emerging_companies.map((company, idx) => (
                                        <a key={idx} href={`/companies/${company.id}`} className="block group">
                                            <div className="p-4 rounded-lg border bg-white hover:border-blue-300 hover:shadow-md transition-all">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-semibold text-sm group-hover:text-blue-700">{company.name}</h4>
                                                    <Badge variant="outline" className="text-[10px]">Active</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{company.description}</p>
                                                <div className="mt-3 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    View Profile →
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Competitive Landscape</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {thesis.competitors.length > 0 ? thesis.competitors.map((comp, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center shrink-0">
                                            <Building2 className="text-slate-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{comp.name}</h4>
                                            <div className="flex gap-2 my-1">
                                                <Badge variant="secondary" className="text-xs">{comp.type.replace('_', ' ')}</Badge>
                                                <span className="text-xs text-muted-foreground flex items-center">
                                                    Share: {comp.market_share}%
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-600">
                                                Strengths: {comp.key_strengths.join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className="text-muted-foreground">No competitor data available.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="risks" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Key Policies
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {thesis.policies.length > 0 ? thesis.policies.map((policy, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-sm">{policy.name}</span>
                                            <Badge variant={policy.status === 'active' ? 'default' : 'secondary'} className="text-[10px] h-5">{policy.status}</Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{policy.description}</p>
                                    </div>
                                )) : <p className="text-muted-foreground">No policy data available.</p>}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    Risk Factors
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {thesis.risks.length > 0 ? thesis.risks.map((risk, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-sm">{risk.name}</span>
                                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{risk.severity}</Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{risk.description}</p>
                                        {risk.mitigation && (
                                            <div className="bg-slate-50 p-2 rounded text-xs">
                                                <span className="font-semibold">Mitigation: </span>
                                                {risk.mitigation.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                )) : <p className="text-muted-foreground">No risk data available.</p>}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="references" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Bibliography & Sources
                            </CardTitle>
                            <CardDescription>
                                All external reports, data sources, and policy documents referenced in this thesis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {thesis.citations?.map((citation) => (
                                    <div key={citation.id} id={`citation-${citation.citation_number}`} className="flex gap-3 text-sm border-b pb-3 last:border-0 scroll-mt-24">
                                        <div className="font-mono text-xs text-muted-foreground w-8 shrink-0">
                                            [{citation.citation_number}]
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-medium">
                                                {citation.source_name} {citation.publication_year && `(${citation.publication_year})`}. <span className="italic">{citation.title}</span>.
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Badge variant="outline" className="text-[10px] h-5">{citation.source_type}</Badge>
                                                {citation.tags && citation.tags.map(tag => (
                                                    <span key={tag} className="bg-slate-100 px-1 rounded">#{tag}</span>
                                                ))}
                                                {citation.url && (
                                                    <a href={citation.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline ml-2">
                                                        View Source ↗
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(!thesis.citations || thesis.citations.length === 0) && (
                                    <p className="text-muted-foreground">No citations listed for this thesis.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}


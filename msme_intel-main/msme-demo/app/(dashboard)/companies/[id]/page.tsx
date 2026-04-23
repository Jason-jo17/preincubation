'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCompany } from '@/lib/hooks/use-companies';
import { isDemoMode } from '@/lib/config';
import { getDemoFinancials } from '@/lib/demo-data/financials';
import { getDemoMCA } from '@/lib/demo-data/mca';
import { getNewCompanyById } from '@/lib/demo-data/new-companies';
import { DetailedCompanyView } from '@/components/companies/detailed-company-view';
import CompanyCEEDBreakdown from '@/components/companies/company-ceed-breakdown';
import { CompanyInterviewsList } from '@/components/companies/company-interviews';
import { CompanyDisputesList } from '@/components/companies/company-disputes';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanyStats } from '@/components/companies/company-stats';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { Badge } from '@/components/ui/badge';
import { PageContainer } from '@/components/shared/page-container';
import { ContentCard } from '@/components/shared/content-card';
import { cn } from '@/lib/utils';
import { 
    Edit, 
    FileText, 
    Building, 
    Users, 
    ShieldCheck,
    Zap,
    TrendingUp,
    MapPin,
    Globe,
    Scale,
    Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function CompanyDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: company, isLoading } = useCompany(id);

    // Check if it's one of the new detailed companies (Demo Only)
    const detailedCompany = isDemoMode ? getNewCompanyById(id) : null;

    if (detailedCompany) {
        return <DetailedCompanyView company={detailedCompany} />;
    }

    if (isLoading) return <LoadingSkeleton count={5} />;
    
    // Fallback to demo logic for visuals if in demo mode
    const mca = isDemoMode ? getDemoMCA(id) : null;
    const financials = isDemoMode ? getDemoFinancials(id) : null;

    if (!company) return <div className="p-10 text-center">Company not found</div>;

    const navTabs = [
        { value: 'overview', label: 'Company Overview', icon: Building },
        { value: 'intelligence', label: 'CEED Intelligence', icon: Zap },
        { value: 'financials', label: 'Financial Performance', icon: TrendingUp },
        { value: 'governance', label: 'Data Governance', icon: ShieldCheck },
    ];

    return (
        <PageContainer 
            title={company?.name}
            description={`${company?.sector} • ${company?.sub_sector}`}
            breadcrumbs={[
                { label: 'Intelligence Platform', href: '/dashboard' },
                { label: 'Company Registry', href: '/companies' },
                { label: company?.name || 'Company Details' }
            ]}
            actions={
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider border-slate-200">
                        <Edit className="mr-2 h-3.5 w-3.5" />
                        Edit Profile
                    </Button>
                    <Link href={`/companies/${id}/analyze`}>
                        <Button variant="default" size="sm" className="h-8 text-[11px] font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700">
                            <FileText className="mr-2 h-3.5 w-3.5" />
                            Run Gap Analysis
                        </Button>
                    </Link>
                </div>
            }
        >
            <CompanyStats company={company} />

            <Tabs defaultValue="overview" className="w-full space-y-6">
                <TabsList className="bg-slate-100/50 p-1 rounded-xl h-11 border border-slate-200 w-full justify-start overflow-x-auto no-scrollbar">
                    {navTabs.map(tab => (
                        <TabsTrigger 
                            key={tab.value} 
                            value={tab.value} 
                            className="rounded-lg gap-2 font-bold text-[10px] uppercase tracking-wider px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <tab.icon className="h-3.5 w-3.5" /> {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        <ContentCard 
                            title="Operational Context" 
                            description="Core business identity and location"
                            className="lg:col-span-4"
                        >
                            <div className="space-y-6">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {(company as any)?.description || "Strategic MSME operating within the regional industrial corridor, specializing in precision components and manufacturing services."}
                                </p>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" /> Founded
                                        </div>
                                        <div className="text-sm font-semibold">{company?.founded_year || '2014'}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Users className="h-3 w-3" /> Growth Phase
                                        </div>
                                        <div className="text-sm font-semibold capitalize">{company?.stage}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <Globe className="h-3 w-3" /> Digital Presence
                                        </div>
                                        <div className="text-sm font-semibold text-blue-600 truncate">{company?.website || 'N/A'}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <MapPin className="h-3 w-3" /> Headquarters
                                        </div>
                                        <div className="text-sm font-semibold">{company?.headquarters_city}, {company?.headquarters_state}</div>
                                    </div>
                                </div>
                            </div>
                        </ContentCard>

                        <ContentCard 
                            title="Key Personnel" 
                            description="Strategic leadership and directors"
                            className="lg:col-span-3"
                        >
                            <div className="space-y-4">
                                {mca?.directors?.map((director: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-lg border border-slate-100/50 group hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center border border-white shadow-sm group-hover:bg-blue-100">
                                            <Users className="h-4 w-4 text-slate-500 group-hover:text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 leading-none">{director}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Authorized Director</p>
                                        </div>
                                    </div>
                                )) || <p className="text-xs text-slate-400 italic py-4">No leadership data available.</p>}
                            </div>
                        </ContentCard>
                    </div>
                </TabsContent>

                <TabsContent value="intelligence" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ContentCard 
                        title="Strategic CEED Rubric" 
                        description="AI-synthesized evaluation across 4 performance axes"
                    >
                        <CompanyCEEDBreakdown 
                            companyId={id} 
                            analysis={{
                                company_name: company?.name,
                                scores: { core: 75, expansion: 45, efficiency: 88, disruption: 32 },
                                assessments: {
                                    core: { score: 75, sub_scores: { "Stability": 80, "Position": 70 }, evidence: ["ISO Certified", "Tier-1 status"] },
                                    expansion: { score: 45, sub_scores: { "New Mkts": 40 }, evidence: ["Single-cluster dependency"] },
                                    efficiency: { score: 88, sub_scores: { "Automation": 30, "Complexity": 90 }, evidence: ["Manual visual inspection mentioned in MOSI-001", "High rejection rates"] },
                                    disruption: { score: 32, sub_scores: { "AI Readiness": 20 }, evidence: ["Willingness to pilot"] }
                                }
                            }} 
                        />
                    </ContentCard>

                    <CompanyInterviewsList companyId={id} />

                    <ContentCard 
                        title="Strategic Roadmap Preview" 
                        description="Future-state industrial transformation path"
                    >
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
                            <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                                <TrendingUp className="h-8 w-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-slate-900">Digital Transformation Roadmap</h3>
                                <p className="text-xs text-slate-500">Run our AI-powered gap analysis to generate a tailored sequence of strategic initiatives for {company?.name}.</p>
                            </div>
                            <Link href={`/companies/${id}/roadmap`}>
                                <Button size="sm" className="h-9 px-6 bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                                    Access Full Roadmap
                                </Button>
                            </Link>
                        </div>
                    </ContentCard>
                </TabsContent>

                <TabsContent value="financials" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid gap-6 md:grid-cols-2">
                        <ContentCard 
                            title="MCA Registry Summary" 
                            description="Official statutory and registration status"
                        >
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <Scale className="h-3 w-3" /> Registration ID (CIN)
                                    </div>
                                    <div className="text-xs font-mono font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100 inline-block">{mca?.cin || "N/A-DEMO-0012"}</div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <ShieldCheck className="h-3 w-3 text-emerald-500" /> Filing Status
                                    </div>
                                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none font-bold text-[10px] uppercase">{financials?.status || "Active"}</Badge>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Capital</div>
                                    <div className="text-lg font-bold text-slate-900">₹{mca?.authorized_capital ? (mca.authorized_capital / 100000).toFixed(1) + 'L' : "₹45.0 L"}</div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paid-up Capital</div>
                                    <div className="text-lg font-bold text-slate-900">₹{mca?.paid_up_capital ? (mca.paid_up_capital / 100000).toFixed(1) + 'L' : "₹12.5 L"}</div>
                                </div>
                            </div>
                        </ContentCard>

                        <ContentCard 
                            title="Balance Sheet Highlights" 
                            description="Synthesized fiscal health metrics"
                        >
                             <div className="space-y-6">
                                <div className="p-4 bg-blue-50/50 border border-blue-100/50 rounded-xl space-y-1">
                                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Synthesized Net Worth</div>
                                    <div className="text-2xl font-black text-blue-900 tracking-tight">₹{financials?.net_worth_lakhs || '84.2'} L <span className="text-[10px] font-bold text-blue-500 uppercase ml-2 tracking-widest">Cr</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue (FY24)</p>
                                        <p className="text-sm font-bold text-slate-700">₹{financials?.history?.[0]?.revenue || '12.4'} Cr</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Performance</p>
                                        <p className={cn("text-sm font-bold", (financials?.history?.[0]?.profit || 0) >= 0 ? "text-emerald-600" : "text-red-600")}>
                                            {(financials?.history?.[0]?.profit || 0) >= 0 ? '+' : ''}₹{financials?.history?.[0]?.profit || '1.2'} Cr
                                        </p>
                                    </div>
                                </div>
                             </div>
                        </ContentCard>
                    </div>

                    <ContentCard 
                        title="Audited Performance History" 
                        description="Fiscal data trends over the last 3 business cycles"
                    >
                        <div className="relative w-full overflow-hidden rounded-xl border border-slate-100">
                             <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr className="text-slate-400 font-bold uppercase tracking-wider">
                                        <th className="px-6 py-4">Fiscal Cycle</th>
                                        <th className="px-6 py-4">Total Revenue</th>
                                        <th className="px-6 py-4">Net Performance</th>
                                        <th className="px-6 py-4 text-right">Filing Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {(financials?.history || [
                                        { year: "FY 2023-24", revenue: 14.2, profit: 1.8 },
                                        { year: "FY 2022-23", revenue: 11.5, profit: 0.9 },
                                        { year: "FY 2021-22", revenue: 9.8, profit: -0.4 }
                                    ]).map((yearData: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-semibold text-slate-700">{yearData.year}</td>
                                            <td className="px-6 py-4 font-bold text-slate-900 tracking-tight">₹{yearData.revenue} Cr</td>
                                            <td className={cn("px-6 py-4 font-bold", yearData.profit >= 0 ? "text-emerald-600" : "text-red-600")}>
                                                {yearData.profit >= 0 ? '+' : ''}₹{yearData.profit} Cr
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Badge className="bg-slate-100 text-slate-500 border-none rounded text-[9px] px-1.5 py-0">AUDITED</Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                             </table>
                        </div>
                    </ContentCard>
                </TabsContent>

                <TabsContent value="governance" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <CompanyDisputesList companyId={id} />
                </TabsContent>
            </Tabs>
        </PageContainer>
    );
}

"use client";

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DetailedCompany } from "@/lib/types/detailed-company"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
    AlertCircle, 
    CheckCircle2, 
    TrendingUp, 
    Users, 
    Award, 
    Briefcase, 
    Zap, 
    Globe, 
    Building2, 
    MapPin, 
    FileText, 
    ShieldCheck, 
    PiggyBank, 
    Rocket, 
    Flag, 
    Laptop2, 
    Loader2, 
    Lock, 
    Network, 
    Plus,
    MessageSquare,
    Clock,
    PlayCircle,
    Calendar,
    Mic,
    X as CloseIcon,
    ArrowRight,
    Sparkles,
    FileCode,
    Activity
} from "lucide-react"
import { PROGRAMS } from '@/lib/demo-data/programs'
import { StrategicAction } from '@/lib/types/detailed-company'
import { AnimatedLoading } from '@/components/shared/animated-loading'
import { getRoadmap } from '@/lib/demo-data/roadmaps'
import { RoadmapTimeline } from '@/components/roadmap/roadmap-timeline'
import { RoadmapMilestones } from '@/components/roadmap/roadmap-milestones'
import { CompanyFeedback } from './company-feedback'
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions'
import { DEMO_AUTOMATION_NEEDS } from '@/lib/demo-data/automation-needs'
import CEEDRadarChart from '@/components/ceed/ceed-radar-chart'
import InterviewSessionViewer from '@/components/ceed/interview-session-viewer'
import { DueDiligenceAlert } from '@/components/dashboard/due-diligence-alert'
import { FundingOpportunities } from '@/components/ecosystem/funding-opportunities'

interface DetailedCompanyViewProps {
    company: DetailedCompany
}

export function DetailedCompanyView({ company }: DetailedCompanyViewProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTab = searchParams.get('tab') || "gap-analysis";
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isGenerating, setIsGenerating] = useState(false);
    const [roadmapData, setRoadmapData] = useState<any>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
    const [feedbackContext, setFeedbackContext] = useState<string | undefined>(undefined);
    
    // Intelligence Session State
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    
    // Dynamic Needs State
    const [sectorNeeds, setSectorNeeds] = useState<any[]>([]);
    const [isLoadingNeeds, setIsLoadingNeeds] = useState(false);

    const openFeedback = (context?: string) => {
        setFeedbackContext(context);
        setShowFeedback(true);
    };

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) setActiveTab(tab);
    }, [searchParams]);

    const handleGenerateRoadmap = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setRoadmapData(getRoadmap(company.id));
        }, 4000); // 4 second delay
    };

    useEffect(() => {
        const fetchSectorNeeds = async () => {
            if (!company.sector) return;
            setIsLoadingNeeds(true);
            
            // Map sector to automation needs sector_id
            let sectorId = company.sector.toLowerCase();
            
            // Special mapping for Nagpur NEXT cohort
            const isNagpur = company.headquarters_city?.toLowerCase() === 'nagpur' || 
                           company.regional_context?.region_name?.toLowerCase().includes('nagpur');

            if (isNagpur) {
                // Aerospace, Defense, and Engineering firms in Nagpur share this unified sector ID in our data
                if (sectorId.includes('aerospace') || sectorId.includes('defense') || sectorId.includes('engineering') || sectorId.includes('manufacturing')) {
                    sectorId = 'manufacturing-engineering-nagpur';
                }
            } else {
                // Standard mappings
                if (sectorId.includes('aerospace')) sectorId = 'aerospace';
                if (sectorId.includes('manufacturing')) sectorId = 'sector-mfg';
                if (sectorId.includes('logistics')) sectorId = 'sector-log';
            }

            // In demo mode, we filter the static list directly
            const needs = DEMO_AUTOMATION_NEEDS.filter(n => n.sector_id === sectorId);
            setSectorNeeds(needs);
            setIsLoadingNeeds(false);
        };
        fetchSectorNeeds();
    }, [company.sector, company.headquarters_city, company.regional_context]);

    const getQuadrant = (marketShare: number, growth: number) => {
        const isHighGrowth = growth >= 30;
        const isHighShare = marketShare >= 10;

        if (isHighGrowth && !isHighShare) return { label: 'DISRUPTION', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'High Growth, Low Market Share' };
        if (isHighGrowth && isHighShare) return { label: 'EXPANSION', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'High Growth, High Market Share' };
        if (!isHighGrowth && !isHighShare) return { label: 'EFFICIENCY', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Low Growth, Low Market Share' };
        return { label: 'CORE', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Low Growth, High Market Share' };
    };

    const marketShare = (company as any).gap_analysis?.current_penetration_percentage || 5;
    const growth = company.revenue_growth_yoy || 0;
    const quadrant = getQuadrant(marketShare, growth);

    return (
        <div className="space-y-6">
            {company.due_diligence_report && (
                <DueDiligenceAlert 
                    report={company.due_diligence_report} 
                    warning={company.warning} 
                    className="mb-8"
                />
            )}
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">{company.name}</h1>
                        <div className="flex gap-1.5 flex-wrap">
                            <Badge variant={company.rag_status === 'green' ? 'success' : company.rag_status === 'amber' ? 'warning' : 'destructive'} className="capitalize font-black px-2 shadow-sm">
                                {company.rag_status} Status
                            </Badge>
                            <Badge variant="outline" className={`font-black tracking-tighter uppercase text-[9px] px-2 shadow-sm ${quadrant.color}`}>
                                {quadrant.label}
                            </Badge>
                            {company.warning && (
                                <Badge variant="destructive" className="animate-pulse shadow-md font-black px-2 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> VERIFIED MISMATCH
                                </Badge>
                            )}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="ml-4 bg-blue-50/50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white font-black uppercase text-[9px] tracking-widest rounded-xl transition-all duration-300"
                            onClick={() => openFeedback()}
                        >
                            <MessageSquare className="h-3 w-3 mr-1.5 fill-current/10" /> Engagement Console
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2.5 text-slate-500 mt-2">
                        <div className="flex items-center gap-3 bg-slate-100/50 w-fit px-3 py-1.5 rounded-xl border border-slate-200/50">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-blue-600" />
                                <span className="text-xs font-bold text-slate-700">{company.industry_classification || company.sub_sector}</span>
                            </div>
                            <Separator orientation="vertical" className="h-3" />
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs font-bold text-slate-700">{company.headquarters_city}, {company.headquarters_state}</span>
                            </div>
                            {company.website && (
                                <>
                                    <Separator orientation="vertical" className="h-3" />
                                    <div className="flex items-center gap-2 group">
                                        <Globe className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-xs font-extrabold text-blue-600/80 hover:text-blue-700 transition-colors">
                                            {company.website.replace('https://', '').replace(/\/$/, '')}
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        {/* Statutory Intelligence Bar */}
                        <div className="flex items-center gap-4 flex-wrap mt-1">
                            {company.legal_name && (
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
                                    Legal: <span className="text-slate-800">{company.legal_name}</span>
                                </div>
                            )}
                            {company.cin && (
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100/80 rounded border border-slate-200/50">
                                    CIN: <span className="text-slate-800 tabular-nums">{company.cin}</span>
                                </div>
                            )}
                             {company.gstin && (
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-100/80 rounded border border-slate-200/50">
                                    GST: <span className="text-slate-800 tabular-nums">{company.gstin}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold">Thesis Score: {company.overall_score}/100</div>
                    <Badge variant="outline">{company.company_type}</Badge>
                    {company.listing_status === 'Listed' && (
                        <div className="flex gap-2">
                            {company.stock_codes?.BSE && <Badge variant="secondary">BSE: {company.stock_codes.BSE}</Badge>}
                            {company.stock_codes?.NSE && <Badge variant="secondary">NSE: {company.stock_codes.NSE}</Badge>}
                        </div>
                    )}
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="w-full justify-start overflow-x-auto h-auto flex-wrap">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="customers">Customers</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="gap-analysis">Gap Analysis</TabsTrigger>
                    <TabsTrigger value="leadership">Leadership</TabsTrigger>
                    <TabsTrigger value="talent">Talent</TabsTrigger>
                    <TabsTrigger value="brand">Brand</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="innovation">Innovation</TabsTrigger>
                    <TabsTrigger value="interviews" className="bg-blue-600/10 text-blue-600 font-bold italic underline decoration-blue-500/30">
                        Discovery Intel
                    </TabsTrigger>
                    <TabsTrigger value="challenges" className="bg-orange-50 data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                        <Zap className="h-4 w-4 mr-2" /> Challenges
                    </TabsTrigger>
                    <TabsTrigger value="regional" className="bg-indigo-50 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                        <Network className="h-4 w-4 mr-2" /> Regional Intel
                    </TabsTrigger>
                    <TabsTrigger value="consultancy" className="bg-emerald-50 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                        <Award className="h-4 w-4 mr-2" /> Consultancy & IP
                    </TabsTrigger>
                    <TabsTrigger value="roadmap">Strategic Roadmap</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenue (Latest)</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{company.latest_revenue} Cr</div>
                                <p className="text-xs text-muted-foreground">
                                    {company.revenue_growth_yoy && company.revenue_growth_yoy > 0 ? '+' : ''}{company.revenue_growth_yoy}% from last year
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${company.latest_net_profit && company.latest_net_profit < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    ₹{company.latest_net_profit} Cr
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{company.market_cap} Cr</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Employees</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{company.employee_count}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>About Company</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    A leading player in the {company.sector} sector, focusing on {company.sub_sector}.
                                    Headquartered in {company.headquarters_city}, {company.headquarters_state}, the company has established itself as a key partner for global OEMs.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">Founded</span>
                                        <span className="font-semibold">{company.founded_year}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">Company Type</span>
                                        <span className="font-semibold">{company.company_type}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">Data Confidence</span>
                                        <Badge variant="outline" className="w-fit">{company.data_confidence}</Badge>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">Current Stage</span>
                                        <Badge className="w-fit">Stage {company.current_stage}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Market Opportunity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    {company.gap_analysis?.market_opportunity_assessment}
                                </p>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Investment Readiness</span>
                                        <Badge variant={company.gap_analysis?.investment_readiness === 'Ready' ? 'success' : 'warning'}>
                                            {company.gap_analysis?.investment_readiness}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Time to Opportunity</span>
                                        <span className="text-sm">~{18} months</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Success Probability</span>
                                        <span className="text-sm font-bold text-green-600">72.5%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Funding Intelligence */}
                    {(company.headquarters_city === 'Nagpur' || company.regional_context?.region_name?.includes('Nagpur')) && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                             <div className="flex items-center gap-2 mb-6">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] italic">Active Intelligence <span className="text-blue-600 font-black">Modules</span></h3>
                                <div className="h-px flex-1 bg-slate-100" />
                             </div>
                             <div className="grid gap-6">
                                <FundingOpportunities />
                             </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="gap-analysis" className="space-y-6">
                    {/* Top Row with Radar Chart */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-6">
                            <div className="grid gap-4 grid-cols-2">
                                <Card className="bg-slate-50 border-slate-200">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="text-sm font-medium text-muted-foreground mb-1">Overall Score</div>
                                        <div className="text-4xl font-bold text-primary mb-2">{company.gap_analysis?.overall_gap_score}/100</div>
                                        <Badge variant={company.gap_analysis?.investment_readiness === 'Ready' ? 'success' : 'warning'}>
                                            {company.gap_analysis?.investment_readiness} Phase
                                        </Badge>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-50 border-slate-200">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        <div className="text-sm font-medium text-muted-foreground mb-1">Success Prob.</div>
                                        <div className="text-4xl font-bold text-green-600 mb-2">{company.gap_analysis?.probability_of_success_percentage || 'N/A'}%</div>
                                        <span className="text-sm text-muted-foreground">Estimated</span>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            <Card className="border-red-100 bg-red-50/10">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertCircle className="h-5 w-5" />
                                        <CardTitle className="text-lg">Critical Gaps</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-inside space-y-2 text-sm font-medium">
                                        {company.gap_analysis?.critical_gaps?.map((gap, i) => (
                                            <li key={i} className="flex items-start gap-2 group">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                                <span className="flex-1">{gap}</span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-500"
                                                    onClick={() => openFeedback(`Critical Gap: ${gap.substring(0, 20)}...`)}
                                                >
                                                    <MessageSquare className="h-3 w-3" />
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <CEEDRadarChart 
                            core={85}
                            expansion={60}
                            efficiency={45}
                            disruption={30}
                            companyName={company.name}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 8 Dimensions Detail */}
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>8-Dimension Scorecard</CardTitle>
                                <CardDescription>Detailed breakdown of strategic health</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { label: 'Market Saturation', score: company.gap_analysis?.market_saturation_score, text: company.gap_analysis?.market_saturation_diagnosis },
                                    { label: 'Founder Quality', score: company.gap_analysis?.founder_quality_score, text: company.gap_analysis?.founder_quality_assessment },
                                    { label: 'Business Maturity', score: company.gap_analysis?.business_maturity_score, text: company.gap_analysis?.business_maturity_assessment },
                                    { label: 'Market Opportunity', score: company.gap_analysis?.market_opportunity_score, text: company.gap_analysis?.market_opportunity_assessment },
                                    { label: 'Leadership Quality', score: company.gap_analysis?.leadership_quality_score, text: company.gap_analysis?.leadership_quality_assessment },
                                    { label: 'Innovation', score: company.gap_analysis?.innovation_differentiator_score, text: company.gap_analysis?.innovation_assessment },
                                    { label: 'Talent Pool', score: company.gap_analysis?.talent_pool_score, text: company.gap_analysis?.talent_assessment },
                                    { label: 'Brand Identity', score: company.gap_analysis?.brand_identity_score, text: company.gap_analysis?.brand_assessment },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{item.label}</span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-5 w-5 text-slate-300 hover:text-blue-500"
                                                    onClick={() => openFeedback(`Gap: ${item.label}`)}
                                                >
                                                    <MessageSquare className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Badge variant={item.score && item.score > 75 ? 'success' : item.score && item.score > 50 ? 'warning' : 'destructive'}>
                                                {item.score}/100
                                            </Badge>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.score && item.score > 75 ? 'bg-green-500' : item.score && item.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${item.score}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-muted-foreground border-l-2 pl-2 border-slate-200">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Qualitative Analysis (Flags & Gaps) */}
                        <div className="space-y-6">
                            {/* Founder Flags */}
                            {company.gap_analysis?.founder_quality_red_flags && (
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Founder Risk Analysis</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="text-xs font-semibold text-red-600 mb-2 uppercase tracking-wider">Red Flags</div>
                                            <ul className="space-y-1">
                                                {company.gap_analysis.founder_quality_red_flags.map((flag, i) => (
                                                    <li key={i} className="text-sm flex items-start gap-2">
                                                        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                                        <span>{flag}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {company.gap_analysis.founder_quality_green_flags && (
                                            <div>
                                                <div className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wider">Green Flags</div>
                                                <ul className="space-y-1">
                                                    {company.gap_analysis.founder_quality_green_flags.map((flag, i) => (
                                                        <li key={i} className="text-sm flex items-start gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                                            <span>{flag}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            <Alert className="bg-blue-50 border-blue-200">
                                <Zap className="h-4 w-4 text-blue-600" />
                                <AlertTitle className="text-blue-800">Immediate Actions Required</AlertTitle>
                                <AlertDescription className="mt-2">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-900">
                                        {company.gap_analysis?.immediate_actions?.map((action, i) => (
                                            <li key={i}>{typeof action === 'string' ? action : action.title}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>

                            <Card className="bg-blue-600 text-white border-none shadow-xl overflow-hidden relative">
                               <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                                  <Rocket className="h-24 w-24" />
                               </div>
                               <CardHeader>
                                  <CardTitle className="text-xl font-black italic uppercase tracking-tight">Intelligence Strategy</CardTitle>
                                  <CardDescription className="text-blue-100 font-medium italic">Synthesize discovery logs and gaps into a unified roadmap.</CardDescription>
                               </CardHeader>
                               <CardContent>
                                  <Button 
                                     size="lg" 
                                     className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black uppercase tracking-widest rounded-2xl h-14 shadow-lg"
                                     onClick={() => {
                                        setActiveTab('roadmap');
                                        if (!roadmapData) handleGenerateRoadmap();
                                     }}
                                  >
                                     <Sparkles className="mr-2 h-5 w-5" /> Generate Strategic Roadmap
                                  </Button>
                               </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Concentration Risk</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{company.client_demographics?.concentration_risk}</div>
                                <p className="text-xs text-muted-foreground">Top 3 clients contribute {company.client_demographics?.top_3_clients_percentage}% of revenue</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Export Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{company.client_demographics?.export_percentage}%</div>
                                <p className="text-xs text-muted-foreground">Vs. {company.client_demographics?.domestic_india_percentage}% Domestic</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Sector Split</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{company.client_demographics?.civil_aviation_percentage}%</div>
                                <p className="text-xs text-muted-foreground">Civil Aviation (Primary)</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Major Clients & Contracts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Client Name</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Relationship</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Revenue %</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {company.clients?.map((client, idx) => (
                                            <tr key={idx} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium flex items-center gap-2">
                                                    {client.client_name}
                                                    {client.is_top_3_client && <Badge variant="secondary" className="text-[10px] h-4">Top 3</Badge>}
                                                </td>
                                                <td className="p-4 align-middle">{client.client_type}</td>
                                                <td className="p-4 align-middle">
                                                    {client.relationship_duration_years} Years
                                                    <div className="text-xs text-muted-foreground">{client.has_long_term_contract ? 'Long-term Contract' : 'Standard'}</div>
                                                </td>
                                                <td className="p-4 align-middle">{client.revenue_contribution_percentage}%</td>
                                                <td className="p-4 align-middle"><Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Active</Badge></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="financials">
                    {/* MCA & Balance Sheet Row */}
                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    MCA Registration Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">CIN</label>
                                        <div className="font-semibold text-sm">{company.cin || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">GSTIN</label>
                                        <div className="font-semibold text-sm">{company.gstin || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">PAN</label>
                                        <div className="font-semibold text-sm">{company.pan || 'N/A'}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">Status</label>
                                        <div className="font-semibold text-sm text-green-600 capitalize">{company.company_status || 'Active'}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Balance Sheet Highlights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">Authorized Cap.</label>
                                        <div className="font-bold text-lg">₹{company.authorized_capital ? company.authorized_capital.toLocaleString() : 'N/A'} {company.authorized_capital && company.authorized_capital < 1000 ? 'Cr' : ''}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase">Paid-up Cap.</label>
                                        <div className="font-bold text-lg">₹{company.paid_up_capital ? company.paid_up_capital.toLocaleString() : 'N/A'} {company.paid_up_capital && company.paid_up_capital < 1000 ? 'Cr' : ''}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs text-muted-foreground uppercase">Net Worth</label>
                                        <div className="font-bold text-xl text-blue-600">₹{company.net_worth ? company.net_worth.toLocaleString() : 'N/A'} {company.net_worth && company.net_worth < 1000 ? 'Cr' : ''}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Performance History</CardTitle>
                            <CardDescription>Consolidated financial statements (₹ Crores)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm text-left">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50">
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Fiscal Year</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Revenue</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Net Profit</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Margins</th>
                                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Debt/Equity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {company.financials?.map((fin, idx) => (
                                            <tr key={idx} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle font-medium">{fin.fiscal_year}</td>
                                                <td className="p-4 align-middle">₹{fin.revenue}</td>
                                                <td className={`p-4 align-middle ${fin.net_profit < 0 ? 'text-red-500' : 'text-green-500'}`}>₹{fin.net_profit}</td>
                                                <td className="p-4 align-middle text-xs">
                                                    <div>NPM: {fin.net_margin_percentage}%</div>
                                                    {fin.ebitda_margin_percentage && <div>EBITDA: {fin.ebitda_margin_percentage}%</div>}
                                                </td>
                                                <td className="p-4 align-middle">{fin.debt_to_equity_ratio ?? 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="leadership" className="space-y-8">
                    {/* Founders Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black italic tracking-tight uppercase">Founding <span className="text-blue-600">Team</span></h3>
                            <Badge variant="outline" className="font-bold border-blue-200 text-blue-600 bg-blue-50">
                                {company.founders?.length || 0} FOUNDERS
                            </Badge>
                        </div>

                        {company.founders && company.founders.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {company.founders.map((founder, idx) => (
                                    <Card key={idx} className="overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all group">
                                        <div className="h-1.5 w-full bg-slate-100 group-hover:bg-blue-600 transition-colors" />
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg">
                                                    {founder.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                                        <h4 className="font-black text-slate-900 text-lg leading-tight tracking-tight italic">{founder.name}</h4>
                                                        {founder.is_promoter && (
                                                            <Badge className="bg-blue-600 text-white border-none text-[9px] font-black uppercase tracking-wider">Promoter</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{founder.current_role}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                {founder.age && (
                                                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                                        <div className="text-lg font-black text-slate-900">{founder.age}</div>
                                                        <div className="text-[9px] font-black text-slate-400 uppercase">Age</div>
                                                    </div>
                                                )}
                                                {founder.years_in_sector && (
                                                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                                                        <div className="text-lg font-black text-slate-900">{founder.years_in_sector}</div>
                                                        <div className="text-[9px] font-black text-slate-400 uppercase">Yrs Sector</div>
                                                    </div>
                                                )}
                                                {founder.equity_stake && (
                                                    <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                                                        <div className="text-lg font-black text-blue-600">{founder.equity_stake}%</div>
                                                        <div className="text-[9px] font-black text-blue-400 uppercase">Equity</div>
                                                    </div>
                                                )}
                                            </div>

                                            {founder.background && (
                                                <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-blue-200 pl-3">{founder.background}</p>
                                            )}

                                            {founder.education && (
                                                <div className="flex items-start gap-2 text-xs text-slate-500">
                                                    <span className="font-black text-slate-400 uppercase tracking-widest shrink-0">EDU</span>
                                                    <span className="font-medium">{founder.education}</span>
                                                </div>
                                            )}

                                            {founder.notable_achievements && founder.notable_achievements.length > 0 && (
                                                <div className="space-y-1.5 pt-2 border-t border-slate-50">
                                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Achievements</div>
                                                    {founder.notable_achievements.slice(0, 3).map((a, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                            <span className="text-slate-600">{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="border-dashed p-10 text-center bg-slate-50/50">
                                <Users className="h-10 w-10 mx-auto mb-4 text-slate-200" />
                                <h4 className="font-black text-slate-700 italic mb-2">No Founder Data Available</h4>
                                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">Founder profiles have not been verified for this entity. You can add a stakeholder record below.</p>
                                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold uppercase tracking-widest text-[10px]">
                                    <Plus className="w-3.5 h-3.5 mr-2" /> Add Stakeholder Record
                                </Button>
                            </Card>
                        )}
                    </div>

                    {/* Leadership / Board Section */}
                    {company.leadership && company.leadership.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-black italic tracking-tight uppercase">Senior <span className="text-indigo-600">Leadership</span></h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {company.leadership.map((leader, idx) => (
                                    <Card key={idx} className="hover:border-indigo-300 transition-all group">
                                        <CardContent className="p-5 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                                                    {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-sm tracking-tight">{leader.name}</p>
                                                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{leader.role}</p>
                                                </div>
                                            </div>
                                            {leader.total_experience_years && (
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Briefcase className="w-3 h-3" />
                                                    <span>{leader.total_experience_years} yrs experience</span>
                                                </div>
                                            )}
                                            {leader.education && (
                                                <p className="text-[10px] text-slate-400 italic line-clamp-2">{leader.education}</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Board Composition Summary */}
                    {company.board && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-black italic tracking-tight uppercase">Board <span className="text-slate-500">Composition</span></h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <div className="text-3xl font-black text-slate-900">{company.board.total_board_members}</div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Members</div>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <div className="text-3xl font-black text-blue-600">{company.board.executive_directors}</div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Executive Dirs</div>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <div className="text-3xl font-black text-indigo-600">{company.board.independent_directors}</div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Independent</div>
                                </div>
                                <div className={`rounded-2xl p-5 text-center border ${ company.board.governance_score && company.board.governance_score > 70 ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100' }`}>
                                    <div className={`text-3xl font-black ${ company.board.governance_score && company.board.governance_score > 70 ? 'text-emerald-600' : 'text-amber-600' }`}>{company.board.governance_score || 'N/A'}</div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Gov. Score</div>
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="talent">
                    <Card>
                        <CardHeader>
                            <CardTitle>Talent & Culture</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold">{company.talent?.glassdoor_rating}/5</div>
                                    <div className="text-xs text-muted-foreground">Glassdoor Rating</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold">{company.talent?.employee_growth_yoy}%</div>
                                    <div className="text-xs text-muted-foreground">Headcount Growth</div>
                                </div>
                                <div className="p-4 border rounded-lg text-center">
                                    <div className="text-2xl font-bold">{company.talent?.total_employees}</div>
                                    <div className="text-xs text-muted-foreground">Total Employees</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="brand">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand & Market Position</CardTitle>
                            <CardDescription>{company.brand?.tagline}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Differentiation</AlertTitle>
                                <AlertDescription>{company.brand?.differentiation_claim}</AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="products">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {company.products?.map((prod, idx) => (
                            <Card key={idx}>
                                <CardHeader>
                                    <CardTitle className="text-base">{prod.product_name}</CardTitle>
                                    <Badge variant="outline" className="w-fit mt-1">{prod.category}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{prod.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="innovation">
                    <Card>
                        <CardHeader>
                            <CardTitle>R&D and Innovation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-muted-foreground">R&D Team Size</div>
                                    <div className="text-xl font-bold">{company.innovation?.rd_team_size || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Patents Filed</div>
                                    <div className="text-xl font-bold">{company.innovation?.patents_filed || 'N/A'}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interviews" className="space-y-6">
                    <DetailedCompanyInterviewsList 
                        companyId={company.id} 
                        onSelectSession={(s) => {
                            setSelectedSession(s);
                            setIsViewerOpen(true);
                        }}
                    />
                </TabsContent>

                <TabsContent value="challenges" className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black italic tracking-tight uppercase">Structural <span className="text-orange-600">Challenges</span></h3>
                            <p className="text-xs text-muted-foreground font-medium">Bespoke problems requiring specialized engineering or digital solutions.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => router.push(`/portal/student/prd-builder?company_id=${company.id}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] tracking-widest uppercase rounded-xl h-10 px-4 shadow-lg shadow-blue-500/20"
                            >
                                <Rocket className="w-4 h-4 mr-2" /> Initiate Build
                            </Button>
                            <Button 
                                onClick={() => setIsCreateChallengeOpen(true)}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-[10px] tracking-widest uppercase rounded-xl h-10 px-4 shadow-lg shadow-orange-500/20"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Propose Challenge
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {((company.challenges && company.challenges.length > 0) || (company.problem_statements && company.problem_statements.length > 0)) ? (
                            [...(company.challenges || []), ...(company.problem_statements || [])].map((challenge: any, idx: number) => (
                                <Card key={idx} className="flex flex-col hover:border-orange-500 transition-colors group">
                                    <div className="h-1 w-full bg-slate-100 group-hover:bg-orange-500 transition-colors" />
                                    <CardHeader>
                                        <CardTitle className="text-base font-black italic tracking-tight">{challenge.title}</CardTitle>
                                        <CardDescription className="text-xs line-clamp-3 italic font-medium">
                                            {challenge.problem_statement || challenge.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="mt-auto pt-4 border-t border-slate-50">
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-orange-600 font-black uppercase text-[10px] tracking-widest w-full hover:bg-orange-50"
                                            onClick={() => router.push(`/portal/student/challenges?id=${challenge.id}`)}
                                        >
                                            View Active Challenge <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <Card className="p-12 text-center border-dashed col-span-3 bg-slate-50/50">
                                <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-20" />
                                <CardDescription className="font-bold italic">No active structural challenges found for this entity.</CardDescription>
                                <Button 
                                    variant="outline" 
                                    className="mt-4 border-orange-200 text-orange-600 hover:bg-orange-50"
                                    onClick={() => setIsCreateChallengeOpen(true)}
                                >
                                    Define First Challenge
                                </Button>
                            </Card>
                        )}
                    </div>

                    {/* Sector Automation Needs Sync - NEW Section Requested */}
                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-2">
                           <Activity className="w-5 h-5 text-blue-600" />
                           <h3 className="text-lg font-black italic tracking-tight uppercase">Aligned <span className="text-blue-600">Sector Automation Needs</span></h3>
                        </div>
                        <Alert className="bg-blue-50 border-blue-200">
                           <Zap className="h-4 w-4 text-blue-600" />
                           <AlertTitle className="text-blue-900 font-bold">Intelligence Feed Sync</AlertTitle>
                           <AlertDescription className="text-blue-800 text-xs">
                              The following needs have been extracted from global sector discovery and match this company's operational profile.
                           </AlertDescription>
                        </Alert>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoadingNeeds ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
                                ))
                            ) : sectorNeeds.length > 0 ? (
                                sectorNeeds.slice(0, 3).map((need, idx) => (
                                    <Card key={idx} className="border-blue-100 bg-white shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => router.push(`/portal/student/prd-builder?company_id=${company.id}`)}>
                                       <CardHeader className="pb-2">
                                          <div className="flex justify-between items-start">
                                             <CardTitle className="text-sm font-bold group-hover:text-blue-600 transition-colors">{need.title}</CardTitle>
                                             <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                          </div>
                                       </CardHeader>
                                       <CardContent className="text-xs text-slate-500">
                                          {need.description}
                                          <div className="mt-2 flex items-center gap-2">
                                             <Badge variant="outline" className="text-blue-600 border-blue-100 text-[8px] uppercase">{need.automation_type}</Badge>
                                             <Badge className="bg-slate-100 text-slate-600 text-[8px] border-none">Aligned</Badge>
                                          </div>
                                       </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center bg-slate-50 border border-dashed rounded-2xl">
                                   <p className="text-xs font-bold text-slate-400 italic">No direct sector overlaps found for this intelligence profile.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="consultancy" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Benchmarking Section */}
                        <Card className="border-emerald-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-emerald-50/50 pb-6 border-b border-emerald-100">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-black text-emerald-900 uppercase italic tracking-tight">Competitiveness Benchmarking</CardTitle>
                                        <CardDescription className="text-emerald-700 font-bold italic">Comparative analysis vs. Global Tier-1 MSMEs</CardDescription>
                                    </div>
                                    <Badge className="bg-emerald-600 text-white font-black uppercase tracking-widest text-[9px]">Strategic Baseline</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {company.benchmark_msme ? (
                                    <>
                                        <div className="p-4 bg-slate-900 text-white rounded-2xl border-none shadow-lg relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Globe className="h-16 w-16" />
                                            </div>
                                            <div className="relative z-10">
                                                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Ideal Benchmark MSME</div>
                                                <div className="text-xl font-bold italic">{company.benchmark_msme.name}</div>
                                                <div className="text-xs text-slate-400 font-medium mt-1">{company.benchmark_msme.location} | {company.benchmark_msme.revenue}</div>
                                                <p className="text-xs text-slate-300 mt-2 leading-relaxed italic border-l-2 border-emerald-500 pl-3">
                                                    {company.benchmark_msme.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Maturity Gap Analysis</div>
                                            {company.benchmark_msme.gap_comparison.map((gap, i) => (
                                                <div key={i} className="space-y-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-slate-900">{gap.category}</span>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="bg-white text-slate-600 border-slate-200 font-bold">{gap.current_score} Current</Badge>
                                                            <ArrowRight className="h-3 w-3 text-emerald-500" />
                                                            <Badge className="bg-emerald-600 text-white border-none font-bold">{gap.benchmark_score} Target</Badge>
                                                        </div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden flex">
                                                        <div className="h-full bg-slate-400" style={{ width: `${gap.current_score}%` }}></div>
                                                        <div className="h-full bg-emerald-500 opacity-30" style={{ width: `${gap.benchmark_score - gap.current_score}%` }}></div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">{gap.rationale}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                                        <Activity className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold italic">No benchmark data available. Start a new discovery session to establish baselines.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Student Solutions Section */}
                        <Card className="border-blue-100 shadow-xl overflow-hidden">
                            <CardHeader className="bg-blue-50/50 pb-6 border-b border-blue-100">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-black text-blue-900 uppercase italic tracking-tight">Solution Mapping</CardTitle>
                                        <CardDescription className="text-blue-700 font-bold italic">Student-Led IP & Specialized Consultancy</CardDescription>
                                    </div>
                                    <Badge className="bg-blue-600 text-white font-black uppercase tracking-widest text-[9px]">Innovation Pipeline</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {company.solution_mappings && company.solution_mappings.length > 0 ? (
                                    <div className="space-y-4">
                                        {company.solution_mappings.map((mapping, i) => (
                                            <div key={i} className="group relative p-5 bg-white border-2 border-slate-100 hover:border-blue-500 transition-all rounded-3xl shadow-sm hover:shadow-xl cursor-pointer">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                                            <FileCode className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-slate-900 italic tracking-tight">{mapping.solution_name}</div>
                                                            <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{mapping.provider}</div>
                                                        </div>
                                                    </div>
                                                    <Badge className="bg-blue-100 text-blue-700 border-none font-black text-[9px]">{mapping.relevance_score}% Match</Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Addressed Gap</div>
                                                    <div className="p-2 bg-red-50 text-red-700 text-[11px] font-bold rounded-lg border border-red-100">
                                                        {mapping.mapped_gap}
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed font-medium mt-2">{mapping.description}</p>
                                                </div>
                                                <Button variant="ghost" className="w-full mt-4 h-10 border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-widest text-[10px] rounded-xl border-2">
                                                    Request IP Access <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        ))}
                                        
                                        <Card className="bg-slate-900 border-none text-white overflow-hidden p-6 relative">
                                            <div className="relative z-10 text-center">
                                                <h4 className="font-black italic uppercase tracking-tight text-lg mb-2">Student <span className="text-blue-400">Consultancy</span> Hub</h4>
                                                <p className="text-sm text-slate-400 font-medium italic mb-6 leading-relaxed">
                                                    Enable specialized student teams to work directly on your floor for implementation support.
                                                </p>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black italic uppercase tracking-widest rounded-xl h-12 shadow-lg">
                                                    Deploy Student Team <Rocket className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                ) : (
                                    <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                                        <Zap className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold italic">No specialized student solutions mapped for this profile yet.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="regional" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="md:col-span-2 border-indigo-100 shadow-md rounded-3xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50/50 border-b border-indigo-50">
                                <CardTitle className="flex items-center gap-2 text-indigo-900 font-black uppercase tracking-widest text-xs">
                                    <Network className="h-4 w-4 text-indigo-600" />
                                    Regional Ecosystem Analysis
                                </CardTitle>
                                <CardDescription className="font-bold text-slate-500 italic">Mapping {company.name} within the {company.regional_context?.region_name || 'Vidarbha'} growth hub.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-10 pt-8 pb-8">
                                <div className="flex items-center gap-6 p-6 bg-indigo-50/40 border border-indigo-100 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="text-center relative z-10 bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
                                        <div className="text-4xl font-black text-indigo-700 tracking-tighter italic">{(company.regional_context?.correlation_score || 0) * 100}%</div>
                                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Synergy Score</div>
                                    </div>
                                    <Separator orientation="vertical" className="h-16 bg-indigo-200" />
                                    <p className="text-sm text-indigo-950 leading-relaxed font-bold relative z-10 italic">
                                        This score identifies the entity as a <span className="text-indigo-600 underline underline-offset-4 decoration-2 decoration-indigo-200">strategic correlation node</span> within the {company.regional_context?.hub_type || 'Regional Hub'}.
                                    </p>
                                </div>

                                {company.regional_context?.ecosystem_peers && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                                <Building2 className="w-4 h-4 text-indigo-400" /> Key Ecosystem Peers & Correlation Nodes
                                            </h4>
                                            <Badge variant="outline" className="text-[8px] font-black bg-slate-50 border-slate-100 text-slate-400 uppercase tracking-widest px-2">
                                                Verified Clusters
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {company.regional_context.ecosystem_peers.map((peer, i) => (
                                                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-default relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                                        <Zap className="h-8 w-8 text-indigo-600" />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{peer.name}</div>
                                                        <div className="text-[10px] font-bold text-slate-500 italic mt-0.5">{peer.role}</div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50 relative z-10">
                                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Alignment</span>
                                                        <Badge variant={peer.alignment === 'High' ? 'success' : peer.alignment === 'Medium' ? 'warning' : 'outline'} className="text-[8px] font-black px-1.5 h-4 tracking-tighter">
                                                            {peer.alignment}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            {company.ecosystem_recommendations && company.ecosystem_recommendations.length > 0 && (
                                <Card className="border-blue-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                                    <CardHeader className="bg-blue-50/50 border-b border-blue-50">
                                        <CardTitle className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-widest text-xs">
                                            <Sparkles className="h-4 w-4 text-blue-600" />
                                            Ecosystem Intelligence Recommendations
                                        </CardTitle>
                                        <CardDescription className="font-bold text-slate-500 italic">Strategic advice for regional integration and growth.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        {company.ecosystem_recommendations.map((rec, i) => (
                                            <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-300 transition-all group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{rec.title}</h5>
                                                    <Badge className={rec.impact === 'high' ? 'bg-red-100 text-red-600 border-none' : rec.impact === 'medium' ? 'bg-amber-100 text-amber-600 border-none' : 'bg-blue-100 text-blue-600 border-none'}>
                                                        {rec.impact.toUpperCase()} IMPACT
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-500 italic leading-relaxed">{rec.description}</p>
                                                <div className="mt-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <span>{rec.category}</span>
                                                    <span>TL: {rec.timeframe}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            <Card className="bg-slate-900 text-white rounded-3xl border-none shadow-2xl shadow-indigo-900/40 overflow-hidden group">
                                <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 p-5 border-b border-white/10">
                                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Strategic Intelligence Hub
                                    </CardTitle>
                                </div>
                                <CardContent className="pt-8 pb-8 space-y-6">
                                    <p className="text-sm font-bold text-indigo-100/80 leading-relaxed italic">
                                        Drill down into the <span className="text-white font-black underline decoration-indigo-400 underline-offset-4 decoration-2">Regional Sector Matrix</span> to discover high-fidelity policy triggers and competitive benchmarks.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl group-hover:bg-white/10 transition-colors">
                                           <div className="h-8 w-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                              <Activity className="h-4 w-4" />
                                           </div>
                                           <div className="flex flex-col">
                                              <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest leading-none">Market Share</span>
                                              <span className="text-sm font-black text-white italic">7.2% Sector Dominance</span>
                                           </div>
                                        </div>
                                    </div>
                                    <Link href={`/regional/sectors/${company.sector || 'all'}`} className="block pt-2">
                                        <Button className="w-full bg-white text-indigo-950 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] py-7 rounded-2xl group/btn shadow-xl shadow-indigo-500/10 active:scale-95 transition-all">
                                            Sector Dashboard 
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-slate-100 rounded-3xl shadow-md border-t-4 border-t-emerald-500 relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Award className="h-24 w-24 text-emerald-600" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Ecosystem Growth Synergies</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-8">
                                    <div className="flex flex-wrap gap-2.5">
                                        {company.regional_context?.sector_synergies?.map((synergy, i) => (
                                            <Badge key={i} variant="outline" className="bg-emerald-50/30 border-emerald-100 text-emerald-700 font-black text-[9px] px-3 py-1.5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-default">
                                                {synergy}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-[10px] font-bold text-slate-400 italic leading-relaxed">
                                        Synergies identified via cross-correlation of regional infrastructure and statutory capability feeds.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="roadmap">
                    {!roadmapData && !isGenerating ? (
                        <div className="grid place-items-center py-12 border rounded-xl bg-slate-50/50">
                            <div className="text-center space-y-4 max-w-md">
                                <h3 className="text-xl font-bold">Strategic Roadmap Generator</h3>
                                <p className="text-sm text-muted-foreground">Synthesize discovery intelligence and gap analysis into a multi-phase growth strategy.</p>
                                <Button size="lg" onClick={handleGenerateRoadmap}>Generate Roadmap <Rocket className="ml-2 h-4 w-4" /></Button>
                            </div>
                        </div>
                    ) : isGenerating ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-6">
                           <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                           <p className="font-bold text-blue-600 animate-pulse uppercase tracking-[0.3em] text-xs">Simulating Strategy Nodes...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <RoadmapTimeline roadmap={roadmapData} />
                            <RoadmapMilestones milestones={roadmapData.milestones || []} />
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Feedback Sidebar Overlay */}
            {showFeedback && (
                <div className="fixed inset-y-0 right-0 w-96 z-50 shadow-2xl animate-in slide-in-from-right duration-300">
                    <CompanyFeedback 
                        companyId={company.id} 
                        onClose={() => setShowFeedback(false)}
                        isAdmin={false} 
                    />
                </div>
            )}

            {/* Create Challenge Dialog */}
            <Dialog open={isCreateChallengeOpen} onOpenChange={setIsCreateChallengeOpen}>
                <DialogContent className="sm:max-w-[550px] bg-slate-950 text-white border-slate-800 rounded-3xl p-8">
                    <DialogHeader className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-600">
                           <Rocket className="w-10 h-10" />
                        </div>
                        <div>
                           <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase italic">Propose <span className="text-orange-600">Structural Challenge</span></DialogTitle>
                           <DialogDescription className="text-slate-400 font-medium italic mt-1">
                              Define a bespoke engineering or digital problem for high-TRL student builds.
                           </DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="grid gap-6 py-8">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Challenge Title</Label>
                            <Input id="title" placeholder="e.g. Real-time Carbon-Titanium Bonding Logic" className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-bold h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Structural Problem Statement</Label>
                            <Textarea 
                               id="description" 
                               placeholder="Describe the technical mismatch or operational gap needing intervention..." 
                               className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-700 font-medium min-h-[120px] rounded-xl leading-relaxed italic" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Target Sector</Label>
                              <div className="bg-slate-900 border border-slate-800 rounded-xl h-12 flex items-center px-4 text-xs font-black text-slate-400 uppercase italic">
                                 {company.sector}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Complexity</Label>
                              <div className="flex gap-2">
                                 <Badge className="bg-orange-600 text-white border-none cursor-pointer">HIGH</Badge>
                                 <Badge variant="outline" className="text-slate-500 border-slate-800 cursor-pointer">MED</Badge>
                              </div>
                           </div>
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsCreateChallengeOpen(false)}
                            className="text-slate-500 font-bold uppercase tracking-widest text-[10px] hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button 
                           onClick={() => setIsCreateChallengeOpen(false)}
                           className="bg-orange-600 hover:bg-orange-700 text-white font-black italic uppercase tracking-widest rounded-xl h-12 px-8 shadow-lg shadow-orange-600/20"
                        >
                            Publish Challenge <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <InterviewSessionViewer 
                isOpen={isViewerOpen}
                onClose={() => setIsViewerOpen(false)}
                session={selectedSession}
            />
        </div>
    )
}

function DetailedCompanyInterviewsList({ 
    companyId, 
    onSelectSession 
}: { 
    companyId: string,
    onSelectSession: (session: any) => void
}) {
    // Check both snake_case and camelCase for company IDs to ensure all demo data is caught
    // Cast to any to avoid lint errors if the type definition is lagging
    const sessions = MOSI_SESSIONS.filter((s: any) => {
        const idMatch = s.companyId === companyId || s.company_id === companyId;
        // Also match canonical Aequs if demo ID used
        const isAequs = (companyId === 'aeq-001' || companyId === 'ceed-1') && 
                       (s.company_id === 'a2e10480-1000-41d4-a7ae-446655440001' || s.companyId === 'a2e10480-1000-41d4-a7ae-446655440001');
        return idMatch || isAequs;
    });

    if (sessions.length === 0) {
        return (
            <Card className="border-dashed mt-4">
                <CardContent className="py-12 text-center text-muted-foreground">
                    <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-20" />
                    <p>No discovery sessions recorded for this entity yet.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-black italic tracking-tight uppercase">Discovery <span className="text-blue-600 font-black">Recordings</span></h3>
                <Badge variant="outline" className="font-bold border-blue-200 text-blue-600 bg-blue-50">
                    {sessions.length} SESSIONS
                </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map(s => (
                    <Card key={s.id} onClick={() => onSelectSession(s)} className="hover:border-blue-500 hover:shadow-xl transition-all group overflow-hidden bg-white cursor-pointer relative h-full flex flex-col">
                        <div className="h-1.5 w-full bg-slate-100 group-hover:bg-blue-600 transition-colors" />
                        <CardHeader className="pb-2">
                           <div className="flex justify-between items-start">
                              <Badge className="bg-slate-100 text-slate-500 border-none text-[9px] font-black uppercase tracking-widest px-2 py-0.5">
                                 MOSI-SYNTHESIS
                              </Badge>
                              <div className="flex items-center text-[10px] font-bold text-slate-400 italic">
                                 <Calendar className="w-3 h-3 mr-1" /> {s.date}
                              </div>
                           </div>
                           <CardTitle className="text-lg font-black text-slate-900 mt-3 leading-tight italic tracking-tight group-hover:text-blue-600 transition-colors">
                              {s.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow pb-6">
                           <p className="text-sm text-slate-500 line-clamp-3 italic font-medium leading-relaxed">
                               "{s.summary}"
                           </p>
                           
                           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">
                              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                 <Clock className="w-3.5 h-3.5 text-blue-500" /> {(s.duration / 60).toFixed(0)} MINS
                              </div>
                              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                 <Users className="w-3.5 h-3.5 text-blue-500" /> {s.stakeholder_id}
                              </div>
                           </div>
                           
                           <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-1.5">
                              {s.tech_stack_recommended?.slice(0,3).map((t, i) => (
                                 <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-600 border-none text-[8px] font-black tracking-tighter px-2">
                                    {t}
                                 </Badge>
                              ))}
                           </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 py-4 flex justify-end mt-auto">
                           <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectSession(s);
                                }}
                                className="w-full h-10 text-[10px] font-black italic uppercase text-blue-600 border-blue-200 bg-white hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                            >
                               <PlayCircle className="w-4 h-4 mr-2" /> ACCESS FULL INTELLIGENCE
                           </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

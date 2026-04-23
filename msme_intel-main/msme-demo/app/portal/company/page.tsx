'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Upload, 
  FileText, 
  Edit, 
  LayoutDashboard, 
  Building2, 
  ExternalLink, 
  Zap, 
  Info, 
  TrendingUp,
  Target, 
  Rocket, 
  Plus, 
  GraduationCap, 
  Users,
  Laptop2,
  MapPin,
  Map as MapIcon,
  ShieldCheck,
  ArrowUpRight,
  Search,
  Loader2,
  Mic,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { SECTOR_THESES } from '@/lib/demo-data/sector-thesis';
import { REGIONAL_DATA } from '@/lib/demo-data/regional';
import { NEW_COMPANIES } from '@/lib/demo-data/new-companies';
import { PROGRAMS } from '@/lib/demo-data/programs';
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions';
import { Progress } from '@/components/ui/progress';
import { DetailedCompanyView } from '@/components/companies/detailed-company-view';

// ── DISCOVERY LOGS TAB ────────────────────────────────────────────────────────
function DiscoveryLogsTab({ companyId }: { companyId: string }) {
  const sessions = MOSI_SESSIONS.filter(s => s.companyId === companyId || s.companyId === 'comp-001'); // comp-001 is the default TechForge for demo variety

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sessions.map((session) => (
        <Card key={session.id} className="border-none shadow-lg hover:shadow-xl transition-all group rounded-3xl overflow-hidden">
          <div className="h-2 w-full bg-blue-600" />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Mic className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{session.status}</Badge>
            </div>
            <CardTitle className="text-xl font-black italic mt-4">{session.title}</CardTitle>
            <CardDescription className="font-medium">{session.date} • {Math.floor(session.duration/60)} Mins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{session.problem_summary}"</p>
            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ROI: {session.potential_roi}</span>
               <Button variant="ghost" className="text-blue-600 font-black text-[10px] uppercase tracking-widest gap-2">
                  View Data <ExternalLink className="h-3 w-3" />
               </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {sessions.length === 0 && (
         <Card className="col-span-full border-dashed border-2 py-20 text-center">
            <Mic className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-bold italic">No innovation discovery logs available for your unit yet.</p>
         </Card>
      )}
    </div>
  );
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ── DATA VERIFICATION PANEL ───────────────────────────────────────────────────
function VerifyDataTab({ companyId }: { companyId: string }) {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [disputeField, setDisputeField] = useState<string | null>(null);
  const [disputeData, setDisputeData] = useState({ correct_value: '', evidence_text: '', evidence_url: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API}/api/portal/${companyId}/profile`)
      .then(r => r.json())
      .then(d => setVerifications(d.field_verifications || []))
      .catch(err => console.error("Portal error:", err));
  }, [companyId]);

  const handleConfirm = async (fieldName: string, tab: string, value: string) => {
    toast({ title: 'Confirmed', description: `${fieldName} marked as correct` });
    setVerifications(v => v.map(f => f.field_name === fieldName ? { ...f, status: 'verified' } : f));
  };

  const handleDispute = async (fieldName: string, tab: string, disputedValue: string) => {
    toast({ title: 'Dispute submitted', description: 'Our team will review within 48 hours' });
    setDisputeField(null);
  };

  const statusIcon = (status: string) => {
    if (status === 'verified') return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (status === 'pending') return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <XCircle className="h-4 w-4 text-gray-300" />;
  };

  const groupedByTab = verifications.reduce((acc, f) => {
    acc[f.tab] = acc[f.tab] || [];
    acc[f.tab].push(f);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Review and confirm your company data.</p>
      {verifications.length === 0 && (
         <Card className="bg-slate-50 border-dashed py-12 text-center text-muted-foreground">
            <LayoutDashboard className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No verified data points found yet.</p>
         </Card>
      )}
      {Object.entries(groupedByTab).map(([tab, fields]) => (
        <Card key={tab}>
          <CardHeader className="pb-2"><CardTitle className="text-sm capitalize">{tab.replace('_', ' ')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {(fields as any[]).map((field) => (
              <div key={field.field_name} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  {statusIcon(field.status)}
                  <div>
                    <p className="text-sm font-medium capitalize">{field.field_name.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-muted-foreground">{field.field_value || 'N/A'}</p>
                  </div>
                </div>
                {field.status !== 'verified' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleConfirm(field.field_name, tab, field.field_value)}>✓</Button>
                    <Button size="sm" variant="outline" onClick={() => setDisputeField(field.field_name)}>✗</Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ── SELF-REPORT PROFILE FORM ──────────────────────────────────────────────────
function MyProfileTab({ companyId, company }: { companyId: string, company: any }) {
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="border-none shadow-xl bg-slate-900 text-white">
        <CardHeader><CardTitle className="text-base font-black italic">Identity & Contact</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-400">Website</Label>
                <Input defaultValue={company?.website} className="bg-slate-800 border-slate-700 text-white font-bold" />
            </div>
            <div className="space-y-1">
                <Label className="text-[10px] font-black uppercase text-slate-400">Location</Label>
                <Input defaultValue={`${company?.headquarters_city}, ${company?.headquarters_state}`} className="bg-slate-800 border-slate-700 text-white font-bold" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-black uppercase text-slate-400">Strategic Overview</Label>
            <Textarea defaultValue={company?.notes} className="bg-slate-800 border-slate-700 text-white font-bold min-h-[120px] leading-relaxed" />
          </div>
        </CardContent>
      </Card>
      <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
          <h4 className="font-black text-blue-900 mb-1">Data Verification Required</h4>
          <p className="text-xs text-blue-700 font-medium italic">&quot;Ensure your strategic profile is up to date for the next intelligence refresh.&quot;</p>
      </div>
      <Button onClick={() => toast({title:'Success', description:'Profile updated'})} className="bg-blue-600 w-full rounded-full font-black py-6">Save Profile Changes</Button>
    </div>
  );
}

function DisputesList({ companyId }: { companyId: string }) {
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
        <Upload className="h-10 w-10 mx-auto text-slate-300 mb-3" />
        <h3 className="text-base font-medium">No claims submitted</h3>
        <p className="text-sm text-muted-foreground">Dispute data points to start a claim.</p>
    </div>
  );
}

// ── MAIN PORTAL PAGE ──────────────────────────────────────────────────────────
export default function CompanyPortalPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  
  const companyId = 'hical-001';
  const company = NEW_COMPANIES.find(c => c.id === companyId);
  const sectorThesis = SECTOR_THESES[company?.sector || ''];
  
  // Dynamic regional lookup based on company's regional context or default to mangalore
  const regionKey = (company as any)?.regional_context?.region_name?.toLowerCase().includes('nagpur') ? 'nagpur-vidarbha' : 'mangalore';
  const regionData = (REGIONAL_DATA as any)[regionKey];
  const regionalIntel = regionData?.priority_sectors?.find((s: any) => s.id === company?.sector);

  const handleGenerateRoadmap = () => {
    setIsGeneratingRoadmap(true);
    setTimeout(() => {
      setIsGeneratingRoadmap(false);
      setShowRoadmap(true);
    }, 2500);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{company?.name} Portal</h1>
          <p className="text-slate-500 font-medium">Strategic expansion & innovation dashboard</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5 font-black uppercase text-[10px] tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Verified Business
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6" onValueChange={setActiveTab}>
        <div className="border-b">
            <TabsList className="bg-transparent border-none p-0 h-10 w-full justify-start gap-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="verify">Data Integrity</TabsTrigger>
                <TabsTrigger value="disputes">Claims</TabsTrigger>
                <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                <TabsTrigger value="thesis">Thesis</TabsTrigger>
                <TabsTrigger value="regional">Regional Intel</TabsTrigger>
                <TabsTrigger value="discovery">Discovery Hub</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="profile" className="mt-0"><MyProfileTab companyId={companyId} company={company} /></TabsContent>
        <TabsContent value="verify" className="mt-0"><VerifyDataTab companyId={companyId} /></TabsContent>
        <TabsContent value="disputes" className="mt-0"><DisputesList companyId={companyId} /></TabsContent>

        <TabsContent value="ecosystem" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-xl border-none">
                    <CardHeader className="pb-4 border-b">
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-xl font-black italic">Build 4 X: Industrial Challenges</CardTitle>
                                <CardDescription className="font-medium">Direct solver pipeline for high-TRL problems.</CardDescription>
                             </div>
                             <Button size="sm" className="bg-blue-600 rounded-full font-bold gap-2"><Plus className="h-4 w-4" /> Publish</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        {company?.problem_statements?.map((prob: any) => (
                           <div key={prob.id} className="p-5 border rounded-3xl bg-white hover:border-blue-200 transition-all group overflow-hidden relative">
                               <div className="flex justify-between mb-2">
                                   <h5 className="font-black text-lg group-hover:text-blue-600">{prob.title}</h5>
                                   <Badge className="bg-blue-100 text-blue-700 uppercase text-[9px] font-black">{prob.status}</Badge>
                               </div>
                               <p className="text-sm text-slate-500 font-medium mb-4">{prob.description}</p>
                               <div className="flex gap-4 border-t pt-4 border-slate-50">
                                   <div className="flex items-center gap-1.5 text-xs font-black opacity-60"><Users className="h-4 w-4" /> 12 INVESTIGATORS</div>
                                   <div className="flex items-center gap-1.5 text-xs font-black opacity-60"><Target className="h-4 w-4" /> 4 PROTOTYPES</div>
                               </div>
                           </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card className="bg-slate-900 border-none text-white overflow-hidden shadow-2xl">
                        <div className="bg-indigo-600 p-6">
                            <h4 className="font-black text-xl italic leading-tight">Software Ecosystem Spotlight</h4>
                            <p className="text-xs text-indigo-200 font-bold mt-1">₹4,500+ Cr Hub Revenue</p>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <p className="text-xs text-slate-400 font-semibold italic">&quot;Connecting Mangaluru&apos;s IT heritage with Hical&apos;s precision needs.&quot;</p>
                            <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10 font-bold rounded-full border-2" asChild>
                                <Link href="/regional/sectors/it-ites">View IT Roadmap</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="roadmap" className="mt-0 space-y-8">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-black italic text-slate-900">Comprehensive Intelligence & Roadmap</h2>
                    <p className="text-muted-foreground font-medium">Full diagnostic, multi-dimensional scorecards, and Strategic Blueprint generated by the AI engine.</p>
                </div>
                {company && <DetailedCompanyView company={company as any} />}
            </div>
        </TabsContent>

        <TabsContent value="thesis" className="mt-0">
            <Card className="border-none shadow-xl overflow-hidden bg-white text-slate-900">
                <div className="bg-slate-900 text-white p-8">
                    <div className="flex items-center gap-2 mb-2"><FileText className="h-4 w-4 text-blue-400"/><span className="text-[10px] font-black tracking-widest uppercase text-blue-400">Strategic Intelligence</span></div>
                    <h2 className="text-4xl font-black italic">{sectorThesis?.display_name}</h2>
                    <p className="text-slate-400 mt-2 font-medium italic">&quot;{sectorThesis?.executive_summary}&quot;</p>
                </div>
                <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600" /> Market Outlook</h3>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic font-bold">&quot;{sectorThesis?.investment_thesis}&quot;</div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-black flex items-center gap-2"><Target className="h-5 w-5 text-indigo-600" /> Key Sub-Sectors</h3>
                        <div className="flex flex-wrap gap-2">
                            {sectorThesis?.sub_sectors?.map((sub:any) => <Badge key={sub.name} variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3 py-1">{sub.name}</Badge>)}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="regional" className="mt-0 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-xl bg-slate-900 text-white p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><MapIcon className="h-48 w-48" /></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h2 className="text-4xl font-black italic mb-2">Mangaluru Industrial Map</h2>
                            <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed italic">&quot;Mangalore, India&apos;s 8th richest district, operations a diversified ₹1+ lakh crore economy anchored by port logistics and precision manufacturing.&quot;</p>
                        </div>
                        <div className="mt-12 flex gap-4">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-black rounded-full px-8" asChild><Link href="/regional">Explore Clusters</Link></Button>
                        </div>
                    </div>
                </Card>

                <div className="space-y-6">
                    {regionalIntel ? (
                        <Link href={`/regional/sectors/${regionalIntel.id}?region=${regionKey}`} className="block">
                            <Card className="bg-blue-600 border-none text-white hover:bg-blue-700 transition-all cursor-pointer shadow-xl group overflow-hidden">
                                <CardHeader className="pb-2 border-b border-white/10">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-black text-lg italic leading-tight">{regionalIntel.name}</h4>
                                        <ArrowUpRight className="h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                                        <p className="text-[10px] font-black uppercase text-blue-200 mb-1">MSME Cluster Valuation</p>
                                        <p className="text-2xl font-black">{regionalIntel.metrics}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-blue-200">Local Ecosystem Gaps</p>
                                        <div className="space-y-2">
                                            {regionalIntel.gaps?.map((gap: string) => (
                                                <div key={gap} className="flex items-center gap-2 text-[10px] font-bold">
                                                    <AlertCircle className="h-3 w-3 text-blue-300" />
                                                    <span>{gap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <div className="p-3 bg-blue-500/50 rounded-xl border border-blue-400/30 text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-blue-100">Click to View Complete Sector Thesis</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ) : (
                        <div className="p-8 bg-slate-50 border border-dashed rounded-3xl text-center text-slate-400">
                            <Info className="h-8 w-8 mx-auto mb-2 opacity-20" />
                            <p className="text-[10px] font-black uppercase">No Regional Intel Match</p>
                        </div>
                    )}
                </div>
            </div>
        </TabsContent>

        <TabsContent value="discovery" className="mt-0">
            <DiscoveryLogsTab companyId={companyId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

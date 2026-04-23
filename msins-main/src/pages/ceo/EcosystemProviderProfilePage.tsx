import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ecosystemData from '@/data/maharashtra-ecosystem.json';
import { 
    ArrowLeft, 
    Building2, 
    MapPin, 
    Globe, 
    Users, 
    Calendar, 
    Banknote, 
    Briefcase,
    Zap,
    Target,
    Layers,
    ExternalLink
} from 'lucide-react';

export default function EcosystemProviderProfilePage() {
    const { providerId } = useParams();
    const navigate = useNavigate();

    // Match the ID logic used in EcosystemDirectoryPage
    const getProviderId = (name: string) => encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));

    const rawData = (ecosystemData as any)["Complete Database"].find(
        (comp: any) => getProviderId(comp["Company Name"]) === providerId
    );

    if (!rawData) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center p-24 text-center">
                    <Building2 className="h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold">Provider not found</h3>
                    <Button variant="link" onClick={() => navigate('/ceo/ecosystem')}>Back to Ecosystem</Button>
                </div>
            </DashboardLayout>
        );
    }

    const website = rawData["Website"]?.startsWith('http') ? rawData["Website"] : `https://${rawData["Website"]}`;

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-5xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Header Section */}
                <div className="flex flex-col gap-4 mb-2">
                    <div>
                        <Button variant="ghost" className="mb-4 -ml-3 text-slate-500 font-bold text-[10px] uppercase tracking-widest gap-2" asChild>
                            <Link to="/ceo/ecosystem"><ArrowLeft className="h-4 w-4" /> Back to Ecosystem Mapper</Link>
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
                        <div className="flex items-start gap-5">
                            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-3xl shadow-lg border-4 border-blue-100">
                                {rawData["Company Name"].substring(0, 1)}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-black tracking-tight text-slate-900">{rawData["Company Name"]}</h1>
                                    <Badge variant="outline" className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 ${rawData["Funding Status"]?.includes('Premium') ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                        Verified Provider
                                    </Badge>
                                </div>
                                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">{rawData["Category"]} · {rawData["Subcategory"]}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {rawData["Location"]}</span>
                                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> {rawData["Team Size"]} Employees</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Founded {rawData["Founded"]}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold uppercase tracking-wider text-xs gap-2">
                                Request Partnership
                            </Button>
                            {rawData["Website"] && (
                                <Button variant="outline" className="w-full font-bold uppercase tracking-wider text-xs gap-2" asChild>
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        Visit Website <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
                                <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-blue-600" /> Capabilities & Offering
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Service / Product</h4>
                                    <p className="text-sm font-medium leading-relaxed text-slate-700">
                                        {rawData["Product/Service Description"]}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> Tech Stack</h4>
                                        <p className="text-sm font-semibold text-slate-800">{rawData["Tech Stack / Capabilities"] || "N/A"}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Target className="h-3.5 w-3.5" /> Industry Focus</h4>
                                        <p className="text-sm font-semibold text-slate-800">{rawData["Domain/Industry Focus"] || "Cross-Industry"}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200/60 shadow-sm overflow-hidden bg-white">
                            <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
                                <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-blue-600" /> Track Record
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Notable Clients & Projects</h4>
                                <div className="flex flex-wrap gap-2">
                                    {rawData["Notable Clients/Projects"] ? 
                                        rawData["Notable Clients/Projects"].split(',').map((client: string, idx: number) => (
                                            <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold px-3 py-1 text-xs">
                                                {client.trim()}
                                            </Badge>
                                        ))
                                    : (
                                        <span className="text-sm text-slate-500 font-medium">Confidential enterprise portfolio</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column: Meta Info */}
                    <div className="space-y-6">
                        
                        <Card className="border-slate-200 shadow-sm bg-slate-900 text-white rounded-3xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Banknote className="h-32 w-32" />
                            </div>
                            <CardHeader className="relative z-10 pb-2">
                                <CardTitle className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                    <Banknote className="h-4 w-4" /> Market Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10 pt-4 space-y-5">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Funding Profile</p>
                                    <p className="text-sm font-semibold leading-relaxed">{rawData["Funding Status"] || "Undisclosed"}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-700/50">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Service Model</p>
                                    <p className="text-sm font-semibold leading-relaxed">{rawData["Service Model"] || "Standard"}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-700/50">
                                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Platform Score</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-black tracking-tighter text-white">4.8</span>
                                        <span className="text-xs font-bold text-slate-400">/ 5.0</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200/60 shadow-sm bg-white">
                            <CardHeader className="pb-3 border-b border-slate-50 text-center">
                                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Platform Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider text-slate-700 border-slate-200">
                                    Map to Regional Hub
                                </Button>
                                <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider text-slate-700 border-slate-200">
                                    Invite to MSME Cohort
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

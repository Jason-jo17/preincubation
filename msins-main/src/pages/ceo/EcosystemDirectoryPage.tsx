import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Building2, Star, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import ecosystemData from '@/data/maharashtra-ecosystem.json';

const getCategoryForCompany = (comp: any) => {
    const raw = comp.Category;
    const sub = comp.Subcategory;
    if (raw?.includes('IoT') || raw?.includes('Automation') || raw?.includes('ERP') || raw?.includes('Digital') || sub?.includes('IoT')) return 'digital-transformation';
    if (raw?.includes('AI/ML') || raw?.includes('Software') || raw?.includes('Cloud') || sub?.includes('AI') || sub?.includes('SaaS')) return 'software-ecosystem';
    if (sub?.includes('Marketing') || sub?.includes('PR') || sub?.includes('Brand')) return 'marketing';
    if (sub?.includes('Finance') || sub?.includes('Lending') || sub?.includes('Venture') || sub?.includes('Fund')) return 'financial-services';
    if (sub?.includes('Talent') || sub?.includes('HR') || sub?.includes('Recruit')) return 'talent-aqua';
    if (sub?.includes('Legal') || sub?.includes('IP') || sub?.includes('Patent')) return 'legal-ip';
    return 'software-ecosystem';
};

const MOCK_PARTNERS = (ecosystemData as any)["Complete Database"].map((comp: any, idx: number) => ({
    id: encodeURIComponent(comp["Company Name"].toLowerCase().replace(/\s+/g, '-')),
    name: comp["Company Name"],
    categoryId: getCategoryForCompany(comp),
    region: comp["Location"] || 'Maharashtra',
    rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
    projects: Math.floor(Math.random() * 200) + 20,
    type: comp["Subcategory"] || comp["Category"] || 'Technology Provider',
    status: comp["Funding Status"]?.includes('Bootstrapped') ? 'Verified Partner' : 
            comp["Funding Status"]?.includes('SINE') ? 'Premium Institutional' : 'Premium',
    description: comp["Product/Service Description"] || comp["Tech Stack / Capabilities"],
    focus: comp["Domain/Industry Focus"],
    website: comp["Website"]?.startsWith('http') ? comp["Website"] : `https://${comp["Website"]}`
}));

const categoryInfo: Record<string, { title: string, desc: string }> = {
    'digital-transformation': { title: 'Digital Transformation', desc: 'ERP, Cloud, and Process Automation experts.' },
    'financial-services': { title: 'Financial Services', desc: 'Banking, Lending, and VC partners.' },
    'talent-aqua': { title: 'Talent & HR', desc: 'Recruitment and corporate training.' },
    'marketing': { title: 'Marketing & PR', desc: 'B2B lead generation and branding.' },
    'legal-ip': { title: 'Legal & IP', desc: 'Patent filing and compliance strategy.' },
    'software-ecosystem': { title: 'Software & SaaS', desc: 'Cloud infrastructure and business apps.' }
};

export default function EcosystemDirectoryPage() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const activeCategory = categoryId && categoryInfo[categoryId] 
        ? categoryInfo[categoryId] 
        : { title: 'All Partners', desc: 'Complete ecosystem directory' };

    const filtered = MOCK_PARTNERS.filter(c => 
        (categoryId ? c.categoryId === categoryId : true) &&
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-7xl mx-auto py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <Button variant="ghost" className="mb-2 -ml-3 text-slate-500 font-bold text-[10px] uppercase tracking-widest gap-2" asChild>
                            <Link to="/ceo/ecosystem"><ArrowLeft className="h-4 w-4" /> Back to Ecosystem Mapper</Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{activeCategory.title} Directory</h1>
                        <p className="text-slate-500 mt-1 font-medium">{activeCategory.desc} ({filtered.length} Providers)</p>
                    </div>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input 
                        placeholder="Search partners by name or capability..." 
                        className="pl-10 h-12 text-[15px] border-slate-200 bg-white rounded-xl shadow-sm focus-visible:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-24 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                        <Building2 className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900">No partners found</h3>
                        <p className="text-slate-500 mt-2 text-sm font-medium">Try adjusting your search filters.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((partner) => (
                            <Card key={partner.id} onClick={() => navigate('/ceo/ecosystem/provider/' + partner.id)} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-slate-200/60 bg-white group rounded-2xl">
                                <CardContent className="p-0">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {partner.name.substring(0, 1)}
                                            </div>
                                            <Badge variant="outline" className={`text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full ${partner.status.includes('Premium') ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-blue-200 bg-blue-50 text-blue-700'}`}>
                                                {partner.status}
                                            </Badge>
                                        </div>

                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight mb-0.5" title={partner.name}>{partner.name.length > 25 ? partner.name.substring(0, 25) + '...' : partner.name}</h3>
                                        <p className="text-[11px] text-blue-600 font-bold mb-3 uppercase tracking-widest truncate">{partner.type}</p>
                                        
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4 line-clamp-2 min-h-[32px]" title={partner.description}>
                                            {partner.description}
                                        </p>

                                        <div className="space-y-2.5 pt-4 border-t border-slate-100">
                                            <div className="flex items-center text-xs text-slate-600">
                                                <MapPin className="h-3.5 w-3.5 mr-2 text-slate-400" />
                                                <span className="font-semibold">{partner.region}, Maharashtra</span>
                                            </div>
                                            <div className="flex items-center text-xs text-slate-600">
                                                <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-slate-400" />
                                                <span className="font-semibold">{partner.projects} Successful MSME Projects</span>
                                            </div>
                                            <div className="flex items-center text-xs text-slate-600">
                                                <Star className="h-3.5 w-3.5 mr-2 text-amber-500 fill-amber-500" />
                                                <span className="font-semibold">{partner.rating} / 5.0 Platform Rating</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 border-t border-slate-100/60 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect details internally</span>
                                        <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate('/ceo/ecosystem/provider/' + partner.id); }} className="h-7 text-[10px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                                            View Profile
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

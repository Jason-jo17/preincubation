'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, Lightbulb, Banknote } from "lucide-react";

const OPPORTUNITIES = [
    {
        id: 'mudra',
        title: 'MUDRA Yojana',
        provider: 'Govt. of India',
        amount: 'Up to ₹10 Lakh',
        type: 'Debt',
        badge: 'Popular',
        icon: Wallet,
        description: 'Micro-loans for non-corporate, non-farm small/micro enterprises.'
    },
    {
        id: 'sis',
        title: 'Startup India Seed Fund',
        provider: 'DPIIT',
        amount: 'Up to ₹20 Lakh',
        type: 'Grant',
        badge: 'Seed Stage',
        icon: Lightbulb,
        description: 'Financial assistance for proof of concept, prototype development, and product trials.'
    },
    {
        id: 'cgtmse',
        title: 'CGTMSE Scheme',
        provider: 'SIDBI',
        amount: 'Up to ₹2 Cr',
        type: 'Guarantee',
        badge: 'Collateral Free',
        icon: Banknote,
        description: 'Credit Guarantee Fund Trust for Micro and Small Enterprises.'
    }
];

export function FundingOpportunities() {
    return (
        <Card className="bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden group/card relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover/card:scale-110 transition-transform duration-700 pointer-events-none">
                <Banknote className="h-32 w-32 text-blue-600" />
            </div>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                        <Wallet className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-blue-100 text-blue-600 bg-blue-50/50">
                        Institutional
                    </Badge>
                </div>
                <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
                    Active Funding Opportunities
                </CardTitle>
                <CardDescription className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-1">
                    Curated financial schemes tailored for growth
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pt-4">
                {OPPORTUNITIES.map((opp) => (
                    <div key={opp.id} className="group/item flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-200/20">
                        <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover/item:scale-110 transition-transform">
                            <opp.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight italic">{opp.title}</h4>
                                <Badge className="h-5 text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 border-none">
                                    {opp.type}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="text-slate-500">{opp.provider}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                <span className="text-blue-600 font-black italic">{opp.amount}</span>
                            </div>
                        </div>
                        <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="pt-2 pb-6">
                <Button variant="ghost" className="w-full text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest bg-slate-50 hover:bg-white rounded-2xl h-12 border border-transparent hover:border-slate-100 transition-all">
                    View All 12 Active Schemes
                    <ArrowRight className="h-3 w-3 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    );
}

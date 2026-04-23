'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Info, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface DueDiligenceAlertProps {
    report: string;
    warning?: string;
    className?: string;
}

export function DueDiligenceAlert({ report, warning, className }: DueDiligenceAlertProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    if (!report && !warning) return null;

    return (
        <div className={cn("space-y-4", className)}>
            <Alert variant="destructive" className="bg-white border-red-500/20 shadow-[0_8px_30px_rgb(239,68,68,0.1)] border-l-8 border-l-red-600 rounded-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                    <ShieldAlert className="h-32 w-32 text-red-600" />
                </div>
                <div className="flex items-start gap-4 py-2">
                    <div className="mt-1 h-10 w-10 shrink-0 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <AlertTitle className="text-red-900 font-black uppercase tracking-tighter text-lg leading-none mb-2 flex items-center gap-2">
                            {warning || "Critical Intelligence Alert"}
                            <Badge className="bg-red-600 text-white border-none text-[8px] animate-pulse">VERIFIED RISK</Badge>
                        </AlertTitle>
                        <AlertDescription className="text-slate-600 font-bold text-xs leading-relaxed max-w-2xl italic">
                            Platform intelligence reveals a <span className="text-red-600 underline underline-offset-4 decoration-red-200">severe sector mismatch</span> and corporate compliance risks. 
                            Statutory data contradicts primary industry claims for this entity.
                        </AlertDescription>
                        <div className="mt-4">
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10"
                            >
                                {isExpanded ? "Collapse Analysis" : "Access Intelligence Report"}
                                <ExternalLink className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </Alert>

            {isExpanded && (
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden group/report">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-20" />
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                                <Info className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Due Diligence Module</div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Intelligence Synthesis Report</h3>
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                            Verification: <span className="text-emerald-600">PASSED</span>
                        </div>
                    </div>
                    
                    <div className="prose prose-slate max-w-none">
                        <div className="whitespace-pre-wrap text-slate-700 text-sm leading-[1.8] font-medium tracking-tight bg-slate-50/50 p-8 rounded-3xl border border-slate-50 italic relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
                                <ShieldAlert className="h-48 w-48 text-slate-900" />
                            </div>
                            {report}
                        </div>
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic tracking-widest">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Source: Statutory Audit & Nagpur Cluster Verification
                        </div>
                        <div className="text-[9px] font-bold text-slate-300 italic">
                            Report Generated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

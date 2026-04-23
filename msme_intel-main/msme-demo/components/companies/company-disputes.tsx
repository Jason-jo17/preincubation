'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';

interface CompanyDisputesProps {
    companyId: string;
}

export function CompanyDisputesList({ companyId }: CompanyDisputesProps) {
    const [disputes, setDisputes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    useEffect(() => {
        fetch(`${API}/api/portal/${companyId}/disputes`)
            .then(r => r.json())
            .then(d => {
                if (Array.isArray(d)) setDisputes(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [companyId, API]);

    const handleAction = async (disputeId: string, status: string) => {
        const notes = prompt("Enter review notes:");
        if (notes === null) return;

        await fetch(`${API}/api/portal/disputes/${disputeId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, review_notes: notes }),
        });
        
        setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status, review_notes: notes } : d));
    };

    if (loading) return <div className="p-8 text-center text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Scanning data disputes...</div>;
    
    if (disputes.length === 0) return (
        <EmptyState 
            icon={CheckCircle2}
            title="Registry Verified"
            description="No active data disputes or reported inaccuracies found for this entity."
            className="mt-4"
        />
    );

    return (
        <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Registry Corrections
                <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200">{disputes.length}</Badge>
            </h3>
            {disputes.map(d => (
                <Card key={d.id} className={cn("border-slate-200/60 shadow-none hover:shadow-md transition-all", d.status === 'pending' ? 'bg-amber-50/20' : 'bg-white')}>
                    <CardHeader className="pb-2 p-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-bold uppercase tracking-tight capitalize text-slate-700">
                                {d.field_name.replace(/_/g, ' ')}
                            </CardTitle>
                            <Badge variant="secondary" className={cn(
                                "text-[10px] font-bold uppercase tracking-wider h-5",
                                d.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 
                                d.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                'bg-amber-100 text-amber-700'
                            )}>
                                {d.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 pt-0">
                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Original Value</p>
                                <p className="font-medium text-slate-600 line-through decoration-slate-300">{d.disputed_value || 'None'}</p>
                            </div>
                            <div className="p-3 bg-emerald-50/30 rounded-lg border border-emerald-100/50">
                                <p className="text-[10px] text-emerald-600/60 font-bold uppercase tracking-widest mb-1.5">Proposed Correction</p>
                                <p className="font-semibold text-emerald-700">{d.correct_value}</p>
                            </div>
                        </div>
                        {d.evidence_text && (
                            <div className="p-3 bg-blue-50/10 rounded-lg border border-blue-50/50 text-[11px] text-slate-500 italic">
                                "{d.evidence_text}"
                            </div>
                        )}
                        {d.status === 'pending' && (
                            <div className="flex gap-2 justify-end pt-2">
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => handleAction(d.id, 'accepted')}>
                                    Verify Change
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleAction(d.id, 'rejected')}>
                                    Dismiss Report
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
    MessageSquare, 
    Calendar, 
    Clock, 
    Users, 
    PlayCircle 
} from 'lucide-react';
import { MOSI_SESSIONS } from '@/lib/demo-data/mosi-sessions';
import { EmptyState } from '@/components/shared/empty-state';

interface CompanyInterviewsProps {
    companyId: string;
}

export function CompanyInterviewsList({ companyId }: CompanyInterviewsProps) {
    const sessions = MOSI_SESSIONS.filter(s => s.companyId === companyId);

    if (sessions.length === 0) {
        return (
            <EmptyState 
                icon={MessageSquare}
                title="No Discovery Intel"
                description="No synthesized discovery sessions or interview recordings are available for this entity yet."
                className="mt-4"
            />
        );
    }

    return (
        <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Discovery Intelligence
                </h3>
                <Badge variant="outline" className="font-bold border-slate-200 text-slate-500 bg-slate-50">
                    {sessions.length} SESSIONS
                </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map(s => (
                    <Card key={s.id} className="hover:shadow-md transition-all group overflow-hidden border-slate-200/60 bg-white cursor-pointer flex flex-col">
                        <CardHeader className="pb-2">
                           <div className="flex justify-between items-start">
                              <Badge className="bg-blue-50 text-blue-600 border-none text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                                 MOSI-SYNTHESIS
                              </Badge>
                              <div className="flex items-center text-[10px] font-medium text-slate-400">
                                 <Calendar className="w-3 h-3 mr-1" /> {s.date}
                              </div>
                           </div>
                           <CardTitle className="text-base font-semibold text-slate-900 mt-3 leading-tight group-hover:text-blue-600 transition-colors">
                              {s.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow pb-6">
                           <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                              {s.summary}
                           </p>
                           
                           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2">
                              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                 <Clock className="w-3.5 h-3.5 text-slate-400" /> {(s.duration / 60).toFixed(0)} MINS
                              </div>
                              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                                 <Users className="w-3.5 h-3.5 text-slate-400" /> {s.stakeholder_id}
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/50 py-3 flex justify-end mt-auto px-4">
                           <Button size="sm" variant="outline" className="w-full h-8 text-[10px] font-bold uppercase tracking-wider text-blue-600 border-blue-200 bg-white hover:bg-blue-600 hover:text-white transition-all">
                              <PlayCircle className="w-3.5 h-3.5 mr-2" /> Access Intelligence
                           </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

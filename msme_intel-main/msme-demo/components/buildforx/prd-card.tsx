"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Calendar, 
  Target, 
  Award,
  ChevronRight,
  Database,
  Building
} from 'lucide-react';
import { format } from 'date-fns';
import { BuildForXPRD } from '@/lib/types/prd';

interface PRDCardProps {
  prd: BuildForXPRD;
  onView?: (id: string) => void;
  onRegister?: (id: string) => void;
}

const PRDCard: React.FC<PRDCardProps> = ({ 
  prd, 
  onView, 
  onRegister 
}) => {
  return (
    <Card 
       className="bg-white border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col group overflow-hidden cursor-pointer h-full"
       onClick={() => onView?.(prd.id)}
    >
      <div className="h-1.5 w-full bg-slate-100 group-hover:bg-blue-600 transition-colors" />
      
      <CardHeader className="pb-3 px-6 pt-6">
         <div className="flex justify-between items-start mb-3">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
               {prd.competition_type}
            </Badge>
            <Badge className="bg-blue-50 text-blue-600 border-none text-[10px] font-black tracking-widest uppercase">
               {prd.trl_level_expected}
            </Badge>
         </div>
         <CardTitle className="text-xl font-black text-slate-900 tracking-tight italic group-hover:text-blue-600 transition-colors">
            {prd.title}
         </CardTitle>
         <div className="flex items-center gap-2 mt-2">
            <Building className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{prd.prd_code}</span>
         </div>
      </CardHeader>
      
      <CardContent className="px-6 flex-grow space-y-4 pb-6">
         <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed italic">
            "{prd.executive_summary}"
         </p>

         <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Deadline</span>
               </div>
               <span className="text-slate-900 font-bold text-sm italic">{prd.submission_deadline ? format(new Date(prd.submission_deadline), 'MMM dd, yyyy') : 'TBA'}</span>
            </div>
            
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-slate-400">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Prize Pool</span>
               </div>
               <span className="text-emerald-600 font-black text-sm italic">{prd.prize_pool?.total || 'Internship'}</span>
            </div>
         </div>

         <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-50">
            {prd.functional_requirements?.slice(0, 3).map((req, i) => (
               <Badge key={i} variant="secondary" className="bg-slate-50 text-[8px] font-black uppercase tracking-tighter hover:bg-slate-100 text-slate-400 border-none px-2 py-0.5">
                  {req.category}
               </Badge>
            ))}
            {prd.functional_requirements?.length > 3 && (
               <span className="text-[8px] text-slate-300 font-black uppercase tracking-widest">+{prd.functional_requirements.length - 3} MORE</span>
            )}
         </div>
      </CardContent>

      <CardFooter className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center group/footer">
         <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Initialize Build →
         </span>
         <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
         </div>
      </CardFooter>
    </Card>
  );
};

export default PRDCard;

"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Linkedin, 
  Building2, 
  Globe, 
  MapPin,
  ChevronRight,
  MoreVertical,
  Activity,
  UserCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface StakeholderRegistryProps {
  stakeholders: any[];
}

export default function StakeholderRegistry({ stakeholders }: StakeholderRegistryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = stakeholders.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 border-l-4 border-l-blue-500 shadow-sm">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600 shadow-inner">
                <Users className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 italic tracking-tight">Human Intelligence Library</h3>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mt-1">Verified Stakeholders & Expert Profiles</p>
             </div>
          </div>
          
          <div className="relative w-full md:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <Input 
                placeholder="Search repository..." 
                className="pl-9 bg-slate-50 border-slate-200 text-slate-900 text-xs font-medium focus:ring-blue-500/20" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
             filtered.map((s, i) => (
                <motion.div
                   key={s.id || i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.05 }}
                >
                   <Card className="bg-white border-slate-200 shadow-sm group hover:border-slate-300 transition-all cursor-pointer overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Activity className="w-24 h-24 text-slate-900" />
                      </div>
                      <CardHeader className="pb-3 px-5 pt-5">
                         <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 transition-colors shadow-sm">
                               <UserCircle className="w-8 h-8" />
                            </div>
                            <Badge variant="outline" className="bg-white text-[8px] font-black uppercase border-slate-200 text-slate-500 shadow-sm">Live Context</Badge>
                         </div>
                         <div className="space-y-1 mt-4">
                            <CardTitle className="text-lg font-black text-slate-900 italic group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.name}</CardTitle>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.role}</p>
                         </div>
                      </CardHeader>
                      <CardContent className="px-5 pb-5 space-y-4">
                         <div className="space-y-2 pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                               <Building2 className="w-3.5 h-3.5 text-slate-400" />
                               <span className="font-bold underline decoration-slate-200 underline-offset-4">{s.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                               <MapPin className="w-3.5 h-3.5 text-slate-400" />
                               <span>{s.sector || 'SME Participant'}</span>
                            </div>
                         </div>
                         
                         <div className="flex gap-2 pt-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200">
                               <Mail className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200">
                               <Phone className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200">
                               <Linkedin className="w-3.5 h-3.5" />
                            </Button>
                            <div className="flex-1" />
                            <Button variant="outline" size="sm" className="h-8 bg-white border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-600 transition-colors px-4">
                               PROFILING <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                         </div>
                      </CardContent>
                   </Card>
                </motion.div>
             ))
          ) : (
             <div className="col-span-full py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold italic">No intelligence profiles found.</p>
             </div>
          )}
       </div>
    </div>
  );
}

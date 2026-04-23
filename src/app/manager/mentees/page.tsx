"use client";

import React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Mail, 
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const MENTEES = [
  { id: "m1", name: "Aravind Sharma", institution: "IIT Bombay", role: "AI/ML Lead", stakeholders: 12, health: 92, status: "Active" },
  { id: "m2", name: "Priya Patel", institution: "BITS Pilani", role: "Product Design", stakeholders: 8, health: 85, status: "Reviewing" },
  { id: "m3", name: "Rahul Verma", institution: "NIT Trichy", role: "Data Scientist", stakeholders: 15, health: 78, status: "Active" },
  { id: "m4", name: "Sneha Reddy", institution: "Vellore IT", role: "Frontend Dev", stakeholders: 5, health: 95, status: "Active" },
  { id: "m5", name: "Karthik Raja", institution: "Anna University", role: "Backend Architect", stakeholders: 10, health: 64, status: "At Risk" },
];

export default function MenteesPortfolioPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Portfolio Management</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Mentees <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Complete innovator pipeline oversight. Monitor progress, health, and ecosystem integration.
          </p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-12 border-2 font-black uppercase italic text-[10px] tracking-widest px-6 rounded-none">
              Export Audit
           </Button>
           <Button className="bg-accent text-white h-12 font-black uppercase italic text-[10px] tracking-widest px-8 rounded-none shadow-lg shadow-accent/20">
              Add New Node
           </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
           <Input 
             placeholder="SEARCH INNOVATOR LATTICE..." 
             className="pl-12 h-14 bg-bg-surface border-border rounded-2xl font-black uppercase tracking-widest text-[10px] focus:ring-accent"
           />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl border-border bg-bg-surface font-black uppercase italic text-[10px] tracking-widest">
           <Filter className="w-4 h-4 mr-2" /> Filter Matrix
        </Button>
      </div>

      {/* Portfolio Matrix */}
      <div className="bg-bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border bg-bg-base/30">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Innovator</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Domain / Institution</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted text-center">Stakeholders</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">System Health</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border">
                  {MENTEES.map((mentee, idx) => (
                    <motion.tr 
                      key={mentee.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group hover:bg-bg-base/50 transition-colors"
                    >
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                             <Avatar className="size-10 rounded-xl border border-border shadow-sm group-hover:scale-105 transition-transform">
                                <AvatarFallback className="font-black bg-accent/10 text-accent">{mentee.name[0]}</AvatarFallback>
                             </Avatar>
                             <span className="font-black italic uppercase tracking-tighter text-sm group-hover:text-accent transition-colors">{mentee.name}</span>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <div className="space-y-0.5">
                             <p className="text-[10px] font-black uppercase tracking-tight">{mentee.role}</p>
                             <p className="text-[9px] font-bold text-text-muted uppercase italic">{mentee.institution}</p>
                          </div>
                       </td>
                       <td className="px-8 py-5 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-base border border-border rounded-full text-[10px] font-black">
                             <Users className="w-3 h-3 text-accent" /> {mentee.stakeholders}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                             <div className="flex-1 h-1.5 bg-bg-base rounded-full overflow-hidden border border-border max-w-[100px]">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${mentee.health}%` }}
                                  className={cn(
                                    "h-full",
                                    mentee.health > 80 ? "bg-success" : mentee.health > 60 ? "bg-warning" : "bg-danger"
                                  )} 
                                />
                             </div>
                             <span className="text-[10px] font-black italic">{mentee.health}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-5">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border",
                            mentee.status === 'Active' ? "bg-success/10 text-success border-success/20" : 
                            mentee.status === 'At Risk' ? "bg-danger/10 text-danger border-danger/20" : 
                            "bg-warning/10 text-warning border-warning/20"
                          )}>
                             <Activity className="w-2.5 h-2.5" /> {mentee.status}
                          </span>
                       </td>
                       <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-accent/10 hover:text-accent">
                                <Mail className="w-4 h-4" />
                             </Button>
                             <Button className="h-8 px-4 bg-accent text-white font-black uppercase italic text-[9px] tracking-widest rounded-lg shadow-lg shadow-accent/10" asChild>
                                <Link href={`/manager/mentees/${mentee.id}`}>
                                   Portal <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                </Link>
                             </Button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-bg-base/30 border-t border-border flex items-center justify-between">
            <p className="text-[9px] font-black uppercase text-text-muted tracking-[0.2em]">Showing 5 of 24 Nodes Active in Current Cohort</p>
            <div className="flex gap-2">
               <Button variant="outline" className="h-10 px-4 rounded-xl border-border font-black text-[9px] uppercase tracking-widest opacity-50 cursor-not-allowed">Previous</Button>
               <Button variant="outline" className="h-10 px-4 rounded-xl border-border font-black text-[9px] uppercase tracking-widest hover:border-accent hover:text-accent transition-all">Next Matrix</Button>
            </div>
         </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

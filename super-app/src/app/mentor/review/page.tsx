import React from "react";
import { 
  FileCheck, 
  Search, 
  History, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { getAllMentees } from "@/app/actions/assessment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as motion from "framer-motion/client";

export default async function ReviewHub() {
  const menteesResponse = await getAllMentees();
  const mentees = menteesResponse.success ? (menteesResponse.data || []) : [];

  // Flatten all readiness assessments
  const allAssessments = mentees.flatMap(m => {
    // In a real scenario, we might fetch all assessments for all mentees
    // For now, using the 'latestReadiness' property from getAllMentees
    if (!m.latestReadiness) return [];
    return [{
      ...m.latestReadiness,
      menteeName: m.name,
      menteeEmail: m.email
    }];
  });

  const pendingAssessments = allAssessments.filter(a => !a.mentorScores || Object.keys(a.mentorScores).length === 0);
  const historicalAssessments = allAssessments.filter(a => a.mentorScores && Object.keys(a.mentorScores).length > 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Review <span className="text-accent">Hub</span>
        </h1>
        <p className="text-text-muted text-sm max-w-xl">
          Validate and provide expert feedback on venture readiness assessments. Ensure high-fidelity data across the innovation ecosystem.
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-bg-surface border border-border/50 p-1">
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-accent data-[state=active]:text-bg-base text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-md"
            >
              Pending ({pendingAssessments.length})
            </TabsTrigger>
            <TabsTrigger 
              value="historical" 
              className="data-[state=active]:bg-accent data-[state=active]:text-bg-base text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-md"
            >
              Historical ({historicalAssessments.length})
            </TabsTrigger>
          </TabsList>
          
          <div className="relative w-64 hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
             <input 
               placeholder="FILTER BY VENTURE..." 
               className="w-full pl-9 pr-4 h-10 bg-bg-surface border border-border/50 rounded-lg text-[9px] font-bold tracking-widest uppercase focus:outline-none focus:border-accent/50 transition-colors"
             />
          </div>
        </div>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssessments.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {pendingAssessments.map((ra, i) => (
                <motion.div
                  key={ra.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="p-4 bg-bg-surface border-border/50 hover:border-accent/30 group transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                          <AlertCircle size={20} />
                        </div>
                        <div>
                          <div className="font-black text-sm uppercase tracking-tight">{ra.menteeName}</div>
                          <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-0.5">
                            Submitted: {new Date(ra.createdAt).toLocaleDateString()} • Stage: {ra.stage || "IDEATION"}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-border/50 text-[9px] uppercase tracking-tighter text-text-muted">
                           Awaiting Validation
                        </Badge>
                        <Link href={`/assessment/${ra.id}/validation`}>
                          <button className="flex items-center gap-2 px-6 py-2 bg-accent text-bg-base font-black uppercase text-[10px] tracking-[0.2em] rounded-lg hover:brightness-110 transition-all">
                             Review <ArrowRight size={12} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-bg-surface border border-dashed border-border/50 rounded-2xl">
               <ShieldCheck className="mx-auto text-text-muted/20 mb-4" size={48} />
               <h3 className="text-sm font-black uppercase tracking-widest">Clear Queue</h3>
               <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mt-2">All submitted assessments have been validated.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {historicalAssessments.map((ra, i) => (
              <motion.div
                key={ra.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 bg-bg-surface border-border/50 hover:bg-bg-base/50 group transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <div className="font-black text-sm uppercase tracking-tight">{ra.menteeName}</div>
                        <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-0.5">
                          Validated: {new Date(ra.updatedAt).toLocaleDateString()} • Result: {ra.stage || "IDEATION"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Link href={`/assessment/${ra.id}`}>
                        <button className="flex items-center gap-2 px-6 py-2 border border-border text-text-base font-black uppercase text-[10px] tracking-[0.2em] rounded-lg hover:bg-bg-surface transition-all">
                           View Result
                        </button>
                      </Link>
                      <button className="p-2 hover:bg-bg-base rounded-lg transition-colors text-text-muted">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            {historicalAssessments.length === 0 && (
               <div className="py-20 text-center">
                  <History className="mx-auto text-text-muted/20 mb-4" size={40} />
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.2em]">No historical reviews recorded.</p>
               </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

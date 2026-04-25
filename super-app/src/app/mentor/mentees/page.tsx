import React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import Link from "next/link";
import { getAllMentees } from "@/app/actions/assessment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FRAMEWORKS } from "@/data/venture-readiness-data";
import * as motion from "framer-motion/client";

export default async function MenteePortfolio() {
  const menteesResponse = await getAllMentees();
  const mentees = menteesResponse.success ? (menteesResponse.data || []) : [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Mentee <span className="text-accent">Portfolio</span>
          </h1>
          <p className="text-text-muted text-sm max-w-xl">
            Portfolio of all assigned ventures. Track readiness across the 8-framework diagnostic and manage mentorship engagements.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
             <Input 
               placeholder="SEARCH VENTURES..." 
               className="pl-9 h-10 bg-bg-surface border-border/50 text-[10px] font-bold tracking-widest uppercase"
             />
           </div>
           <Badge variant="outline" className="h-10 border-border/50 bg-bg-surface px-3 cursor-pointer hover:bg-bg-base transition-colors">
             <Filter size={14} className="mr-2" />
             FILTER
           </Badge>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentees.map((mentee, i) => (
          <motion.div
            key={mentee.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="flex flex-col h-full bg-bg-surface border-border/50 hover:border-accent/40 transition-all group overflow-hidden">
              {/* Card Header */}
              <div className="p-6 border-b border-border/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-center font-black text-accent text-lg">
                    {mentee.name.charAt(0)}
                  </div>
                  <Badge className="bg-bg-base text-text-muted border-border/50 text-[9px] uppercase tracking-tighter">
                    {mentee.latestReadiness?.stage || "IDEATION"}
                  </Badge>
                </div>
                
                <h3 className="font-black text-lg group-hover:text-accent transition-colors leading-tight">
                  {mentee.name}
                </h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                  {mentee.email}
                </p>
              </div>

              {/* Framework Levels */}
              <div className="p-6 flex-grow space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(FRAMEWORKS).map((key) => {
                    const levels = mentee.latestReadiness?.levels as Record<string, any>;
                    const level = levels?.[key] || 0;
                    const framework = (FRAMEWORKS as any)[key];
                    return (
                      <div key={key} className="flex flex-col items-center gap-1">
                        <div 
                          className="w-full h-1.5 rounded-full bg-border/20 overflow-hidden"
                          title={`${framework.name}: Level ${level}`}
                        >
                          <div 
                            className="h-full transition-all duration-1000"
                            style={{ 
                              width: `${(level / 9) * 100}%`,
                              backgroundColor: framework.color 
                            }}
                          />
                        </div>
                        <span className="text-[8px] font-black text-text-muted">{key}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] text-text-muted font-bold uppercase tracking-widest">
                    <Clock size={12} />
                    {mentee.latestReadiness 
                      ? `Last: ${new Date(mentee.latestReadiness.updatedAt).toLocaleDateString()}`
                      : "No Assessment"}
                  </div>
                  {mentee.latestReadiness && (
                     <div className="flex -space-x-2">
                        {[1,2,3].map(p => (
                          <div key={p} className="w-5 h-5 rounded-full border-2 border-bg-surface bg-border/30" />
                        ))}
                     </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-bg-base/30 border-t border-border/30 mt-auto">
                {mentee.latestReadiness ? (
                  <Link 
                    href={`/assessment/${mentee.latestReadiness.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-accent/5 hover:bg-accent text-accent hover:text-bg-base border border-accent/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    View Portfolio <ExternalLink size={12} />
                  </Link>
                ) : (
                  <button className="w-full py-2 bg-border/10 text-text-muted border border-border/30 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
                    Pending Initiation
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}

        {mentees.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-bg-surface border border-border/50 rounded-3xl flex items-center justify-center mb-6 text-text-muted opacity-20">
              <Users size={40} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">No Mentees <span className="text-accent">Assigned</span></h3>
            <p className="text-text-muted max-w-sm text-sm">
              Your mentee portfolio is currently empty. Contact the programme manager to assign ventures to your track.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

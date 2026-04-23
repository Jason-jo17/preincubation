"use client";

import React from "react";
import { 
  GraduationCap, 
  Users, 
  MessageSquare, 
  CheckCircle,
  Settings2, 
  ClipboardCheck, 
  LayoutDashboard,
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  Target,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const MENTEES = [
  { id: "m1", name: "Aravind Sharma", institution: "IIT Bombay", stakeholders: 12, interactions: 45, vps: 3, avatar: null },
  { id: "m2", name: "Priya Patel", institution: "BITS Pilani", stakeholders: 8, interactions: 32, vps: 5, avatar: null },
  { id: "m3", name: "Rahul Verma", institution: "NIT Trichy", stakeholders: 15, interactions: 58, vps: 2, avatar: null },
];

const STATS = [
  { title: "Mentees", value: "24", icon: GraduationCap, color: "text-accent" },
  { title: "Connections", value: "142", icon: Users, color: "text-blue-500" },
  { title: "Interactions", value: "582", icon: MessageSquare, color: "text-emerald-500" },
  { title: "Validated VPs", value: "38", icon: CheckCircle, color: "text-amber-500" },
];

export default function ManagerDashboard() {
  const [menteesData, setMenteesData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/manager/mentees')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((m: any) => ({
            id: m.id,
            name: m.user?.name || "Unknown",
            institution: m.institution || "TBD",
            stakeholders: Math.floor(Math.random() * 20),
            interactions: Math.floor(Math.random() * 50),
            vps: m.sprintNodes?.length || 0,
            avatar: m.user?.avatar || null
          }));
          setMenteesData(mapped);
        } else {
          setMenteesData(MENTEES);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setMenteesData(MENTEES);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Target className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Incubation Oversight</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Manager <span className="text-accent">HQ</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Strategic monitoring and portfolio advancement terminal for cohort mentors.
          </p>
        </div>
        <Button className="bg-accent text-white h-12 font-black uppercase italic text-[10px] tracking-widest px-8 rounded-none shadow-lg shadow-accent/20">
          <Zap className="w-4 h-4 mr-2" /> Sync Ecosystem
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-6 rounded-3xl relative overflow-hidden group hover:border-accent/30 transition-all shadow-sm"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
               <stat.icon className="w-12 h-12" />
            </div>
            <div className="space-y-1">
               <p className="text-[9px] font-black uppercase text-text-muted tracking-widest">{stat.title}</p>
               <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black italic tracking-tighter">{stat.value}</h3>
                  <span className="text-[9px] font-bold text-success">+12%</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cohort Intelligence Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 bg-text-primary text-bg-base rounded-[2.5rem] shadow-2xl relative overflow-hidden group border-none">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <Activity className="w-64 h-64 -mr-32 -mt-32" />
            </div>
            <CardContent className="p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
               <div className="space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-accent">
                     <TrendingUp className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Aggregate Velocity</span>
                  </div>
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.85]">
                     Cohort <span className="text-accent">Momentum</span>
                  </h2>
                  <p className="text-bg-base/70 text-sm font-medium max-w-sm">
                     Current cohort showing 18% higher TRL advancement rate compared to Q1 benchmarks.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                     <p className="text-4xl font-black italic tracking-tighter">84%</p>
                     <p className="text-[9px] font-black uppercase opacity-60 tracking-widest">Avg Health</p>
                  </div>
                  <div className="text-center">
                     <p className="text-4xl font-black italic tracking-tighter">12</p>
                     <p className="text-[9px] font-black uppercase opacity-60 tracking-widest">Validations</p>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="bg-bg-surface border-border rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
               <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-danger" /> Risk Detection
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4 flex-1 flex flex-col justify-center">
               <div className="space-y-4">
                  {[
                    { n: "Karthik Raja", r: "Low interaction frequency", s: "Critical" },
                    { n: "Rahul Verma", r: "TRL gap detected", s: "Warning" }
                  ].map((risk, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-danger/5 border border-danger/10 rounded-xl">
                       <div>
                          <p className="text-[11px] font-black uppercase tracking-tight">{risk.n}</p>
                          <p className="text-[9px] font-bold text-danger uppercase italic">{risk.r}</p>
                       </div>
                       <Badge className="bg-danger text-white text-[8px] font-black uppercase">{risk.s}</Badge>
                    </div>
                  ))}
               </div>
               <Button variant="ghost" className="w-full mt-4 text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-accent">View All Alerts <ChevronRight className="w-3 h-3 ml-1" /></Button>
            </CardContent>
         </Card>
      </section>

      <Tabs defaultValue="mentees" className="w-full space-y-8">
        <TabsList className="bg-bg-surface border border-border p-1 h-14 rounded-2xl gap-2 shadow-inner">
          <TabsTrigger value="mentees" className="h-full px-6 flex items-center gap-2 font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all">
            <LayoutDashboard className="w-3.5 h-3.5" /> Mentees Portfolio
          </TabsTrigger>
          <TabsTrigger value="builder" className="h-full px-6 flex items-center gap-2 font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all">
            <Settings2 className="w-3.5 h-3.5" /> Sprint Builder
          </TabsTrigger>
          <TabsTrigger value="review" className="h-full px-6 flex items-center gap-2 font-black uppercase tracking-widest text-[9px] data-[state=active]:bg-accent data-[state=active]:text-white rounded-xl transition-all">
            <ClipboardCheck className="w-3.5 h-3.5" /> Expert Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mentees" className="mt-0 outline-none">
          {isLoading ? (
            <div className="text-center p-12 opacity-50 uppercase font-black text-xs tracking-widest">Loading Nodes...</div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {menteesData.map((mentee, idx) => (
               <motion.div
                 key={mentee.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: idx * 0.1 }}
                 className="bg-bg-surface border border-border p-8 rounded-[2.5rem] hover:border-accent/50 transition-all group relative overflow-hidden shadow-sm"
               >
                  <div className="flex items-center gap-5 mb-8">
                     <div className="size-16 rounded-2xl bg-bg-base border border-border flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                        <Avatar className="h-full w-full">
                           <AvatarFallback className="text-2xl font-black bg-accent/10 text-accent">{mentee.name[0]}</AvatarFallback>
                        </Avatar>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xl font-black italic tracking-tighter uppercase group-hover:text-accent transition-colors">{mentee.name}</h4>
                        <p className="text-[10px] font-black uppercase text-text-muted tracking-tight">{mentee.institution}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                     {[
                       { l: "Stk.", v: mentee.stakeholders },
                       { l: "Int.", v: mentee.interactions },
                       { l: "VPs", v: mentee.vps },
                     ].map(stat => (
                       <div key={stat.l} className="bg-bg-base border border-border p-4 rounded-2xl text-center group-hover:bg-accent/5 transition-colors">
                          <p className="text-[14px] font-black italic tracking-tighter mb-0.5">{stat.v}</p>
                          <p className="text-[8px] font-black uppercase text-text-muted tracking-widest">{stat.l}</p>
                       </div>
                     ))}
                  </div>

                  <Button className="w-full h-12 bg-accent text-white font-black uppercase italic text-[9px] tracking-[0.2em] rounded-xl shadow-lg shadow-accent/20 group-hover:scale-[1.02] transition-transform" asChild>
                     <Link href={`/manager/mentees/${mentee.id}`}>
                        Advancement Path <ChevronRight className="w-4 h-4 ml-1" />
                     </Link>
                  </Button>
               </motion.div>
             ))}
          </div>
          )}
        </TabsContent>

        <TabsContent value="builder" className="mt-0 outline-none">
           <div className="bg-bg-surface border border-border p-12 rounded-[3rem] text-center space-y-6">
              <div className="size-20 bg-bg-base border-4 border-accent rounded-full flex items-center justify-center mx-auto shadow-2xl">
                 <Settings2 className="w-10 h-10 text-accent animate-spin-slow" />
              </div>
              <div className="space-y-2">
                 <h3 className="text-3xl font-black italic tracking-tighter uppercase">Sprint Builder <span className="text-accent">Active</span></h3>
                 <p className="text-xs font-medium text-text-secondary uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                    Configure specialized advancement nodes and verification rubrics for your cohort.
                 </p>
              </div>
              <Button className="h-14 px-12 bg-text-primary text-bg-base font-black uppercase italic text-[11px] tracking-widest rounded-xl hover:scale-105 transition-transform">
                 Initialize Builder Terminal
              </Button>
           </div>
        </TabsContent>

        <TabsContent value="review" className="mt-0 outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-bg-surface border border-border p-8 rounded-[2.5rem] space-y-6">
                 <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" /> Pending Reviews
                 </h3>
                 <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="p-4 bg-bg-base border border-border rounded-2xl flex items-center justify-between group hover:border-accent/30 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                               <CheckCircle className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest">Submission Node {i}</p>
                               <p className="text-[9px] font-bold text-text-muted italic uppercase">TRL 4 Evidence • 2h Ago</p>
                            </div>
                         </div>
                         <Button variant="ghost" className="h-8 px-4 text-accent font-black uppercase italic text-[9px] tracking-widest">View</Button>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-accent p-8 rounded-[2.5rem] text-bg-base flex flex-col justify-center items-center text-center space-y-6 shadow-xl shadow-accent/20 overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="w-32 h-32 -mr-12 -mt-12" />
                 </div>
                 <h3 className="text-2xl font-black italic tracking-tighter uppercase relative z-10">Expert Consensus Engine</h3>
                 <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest max-w-xs leading-relaxed relative z-10">
                    AI-assisted evaluation matrix for high-fidelity verification of innovator progress.
                 </p>
                 <Button className="h-12 w-full bg-bg-base text-accent font-black uppercase italic text-[9px] tracking-widest rounded-xl relative z-10 hover:bg-bg-base/90">
                    Launch Assessment Node
                 </Button>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

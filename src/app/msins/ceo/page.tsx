"use client";

import React from "react";
import { 
  Shield, 
  TrendingUp, 
  Globe, 
  Target, 
  Activity,
  Zap,
  LayoutGrid,
  PieChart as PieChartIcon,
  Map as MapIcon,
  ArrowUpRight,
  Sparkles,
  ShieldAlert,
  TrendingDown
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FunnelConversionChart } from "@/components/msins/FunnelConversionChart";
import { SectorDistributionChart } from "@/components/msins/SectorDistributionChart";
import { MarketShareGrowthChart } from "@/components/msins/MarketShareGrowthChart";
import { GeographicHeatmap } from "@/components/msins/GeographicHeatmap";
import { funnelDataMock, sectorDistributionMock, marketShareMock, geoDistributionMock } from "@/data/msme-intelligence";
import { platformKpis, platformPipeline } from "@/data/ceo-regional-intelligence";

const PERFORMANCE_DATA = [
  { month: "JAN", value: 65 },
  { month: "FEB", value: 72 },
  { month: "MAR", value: 85 },
  { month: "APR", value: 78 },
  { month: "MAY", value: 92 },
  { month: "JUN", value: 88 },
];

export default function MsinsCeoPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Oversight</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Executive <span className="text-accent">Overview</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Strategic decision-making dashboard for MSINS leadership. Aggregated ecosystem intelligence.
          </p>
        </div>
        <div className="flex flex-col items-end text-right">
           <span className="text-[10px] font-black uppercase text-text-muted">System Status</span>
           <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-[11px] font-black text-success uppercase tracking-widest">All Nodes Operational</span>
           </div>
        </div>
      </div>

      {/* High Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-text-primary p-8 rounded-3xl text-bg-base relative overflow-hidden shadow-2xl"
        >
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Globe className="w-32 h-32 -mr-16 -mt-16" />
           </div>
           <div className="relative z-10 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Ecosystem Fund Velocity</p>
              <div className="flex items-baseline gap-4">
                 <h2 className="text-6xl font-black italic tracking-tighter">₹{platformKpis.fundsDeployedCr}Cr</h2>
                 <span className="text-xs font-bold text-accent">+6.2%</span>
              </div>
              <p className="text-xs font-bold opacity-80 max-w-[200px]">Strategic capital distribution across MSME nodes.</p>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-surface border border-border p-8 rounded-3xl space-y-6 shadow-sm"
        >
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <TrendingUp className="w-4 h-4 text-accent" /> Efficiency Index
              </h3>
              <Activity className="w-4 h-4 text-text-muted" />
           </div>
           <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={PERFORMANCE_DATA}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#786BF9" 
                      strokeWidth={4} 
                      dot={false}
                    />
                 </LineChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between items-end">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Growth Velocity</p>
                 <p className="text-xl font-black italic">{platformKpis.roiIndex}x ROI</p>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-success uppercase">+0.4x vs LY</p>
              </div>
           </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-surface border border-border p-8 rounded-3xl space-y-6 shadow-sm"
        >
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <Target className="w-4 h-4 text-accent" /> Pipeline Mobilization
              </h3>
              <Zap className="w-4 h-4 text-text-muted" />
           </div>
           <div className="space-y-4">
              {[
                { l: "Talent Pool", v: platformPipeline.talentPool, max: 10000 },
                { l: "Active Teams", v: platformPipeline.teamsFormed, max: 500 },
                { l: "Cohorts", v: platformPipeline.projectsInCohorts, max: 100 },
              ].map(i => (
                <div key={i.l} className="space-y-1.5">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-tight">
                      <span>{i.l}</span>
                      <span>{i.v}</span>
                   </div>
                   <div className="h-1.5 bg-bg-base rounded-full overflow-hidden border border-border">
                      <div className="h-full bg-accent" style={{ width: `${(i.v / i.max) * 100}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>
      </div>

      {/* Main Insights Tabs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-secondary">Portfolio Intelligence</h2>
            <div className="h-px flex-1 bg-border mx-6" />
        </div>
        
        <Tabs defaultValue="lifecycle" className="w-full space-y-8">
          <TabsList className="bg-bg-raised p-1 rounded-2xl h-14 border border-border flex w-fit">
            <TabsTrigger value="lifecycle" className="rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest px-6 data-[state=active]:bg-text-primary data-[state=active]:text-bg-base">
              <LayoutGrid className="h-4 w-4" /> Pipeline Lifecycle
            </TabsTrigger>
            <TabsTrigger value="performance" className="rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest px-6 data-[state=active]:bg-text-primary data-[state=active]:text-bg-base">
              <PieChartIcon className="h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="geographic" className="rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest px-6 data-[state=active]:bg-text-primary data-[state=active]:text-bg-base">
              <MapIcon className="h-4 w-4" /> Regional
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lifecycle" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-5">
              <Card className="lg:col-span-3 bg-bg-surface border-border shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Funnel Conversion Dynamics</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <FunnelConversionChart data={funnelDataMock} />
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2 bg-bg-surface border-border shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                  <CardTitle className="text-sm font-black uppercase tracking-widest">Sector Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <SectorDistributionChart data={sectorDistributionMock} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="bg-bg-surface border-border shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                <CardTitle className="text-sm font-black uppercase tracking-widest">Growth vs Market Share Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <MarketShareGrowthChart data={marketShareMock} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geographic">
            <Card className="bg-bg-surface border-border shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-8 border-b border-border bg-bg-raised/50">
                <CardTitle className="text-sm font-black uppercase tracking-widest">Regional Concentration Heatmap</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <GeographicHeatmap data={geoDistributionMock} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Intervention Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-secondary flex items-center gap-2">
             <ShieldAlert className="w-4 h-4" /> System Interventions
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { t: "Nagpur Performance Gap", d: "Nagpur underperforming despite ₹8 Cr deployed", status: "Critical", icon: TrendingDown },
                { t: "Nashik Mentor Shortage", d: "Mentor shortage slowing cohorts in the IT sector", status: "Warning", icon: ShieldAlert },
                { t: "Pune EV Scaling", d: "Pune EV model ready to replicate statewide", status: "Growth", icon: Sparkles },
                { t: "Incubator Audit", d: "2 incubators showing low fund utilization rates", status: "Action", icon: Activity },
              ].map(i => (
                <div key={i.t} className="bg-bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between group hover:border-accent transition-colors shadow-sm">
                   <div className="space-y-3">
                      <div className="flex items-center justify-between">
                         <Badge variant="outline" className="rounded-none font-black text-[8px] uppercase">{i.status}</Badge>
                         <i.icon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <h4 className="font-black italic uppercase text-sm tracking-tight">{i.t}</h4>
                      <p className="text-xs text-text-muted font-medium">{i.d}</p>
                   </div>
                   <Button size="sm" className="mt-6 w-full rounded-xl bg-bg-base text-text-primary hover:bg-accent hover:text-bg-base border border-border group-hover:border-accent">Analyze Risk</Button>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-secondary">Decision Hub</h2>
            <Card className="bg-bg-surface border-border shadow-lg rounded-3xl overflow-hidden border-2 border-accent/20">
               <CardContent className="p-8 space-y-6">
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-accent">Pending Approval</p>
                     <p className="text-sm font-bold text-text-primary italic">Approve mentor budget request for Q3 regional mobilization.</p>
                     <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-accent text-bg-base font-black uppercase italic rounded-lg flex-1">Approve</Button>
                        <Button size="sm" variant="outline" className="rounded-lg font-black uppercase italic flex-1">Decline</Button>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <h4 className="text-xs font-black uppercase tracking-widest border-b border-border pb-2">Recent Strategic Actions</h4>
                     {[
                        "₹1 Cr approved for Nashik lab",
                        "Pune cohort completed 12 startups",
                        "3 MSME partnerships added",
                     ].map((a, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                           <p className="text-xs font-medium text-text-muted">{a}</p>
                        </div>
                     ))}
                  </div>

                   <div className="space-y-4">
                      <Button 
                         className="w-full bg-text-primary text-bg-base font-black uppercase italic h-14 rounded-2xl shadow-xl hover:bg-accent transition-all group"
                         onClick={() => window.location.href = '/mosi/setup'}
                      >
                         <Sparkles className="w-5 h-5 mr-2 text-accent group-hover:text-bg-base transition-colors" />
                         Initiate Strategic Discovery
                      </Button>
                      <Button variant="outline" className="w-full border-border text-text-muted font-black uppercase italic h-12 rounded-2xl">
                         System Audit
                      </Button>
                   </div>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}

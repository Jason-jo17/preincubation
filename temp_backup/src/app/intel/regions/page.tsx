"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Map as MapIcon, 
  MapPin, 
  TrendingUp, 
  Users, 
  Target, 
  Activity,
  ArrowUpRight,
  AlertTriangle,
  Lightbulb,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const divisions = [
  { name: "Pune", msmeCount: "8.2L", status: "High Innovation", employment: "14.2L", incubators: 14, startups: 542, problemsSolved: 840, fundsAllocated: "₹82Cr", opportunityScore: 92, color: "bg-emerald-500" },
  { name: "Konkan", msmeCount: "7.8L", status: "High Innovation", employment: "12.8L", incubators: 12, startups: 480, problemsSolved: 720, fundsAllocated: "₹76Cr", opportunityScore: 88, color: "bg-emerald-500" },
  { name: "Nashik", msmeCount: "6.1L", status: "Emerging", employment: "10.4L", incubators: 8, startups: 280, problemsSolved: 420, fundsAllocated: "₹48Cr", opportunityScore: 72, color: "bg-amber-500" },
  { name: "Aurangabad", msmeCount: "5.4L", status: "Underserved", employment: "8.6L", incubators: 6, startups: 180, problemsSolved: 240, fundsAllocated: "₹34Cr", opportunityScore: 54, color: "bg-rose-500" },
  { name: "Amravati", msmeCount: "4.2L", status: "Underserved", employment: "6.8L", incubators: 4, startups: 120, problemsSolved: 160, fundsAllocated: "₹22Cr", opportunityScore: 42, color: "bg-rose-500" },
  { name: "Nagpur", msmeCount: "4.8L", status: "Emerging", employment: "6.4L", incubators: 5, startups: 220, problemsSolved: 280, fundsAllocated: "₹38Cr", opportunityScore: 64, color: "bg-amber-500" },
]

const regions = [
  { id: "konkan", label: "Konkan", x: 80, y: 180, w: 60, h: 120, color: "fill-emerald-500/40", stroke: "stroke-emerald-500" },
  { id: "pune", label: "Pune", x: 140, y: 200, w: 90, h: 100, color: "fill-emerald-500/60", stroke: "stroke-emerald-500" },
  { id: "nashik", label: "Nashik", x: 130, y: 100, w: 100, h: 90, color: "fill-amber-500/40", stroke: "stroke-amber-500" },
  { id: "aurangabad", label: "Aurangabad", x: 230, y: 130, w: 110, h: 110, color: "fill-rose-500/40", stroke: "stroke-rose-500" },
  { id: "amravati", label: "Amravati", x: 300, y: 60, w: 100, h: 90, color: "fill-rose-500/60", stroke: "stroke-rose-500" },
  { id: "nagpur", label: "Nagpur", x: 380, y: 80, w: 110, h: 120, color: "fill-amber-500/60", stroke: "stroke-amber-500" },
]

export default function RegionalIntelligence() {
  const [selectedDivision, setSelectedDivision] = useState<typeof divisions[0] | null>(null)

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Sub-System: Intel Hub
             </div>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Discovery <span className="text-accent">Intelligence</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Geospatial mapping of MSME density and innovation potential across regional clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border hover:border-accent uppercase text-[10px] font-black tracking-widest h-12 px-6">
            Export Map
          </Button>
          <Button className="bg-accent text-bg-base rounded-xl uppercase text-[10px] font-black tracking-widest h-12 px-6">
            Add Marker
          </Button>
        </div>
      </header>

      {/* Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Regions", value: "06", sub: "Divisions", icon: MapIcon },
          { label: "Total Districts", value: "36", sub: "Maharashtra", icon: MapPin },
          { label: "Opportunity Zones", value: "14", sub: "High Potential", icon: Target },
          { label: "Growth Nodes", value: "12", sub: "Green Status", icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.label} className="bg-bg-surface border-border overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</p>
                <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                <p className="text-[9px] font-bold text-accent uppercase tracking-wider">{stat.sub}</p>
              </div>
              <div className="p-3 rounded-2xl bg-bg-raised border border-border">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Heatmap Section */}
        <div className="lg:col-span-7 bg-bg-surface border border-border rounded-[2.5rem] p-8 space-y-8">
           <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight italic">Ecosystem Density</h2>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">MSME concentration by region</p>
              </div>
              <div className="flex items-center gap-4">
                {[
                  { label: "High", color: "bg-emerald-500" },
                  { label: "Emerging", color: "bg-amber-500" },
                  { label: "Underserved", color: "bg-rose-500" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", l.color)} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{l.label}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="relative aspect-[16/10] bg-bg-base border border-border rounded-3xl flex items-center justify-center p-8">
              <svg viewBox="0 0 520 360" className="w-full h-full drop-shadow-2xl">
                {regions.map((r) => (
                  <motion.g 
                    key={r.id} 
                    className="cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDivision(divisions.find(d => d.name.toLowerCase() === r.id || r.label === d.name) || null)}
                  >
                    <rect 
                      x={r.x} y={r.y} width={r.w} height={r.h} 
                      rx="12" ry="12" 
                      className={cn(r.color, r.stroke, "stroke-2 transition-all duration-300 group-hover:opacity-100")} 
                      opacity={0.6}
                    />
                    <text 
                      x={r.x + r.w / 2} y={r.y + r.h / 2} 
                      textAnchor="middle" dominantBaseline="central" 
                      className="fill-bg-base font-black uppercase text-[10px] tracking-tighter pointer-events-none"
                    >
                      {r.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
           </div>
        </div>

        {/* Division Rankings */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight italic">Division Insights</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
            {divisions.map((div) => (
              <Card 
                key={div.name} 
                onClick={() => setSelectedDivision(div)}
                className={cn(
                  "bg-bg-surface border-border cursor-pointer transition-all duration-300 group hover:border-accent/50",
                  selectedDivision?.name === div.name && "border-accent ring-1 ring-accent/20"
                )}
              >
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none">{div.name}</h3>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{div.msmeCount} MSMEs</p>
                      </div>
                      <Badge className={cn("rounded-lg uppercase text-[9px] font-black", 
                        div.status === "High Innovation" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        div.status === "Emerging" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {div.status}
                      </Badge>
                   </div>

                   <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Startups", val: div.startups },
                        { label: "Solved", val: div.problemsSolved },
                        { label: "Score", val: div.opportunityScore },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1">{s.label}</p>
                          <p className="text-sm font-black italic tracking-tighter">{s.val}</p>
                        </div>
                      ))}
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunity Insights */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
           <Activity className="w-5 h-5 text-accent" />
           <h2 className="text-xl font-black uppercase tracking-tight italic">Strategic Opportunity Feed</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              msg: "Marathwada has highest intervention potential — 5.4L MSMEs but only 8% innovation participation.", 
              type: "warning",
              icon: AlertTriangle
            },
            { 
              msg: "Vidarbha (Amravati + Nagpur) has a combined 9L MSMEs but innovation activity 3x below average.", 
              type: "opportunity",
              icon: Lightbulb
            },
            { 
              msg: "Pune is a saturated ecosystem with 94% of programs at capacity. Best practices ready for replication.", 
              type: "info",
              icon: Info
            }
          ].map((insight, i) => (
            <Card key={i} className="bg-bg-surface border-border overflow-hidden group">
              <CardContent className="p-8 space-y-6">
                <div className={cn("size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", 
                  insight.type === "warning" ? "bg-warning/10 text-warning" : 
                  insight.type === "opportunity" ? "bg-accent/10 text-accent" : "bg-info/10 text-info"
                )}>
                  <insight.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors">
                  {insight.msg}
                </p>
                <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-accent hover:no-underline">
                   Execute Strategy <ArrowUpRight className="ml-1 w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

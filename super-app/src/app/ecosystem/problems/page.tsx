"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  ArrowUpRight, 
  Target, 
  Users, 
  Plus,
  Activity,
  ChevronDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "High Spoilage in Inland Fisheries",
    description: "Lack of real-time temperature monitoring leads to 35% wastage during transport from inland hubs to coastal markets.",
    severity: "CRITICAL",
    domain: "Fisheries",
    districts: ["Ratnagiri", "Sindhudurg"],
    impact: "High",
  },
  {
    id: "2",
    title: "Cotton Fiber Grading Automation",
    description: "Manual grading in Amravati clusters results in price disparities and quality inconsistency for textile MSMEs.",
    severity: "HIGH",
    domain: "Agriculture",
    districts: ["Amravati", "Nagpur"],
    impact: "Medium",
  },
  {
    id: "3",
    title: "Precision Metal Forging Energy Delta",
    description: "Inefficient furnace cycles in Pune automotive clusters lead to 20% higher energy costs compared to global benchmarks.",
    severity: "MEDIUM",
    domain: "Manufacturing",
    districts: ["Pune"],
    impact: "Strategic",
  },
]

export default function ProblemsHub() {
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Sub-System: Problem Hub
             </div>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Problem <span className="text-accent">Statements</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Explore systemic industrial gaps indexed across the regional clusters. Every problem is an opportunity for disruption.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-accent text-bg-base rounded-xl uppercase text-[10px] font-black tracking-widest h-12 px-6">
            <Plus className="w-4 h-4 mr-2" /> Submit Problem
          </Button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-bg-surface border border-border p-2 rounded-[2rem] shadow-2xl">
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="SEARCH BY DOMAIN, DISTRICT, OR KEYWORD..." 
              className="pl-14 h-14 bg-transparent border-none focus-visible:ring-0 text-[10px] font-black uppercase tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="h-10 w-px bg-border hidden md:block" />
         <div className="flex items-center gap-2 px-4">
            <Badge variant="outline" className="h-10 px-4 rounded-xl text-[9px] font-black uppercase border-border hover:border-accent/30 transition-all cursor-pointer">
               Sector: All <ChevronDown className="ml-2 w-3 h-3" />
            </Badge>
            <Badge variant="outline" className="h-10 px-4 rounded-xl text-[9px] font-black uppercase border-border hover:border-accent/30 transition-all cursor-pointer">
               Region: All <ChevronDown className="ml-2 w-3 h-3" />
            </Badge>
         </div>
      </div>

      {/* Problems Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PROBLEMS.map((problem, i) => (
          <motion.div
            key={problem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-bg-surface border-border overflow-hidden group hover:border-accent/50 transition-all duration-500 rounded-[2.5rem] shadow-xl hover:shadow-accent/5 flex flex-col h-full">
              <CardHeader className="p-8 pb-4">
                 <div className="flex justify-between items-start mb-6">
                    <div className={cn("p-3 rounded-2xl", 
                      problem.severity === "CRITICAL" ? "bg-rose-500/10 text-rose-500" : 
                      problem.severity === "HIGH" ? "bg-amber-500/10 text-amber-500" : "bg-info/10 text-info"
                    )}>
                       <AlertTriangle className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-lg uppercase text-[9px] font-black">{problem.domain}</Badge>
                 </div>
                 <CardTitle className="text-xl font-black italic uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                   {problem.title}
                 </CardTitle>
                 <CardDescription className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">
                   Indexed: {problem.districts.join(" • ")}
                 </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between">
                <p className="text-sm font-bold text-text-secondary leading-relaxed mb-8">
                  {problem.description}
                </p>

                <div className="space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="space-y-1">
                         <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Severity</p>
                         <p className={cn("text-[10px] font-black uppercase italic", 
                           problem.severity === "CRITICAL" ? "text-rose-500" : 
                           problem.severity === "HIGH" ? "text-amber-500" : "text-info"
                         )}>{problem.severity}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Impact</p>
                         <p className="text-[10px] font-black uppercase italic">{problem.impact}</p>
                      </div>
                   </div>

                   <Button className="w-full h-14 bg-bg-raised border border-border group-hover:border-accent/30 text-[10px] font-black uppercase tracking-widest rounded-2xl group-hover:bg-accent group-hover:text-bg-base transition-all">
                      Propose Solution <ArrowUpRight className="ml-2 w-4 h-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Challenges", val: "124", sub: "+12 THIS WEEK", icon: Activity },
          { label: "Critical Gaps", val: "18", sub: "IMMEDIATE ATTN", icon: AlertTriangle },
          { label: "Mapped Regions", val: "32", sub: "DISTRICTS", icon: Target },
          { label: "Collaborators", val: "450", sub: "SOLVING", icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="p-8 bg-bg-surface border border-border rounded-[2rem] flex flex-col justify-between h-48 group hover:border-accent/30 transition-all">
             <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-bg-raised text-text-muted group-hover:text-accent transition-colors">
                   <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[8px] font-black text-accent uppercase tracking-widest">{stat.sub}</span>
             </div>
             <div>
                <p className="text-4xl font-black italic tracking-tighter leading-none">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1">{stat.label}</p>
             </div>
          </div>
        ))}
      </section>
    </div>
  )
}

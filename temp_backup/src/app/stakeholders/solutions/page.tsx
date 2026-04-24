"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  Lightbulb, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Plus,
  Rocket,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const MOCK_SOLUTIONS = [
  {
    id: "1",
    title: "Cold Chain IoT Sentinel",
    problem: "High Spoilage in Inland Fisheries",
    status: "PROTOTYPING",
    progress: 65,
    creator: "AquaTech Team",
    impact: "92% Wastage Reduction",
    type: "HARDWARE + SOFTWARE"
  },
  {
    id: "2",
    title: "Spectral Grading AI",
    problem: "Cotton Fiber Grading Automation",
    status: "PILOT",
    progress: 82,
    creator: "CottonTech AI",
    impact: "15% Farmer Income Boost",
    type: "COMPUTER VISION"
  },
  {
    id: "3",
    title: "EcoForge Burner Control",
    problem: "Precision Metal Forging Energy Delta",
    status: "DEVELOPMENT",
    progress: 40,
    creator: "EnergyNode",
    impact: "22% Power Optimization",
    type: "AI AGENT"
  },
]

export default function SolutionsHub() {
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Sub-System: Solution Hub
             </div>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Innovation <span className="text-accent">Solutions</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            Active R&D pipeline of tactical solutions addressing indexed industrial gaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-accent text-bg-base rounded-xl uppercase text-[10px] font-black tracking-widest h-12 px-6">
            <Plus className="w-4 h-4 mr-2" /> Propose Solution
          </Button>
        </div>
      </header>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SOLUTIONS.map((solution, i) => (
          <motion.div
            key={solution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-bg-surface border-border overflow-hidden group hover:border-accent/50 transition-all duration-500 rounded-[2.5rem] shadow-xl hover:shadow-accent/5 flex flex-col h-full">
              <CardHeader className="p-8 pb-4">
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg-base transition-all duration-500">
                       <Lightbulb className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="rounded-lg uppercase text-[9px] font-black border-border group-hover:border-accent/20 transition-colors">{solution.status}</Badge>
                 </div>
                 <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                   {solution.title}
                 </h3>
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-2">
                   Solving: {solution.problem}
                 </p>
              </CardHeader>
              
              <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-between">
                <div className="space-y-6 mb-8">
                   <div className="space-y-3">
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-text-muted">
                         <span>Deployment Readiness</span>
                         <span>{solution.progress}%</span>
                      </div>
                      <Progress value={solution.progress} className="h-1.5" />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-bg-raised/50 rounded-xl border border-border/50">
                         <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Expected Impact</p>
                         <p className="text-[10px] font-black italic text-accent">{solution.impact}</p>
                      </div>
                      <div className="p-3 bg-bg-raised/50 rounded-xl border border-border/50">
                         <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Tech Stack</p>
                         <p className="text-[10px] font-black italic text-text-primary">{solution.type}</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                   <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-slate-800 border border-border" />
                      <span className="text-[9px] font-black uppercase text-text-muted">{solution.creator}</span>
                   </div>
                   <Button variant="ghost" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-accent hover:bg-transparent">
                      View Roadmap <ChevronRight className="ml-1 w-3 h-3" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Insights */}
      <section className="bg-bg-surface border border-border rounded-[3rem] p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
               <h3 className="text-3xl font-black italic uppercase tracking-tighter">Impact Velocity</h3>
               <p className="text-text-secondary font-bold max-w-xl">
                 Average time from problem identification to solution pilot is currently **42 days**. We are aiming for a **15% efficiency gain** in the next cycle.
               </p>
            </div>
            <div className="flex gap-4">
               <div className="p-6 bg-bg-raised border border-border rounded-2xl text-center">
                  <p className="text-3xl font-black italic text-accent">15.2%</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mt-1">Growth Index</p>
               </div>
               <div className="p-6 bg-bg-raised border border-border rounded-2xl text-center">
                  <p className="text-3xl font-black italic text-success">840</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mt-1">Total Solved</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}

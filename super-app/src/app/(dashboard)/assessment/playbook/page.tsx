"use client"

import { useState } from "react"
import { STAGES, FRAMEWORKS, STAGE_MAP, DETAILS } from "@/data/venture-readiness-data"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Zap, Target, Users, TrendingUp, ShieldCheck, 
  Search, ExternalLink, ArrowRight, CheckCircle2,
  Clock, Tool as ToolIcon, Package, Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PlaybookPage() {
    const [activeStage, setActiveStage] = useState(STAGES[0].key)

    const getStageDetails = (stageKey: string) => {
        const results: any[] = []
        Object.entries(FRAMEWORKS).forEach(([fwKey, fw]) => {
            const levels = STAGE_MAP[fwKey]?.[stageKey]
            if (!levels) return

            const fwDetails: any = {
                framework: fw,
                levels: []
            }

            for (let i = levels[0]; i <= levels[1]; i++) {
                const detail = DETAILS[fwKey]?.[i]
                if (detail) {
                    fwDetails.levels.push({
                        level: i,
                        ...detail
                    })
                }
            }
            if (fwDetails.levels.length > 0) {
                results.push(fwDetails)
            }
        })
        return results
    }

    const stageData = getStageDetails(activeStage)

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Growth <span className="text-accent">Playbook</span></h1>
                    <p className="text-sm text-text-muted font-medium uppercase tracking-widest max-w-2xl">
                        A structured roadmap for venture excellence across 8 strategic dimensions.
                    </p>
                </div>

                {/* Stage Tabs */}
                <div className="flex flex-wrap gap-2 p-1 bg-bg-surface border border-border rounded-[24px] w-fit">
                    {STAGES.map((stage) => (
                        <button
                            key={stage.key}
                            onClick={() => setActiveStage(stage.key)}
                            className={cn(
                                "px-6 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all",
                                activeStage === stage.key 
                                    ? "bg-accent text-bg-base shadow-lg scale-105" 
                                    : "text-text-muted hover:text-text hover:bg-white/50"
                            )}
                        >
                            {stage.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stage Hero */}
            <div className="relative p-10 rounded-[40px] bg-bg-surface border border-border overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-accent/10" />
                <div className="relative space-y-4">
                    <Badge variant="outline" className="border-accent/30 text-accent font-black uppercase text-[9px] tracking-widest px-3 py-1">
                        Current Focus: {STAGES.find(s => s.key === activeStage)?.label}
                    </Badge>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter max-w-2xl">
                        {STAGES.find(s => s.key === activeStage)?.short}
                    </h2>
                </div>
            </div>

            {/* Playbook Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                    {stageData.map((fwData, idx) => (
                        <motion.div
                            key={`${activeStage}-${fwData.framework.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex flex-col gap-6 p-8 rounded-[40px] bg-white border border-border shadow-sm hover:shadow-xl transition-all"
                        >
                            {/* Framework Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                                        style={{ backgroundColor: fwData.framework.color }}
                                    >
                                        <Layers size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-sm">{fwData.framework.name}</h3>
                                        <p className="text-[10px] font-bold text-text-muted">{fwData.framework.short}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Levels in this Stage */}
                            <div className="space-y-8">
                                {fwData.levels.map((lvl: any) => (
                                    <div key={lvl.level} className="space-y-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-[2px] flex-1 bg-border/50" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted px-2">Level {lvl.level}</span>
                                            <div className="h-[2px] flex-1 bg-border/50" />
                                        </div>

                                        {/* Sprint & Timeline */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-bg-base/50 border border-border space-y-1">
                                                <div className="flex items-center gap-2 text-accent">
                                                    <Zap size={14} />
                                                    <span className="text-[9px] font-black uppercase">Sprint Focus</span>
                                                </div>
                                                <p className="text-xs font-bold leading-tight">{lvl.sprint}</p>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-bg-base/50 border border-border space-y-1">
                                                <div className="flex items-center gap-2 text-text-muted">
                                                    <Clock size={14} />
                                                    <span className="text-[9px] font-black uppercase">Est. Timeline</span>
                                                </div>
                                                <p className="text-xs font-bold leading-tight">{lvl.timeline}</p>
                                            </div>
                                        </div>

                                        {/* Tasks */}
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                                <CheckCircle2 size={12} className="text-accent" />
                                                Priority Tasks
                                            </h4>
                                            <div className="grid gap-2">
                                                {lvl.tasks.map((task: string, tIdx: number) => (
                                                    <div key={tIdx} className="flex gap-3 p-4 rounded-2xl bg-white border border-border group hover:border-accent/30 transition-all">
                                                        <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center text-[10px] font-black group-hover:border-accent group-hover:text-accent transition-colors shrink-0">
                                                            {tIdx + 1}
                                                        </div>
                                                        <p className="text-sm font-medium text-text-secondary leading-snug">{task}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tools & Scaffolding */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                                    <ToolIcon size={12} />
                                                    Recommended Tools
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {lvl.tools.map((tool: string) => (
                                                        <Badge key={tool} variant="secondary" className="bg-bg-surface hover:bg-accent hover:text-bg-base transition-colors cursor-pointer text-[9px] font-bold py-1 px-2 border-none">
                                                            {tool}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                                    <Package size={12} />
                                                    Support Needed
                                                </h4>
                                                <div className="space-y-1">
                                                    {lvl.scaffolding.map((scaff: string, sIdx: number) => (
                                                        <p key={sIdx} className="text-[10px] font-medium text-text-muted leading-tight">
                                                            • {scaff.split(') ')[1] || scaff}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

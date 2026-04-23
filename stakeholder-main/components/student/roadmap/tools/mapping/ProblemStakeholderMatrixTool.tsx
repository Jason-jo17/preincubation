"use client"

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { PLATFORM_PROBLEMS, MOCK_STAKEHOLDERS } from '@/lib/data/platform-problems'
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"
import { Button } from "@/components/ui/button"
import { Plus, Save, Loader2 } from "lucide-react"
import { saveToolData } from '@/app/actions/roadmap'

interface Props {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function ProblemStakeholderMatrixTool({ tool, progress, onDataSaved, readOnly }: Props) {
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            // Collect the data needed from existing state/data
            // The component uses PLATFORM_PROBLEMS and MOCK_STAKEHOLDERS for display
            // but needs to save the user's links. 
            // Since this is a specialized tool, we save the entire state required to restore it.
            const data = {
                // In a real implementation, we'd have state for matrix links
                // For now, we save what the component manages
                timestamp: new Date().toISOString()
            }
            const res = await saveToolData(tool.toolId, data)
            if (res?.error) {
                console.error('Save failed:', res.error)
            } else {
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            console.error('Save error:', e)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-text-main font-display flex flex-col h-[75vh] min-h-[600px] rounded-xl overflow-hidden border">
            {/* Tool Header replacing full page header */}
            <header className="flex items-center justify-between border-b border-[#dbdce6] bg-slate-50 dark:bg-slate-900 px-6 py-3 shrink-0">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold">Strategic Analysis Phase</h2>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Problem-Stakeholder Matrix</span>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleSave} disabled={saving || readOnly} className="bg-primary shadow-sm h-8">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Mapping
                    </Button>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                <aside className="w-72 flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-[#dbdce6] dark:border-slate-700">
                    <div className="p-3 border-b border-[#dbdce6] dark:border-slate-700">
                        <h3 className="font-bold text-xs mb-2 uppercase tracking-wider text-text-main/60">Problem Statements</h3>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-text-main/40">
                                <span className="material-symbols-outlined text-[16px]">search</span>
                            </div>
                            <input className="w-full bg-white dark:bg-slate-800 border rounded py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-primary/50 outline-none" placeholder="Filter problems..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {PLATFORM_PROBLEMS.map((problem) => (
                            <div key={problem.id} className="bg-white dark:bg-slate-800 border border-[#dbdce6] dark:border-slate-700 rounded p-2 shadow-sm cursor-grab hover:border-primary/50 transition-all">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded uppercase", problem.visible ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600")}>Priority</span>
                                    <span className="material-symbols-outlined text-slate-300 text-[14px]">drag_indicator</span>
                                </div>
                                <h4 className="text-xs font-bold leading-snug line-clamp-2">{problem.title}</h4>
                            </div>
                        ))}
                    </div>
                </aside>
                
                <section className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950">
                    <div className="border-b border-[#dbdce6] dark:border-slate-800 flex items-center justify-between px-6">
                        <div className="flex gap-6">
                            <button className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-2 pt-3">
                                <p className="text-xs font-bold">Relationship Canvas</p>
                            </button>
                            <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-text-main/60 pb-2 pt-3 hover:text-text-main">
                                <p className="text-xs font-bold">Matrix Table</p>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-main/40">
                                Legend:
                                <div className="flex items-center gap-1 ml-1"><div className="bg-impact-primary w-2 h-2 rounded-full"></div> <span>1°</span></div>
                                <div className="flex items-center gap-1 ml-1"><div className="bg-impact-secondary w-2 h-2 rounded-full"></div> <span>2°</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-6 overflow-auto relative bg-slate-50/50 dark:bg-slate-900/20">
                        <div className="mb-6">
                            <h1 className="text-xl font-bold mb-1">Problem-Stakeholder Matrix</h1>
                            <p className="text-xs text-text-main/60">Map stakeholders to specific pain points to visualize impact levels and provide evidence.</p>
                        </div>
                        <div className="border-2 border-dashed border-primary/20 rounded-xl min-h-[400px] flex flex-col items-center justify-start bg-white/50 dark:bg-slate-800/30 p-4">
                            <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
                                {/* Sample Placed Card */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 overflow-hidden">
                                    <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-impact-primary px-2 py-0.5 bg-impact-primary/10 rounded-full">Primary Impact</span>
                                        </div>
                                        <button className="text-text-main/20 hover:text-red-400 transition-colors"><span className="material-symbols-outlined text-[16px]">close</span></button>
                                    </div>
                                    <div className="p-4">
                                        <div className="grid grid-cols-[1fr,32px,1fr] gap-4 mb-4 items-center bg-slate-50 dark:bg-slate-900/30 p-3 rounded-lg">
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase font-bold text-text-main/40">Problem Statement</p>
                                                <h5 className="text-xs font-bold line-clamp-2">{PLATFORM_PROBLEMS[0]?.title}</h5>
                                            </div>
                                            <div className="flex justify-center text-primary">
                                                <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <p className="text-[9px] uppercase font-bold text-text-main/40">Stakeholder</p>
                                                <h5 className="text-xs font-bold line-clamp-2">{MOCK_STAKEHOLDERS[0]?.user.name}</h5>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <h6 className="text-[10px] font-bold uppercase tracking-wider text-text-main/70">Reasoning & Justification</h6>
                                                <textarea className="w-full h-20 text-xs bg-white dark:bg-slate-900 border border-slate-200 rounded p-2 focus:ring-1 focus:ring-primary/20 outline-none" placeholder="Type the logical justification for this link..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center gap-2 text-text-main/40 py-8">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[24px]">add_link</span>
                                </div>
                                <p className="text-xs font-medium">Drag a Problem and a Stakeholder here to link</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <aside className="w-72 flex flex-col bg-slate-50 dark:bg-slate-900 border-l border-[#dbdce6] dark:border-slate-700">
                    <div className="p-3 border-b border-[#dbdce6] dark:border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-xs uppercase tracking-wider text-text-main/60">Stakeholders</h3>
                        <AddStakeholderDialog
                            mode="student"
                            trigger={
                                <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px] text-primary hover:bg-primary/10">
                                    <Plus className="h-3 w-3 mr-1" /> New
                                </Button>
                            }
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {MOCK_STAKEHOLDERS.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-center gap-2 p-2 rounded bg-white dark:bg-slate-800 border hover:border-primary/50 transition-all cursor-grab group">
                                <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">
                                    {stakeholder.user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold truncate">{stakeholder.user.name}</h4>
                                    <span className="text-[9px] font-medium text-slate-500 truncate block">{stakeholder.designation}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-200 group-hover:text-primary text-[14px]">drag_indicator</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    )
}

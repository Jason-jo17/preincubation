"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Plus, 
    Trash2, 
    Save, 
    AlertTriangle, 
    Info, 
    ChevronDown, 
    ChevronUp,
    ShieldAlert,
    TrendingDown,
    Activity,
    CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"
import { FMEAItem, FMEAData } from "./types"
import { cn } from "@/lib/utils"

const INITIAL_DATA: FMEAData = {
    items: [],
    lastUpdated: new Date().toISOString()
}

interface FMEAMatrixProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function FMEAMatrix({ tool, progress, onDataSaved, readOnly = false }: FMEAMatrixProps) {
    const [data, setData] = useState<FMEAData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [activeRow, setActiveRow] = useState<string | null>(null)

    const addItem = () => {
        const newItem: FMEAItem = {
            id: crypto.randomUUID(),
            process: "",
            failureMode: "",
            effect: "",
            severity: 5,
            cause: "",
            occurrence: 5,
            controls: "",
            detection: 5,
            rpn: 125
        }
        setData(prev => ({
            ...prev,
            items: [newItem, ...prev.items]
        }))
        setActiveRow(newItem.id)
    }

    const updateItem = (id: string, updates: Partial<FMEAItem>) => {
        setData(prev => {
            const newItems = prev.items.map(item => {
                if (item.id === id) {
                    const updated = { ...item, ...updates }
                    updated.rpn = updated.severity * updated.occurrence * updated.detection
                    return updated
                }
                return item
            })
            return { ...prev, items: newItems }
        })
    }

    const removeItem = (id: string) => {
        setData(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== id)
        }))
    }

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("FMEA Matrix saved successfully")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save matrix")
        } finally {
            setSaving(false)
        }
    }

    const stats = useMemo(() => {
        const items = data.items
        const avgRpn = items.length ? items.reduce((acc, i) => acc + i.rpn, 0) / items.length : 0
        const highRiskCount = items.filter(i => i.rpn >= 200).length
        const totalRisks = items.length
        return { avgRpn, highRiskCount, totalRisks }
    }, [data.items])

    const getRpnColor = (rpn: number) => {
        if (rpn >= 200) return "text-red-500 bg-red-50 border-red-200"
        if (rpn >= 100) return "text-amber-500 bg-amber-50 border-amber-200"
        return "text-emerald-500 bg-emerald-50 border-emerald-200"
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header section with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="md:col-span-2 border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShieldAlert className="w-24 h-24" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">
                            FMEA <span className="text-accent">Matrix</span>
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Failure Modes & Effects Analysis - Engineering Risk Engine
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-8 relative z-10">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Active Risks</span>
                            <div className="text-3xl font-black italic">{stats.totalRisks}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Avg RPN</span>
                            <div className="text-3xl font-black italic text-accent">{stats.avgRpn.toFixed(0)}</div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Critical</span>
                            <div className="text-3xl font-black italic text-red-400">{stats.highRiskCount}</div>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 flex flex-col justify-center items-end gap-4 p-4">
                    {!readOnly && (
                        <div className="flex gap-3">
                            <Button 
                                onClick={addItem} 
                                variant="outline"
                                className="h-14 px-6 rounded-2xl border-2 font-black uppercase italic tracking-widest transition-all hover:bg-slate-50"
                            >
                                <Plus className="w-5 h-5 mr-2" /> Log Failure Mode
                            </Button>
                            <Button 
                                onClick={handleSave} 
                                disabled={saving}
                                className="h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-black uppercase italic tracking-widest shadow-lg shadow-accent/20 transition-all"
                            >
                                {saving ? <Activity className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                                Save Analysis
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Matrix Table */}
            <div className="bg-white border rounded-[32px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b">
                                <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/4">Process / Item</th>
                                <th className="p-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Potential Failure Mode</th>
                                <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">S</th>
                                <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">O</th>
                                <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">D</th>
                                <th className="p-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 w-24">RPN</th>
                                <th className="p-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400 w-16">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {data.items.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <motion.tr 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={cn(
                                                "border-b transition-colors group cursor-pointer",
                                                activeRow === item.id ? "bg-accent/5" : "hover:bg-slate-50/50"
                                            )}
                                            onClick={() => setActiveRow(activeRow === item.id ? null : item.id)}
                                        >
                                            <td className="p-4 font-bold text-sm">
                                                {item.process || <span className="text-slate-300 italic">No process defined</span>}
                                            </td>
                                            <td className="p-4 text-sm text-slate-600">
                                                {item.failureMode || <span className="text-slate-300 italic">No mode defined</span>}
                                            </td>
                                            <td className="p-4 text-center font-black">{item.severity}</td>
                                            <td className="p-4 text-center font-black">{item.occurrence}</td>
                                            <td className="p-4 text-center font-black">{item.detection}</td>
                                            <td className="p-4 text-center">
                                                <div className={cn(
                                                    "inline-flex items-center justify-center px-3 py-1 rounded-lg border font-black text-sm",
                                                    getRpnColor(item.rpn)
                                                )}>
                                                    {item.rpn}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    {activeRow === item.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-red-50"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeItem(item.id)
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                        
                                        {/* Expanded Row for Editing */}
                                        <AnimatePresence>
                                            {activeRow === item.id && (
                                                <motion.tr
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="bg-accent/[0.02]"
                                                >
                                                    <td colSpan={7} className="p-0 border-b">
                                                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
                                                            {/* Context */}
                                                            <div className="space-y-4">
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Process / Sub-system</label>
                                                                    <Input 
                                                                        value={item.process}
                                                                        onChange={(e) => updateItem(item.id, { process: e.target.value })}
                                                                        placeholder="e.g. Battery Integrated Circuit"
                                                                        className="rounded-xl border-2 h-12"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Potential Failure Mode</label>
                                                                    <Textarea 
                                                                        value={item.failureMode}
                                                                        onChange={(e) => updateItem(item.id, { failureMode: e.target.value })}
                                                                        placeholder="What could go wrong?"
                                                                        className="rounded-xl border-2 min-h-[100px]"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Analysis */}
                                                            <div className="space-y-4">
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Potential Effects of Failure</label>
                                                                    <Textarea 
                                                                        value={item.effect}
                                                                        onChange={(e) => updateItem(item.id, { effect: e.target.value })}
                                                                        placeholder="What is the impact?"
                                                                        className="rounded-xl border-2 min-h-[100px]"
                                                                    />
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Potential Causes</label>
                                                                    <Textarea 
                                                                        value={item.cause}
                                                                        onChange={(e) => updateItem(item.id, { cause: e.target.value })}
                                                                        placeholder="Why would it happen?"
                                                                        className="rounded-xl border-2 min-h-[100px]"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Scoring */}
                                                            <div className="space-y-6 bg-white p-6 rounded-2xl border border-accent/20">
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Severity</label>
                                                                            <span className="text-xs font-black text-accent">{item.severity}</span>
                                                                        </div>
                                                                        <input 
                                                                            type="range" min="1" max="10" 
                                                                            value={item.severity}
                                                                            onChange={(e) => updateItem(item.id, { severity: parseInt(e.target.value) })}
                                                                            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Occur</label>
                                                                            <span className="text-xs font-black text-accent">{item.occurrence}</span>
                                                                        </div>
                                                                        <input 
                                                                            type="range" min="1" max="10" 
                                                                            value={item.occurrence}
                                                                            onChange={(e) => updateItem(item.id, { occurrence: parseInt(e.target.value) })}
                                                                            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <div className="flex items-center justify-between">
                                                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Detect</label>
                                                                            <span className="text-xs font-black text-accent">{item.detection}</span>
                                                                        </div>
                                                                        <input 
                                                                            type="range" min="1" max="10" 
                                                                            value={item.detection}
                                                                            onChange={(e) => updateItem(item.id, { detection: parseInt(e.target.value) })}
                                                                            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-accent"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Current Controls</label>
                                                                    <Input 
                                                                        value={item.controls}
                                                                        onChange={(e) => updateItem(item.id, { controls: e.target.value })}
                                                                        placeholder="e.g. Redundant sensors"
                                                                        className="rounded-xl border-2 h-10"
                                                                    />
                                                                </div>

                                                                <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <Activity className="w-5 h-5 text-accent" />
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Resulting RPN</span>
                                                                    </div>
                                                                    <div className="text-2xl font-black italic">{item.rpn}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {data.items.length === 0 && (
                    <div className="p-20 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="p-6 bg-slate-50 rounded-full">
                            <Info className="w-12 h-12 text-slate-300" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black italic tracking-tight uppercase">No Risks Analyzed</h3>
                            <p className="text-slate-400 text-sm max-w-xs">Start logging potential failure modes to calculate Risk Priority Numbers (RPN).</p>
                        </div>
                        <Button onClick={addItem} variant="outline" className="mt-4 rounded-xl font-black uppercase italic tracking-widest">
                            <Plus className="w-4 h-4 mr-2" /> Initialise Matrix
                        </Button>
                    </div>
                )}
            </div>

            {/* Score Interpretation Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-emerald-100 bg-emerald-50/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Low Risk (RPN 1-99)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-emerald-800/70 font-medium">
                        Negligible impact. Standard operating procedures are sufficient. No immediate corrective action required.
                    </CardContent>
                </Card>
                <Card className="border-2 border-amber-100 bg-amber-50/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4" /> Medium Risk (RPN 100-199)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-amber-800/70 font-medium">
                        Potential for disruption. Monitor closely and plan design improvements in subsequent iterations.
                    </CardContent>
                </Card>
                <Card className="border-2 border-red-100 bg-red-50/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4" /> High Risk (RPN 200-1000)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-red-800/70 font-medium">
                        Critical failure mode. Immediate design redesign or robust control implementation is MANDATORY.
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { 
    Save, 
    Smile, 
    Meh, 
    Frown, 
    Activity, 
    TrendingUp, 
    CheckCircle2, 
    BarChart3,
    Quote,
    MessageSquare,
    Target
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { saveToolData } from "@/app/actions/roadmap"
import { cn } from "@/lib/utils"

interface PMFData {
    responses: {
        veryDisappointed: number;
        somewhatDisappointed: number;
        notDisappointed: number;
    };
    qualitativeFeedback: string[];
    mainBenefit: string;
    targetPersona: string;
    lastUpdated: string;
}

const INITIAL_DATA: PMFData = {
    responses: {
        veryDisappointed: 0,
        somewhatDisappointed: 0,
        notDisappointed: 0
    },
    qualitativeFeedback: [],
    mainBenefit: "",
    targetPersona: "",
    lastUpdated: new Date().toISOString()
}

interface SeanEllisTestProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    readOnly?: boolean
}

export function SeanEllisTest({ tool, progress, onDataSaved, readOnly = false }: SeanEllisTestProps) {
    const [data, setData] = useState<PMFData>(progress?.data || INITIAL_DATA)
    const [saving, setSaving] = useState(false)
    const [newFeedback, setNewFeedback] = useState("")

    const handleSave = async () => {
        if (readOnly) return
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("PMF Test data saved!")
                if (onDataSaved) onDataSaved()
            }
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    const stats = useMemo(() => {
        const total = data.responses.veryDisappointed + data.responses.somewhatDisappointed + data.responses.notDisappointed
        const pmfScore = total > 0 ? (data.responses.veryDisappointed / total) * 100 : 0
        const isFit = pmfScore >= 40
        return { total, pmfScore, isFit }
    }, [data.responses])

    const addFeedback = () => {
        if (!newFeedback.trim()) return
        setData(prev => ({
            ...prev,
            qualitativeFeedback: [newFeedback, ...prev.qualitativeFeedback]
        }))
        setNewFeedback("")
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            {/* Hero Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-slate-900 text-white p-8 rounded-[40px] overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Target className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                                Sean Ellis <span className="text-accent">PMF Test</span>
                            </h2>
                            <p className="text-slate-400 font-medium max-w-xl">
                                The industry standard for Product-Market Fit. If 40% or more of your users would be "Very Disappointed" without your product, you have achieved PMF.
                            </p>
                        </div>
                        
                        <div className="flex gap-12">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">PMF Score</span>
                                <div className={cn(
                                    "text-5xl font-black italic",
                                    stats.isFit ? "text-emerald-400" : "text-amber-400"
                                )}>
                                    {stats.pmfScore.toFixed(0)}%
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</span>
                                <div className="flex items-center gap-2 mt-2">
                                    {stats.isFit ? (
                                        <div className="px-4 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest italic">
                                            Product-Market Fit Achieved
                                        </div>
                                    ) : (
                                        <div className="px-4 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest italic">
                                            Pre-PMF / Iteration Phase
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col justify-center gap-4">
                    <Button 
                        onClick={handleSave} 
                        disabled={saving || readOnly}
                        className="h-20 w-full rounded-3xl bg-accent hover:bg-accent/90 text-white font-black uppercase italic tracking-widest shadow-xl shadow-accent/20 transition-all text-lg"
                    >
                        {saving ? <Activity className="w-6 h-6 animate-spin mr-3" /> : <Save className="w-6 h-6 mr-3" />}
                        Save Analysis
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quantitative Section */}
                <Card className="rounded-[32px] border-2 border-slate-100 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b p-8">
                        <div className="flex items-center gap-3 mb-2">
                            <BarChart3 className="w-5 h-5 text-accent" />
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight">Survey Results</CardTitle>
                        </div>
                        <CardDescription className="text-xs font-medium">
                            "How would you feel if you could no longer use this product?"
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {[
                            { key: "veryDisappointed", label: "Very Disappointed", icon: Smile, color: "bg-emerald-500" },
                            { key: "somewhatDisappointed", label: "Somewhat Disappointed", icon: Meh, color: "bg-amber-500" },
                            { key: "notDisappointed", label: "Not Disappointed", icon: Frown, color: "bg-rose-500" }
                        ].map((item) => {
                            const val = data.responses[item.key as keyof typeof data.responses]
                            const pct = stats.total > 0 ? (val / stats.total) * 100 : 0
                            return (
                                <div key={item.key} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("p-2 rounded-lg text-white", item.color)}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-black uppercase italic tracking-tight">{item.label}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Input 
                                                type="number"
                                                value={val}
                                                onChange={(e) => setData(prev => ({
                                                    ...prev,
                                                    responses: { ...prev.responses, [item.key]: parseInt(e.target.value) || 0 }
                                                }))}
                                                className="w-20 h-10 text-right font-black border-2 rounded-xl"
                                            />
                                            <span className="w-12 text-xs font-black text-slate-400">{pct.toFixed(0)}%</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            className={cn("h-full", item.color)}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                {/* Qualitative Section */}
                <div className="space-y-8">
                    <Card className="rounded-[32px] border-2 border-slate-100 shadow-sm">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-accent" />
                                <CardTitle className="text-xl font-black uppercase italic tracking-tight">Core Value & Audience</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Main Benefit for Users</label>
                                <Input 
                                    value={data.mainBenefit}
                                    onChange={(e) => setData(prev => ({ ...prev, mainBenefit: e.target.value }))}
                                    placeholder="e.g. Saving 10 hours a week on reporting"
                                    className="rounded-xl border-2 h-12 text-sm font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ideal Customer Persona (ICP)</label>
                                <Input 
                                    value={data.targetPersona}
                                    onChange={(e) => setData(prev => ({ ...prev, targetPersona: e.target.value }))}
                                    placeholder="e.g. Solo-founders in Fintech"
                                    className="rounded-xl border-2 h-12 text-sm font-medium"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[32px] border-2 border-slate-100 shadow-sm">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Quote className="w-5 h-5 text-accent" />
                                    <CardTitle className="text-xl font-black uppercase italic tracking-tight">Verbatims</CardTitle>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{data.qualitativeFeedback.length} entries</span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <div className="flex gap-2">
                                <Input 
                                    value={newFeedback}
                                    onChange={(e) => setNewFeedback(e.target.value)}
                                    placeholder="Add a customer quote..."
                                    className="rounded-xl border-2 h-12"
                                    onKeyDown={(e) => e.key === 'Enter' && addFeedback()}
                                />
                                <Button onClick={addFeedback} className="h-12 w-12 rounded-xl bg-slate-900 text-white">
                                    <CheckCircle2 className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {data.qualitativeFeedback.map((text, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 bg-slate-50 rounded-2xl border text-sm font-medium italic text-slate-600 relative group"
                                    >
                                        "{text}"
                                        <button 
                                            onClick={() => setData(prev => ({
                                                ...prev,
                                                qualitativeFeedback: prev.qualitativeFeedback.filter((_, i) => i !== idx)
                                            }))}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-opacity"
                                        >
                                            <Activity className="w-3 h-3 rotate-45" />
                                        </button>
                                    </motion.div>
                                ))}
                                {data.qualitativeFeedback.length === 0 && (
                                    <div className="text-center py-10 space-y-2 opacity-30">
                                        <MessageSquare className="w-8 h-8 mx-auto" />
                                        <p className="text-xs font-black uppercase italic tracking-widest">No feedback logged</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Strategic Analysis Summary */}
            <div className="p-8 bg-emerald-50 rounded-[40px] border-2 border-emerald-100 flex items-start gap-6">
                <div className="p-4 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                    <Activity className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-emerald-900">What the data tells you:</h3>
                    <p className="text-sm text-emerald-800/70 font-medium leading-relaxed max-w-3xl">
                        {stats.isFit 
                            ? "Congratulations. You have reached the 'Holy Grail' of startups. Your focus should now shift from validation to scalability. Standardize your operations, build your acquisition playbooks, and protect your core value proposition."
                            : "You are in the 'Discovery' phase. Do not scale yet. Look at the qualitative feedback from those who are 'Somewhat Disappointed' and identify the features that would move them into the 'Very Disappointed' category. Focus on your most enthusiastic segment."
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

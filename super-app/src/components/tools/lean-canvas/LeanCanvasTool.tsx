"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, HelpCircle, Target, Users, 
  Zap, TrendingUp, DollarSign, ListChecks, ShieldCheck,
  Plus, X, AlertTriangle, Lightbulb, UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface CanvasItem {
  id: string
  text: string
  color: string
}

interface LeanCanvasToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

const STICKY_COLORS = [
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-orange-100"
]

export function LeanCanvasTool({ tool, progress, onDataSaved, submissionId }: LeanCanvasToolProps) {
    const initialData = progress?.data || {
        problem: [],
        alternatives: [],
        solution: [],
        keyMetrics: [],
        uniqueValueProp: [],
        highLevelConcept: [],
        unfairAdvantage: [],
        channels: [],
        customerSegments: [],
        earlyAdopters: [],
        costStructure: [],
        revenueStreams: [],
        topRisks: ["", "", ""]
    }

    const [data, setData] = useState<Record<string, any>>(initialData)
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [saving, setSaving] = useState(false)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [newItemText, setNewItemText] = useState("")

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data, {
                submissionId,
                iterationName
            })
            if (res.success) {
                toast.success("Lean Canvas saved!")
                if (onDataSaved) onDataSaved()
            } else {
                toast.error(res.error || "Failed to save")
            }
        } catch (e) {
            toast.error("An error occurred")
        } finally {
            setSaving(false)
        }
    }

    const addItem = (sectionId: string) => {
        if (!newItemText.trim()) return
        const newItem: CanvasItem = {
            id: crypto.randomUUID(),
            text: newItemText,
            color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)]
        }
        setData(prev => ({
            ...prev,
            [sectionId]: [...(prev[sectionId] || []), newItem]
        }))
        setNewItemText("")
        setActiveSection(null)
    }

    const removeItem = (sectionId: string, itemId: string) => {
        setData(prev => ({
            ...prev,
            [sectionId]: prev[sectionId].filter((i: any) => i.id !== itemId)
        }))
    }

    const updateRisk = (index: number, val: string) => {
        const newRisks = [...data.topRisks]
        newRisks[index] = val
        setData({ ...data, topRisks: newRisks })
    }

    const sections = [
        { 
            id: 'problem', 
            label: 'Problem', 
            icon: HelpCircle, 
            color: 'text-red-500', 
            col: 'col-span-2 row-span-2',
            subSections: [{ id: 'alternatives', label: 'Existing Alternatives', icon: ListChecks }]
        },
        { 
            id: 'solution', 
            label: 'Solution', 
            icon: Zap, 
            color: 'text-yellow-500', 
            col: 'col-span-2',
        },
        { 
            id: 'keyMetrics', 
            label: 'Key Metrics', 
            icon: TrendingUp, 
            color: 'text-blue-500', 
            col: 'col-span-2',
        },
        { 
            id: 'uniqueValueProp', 
            label: 'Unique Value Prop', 
            icon: Target, 
            color: 'text-purple-500', 
            col: 'col-span-2 row-span-2',
            subSections: [{ id: 'highLevelConcept', label: 'High-Level Concept', icon: Lightbulb }]
        },
        { 
            id: 'unfairAdvantage', 
            label: 'Unfair Advantage', 
            icon: ShieldCheck, 
            color: 'text-orange-500', 
            col: 'col-span-2',
        },
        { 
            id: 'channels', 
            label: 'Channels', 
            icon: ListChecks, 
            color: 'text-emerald-500', 
            col: 'col-span-2',
        },
        { 
            id: 'customerSegments', 
            label: 'Customer Segments', 
            icon: Users, 
            color: 'text-cyan-500', 
            col: 'col-span-2 row-span-2',
            subSections: [{ id: 'earlyAdopters', label: 'Early Adopters', icon: UserCheck }]
        },
        { id: 'costStructure', label: 'Cost Structure', icon: DollarSign, color: 'text-pink-500', col: 'col-span-5' },
        { id: 'revenueStreams', label: 'Revenue Streams', icon: DollarSign, color: 'text-green-500', col: 'col-span-5' }
    ]

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Lean <span className="text-accent">Canvas</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Rapid prototyping of your business model</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[250px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Canvas
                    </Button>
                </div>
            </div>

            {/* Top 3 Risks Section */}
            <div className="bg-red-50/50 border border-red-200 rounded-[32px] p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                    <AlertTriangle size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest">Top 3 Risks / Assumptions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="flex gap-3 items-center bg-white p-3 rounded-2xl border border-red-100 shadow-sm">
                            <span className="text-[10px] font-black text-red-500/40">{i + 1}</span>
                            <Input 
                                placeholder="High-risk assumption..."
                                value={data.topRisks[i]}
                                onChange={(e) => updateRisk(i, e.target.value)}
                                className="border-none bg-transparent h-8 text-[11px] font-bold focus-visible:ring-0 p-0"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-3 gap-3">
                {sections.map((section) => (
                    <div 
                        key={section.id} 
                        className={cn(
                            "p-5 bg-white border border-border rounded-[32px] flex flex-col group transition-all hover:border-accent/40 min-h-[300px]",
                            section.col
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={cn("p-1.5 rounded-lg bg-bg-base border border-border", section.color)}>
                                    <section.icon size={16} />
                                </div>
                                <Label className="text-[10px] font-black uppercase tracking-widest">{section.label}</Label>
                            </div>
                            <button 
                                onClick={() => setActiveSection(section.id)}
                                className="p-1.5 rounded-full bg-bg-base hover:bg-accent hover:text-bg-base transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] pr-1 custom-scrollbar mb-4">
                            <AnimatePresence mode="popLayout">
                                {data[section.id]?.map((item: any) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={cn("relative p-3 rounded-xl border border-black/5 shadow-sm group/note", item.color)}
                                    >
                                        <button 
                                            onClick={() => removeItem(section.id, item.id)}
                                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md opacity-0 group-hover/note:opacity-100 transition-opacity text-red-500"
                                        >
                                            <X size={10} />
                                        </button>
                                        <p className="text-[11px] font-bold text-black/80 leading-tight">{item.text}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {activeSection === section.id && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-bg-base rounded-2xl border border-accent/20">
                                    <textarea
                                        autoFocus
                                        placeholder="Note content..."
                                        value={newItemText}
                                        onChange={(e) => setNewItemText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault()
                                                addItem(section.id)
                                            }
                                        }}
                                        className="w-full bg-transparent border-none resize-none text-[11px] font-bold focus:ring-0 p-0 h-16 custom-scrollbar"
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)} className="h-6 px-2 text-[9px] font-black uppercase">Cancel</Button>
                                            <Button size="sm" onClick={() => addItem(section.id)} className="h-6 px-2 text-[9px] font-black uppercase bg-accent text-bg-base">Add</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Sub-sections */}
                        {section.subSections && (
                            <div className="pt-4 border-t border-border/50 space-y-4">
                                {section.subSections.map(sub => (
                                    <div key={sub.id} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-text-muted">
                                                <sub.icon size={12} />
                                                <span className="text-[9px] font-black uppercase tracking-wider">{sub.label}</span>
                                            </div>
                                            <button 
                                                onClick={() => setActiveSection(sub.id)}
                                                className="p-1 rounded-md bg-bg-base hover:bg-accent/10 hover:text-accent transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            <AnimatePresence mode="popLayout">
                                                {data[sub.id]?.map((item: any) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="p-2 rounded-lg bg-bg-base border border-border group/subnote relative"
                                                    >
                                                        <button 
                                                            onClick={() => removeItem(sub.id, item.id)}
                                                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover/subnote:opacity-100 transition-opacity text-red-500 border border-border"
                                                        >
                                                            <X size={8} />
                                                        </button>
                                                        <p className="text-[10px] font-medium text-text-secondary leading-tight">{item.text}</p>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>

                                            {activeSection === sub.id && (
                                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-2 bg-white rounded-xl border border-accent/20">
                                                    <textarea
                                                        autoFocus
                                                        placeholder={`Add ${sub.label.toLowerCase()}...`}
                                                        value={newItemText}
                                                        onChange={(e) => setNewItemText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                                e.preventDefault()
                                                                addItem(sub.id)
                                                            }
                                                        }}
                                                        className="w-full bg-transparent border-none resize-none text-[10px] font-medium focus:ring-0 p-0 h-12 custom-scrollbar"
                                                    />
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

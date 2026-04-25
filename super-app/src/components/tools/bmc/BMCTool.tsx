"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, Users, Target, Zap, 
  Truck, Heart, Briefcase, Factory, DollarSign, Wallet,
  Plus, X, GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface BMCItem {
  id: string
  text: string
  color: string
}

interface BMCToolProps {
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

export function BMCTool({ tool, progress, onDataSaved, submissionId }: BMCToolProps) {
    const initialData = progress?.data || {
        keyPartners: [],
        keyActivities: [],
        keyResources: [],
        valueProps: [],
        customerRelationships: [],
        channels: [],
        customerSegments: [],
        costStructure: [],
        revenueStreams: []
    }

    const [data, setData] = useState<Record<string, BMCItem[]>>(initialData)
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
                toast.success("BMC saved!")
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
        const newItem: BMCItem = {
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
            [sectionId]: prev[sectionId].filter(i => i.id !== itemId)
        }))
    }

    const sections = [
        { id: 'keyPartners', label: 'Key Partners', icon: Briefcase, color: 'text-blue-500', col: 'col-span-2 row-span-2', hint: 'Who are our key partners?' },
        { id: 'keyActivities', label: 'Key Activities', icon: Factory, color: 'text-yellow-500', col: 'col-span-2', hint: 'What key activities do we require?' },
        { id: 'keyResources', label: 'Key Resources', icon: Zap, color: 'text-orange-500', col: 'col-span-2', hint: 'What key resources do we require?' },
        { id: 'valueProps', label: 'Value Propositions', icon: Target, color: 'text-red-500', col: 'col-span-2 row-span-2', hint: 'What value do we deliver?' },
        { id: 'customerRelationships', label: 'Customer Relations', icon: Heart, color: 'text-pink-500', col: 'col-span-2', hint: 'How do we interact?' },
        { id: 'channels', label: 'Channels', icon: Truck, color: 'text-emerald-500', col: 'col-span-2', hint: 'How do we reach them?' },
        { id: 'customerSegments', label: 'Customer Segments', icon: Users, color: 'text-cyan-500', col: 'col-span-2 row-span-2', hint: 'Who are we creating value for?' },
        { id: 'costStructure', label: 'Cost Structure', icon: Wallet, color: 'text-indigo-500', col: 'col-span-5', hint: 'What are the most important costs?' },
        { id: 'revenueStreams', label: 'Revenue Streams', icon: DollarSign, color: 'text-green-500', col: 'col-span-5', hint: 'For what value are they willing to pay?' }
    ]

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Business <span className="text-accent">Model Canvas</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Collaborate with sticky notes across 9 key blocks</p>
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

            <div className="grid grid-cols-1 md:grid-cols-10 md:grid-rows-3 gap-3">
                {sections.map((section) => (
                    <div 
                        key={section.id} 
                        className={cn(
                            "p-5 bg-white border border-border rounded-[32px] flex flex-col group transition-all hover:border-accent/40 min-h-[300px]",
                            section.col
                        )}
                    >
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

                        <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
                            <AnimatePresence>
                                {data[section.id]?.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={cn(
                                            "relative p-3 rounded-xl border border-black/5 shadow-sm group/note",
                                            item.color
                                        )}
                                    >
                                        <button 
                                            onClick={() => removeItem(section.id, item.id)}
                                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md opacity-0 group-hover/note:opacity-100 transition-opacity text-red-500"
                                        >
                                            <X size={10} />
                                        </button>
                                        <p className="text-[11px] font-bold text-black/80 leading-tight">
                                            {item.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {activeSection === section.id && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-bg-base rounded-2xl border border-accent/20"
                                >
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
                                        <p className="text-[8px] font-black uppercase text-text-muted">Press Enter to Add</p>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)} className="h-6 px-2 text-[9px] font-black uppercase">Cancel</Button>
                                            <Button size="sm" onClick={() => addItem(section.id)} className="h-6 px-2 text-[9px] font-black uppercase bg-accent text-bg-base">Add</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

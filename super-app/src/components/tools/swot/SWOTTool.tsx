"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, Zap, AlertCircle, Target, 
  ShieldAlert, Plus, X, ArrowUpRight, ArrowDownRight,
  GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface SWOTItem {
  id: string
  text: string
  impact: number // 1-5
}

interface TOWSData {
  so: string
  wo: string
  st: string
  wt: string
}

interface SWOTToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function SWOTTool({ tool, progress, onDataSaved, submissionId }: SWOTToolProps) {
    const initialData = progress?.data || {
        strengths: [],
        weaknesses: [],
        opportunities: [],
        threats: [],
        tows: { so: "", wo: "", st: "", wt: "" }
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
                toast.success("SWOT/TOWS Analysis saved!")
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

    const onDragEnd = (result: any) => {
        const { source, destination } = result
        if (!destination) return

        if (source.droppableId === destination.droppableId) {
            // Reorder within same list
            const items = Array.from(data[source.droppableId])
            const [reorderedItem] = items.splice(source.index, 1)
            items.splice(destination.index, 0, reorderedItem)
            setData(prev => ({ ...prev, [source.droppableId]: items }))
        } else {
            // Move between lists
            const sourceItems = Array.from(data[source.droppableId])
            const destItems = Array.from(data[destination.droppableId])
            const [movedItem] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, movedItem)
            setData(prev => ({ 
                ...prev, 
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destItems 
            }))
        }
    }

    const addItem = (sectionId: string) => {
        if (!newItemText.trim()) return
        const newItem: SWOTItem = {
            id: crypto.randomUUID(),
            text: newItemText,
            impact: 3
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

    const updateImpact = (sectionId: string, itemId: string, impact: number) => {
        setData(prev => ({
            ...prev,
            [sectionId]: prev[sectionId].map((i: any) => i.id === itemId ? { ...i, impact } : i)
        }))
    }

    const updateTOWS = (key: keyof TOWSData, value: string) => {
        setData(prev => ({
            ...prev,
            tows: { ...prev.tows, [key]: value }
        }))
    }

    const sections = [
        { id: 'strengths', label: 'Strengths', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50/50', border: 'border-yellow-200', accent: 'bg-yellow-500' },
        { id: 'weaknesses', label: 'Weaknesses', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50/50', border: 'border-red-200', accent: 'bg-red-500' },
        { id: 'opportunities', label: 'Opportunities', icon: Target, color: 'text-green-500', bg: 'bg-green-50/50', border: 'border-green-200', accent: 'bg-green-500' },
        { id: 'threats', label: 'Threats', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50/50', border: 'border-orange-200', accent: 'bg-orange-500' }
    ]

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">SWOT & <span className="text-accent">TOWS Matrix</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Move factors and convert analysis into strategy</p>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Iteration Name"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-9 text-[10px] uppercase tracking-widest font-bold min-w-[200px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-9 font-black uppercase italic tracking-widest px-6">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Analysis
                    </Button>
                </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((section) => (
                        <div 
                            key={section.id} 
                            className={cn(
                                "relative flex flex-col p-6 rounded-[32px] border-2 transition-all min-h-[400px]",
                                section.bg,
                                section.border
                            )}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-xl bg-white shadow-sm border", section.border, section.color)}>
                                        <section.icon size={20} />
                                    </div>
                                    <h3 className="font-black uppercase tracking-widest text-sm">{section.label}</h3>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-white/80 border border-inherit text-[10px] font-black uppercase">
                                    {data[section.id]?.length || 0} Items
                                </div>
                            </div>

                            <Droppable droppableId={section.id}>
                                {(provided) => (
                                    <div 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex-1 space-y-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar min-h-[50px]"
                                    >
                                        {data[section.id]?.map((item: SWOTItem, index: number) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={cn(
                                                            "bg-white p-3 rounded-2xl border border-black/5 shadow-sm group hover:border-accent/30 transition-all",
                                                            snapshot.isDragging && "shadow-2xl ring-2 ring-accent border-accent"
                                                        )}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <div {...provided.dragHandleProps} className="mt-1 text-text-muted/30 hover:text-accent transition-colors">
                                                                    <GripVertical size={16} />
                                                                </div>
                                                                <p className="text-sm font-bold text-text/80 leading-tight">
                                                                    {item.text}
                                                                </p>
                                                            </div>
                                                            <button 
                                                                onClick={() => removeItem(section.id, item.id)}
                                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg text-red-400 transition-all shrink-0"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="mt-3 flex items-center justify-between pl-7">
                                                            <div className="flex gap-1">
                                                                {[1, 2, 3, 4, 5].map((s) => (
                                                                    <button
                                                                        key={s}
                                                                        onClick={() => updateImpact(section.id, item.id, s)}
                                                                        className={cn(
                                                                            "w-4 h-1.5 rounded-full transition-all",
                                                                            item.impact >= s ? section.accent : "bg-black/5"
                                                                        )}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-[9px] font-black uppercase opacity-40">Impact: {item.impact}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <div className="mt-4">
                                {activeSection === section.id ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-white rounded-2xl border-2 border-accent/30 shadow-xl"
                                    >
                                        <Input
                                            autoFocus
                                            placeholder={`Describe ${section.label.toLowerCase()}...`}
                                            value={newItemText}
                                            onChange={(e) => setNewItemText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addItem(section.id)}
                                            className="border-none bg-bg-base/50 focus-visible:ring-0 text-sm font-bold h-10"
                                        />
                                        <div className="flex justify-end gap-2 mt-3">
                                            <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)} className="h-8 text-[10px] font-black uppercase">Cancel</Button>
                                            <Button size="sm" onClick={() => addItem(section.id)} className="h-8 text-[10px] font-black uppercase bg-accent text-bg-base">Add Factor</Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setActiveSection(section.id)
                                            setNewItemText("")
                                        }}
                                        className="w-full py-4 rounded-2xl border-2 border-dashed border-black/10 hover:border-accent/40 hover:bg-white/50 text-text-muted/40 hover:text-accent transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest">Add Item</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {/* TOWS Matrix */}
            <div className="space-y-6">
                <div className="space-y-1">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Strategic <span className="text-accent">TOWS Matrix</span></h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Developing strategies by crossing SWOT quadrants</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SO Strategy */}
                    <div className="p-6 rounded-3xl bg-bg-surface border border-border space-y-4 hover:border-green-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 font-black text-xs">SO</div>
                            <h4 className="font-black text-xs uppercase tracking-widest">Maxi-Maxi Strategy</h4>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium italic">Use internal strengths to maximize external opportunities.</p>
                        <Textarea 
                            placeholder="Enter SO strategies..."
                            value={data.tows?.so}
                            onChange={(e) => updateTOWS('so', e.target.value)}
                            className="min-h-[120px] bg-bg-base/50 border-none rounded-2xl text-sm font-medium focus-visible:ring-1 focus-visible:ring-green-500/30"
                        />
                    </div>

                    {/* WO Strategy */}
                    <div className="p-6 rounded-3xl bg-bg-surface border border-border space-y-4 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-black text-xs">WO</div>
                            <h4 className="font-black text-xs uppercase tracking-widest">Mini-Maxi Strategy</h4>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium italic">Minimize weaknesses by taking advantage of external opportunities.</p>
                        <Textarea 
                            placeholder="Enter WO strategies..."
                            value={data.tows?.wo}
                            onChange={(e) => updateTOWS('wo', e.target.value)}
                            className="min-h-[120px] bg-bg-base/50 border-none rounded-2xl text-sm font-medium focus-visible:ring-1 focus-visible:ring-blue-500/30"
                        />
                    </div>

                    {/* ST Strategy */}
                    <div className="p-6 rounded-3xl bg-bg-surface border border-border space-y-4 hover:border-yellow-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 font-black text-xs">ST</div>
                            <h4 className="font-black text-xs uppercase tracking-widest">Maxi-Mini Strategy</h4>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium italic">Use strengths to minimize the impact of external threats.</p>
                        <Textarea 
                            placeholder="Enter ST strategies..."
                            value={data.tows?.st}
                            onChange={(e) => updateTOWS('st', e.target.value)}
                            className="min-h-[120px] bg-bg-base/50 border-none rounded-2xl text-sm font-medium focus-visible:ring-1 focus-visible:ring-yellow-500/30"
                        />
                    </div>

                    {/* WT Strategy */}
                    <div className="p-6 rounded-3xl bg-bg-surface border border-border space-y-4 hover:border-red-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-200 flex items-center justify-center text-red-500 font-black text-xs">WT</div>
                            <h4 className="font-black text-xs uppercase tracking-widest">Mini-Mini Strategy</h4>
                        </div>
                        <p className="text-[10px] text-text-muted font-medium italic">Minimize weaknesses and avoid threats (Defensive strategy).</p>
                        <Textarea 
                            placeholder="Enter WT strategies..."
                            value={data.tows?.wt}
                            onChange={(e) => updateTOWS('wt', e.target.value)}
                            className="min-h-[120px] bg-bg-base/50 border-none rounded-2xl text-sm font-medium focus-visible:ring-1 focus-visible:ring-red-500/30"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

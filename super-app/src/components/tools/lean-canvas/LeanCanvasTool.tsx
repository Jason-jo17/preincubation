"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, AlertCircle, Lightbulb, Target, Zap, Users, BarChart3, Share2, CreditCard, DollarSign } from "lucide-react"

interface LeanCanvasToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function LeanCanvasTool({ tool, progress, onDataSaved, submissionId }: LeanCanvasToolProps) {
    const initialData = progress?.data || {
        problem: "",
        solution: "",
        uniqueValueProposition: "",
        unfairAdvantage: "",
        customerSegments: "",
        keyMetrics: "",
        channels: "",
        costStructure: "",
        revenueStreams: ""
    }

    const [data, setData] = useState(initialData)
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [saving, setSaving] = useState(false)

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

    const Block = ({ id, label, icon: Icon, placeholder, hint, className = "" }: any) => (
        <div className={`p-4 border border-text-muted/10 bg-white group flex flex-col ${className}`}>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-accent" />
                <Label className="text-[10px] font-black uppercase tracking-widest">{label}</Label>
            </div>
            <Textarea
                placeholder={placeholder}
                value={(data as any)[id]}
                onChange={(e) => setData({ ...data, [id]: e.target.value })}
                className="flex-1 min-h-[100px] border-none bg-transparent resize-none p-0 text-xs focus-visible:ring-0 placeholder:text-text-muted/30 font-medium custom-scrollbar"
            />
            <p className="text-[8px] text-text-muted/50 font-medium mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                {hint}
            </p>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-black italic uppercase tracking-tighter">Lean <span className="text-accent">Canvas</span></h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Hypothesis Set (e.g. Early Adopter Profile)"
                        value={iterationName}
                        onChange={(e) => setIterationName(e.target.value)}
                        className="h-8 text-[9px] uppercase tracking-widest font-bold min-w-[200px]"
                    />
                    <Button onClick={handleSave} disabled={saving} size="sm" className="h-8 font-black uppercase italic tracking-widest">
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3 mr-2" />}
                        Save Canvas
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-10 border-2 border-text-muted/20 rounded-2xl overflow-hidden bg-bg-base shadow-xl min-h-[600px]">
                {/* Column 1: Problem */}
                <Block 
                    id="problem" 
                    label="Problem" 
                    icon={AlertCircle} 
                    placeholder="List the top 3 problems..." 
                    hint="Existing alternatives? How are they solved today?"
                    className="col-span-10 md:col-span-2 border-r"
                />

                {/* Column 2: Solution & Key Metrics */}
                <div className="col-span-10 md:col-span-2 border-r flex flex-col">
                    <Block 
                        id="solution" 
                        label="Solution" 
                        icon={Lightbulb} 
                        placeholder="Top 3 features?" 
                        hint="Outline a possible solution for each problem."
                        className="h-1/2 border-b"
                    />
                    <Block 
                        id="keyMetrics" 
                        label="Key Metrics" 
                        icon={BarChart3} 
                        placeholder="Key activities you measure..." 
                        hint="The numbers that tell you how the business is doing."
                        className="h-1/2"
                    />
                </div>

                {/* Column 3: Unique Value Proposition */}
                <Block 
                    id="uniqueValueProposition" 
                    label="Unique Value Proposition" 
                    icon={Target} 
                    placeholder="Single, clear, compelling message..." 
                    hint="Why you are different and worth paying attention to."
                    className="col-span-10 md:col-span-2 border-r bg-accent/5"
                />

                {/* Column 4: Unfair Advantage & Channels */}
                <div className="col-span-10 md:col-span-2 border-r flex flex-col">
                    <Block 
                        id="unfairAdvantage" 
                        label="Unfair Advantage" 
                        icon={Zap} 
                        placeholder="Something that cannot be easily copied..." 
                        hint="Insider information, the right team, existing customers."
                        className="h-1/2 border-b"
                    />
                    <Block 
                        id="channels" 
                        label="Channels" 
                        icon={Share2} 
                        placeholder="Path to customers..." 
                        hint="How will you reach your customer segments?"
                        className="h-1/2"
                    />
                </div>

                {/* Column 5: Customer Segments */}
                <Block 
                    id="customerSegments" 
                    label="Customer Segments" 
                    icon={Users} 
                    placeholder="Target customers and users..." 
                    hint="Who are your early adopters?"
                    className="col-span-10 md:col-span-2"
                />

                {/* Row 2: Cost Structure & Revenue Streams */}
                <div className="col-span-10 border-t flex flex-col md:flex-row h-40">
                    <Block 
                        id="costStructure" 
                        label="Cost Structure" 
                        icon={CreditCard} 
                        placeholder="Customer acquisition costs, distribution, etc." 
                        hint="What are your fixed and variable costs?"
                        className="flex-1 border-r"
                    />
                    <Block 
                        id="revenueStreams" 
                        label="Revenue Streams" 
                        icon={DollarSign} 
                        placeholder="Revenue model, lifetime value, etc." 
                        hint="Where will the money come from?"
                        className="flex-1"
                    />
                </div>
            </div>
        </div>
    )
}

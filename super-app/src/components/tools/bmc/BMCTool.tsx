"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { Save, Loader2, Users, Gift, Share2, Heart, DollarSign, Activity, HardDrive, Handshake, CreditCard } from "lucide-react"

interface BMCToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function BMCTool({ tool, progress, onDataSaved, submissionId }: BMCToolProps) {
    const initialData = progress?.data || {
        customerSegments: "",
        valuePropositions: "",
        channels: "",
        customerRelationships: "",
        revenueStreams: "",
        keyActivities: "",
        keyResources: "",
        keyPartnerships: "",
        costStructure: ""
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
                toast.success("Business Model Canvas saved!")
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
                    <h2 className="text-xl font-black italic uppercase tracking-tighter">Business Model <span className="text-accent">Canvas</span></h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Model Version (e.g. Pivot Alpha)"
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
                {/* Column 1: Key Partnerships */}
                <Block 
                    id="keyPartnerships" 
                    label="Key Partnerships" 
                    icon={Handshake} 
                    placeholder="Who are our Key Partners?" 
                    hint="Suppliers, strategic alliances, joint ventures."
                    className="col-span-10 md:col-span-2 border-r"
                />

                {/* Column 2: Key Activities & Key Resources */}
                <div className="col-span-10 md:col-span-2 border-r flex flex-col">
                    <Block 
                        id="keyActivities" 
                        label="Key Activities" 
                        icon={Activity} 
                        placeholder="What Key Activities do we perform?" 
                        hint="Production, problem-solving, platform/network."
                        className="h-1/2 border-b"
                    />
                    <Block 
                        id="keyResources" 
                        label="Key Resources" 
                        icon={HardDrive} 
                        placeholder="What Key Resources do we require?" 
                        hint="Physical, intellectual, human, financial."
                        className="h-1/2"
                    />
                </div>

                {/* Column 3: Value Propositions */}
                <Block 
                    id="valuePropositions" 
                    label="Value Propositions" 
                    icon={Gift} 
                    placeholder="What value do we deliver to customers?" 
                    hint="Newness, performance, customization, design."
                    className="col-span-10 md:col-span-2 border-r bg-accent/5"
                />

                {/* Column 4: Customer Relationships & Channels */}
                <div className="col-span-10 md:col-span-2 border-r flex flex-col">
                    <Block 
                        id="customerRelationships" 
                        label="Customer Relationships" 
                        icon={Heart} 
                        placeholder="What relationship does each Segment expect?" 
                        hint="Personal assistance, self-service, communities."
                        className="h-1/2 border-b"
                    />
                    <Block 
                        id="channels" 
                        label="Channels" 
                        icon={Share2} 
                        placeholder="Through which Channels reach segments?" 
                        hint="Awareness, evaluation, purchase, delivery."
                        className="h-1/2"
                    />
                </div>

                {/* Column 5: Customer Segments */}
                <Block 
                    id="customerSegments" 
                    label="Customer Segments" 
                    icon={Users} 
                    placeholder="For whom are we creating value?" 
                    hint="Mass market, niche, segmented, diversified."
                    className="col-span-10 md:col-span-2"
                />

                {/* Row 2: Cost Structure & Revenue Streams */}
                <div className="col-span-10 border-t flex flex-col md:flex-row h-40">
                    <Block 
                        id="costStructure" 
                        label="Cost Structure" 
                        icon={CreditCard} 
                        placeholder="What are the most important costs?" 
                        hint="Fixed costs, variable costs, economies of scale."
                        className="flex-1 border-r"
                    />
                    <Block 
                        id="revenueStreams" 
                        label="Revenue Streams" 
                        icon={DollarSign} 
                        placeholder="For what value are customers willing to pay?" 
                        hint="Asset sale, usage fee, subscription, lending."
                        className="flex-1"
                    />
                </div>
            </div>
        </div>
    )
}

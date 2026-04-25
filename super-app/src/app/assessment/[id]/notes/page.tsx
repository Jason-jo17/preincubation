"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { FRAMEWORKS } from "@/data/venture-readiness-data"
import { getReadinessAssessment, updateReadinessAssessment } from "@/app/actions/assessment"
import { motion } from "framer-motion"
import { 
  MessageSquare, Save, Loader2, CheckCircle2, 
  ArrowLeft, Info, AlertCircle 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function MentorNotesPage() {
    const { id } = useParams()
    const router = useRouter()
    const [assessment, setAssessment] = useState<any>(null)
    const [notes, setNotes] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        async function load() {
            const res = await getReadinessAssessment(id as string)
            if (res.success && res.data) {
                setAssessment(res.data)
                setNotes((res.data.mentorNotes as any) || {})
            }
            setLoading(false)
        }
        load()
    }, [id])

    const handleSave = async () => {
        setSaving(true)
        const res = await updateReadinessAssessment(id as string, {
            mentorNotes: notes
        })
        if (res.success) {
            toast.success("Mentor notes saved successfully")
        } else {
            toast.error("Failed to save notes")
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-accent" size={40} />
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Loading Assessment Data...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 rounded-full text-text-muted hover:text-text"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft size={14} className="mr-2" />
                            Back
                        </Button>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-accent/20 text-accent">Mentor Mode</Badge>
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mentor <span className="text-accent">Notes</span></h1>
                    <p className="text-sm text-text-muted font-medium uppercase tracking-widest">
                        Provide qualitative feedback for each strategic framework.
                    </p>
                </div>
                <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-[20px] bg-accent hover:bg-accent/90 text-bg-base font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-lg shadow-accent/20"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save size={14} className="mr-2" />}
                    Save All Notes
                </Button>
            </div>

            {/* Warning for Students (though middleware should protect this) */}
            <div className="p-6 rounded-[32px] bg-amber-50 border border-amber-100 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <AlertCircle size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">Reviewer Context</h4>
                    <p className="text-sm text-amber-700/80 leading-snug">
                        Your notes will be visible to the founder in their Roadmap and Playbook views. Be constructive and highlight specific actions for the next stage.
                    </p>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="space-y-6">
                {Object.entries(FRAMEWORKS).map(([fwKey, fw]) => (
                    <motion.div
                        key={fwKey}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[40px] bg-bg-surface border border-border space-y-6 hover:border-accent/30 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div 
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                                style={{ backgroundColor: fw.color }}
                            >
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h3 className="font-black uppercase tracking-widest text-sm">{fw.name}</h3>
                                <p className="text-[10px] font-bold text-text-muted italic">{fw.short}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-2 flex items-center gap-2">
                                <Info size={12} className="text-accent" />
                                Strategic Feedback
                            </label>
                            <Textarea 
                                placeholder={`What should the founder focus on for ${fw.name}?`}
                                className="min-h-[150px] rounded-[24px] bg-white border-border focus:ring-accent focus:border-accent text-sm p-6 leading-relaxed resize-none"
                                value={notes[fwKey] || ""}
                                onChange={(e) => setNotes(prev => ({ ...prev, [fwKey]: e.target.value }))}
                            />
                        </div>

                        {notes[fwKey] && (
                            <div className="flex items-center gap-2 text-green-600 px-2">
                                <CheckCircle2 size={12} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Draft Saved Locally</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Bottom Action */}
            <div className="flex justify-end pt-10">
                <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-[20px] bg-accent hover:bg-accent/90 text-bg-base font-black uppercase tracking-widest text-[10px] h-14 px-10 shadow-xl shadow-accent/30"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save size={16} className="mr-2" />}
                    Finalize Feedback
                </Button>
            </div>
        </div>
    )
}

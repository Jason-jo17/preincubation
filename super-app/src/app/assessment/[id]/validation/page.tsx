"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { FRAMEWORKS } from "@/data/venture-readiness-data"
import { getReadinessAssessment, updateReadinessAssessment } from "@/app/actions/assessment"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, Loader2, Save, ArrowLeft, 
  ChevronRight, AlertTriangle, CheckCircle2,
  TrendingUp, TrendingDown, Minus, Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip
} from "recharts"

export default function ValidationPage() {
    const { id } = useParams()
    const router = useRouter()
    const [assessment, setAssessment] = useState<any>(null)
    const [mentorScores, setMentorScores] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeFw, setActiveFw] = useState(Object.keys(FRAMEWORKS)[0])

    useEffect(() => {
        async function load() {
            const res = await getReadinessAssessment(id as string)
            if (res.success && res.data) {
                setAssessment(res.data)
                setMentorScores((res.data.mentorScores as any) || {})
            }
            setLoading(false)
        }
        load()
    }, [id])

    const handleSave = async () => {
        setSaving(true)
        const res = await updateReadinessAssessment(id as string, {
            mentorScores: mentorScores
        })
        if (res.success) {
            toast.success("Mentor scores validated")
        } else {
            toast.error("Failed to save validation")
        }
        setSaving(false)
    }

    const getAverageScore = (scores: any, fwKey: string) => {
        if (!scores || !scores[fwKey]) return 0
        const fwScores = scores[fwKey]
        let total = 0
        let count = 0
        Object.values(fwScores).forEach((lvlScores: any) => {
            Object.values(lvlScores).forEach((score: any) => {
                total += score
                count++
            })
        })
        return count > 0 ? (total / count).toFixed(1) : 0
    }

    const radarData = Object.entries(FRAMEWORKS).map(([key, fw]) => ({
        subject: fw.name,
        self: parseFloat(getAverageScore(assessment?.scores, key) as string),
        mentor: parseFloat(getAverageScore(mentorScores, key) as string) || 0,
        fullMark: 4
    }))

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Analyzing Assessment Data...</p>
        </div>
    )

    return (
        <div className="space-y-10 pb-20">
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
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-accent/20 text-accent">Validation Node</Badge>
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-text">Readiness <span className="text-accent">Validation</span></h1>
                    <p className="text-sm text-text-muted font-medium uppercase tracking-widest">
                        Calibrate founder self-assessment with mentor reality.
                    </p>
                </div>
                <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-[20px] bg-accent hover:bg-accent/90 text-bg-base font-black uppercase tracking-widest text-[10px] h-12 px-8"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <ShieldCheck size={14} className="mr-2" />}
                    Confirm Validation
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Visualization */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="p-8 rounded-[40px] bg-bg-surface border border-border flex flex-col items-center">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6">Comparative Radar</h3>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 800 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 4]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Self Assessment"
                                        dataKey="self"
                                        stroke="#94a3b8"
                                        fill="#94a3b8"
                                        fillOpacity={0.1}
                                    />
                                    <Radar
                                        name="Mentor Validation"
                                        dataKey="mentor"
                                        stroke="#f43f5e"
                                        fill="#f43f5e"
                                        fillOpacity={0.3}
                                    />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Stats Overlay */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-[32px] bg-white border border-border space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Avg. Deviation</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black italic uppercase tracking-tighter">12%</span>
                                <TrendingDown className="text-red-500" size={16} />
                            </div>
                        </div>
                        <div className="p-6 rounded-[32px] bg-white border border-border space-y-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Integrity Score</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black italic uppercase tracking-tighter">High</span>
                                <CheckCircle2 className="text-green-500" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Calibration Interface */}
                <div className="lg:col-span-7 space-y-6">
                    {/* FW Tabs */}
                    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {Object.entries(FRAMEWORKS).map(([key, fw]) => (
                            <button
                                key={key}
                                onClick={() => setActiveFw(key)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                    activeFw === key 
                                        ? "bg-text text-white" 
                                        : "bg-bg-surface text-text-muted hover:bg-border"
                                )}
                            >
                                {fw.name}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFw}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 rounded-[40px] bg-white border border-border shadow-sm space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: FRAMEWORKS[activeFw].color }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-sm">{FRAMEWORKS[activeFw].name}</h3>
                                        <p className="text-[10px] font-bold text-text-muted italic">Calibrating {assessment?.levels[activeFw]} Levels</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black uppercase text-text-muted">Self Avg</div>
                                    <div className="text-xl font-black italic">{getAverageScore(assessment?.scores, activeFw)}</div>
                                </div>
                            </div>

                            {/* Scoring Loop */}
                            <div className="space-y-10">
                                {[1, 2, 3].map((lvlIdx) => {
                                    const lvl = assessment?.levels[activeFw] - (3 - lvlIdx)
                                    if (lvl < 1) return null
                                    
                                    const qList = FRAMEWORKS[activeFw]?.levels[lvl - 1]?.q
                                    if (!qList) return null

                                    return (
                                        <div key={lvl} className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase text-accent px-2 bg-accent/10 rounded-full">Level {lvl} Verification</span>
                                                <div className="h-[1px] flex-1 bg-border/50" />
                                            </div>

                                            <div className="space-y-6">
                                                {qList.map((q: any, qIdx: number) => {
                                                    const selfScore = assessment?.scores[activeFw]?.[lvl]?.[qIdx] || 0
                                                    const mentorScore = mentorScores[activeFw]?.[lvl]?.[qIdx] || selfScore

                                                    return (
                                                        <div key={qIdx} className="space-y-3">
                                                            <div className="flex justify-between items-start gap-4">
                                                                <p className="text-xs font-bold text-text-secondary leading-snug max-w-md">{q[0]}</p>
                                                                <div className="flex items-center gap-3 shrink-0">
                                                                    <div className="text-center px-3 py-1 rounded-lg bg-bg-base border border-border">
                                                                        <div className="text-[8px] font-black uppercase text-text-muted">Self</div>
                                                                        <div className="text-xs font-black">{selfScore}</div>
                                                                    </div>
                                                                    <ChevronRight size={12} className="text-text-muted" />
                                                                    <div className={cn(
                                                                        "text-center px-3 py-1 rounded-lg border",
                                                                        mentorScore > selfScore ? "bg-green-50 border-green-200" : 
                                                                        mentorScore < selfScore ? "bg-red-50 border-red-200" : 
                                                                        "bg-accent/5 border-accent/20"
                                                                    )}>
                                                                        <div className="text-[8px] font-black uppercase text-text-muted">Mentor</div>
                                                                        <div className="text-xs font-black">{mentorScore}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Slider 
                                                                max={4}
                                                                step={1}
                                                                value={[mentorScore]}
                                                                onValueChange={([val]) => {
                                                                    setMentorScores((prev: any) => ({
                                                                        ...prev,
                                                                        [activeFw]: {
                                                                            ...(prev[activeFw] || {}),
                                                                            [lvl]: {
                                                                                ...(prev[activeFw]?.[lvl] || {}),
                                                                                [qIdx]: val
                                                                            }
                                                                        }
                                                                    }))
                                                                }}
                                                                className="py-4"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

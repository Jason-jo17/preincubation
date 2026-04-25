"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveToolData } from "@/app/actions/roadmap"
import { toast } from "sonner"
import { 
  Save, Loader2, Globe, TrendingUp, Users, 
  Cpu, Shield, Leaf, Plus, X, BarChart2, MousePointer2 
} from "lucide-react"
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts'
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface PESTLEFactor {
    id: string
    category: string
    text: string
    impact: number // -5 to 5
    timing: number // 1 to 5 (1=Now, 5=Long Term)
}

interface PESTLEToolProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    submissionId?: string
}

export function PESTLETool({ tool, progress, onDataSaved, submissionId }: PESTLEToolProps) {
    const initialData = progress?.data || {
        factors: []
    }

    const [data, setData] = useState(initialData)
    const [iterationName, setIterationName] = useState(progress?.iterationName || "")
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<'list' | 'chart'>('list')
    
    // Form state
    const [newFactor, setNewFactor] = useState({
        category: 'political',
        text: '',
        impact: 0,
        timing: 3
    })

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await saveToolData(tool.toolId, data, {
                submissionId,
                iterationName
            })
            if (res.success) {
                toast.success("PESTLE Analysis saved!")
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

    const addFactor = () => {
        if (!newFactor.text.trim()) return
        const factor: PESTLEFactor = {
            id: crypto.randomUUID(),
            ...newFactor
        }
        setData({ ...data, factors: [...(data.factors || []), factor] })
        setNewFactor({ ...newFactor, text: '' })
    }

    const removeFactor = (id: string) => {
        setData({ ...data, factors: data.factors.filter((f: any) => f.id !== id) })
    }

    const categories = [
        { id: 'political', label: 'Political', icon: Globe, color: '#3b82f6' },
        { id: 'economic', label: 'Economic', icon: TrendingUp, color: '#10b981' },
        { id: 'social', label: 'Social', icon: Users, color: '#8b5cf6' },
        { id: 'technological', label: 'Technological', icon: Cpu, color: '#f59e0b' },
        { id: 'legal', label: 'Legal', icon: Shield, color: '#ef4444' },
        { id: 'environmental', label: 'Environmental', icon: Leaf, color: '#10b981' }
    ]

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const factor = payload[0].payload
            return (
                <div className="bg-bg-surface border border-border p-3 rounded-xl shadow-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categories.find(c => c.id === factor.category)?.color }} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{factor.category}</span>
                    </div>
                    <p className="text-xs font-bold max-w-[200px]">{factor.text}</p>
                    <div className="flex gap-4 mt-2 text-[10px] font-black opacity-50 uppercase">
                        <span>Impact: {factor.impact}</span>
                        <span>Timing: {factor.timing}</span>
                    </div>
                </div>
            )
        }
        return null
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">PESTLE <span className="text-accent">Environmental Map</span></h2>
                    <p className="text-xs text-text-muted font-medium uppercase tracking-widest">Analyze macro-trends by Impact & Horizons</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-bg-base border border-border rounded-xl p-1">
                        <button 
                            onClick={() => setActiveTab('list')}
                            className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'list' ? "bg-white shadow-sm text-accent" : "text-text-muted opacity-50")}
                        >
                            <BarChart2 size={14} className="inline mr-2" /> List View
                        </button>
                        <button 
                            onClick={() => setActiveTab('chart')}
                            className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'chart' ? "bg-white shadow-sm text-accent" : "text-text-muted opacity-50")}
                        >
                            <MousePointer2 size={14} className="inline mr-2" /> Strategic Chart
                        </button>
                    </div>
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

            {activeTab === 'list' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Input Panel */}
                    <div className="lg:col-span-4 bg-bg-surface border border-border rounded-[32px] p-6 space-y-6">
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Category</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {categories.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setNewFactor({ ...newFactor, category: c.id })}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all",
                                            newFactor.category === c.id ? "border-accent bg-accent/5 text-accent shadow-sm" : "border-transparent bg-bg-base text-text-muted opacity-50"
                                        )}
                                    >
                                        <c.icon size={16} />
                                        <span className="text-[9px] font-black uppercase mt-1 tracking-tighter">{c.id.slice(0, 4)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Description</Label>
                            <Input 
                                placeholder="Identify trend/factor..." 
                                value={newFactor.text}
                                onChange={(e) => setNewFactor({ ...newFactor, text: e.target.value })}
                                className="h-12 text-sm font-bold bg-bg-base border-none rounded-xl"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Impact ({newFactor.impact})</Label>
                                <input 
                                    type="range" min="-5" max="5" 
                                    value={newFactor.impact}
                                    onChange={(e) => setNewFactor({ ...newFactor, impact: parseInt(e.target.value) })}
                                    className="w-full accent-accent"
                                />
                                <div className="flex justify-between text-[8px] font-bold uppercase text-text-muted">
                                    <span>Negative</span>
                                    <span>Positive</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Timing ({newFactor.timing})</Label>
                                <input 
                                    type="range" min="1" max="5" 
                                    value={newFactor.timing}
                                    onChange={(e) => setNewFactor({ ...newFactor, timing: parseInt(e.target.value) })}
                                    className="w-full accent-accent"
                                />
                                <div className="flex justify-between text-[8px] font-bold uppercase text-text-muted">
                                    <span>Now</span>
                                    <span>Future</span>
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={addFactor}
                            className="w-full h-12 bg-accent text-bg-base font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-accent/20"
                        >
                            <Plus size={18} className="mr-2" /> Add Factor
                        </Button>
                    </div>

                    {/* Factors List */}
                    <div className="lg:col-span-8 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {data.factors?.map((factor: any) => {
                                const cat = categories.find(c => c.id === factor.category)
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        key={factor.id}
                                        className="bg-bg-surface border border-border p-4 rounded-2xl flex items-center gap-6 group hover:border-accent/40 transition-all"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-bg-base border border-border text-accent group-hover:bg-accent group-hover:text-bg-base transition-colors">
                                            {cat && <cat.icon size={20} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1 opacity-50">
                                                {factor.category}
                                            </div>
                                            <p className="text-sm font-bold text-text truncate">{factor.text}</p>
                                        </div>
                                        <div className="flex items-center gap-8 text-center px-4">
                                            <div>
                                                <div className={cn("text-sm font-black italic tracking-tighter", factor.impact > 0 ? "text-green-500" : factor.impact < 0 ? "text-red-500" : "text-text-muted")}>
                                                    {factor.impact > 0 ? '+' : ''}{factor.impact}
                                                </div>
                                                <div className="text-[8px] font-black uppercase opacity-30">Impact</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-black italic tracking-tighter text-accent">
                                                    {factor.timing}
                                                </div>
                                                <div className="text-[8px] font-black uppercase opacity-30">Horizon</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => removeFactor(factor.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-xl text-red-400 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                        {(!data.factors || data.factors.length === 0) && (
                            <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-20 py-24">
                                <Globe size={64} className="mb-4" />
                                <p className="font-black uppercase tracking-widest">No factors mapped yet</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-bg-surface border border-border rounded-[40px] p-10 h-[600px] shadow-2xl relative">
                    <div className="absolute top-10 right-10 flex gap-4 text-[10px] font-black uppercase tracking-widest opacity-40">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Political</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Economic</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> Social</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500" /> Tech</div>
                    </div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis 
                                type="number" 
                                dataKey="timing" 
                                name="Timing" 
                                domain={[0, 6]} 
                                hide 
                            />
                            <YAxis 
                                type="number" 
                                dataKey="impact" 
                                name="Impact" 
                                domain={[-6, 6]} 
                                hide 
                            />
                            <ZAxis type="number" range={[100, 400]} />
                            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                            
                            <ReferenceLine x={3} stroke="#333" strokeDasharray="5 5" />
                            <ReferenceLine y={0} stroke="#333" strokeDasharray="5 5" />
                            
                            <Scatter name="PESTLE Factors" data={data.factors || []}>
                                {data.factors?.map((entry: any, index: number) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={categories.find(c => c.id === entry.category)?.color} 
                                        className="filter drop-shadow-lg transition-all hover:scale-150 cursor-pointer"
                                    />
                                ))}
                            </Scatter>

                            {/* Axis Labels */}
                            <text x="50%" y="98%" textAnchor="middle" fill="#888" fontSize="10" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>Timing: Immediate (Left) → Future (Right)</text>
                            <text x="2%" y="50%" textAnchor="middle" fill="#888" fontSize="10" fontWeight="900" style={{ textTransform: 'uppercase', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>Impact: Negative (Bottom) → Positive (Top)</text>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}

"use client"

import React, { useState, useEffect } from 'react'
import { 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Plus, 
  Send, 
  Loader2, 
  ChevronRight, 
  ExternalLink,
  AlertCircle,
  FileText,
  BadgeCheck,
  RefreshCcw,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { TRLRing } from "@/components/student/TRLRing"

const CRL_DIMENSIONS = [
  { id: 'market_application', label: 'Market Application', weight: 0.30, icon: Target },
  { id: 'customer_validation', label: 'Customer Validation', weight: 0.35, icon: ShieldCheck },
  { id: 'business_model', label: 'Business Model', weight: 0.35, icon: TrendingUp }
]

const IRL_DIMENSIONS = [
  { id: 'pitch_capability', label: 'Pitch Capability', weight: 0.40, icon: FileText },
  { id: 'financial_modelling', label: 'Financial Modelling', weight: 0.30, icon: BadgeCheck },
  { id: 'investor_engagement', label: 'Investor Engagement', weight: 0.30, icon: Send }
]

export default function CRLIRLAssessmentPage() {
  const [activeTab, setActiveTab] = useState('crl')
  const [evidences, setEvidences] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDimension, setSelectedDimension] = useState(CRL_DIMENSIONS[0].id)
  
  const [form, setForm] = useState({
    text: '',
    urls: [''],
    citation: ''
  })

  useEffect(() => {
    fetchEvidences()
  }, [activeTab])

  const fetchEvidences = async () => {
    try {
      const res = await fetch(`/api/student/${activeTab}`)
      const data = await res.json()
      setEvidences(data.evidences || [])
    } catch (err) {
      console.error("Fetch failed", err)
    }
  }

  const calculateWeightedScore = (dimensions: typeof CRL_DIMENSIONS) => {
    return dimensions.reduce((acc, dim) => {
      const dimEvidences = evidences.filter(e => e.dimension === dim.id && e.status === 'approved')
      const maxScore = dimEvidences.length > 0 ? Math.max(...dimEvidences.map(e => e.aiScore)) : 0
      return acc + (maxScore * dim.weight)
    }, 0)
  }

  const crlScore = activeTab === 'crl' ? calculateWeightedScore(CRL_DIMENSIONS) : 0
  const irlScore = activeTab === 'irl' ? calculateWeightedScore(IRL_DIMENSIONS) : 0

  const handleSubmit = async () => {
    if (!form.text) return
    setLoading(true)
    try {
      const res = await fetch(`/api/student/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimension: selectedDimension,
          evidenceText: form.text,
          evidenceUrls: form.urls.filter(u => u.trim() !== ''),
          citation: form.citation
        })
      })
      
      if (res.ok) {
        setIsDialogOpen(false)
        setForm({ text: '', urls: [''], citation: '' })
        await fetchEvidences()
      }
    } catch (err) {
      console.error("Submission failed", err)
    } finally {
      setLoading(false)
    }
  }

  const runAssessment = async (id: string) => {
    try {
      const res = await fetch(`/api/student/${activeTab}/${id}/assess`, { method: 'POST' })
      if (res.ok) await fetchEvidences()
    } catch (err) {
      console.error("Assessment failed", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/student/cofounder">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter italic">Readiness Framework</h1>
              <p className="text-xs text-muted-foreground font-bold">CRL & IRL Validation Engine</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Commercial (CRL)</p>
                <p className="text-2xl font-black text-primary leading-none">{Math.round(crlScore)}%</p>
              </div>
              <TRLRing level={Math.max(1, Math.round((crlScore / 100) * 9))} size={48} strokeWidth={4} className="text-primary" />
            </div>
            
            <div className="flex items-center gap-3 border-l pl-8">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Investment (IRL)</p>
                <p className="text-2xl font-black text-indigo-600 leading-none">{Math.round(irlScore)}%</p>
              </div>
              <TRLRing level={Math.max(1, Math.round((irlScore / 100) * 9))} size={48} strokeWidth={4} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="crl" className="space-y-8" onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50 p-1 border">
              <TabsTrigger value="crl" className="font-bold uppercase tracking-widest text-xs px-8">Commercial Readiness</TabsTrigger>
              <TabsTrigger value="irl" className="font-bold uppercase tracking-widest text-xs px-8">Investment Readiness</TabsTrigger>
            </TabsList>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="font-black uppercase tracking-widest shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Add Evidence
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black uppercase italic italic tracking-tighter">Validate Dimension</DialogTitle>
                  <DialogDescription>Submit proof for {activeTab?.toUpperCase()} requirements.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Select Dimension</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(activeTab === 'crl' ? CRL_DIMENSIONS : IRL_DIMENSIONS).map(d => (
                        <Button
                          key={d.id}
                          variant={selectedDimension === d.id ? "default" : "outline"}
                          className="h-auto p-3 flex flex-col items-center gap-1 text-[10px] font-bold uppercase"
                          onClick={() => setSelectedDimension(d.id)}
                        >
                          <d.icon className="h-4 w-4" />
                          {d.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Evidence Narrative</Label>
                    <Textarea 
                      placeholder="Describe your findings and evidence in detail..."
                      className="min-h-[120px] font-medium"
                      value={form.text}
                      onChange={(e) => setForm({ ...form, text: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> Artifact URLs
                    </Label>
                    {form.urls.map((url, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input 
                          placeholder="e.g. spreadsheet, presentation, report link"
                          value={url}
                          onChange={(e) => {
                            const newUrls = [...form.urls]
                            newUrls[idx] = e.target.value
                            setForm({ ...form, urls: newUrls })
                          }}
                        />
                        {idx === form.urls.length - 1 ? (
                          <Button variant="outline" size="icon" onClick={() => setForm({ ...form, urls: [...form.urls, ''] })}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="icon" onClick={() => {
                            const newUrls = form.urls.filter((_, i) => i !== idx)
                            setForm({ ...form, urls: newUrls })
                          }}>
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Sprint Tool Citation</Label>
                    <Input 
                      placeholder="e.g. Sprint 2 Market Map Output"
                      value={form.citation}
                      onChange={(e) => setForm({ ...form, citation: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit} disabled={loading || !form.text} className="w-full font-black uppercase tracking-widest h-12">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                    Submit for AI Assessment
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="crl" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CRL_DIMENSIONS.map(dim => (
                <DimensionCard 
                  key={dim.id} 
                  dim={dim} 
                  evidences={evidences.filter(e => e.dimension === dim.id)} 
                  onAssess={runAssessment}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="irl" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IRL_DIMENSIONS.map(dim => (
                <DimensionCard 
                  key={dim.id} 
                  dim={dim} 
                  evidences={evidences.filter(e => e.dimension === dim.id)} 
                  onAssess={runAssessment}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function DimensionCard({ dim, evidences, onAssess }: { dim: any, evidences: any[], onAssess: (id: string) => void }) {
  const bestScore = evidences.length > 0 ? Math.max(...evidences.map(e => e.aiScore || 0)) : 0
  
  return (
    <Card className="border-2 hover:border-primary/50 transition-all shadow-md overflow-hidden bg-card/50">
      <CardHeader className="pb-4 relative">
        <div className="absolute top-4 right-4 ring-1 ring-border rounded-full p-2 bg-background/50">
          <dim.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase">
            {dim.weight * 100}% Weight
          </Badge>
        </div>
        <CardTitle className="text-lg font-black uppercase tracking-tight italic mt-2">{dim.label}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10 shadow-inner">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Certified Score</p>
            <p className="text-3xl font-black text-primary leading-none">{bestScore}%</p>
          </div>
          <TRLRing level={Math.max(1, Math.round((bestScore / 100) * 9))} size={60} strokeWidth={6} />
        </div>

        <div className="space-y-3">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            Evidence Trail <div className="h-px flex-1 bg-border" />
          </h5>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
            {evidences.map((e) => (
              <div key={e.id} className="p-3 rounded-lg border bg-background/50 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className={cn(
                    "uppercase text-[8px] font-black tracking-widest",
                    e.status === 'approved' ? "bg-emerald-500" : e.status === 'rejected' ? "bg-red-500" : "bg-orange-500 animate-pulse"
                  )}>
                    {e.status}
                  </Badge>
                  {e.status === 'pending' && (
                    <Button variant="ghost" size="sm" className="h-6 text-[9px] font-black uppercase px-2" onClick={() => onAssess(e.id)}>
                      <RefreshCcw className="h-3 w-3 mr-1" /> Run AI Review
                    </Button>
                  )}
                  {e.aiScore !== undefined && (
                    <span className="font-black text-primary">{e.aiScore}%</span>
                  )}
                </div>
                <p className="leading-relaxed line-clamp-3 text-muted-foreground italic font-medium">"{e.evidenceText}"</p>
                
                {e.criteriaScores && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t mt-2">
                    {Object.entries(e.criteriaScores).map(([k, v]: [string, any]) => (
                      <div key={k} className="flex flex-col gap-0.5">
                        <span className="uppercase text-[7px] font-black text-muted-foreground">{k}</span>
                        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${v * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {e.assessmentNotes && (
                  <div className="bg-muted/40 p-2 rounded text-[10px] text-muted-foreground font-medium border border-border/50">
                    <span className="font-black uppercase text-[8px] text-primary block mb-0.5">Improvement Guidance:</span>
                    {e.improvementGuidance || e.assessmentNotes}
                  </div>
                )}
              </div>
            ))}
            {evidences.length === 0 && (
              <div className="text-center py-8 opacity-40">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold text-[10px] uppercase">No proof found</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

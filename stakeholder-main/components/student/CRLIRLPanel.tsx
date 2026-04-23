"use client"

import React, { useState, useEffect } from 'react'
import { 
  FileText, 
  Layers, 
  Target, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Plus,
  Send,
  Loader2,
  Trash2,
  RefreshCcw
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useQuery } from '@tanstack/react-query'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Wand2, ChevronDown, Link2, FileText as FileTextIcon } from 'lucide-react'

const CRL_DIMENSIONS = [
  { id: 'market_application', label: 'Market Application', weight: 30 },
  { id: 'customer_validation', label: 'Customer Validation', weight: 35 },
  { id: 'business_model', label: 'Business Model', weight: 35 }
]

const IRL_DIMENSIONS = [
  { id: 'pitch_capability', label: 'Pitch Capability', weight: 40 },
  { id: 'financial_modelling', label: 'Financial Modelling', weight: 30 },
  { id: 'investor_engagement', label: 'Investor Engagement', weight: 30 }
]

export const CRLIRLPanel = () => {
  const [activeTab, setActiveTab] = useState('crl')
  const [evidences, setEvidences] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    dimension: 'market_application',
    text: '',
    url: ''
  })
  const [assessment, setAssessment] = useState<any>(null)

  // When dimension changes, trigger prefill fetch
  const { data: prefill, isLoading: prefillLoading } = useQuery({
    queryKey: ['crl-prefill', form.dimension, activeTab],
    queryFn: () => fetch(`/api/student/crl-irl/prefill?dimension=${form.dimension}&type=${activeTab}`)
                    .then(r => r.json()),
    staleTime: 30_000
  })

  // Local state for cited tools
  const [citedToolIds, setCitedToolIds] = useState<string[]>([])

  // Auto-populate cited tools when prefill loads
  useEffect(() => {
    if (prefill?.citedToolIds?.length) {
      setCitedToolIds(prefill.citedToolIds)
    } else {
      setCitedToolIds([])
    }
  }, [prefill])

  useEffect(() => {
    fetchEvidences()
  }, [activeTab])

  const fetchEvidences = async () => {
    try {
      const res = await fetch(`/api/student/${activeTab}`)
      const data = await res.json()
      setEvidences(data.evidences || [])
    } catch (err) {
      console.error("Fetch evidence failed", err)
    }
  }

  // Poll for pending assessments
  useEffect(() => {
    const hasPending = evidences.some(e => e.status === 'submitted');
    if (hasPending) {
      const interval = setInterval(fetchEvidences, 5000);
      return () => clearInterval(interval);
    }
  }, [evidences]);

  const handleSubmit = async () => {
    if (!form.text) return
    setLoading(true)
    try {
      const res = await fetch(`/api/student/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dimension: form.dimension,
          evidenceText: form.text,
          evidenceUrls: form.url ? [form.url] : [],
          sprintToolsCited: citedToolIds
        })
      })
      const data = await res.json()
      if (data.success) {
        // Trigger AI Assessment
        try {
          const assessRes = await fetch(`/api/student/${activeTab}/${data.evidence.id}/assess`, {
            method: 'POST'
          })
          
          if (!assessRes.ok) {
            console.error("AI Assessment request failed:", assessRes.statusText);
          }
          
          const assessData = await assessRes.json()
          if (assessData.success) {
            setAssessment(assessData.evidence)
          }
        } catch (assessErr) {
          console.error("AI Assessment trigger failed:", assessErr);
        }
        
        // Always refresh to show at least the submitted state, or the failed state if needed
        await fetchEvidences()
        setForm({ ...form, text: '', url: '' })
      }
    } catch (err) {
      console.error("Submission failed", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this evidence?")) return
    
    try {
      const res = await fetch(`/api/student/${activeTab}/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        await fetchEvidences()
      } else {
        console.error("Delete failed")
      }
    } catch (err) {
      console.error("Delete error", err)
    }
  }

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">Readiness Validation</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">Precision AI Grading</Badge>
          </div>
        </div>
        <CardDescription>Submit evidence to improve your Commercial and Innovation Readiness Levels.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crl" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="crl" className="font-bold uppercase tracking-widest text-[10px]">Commercial (CRL)</TabsTrigger>
            <TabsTrigger value="irl" className="font-bold uppercase tracking-widest text-[10px]">Innovation (IRL)</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Form Section */}
            <div className="md:col-span-5 space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Select Dimension</Label>
                <div className="grid grid-cols-1 gap-2">
                  {(activeTab === 'crl' ? CRL_DIMENSIONS : IRL_DIMENSIONS).map(d => (
                    <button
                      key={d.id}
                      onClick={() => setForm({ ...form, dimension: d.id })}
                      className={cn(
                        "p-3 rounded-lg border text-left flex items-center justify-between transition-all",
                        form.dimension === d.id ? "bg-primary border-primary text-white shadow-md" : "bg-muted/50 border-border hover:border-primary/50"
                      )}
                    >
                      <span className="text-sm font-bold">{d.label}</span>
                      <span className="text-[10px] opacity-60 font-black">{d.weight}% Weight</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Evidence Details</Label>
                
                {prefill?.prefillItems?.length > 0 && (
                  <Collapsible className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-between mb-2 border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50">
                        <span className="flex items-center gap-2 text-indigo-700">
                          <Wand2 className="h-3.5 w-3.5" />
                          Pre-fill from {prefill.toolCount} completed tool{prefill.toolCount !== 1 ? 's' : ''}
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 text-indigo-400" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border rounded-lg bg-indigo-50/50 p-3 mb-3 space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200">
                        {/* Draft all button */}
                        <Button size="sm" variant="secondary" className="w-full font-bold text-[10px] uppercase tracking-wider"
                          onClick={() => setForm(f => ({ ...f, text: prefill.draftText }))}>
                          <FileTextIcon className="h-3.5 w-3.5 mr-1" /> Draft all into evidence text
                        </Button>
                        {/* Individual tool cards */}
                        {prefill.prefillItems.map((item: any) => (
                          <div key={item.toolId} className="bg-white rounded border p-2 text-[11px] shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-700">{item.toolName}</span>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-[9px] py-0 px-1 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold uppercase">
                                  {item.status === 'gate_passed' ? '✓ Passed' : 'Submitted'}
                                </Badge>
                                <Button size="sm" variant="ghost" className="h-5 px-1.5 text-[10px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-black"
                                  onClick={() => setForm(f => ({
                                    ...f,
                                    text: f.text ? `${f.text}\n\n--- ${item.toolName} ---\n${item.context}` : item.context
                                  }))}>
                                  + USE
                                </Button>
                              </div>
                            </div>
                            <p className="text-slate-500 line-clamp-2 italic leading-tight">{item.context}</p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                <Textarea 
                  placeholder="Paste your findings, data points, or descriptive evidence here..."
                  className="min-h-[150px] font-medium resize-none shadow-inner"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">External Artifact (URL)</Label>
                <div className="relative">
                  <Input 
                    placeholder="https://docs.google.com/..." 
                    className="pl-9 shadow-inner"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                  />
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full font-black uppercase tracking-widest h-12 shadow-lg"
                disabled={loading || !form.text}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                Submit Evidence for AI Review
              </Button>
            </div>

            {/* History / Results Section */}
            <div className="md:col-span-7 border-l md:pl-8 space-y-6">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Assessment History</h5>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] font-bold">{evidences.length} Submissions</Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground" 
                    onClick={fetchEvidences}
                    title="Refresh history"
                  >
                    <RefreshCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted">
                {evidences.map((e) => (
                  <div key={e.id} className="p-4 rounded-xl border bg-card/50 flex flex-col gap-3 group transition-all hover:border-primary/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2 uppercase text-[9px] font-black tracking-widest border-primary/20 bg-primary/5 text-primary">
                          {e.dimension.replace('_', ' ')}
                        </Badge>
                        {e.sprintToolsCited?.length > 0 && (
                          <Badge variant="outline" className="ml-2 mb-2 uppercase text-[9px] font-black tracking-widest border-indigo-200 bg-indigo-50 text-indigo-700">
                            {e.sprintToolsCited.length} Tools Cited
                          </Badge>
                        )}
                        <p className="text-sm font-medium line-clamp-2 text-muted-foreground italic">
                          "{e.evidenceText}"
                        </p>
                        {e.sprintToolsCited?.length > 0 && (
                          <p className="text-[10px] text-indigo-600 font-black mt-1 flex items-center gap-1 uppercase tracking-tighter">
                            <Link2 className="h-3 w-3" />
                            Built from: {e.sprintToolsCited.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {e.status === 'approved' ? (
                          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-sm">
                            <ShieldCheck className="h-3 w-3" /> {e.aiScore}%
                          </div>
                        ) : e.status === 'rejected' ? (
                          <div className="bg-destructive text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-sm">
                            <AlertCircle className="h-3 w-3" /> {e.aiScore || 0}%
                          </div>
                        ) : (
                          <Badge variant="secondary" className="animate-pulse italic">ASSESSING...</Badge>
                        )}
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <p className="text-[9px] text-muted-foreground font-bold">
                            {new Date(e.createdAt).toLocaleDateString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(e.id)}
                            title="Delete entry"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {e.assessmentNotes && (
                      <div className="p-3 rounded-lg bg-muted/40 text-[11px] leading-relaxed border border-border/50">
                        <strong className="block text-xs uppercase mb-1 font-black text-muted-foreground">AI Feedback:</strong>
                        {e.assessmentNotes}
                        {e.improvementGuidance && (
                          <div className="mt-2 text-primary">
                            <strong className="font-bold">Next Steps:</strong> {e.improvementGuidance}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {evidences.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-50 grayscale">
                    <Layers className="h-12 w-12 mb-4 text-muted-foreground" />
                    <p className="text-sm font-bold">No evidence submitted yet.</p>
                    <p className="text-xs">Start by documenting your commercial findings on the left.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

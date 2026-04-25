"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Rocket, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  Zap, 
  Terminal,
  ChevronRight,
  ShieldCheck,
  Loader2,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { createProject } from "@/app/actions/showcase"
import { useRouter } from "next/navigation"

export default function SubmitProject() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    sector: "",
    techStack: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) return
    
    setLoading(true)
    const result = await createProject({
      title: formData.title,
      shortDescription: formData.shortDescription,
      sector: formData.sector,
      creatorId: (session.user as any).id
    })

    if (result.success) {
      setSubmitted(true)
      setTimeout(() => {
        router.push("/showcase")
      }, 2000)
    } else {
      alert("Failed to submit project. Please try again.")
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="size-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-4xl font-black uppercase italic italic">Submission Logged</h2>
          <p className="text-text-muted font-bold uppercase tracking-widest text-sm">Redirecting to Innovation Marketplace...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-base overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="relative z-10 p-8 flex justify-between items-center">
        <Link href="/showcase" className="group flex items-center gap-4">
          <div className="size-10 rounded-xl bg-bg-surface border border-border flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/30 transition-all shadow-inner">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Return to Showcase</span>
        </Link>
        <div className="flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl">
          <div className="size-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-accent">Mainnet Active</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        <div className="space-y-12">
          <div className="space-y-4">
             <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
               Submit <span className="text-accent">Innovation</span>
             </h1>
             <p className="text-text-secondary text-lg font-medium tracking-tight">
               Initiate the innovation deployment cycle. Your solution will undergo CEED evaluation before marketplace listing.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Form Side */}
            <form onSubmit={handleSubmit} className="md:col-span-8 space-y-8">
               <div className="p-10 bg-bg-surface border border-border rounded-[3rem] shadow-2xl space-y-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Project Title</label>
                       <Input 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="E.G. AI-POWERED QUALITY INSPECTOR" 
                        className="h-14 bg-bg-raised/50 border-border rounded-2xl text-sm font-bold uppercase tracking-tight focus-visible:ring-accent" 
                       />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Core Description</label>
                       <Textarea 
                        required
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                        placeholder="DESCRIBE THE PROBLEM AND YOUR SOLUTION DELTA..." 
                        className="min-h-[150px] bg-bg-raised/50 border-border rounded-2xl text-sm font-bold leading-relaxed focus-visible:ring-accent" 
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Sector Hub</label>
                         <Input 
                          required
                          value={formData.sector}
                          onChange={(e) => setFormData({...formData, sector: e.target.value})}
                          placeholder="SELECT SECTOR..." 
                          className="h-14 bg-bg-raised/50 border-border rounded-2xl text-sm font-bold uppercase focus-visible:ring-accent" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Tech Stack</label>
                         <Input 
                          value={formData.techStack}
                          onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                          placeholder="E.G. PYTHON, NEXTJS, GPT-4" 
                          className="h-14 bg-bg-raised/50 border-border rounded-2xl text-sm font-bold uppercase focus-visible:ring-accent" 
                         />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-4 hover:border-accent/30 transition-colors cursor-pointer group">
                     <div className="size-12 rounded-2xl bg-bg-raised flex items-center justify-center text-text-muted group-hover:text-accent transition-colors">
                        <Upload className="w-6 h-6" />
                     </div>
                     <div className="text-center">
                        <p className="text-[11px] font-black uppercase tracking-widest">Upload Media Assets</p>
                        <p className="text-[9px] font-bold text-text-muted uppercase mt-1">Images, Demo Videos, or Pitch Decks (Max 50MB)</p>
                     </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={loading || !session}
                    className="w-full h-16 bg-accent text-bg-base rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/20"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Initialize CEED Review <ChevronRight className="ml-2 w-5 h-5" /></>
                    )}
                  </Button>
               </div>
            </form>


            {/* Sidebar / Requirements */}
            <div className="md:col-span-4 space-y-8">
               <Card className="bg-bg-surface border-border p-8 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-accent" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Submission Guidelines</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Must address an active Problem Hub entry.",
                      "Prototypes must be functional and testable.",
                      "Include clear documentation of industrial impact.",
                      "Data privacy compliance is mandatory."
                    ].map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span className="text-[11px] font-bold text-text-secondary">{rule}</span>
                      </li>
                    ))}
                  </ul>
               </Card>

               <Card className="bg-bg-raised border border-border p-8 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center gap-3">
                     <Zap className="w-5 h-5 text-amber-500" />
                     <h3 className="text-sm font-black uppercase tracking-widest">What is CEED?</h3>
                  </div>
                  <p className="text-[10px] font-bold text-text-muted leading-relaxed uppercase tracking-wider">
                    CEED stands for <span className="text-text-primary">CORE, EFFICIENCY, EXPANSION, DISRUPTION</span>. 
                    Every project is ranked across these vectors to determine marketplace visibility and funding priority.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-accent">
                    Learn about scoring →
                  </Button>
               </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-border mt-24 text-center">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">
           Secure Submission Node • BuildForX Collective • v4.2.0
         </p>
      </footer>
    </div>
  )
}

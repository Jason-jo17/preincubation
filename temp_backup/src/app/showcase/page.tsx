"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  Zap, 
  Eye, 
  ExternalLink, 
  Users, 
  Rocket, 
  ArrowUpRight,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Precision Seafood Classifier',
    shortDescription: 'AI-driven quality assessment for seafood export, reducing inspection time by 80%.',
    projectType: 'AGENTIC_WORKFLOW',
    ceedCategory: 'DISRUPTION',
    ceedScore: 9.2,
    sectorTags: ['seafood'],
    creator: { name: 'Adithya Shenoy' },
    image: 'https://images.unsplash.com/photo-1621274790572-7832bd33e1ba?q=80&w=800&auto=format&fit=crop',
    views: 1250,
    deployments: 12,
  },
  {
    id: '2',
    title: 'Cashew Yield Predictor',
    shortDescription: 'Satellite imagery processing for Cashew Processing units to forecast harvest volume.',
    projectType: 'ML_MODEL',
    ceedCategory: 'EFFICIENCY',
    ceedScore: 8.5,
    sectorTags: ['cashew'],
    creator: { name: 'Priya D\'Souza' },
    image: 'https://images.unsplash.com/photo-1598212175051-78921a8f90ad?q=80&w=800&auto=format&fit=crop',
    views: 890,
    deployments: 5,
  },
  {
    id: '3',
    title: 'Hospitality Concierge Bot',
    shortDescription: 'Automated guest inquiry handling for boutique hotels with seamless WhatsApp integration.',
    projectType: 'CHATBOT',
    ceedCategory: 'EXPANSION',
    ceedScore: 7.8,
    sectorTags: ['hospitality'],
    creator: { name: 'Rohan Shetty' },
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
    views: 2300,
    deployments: 42,
  },
]

export default function InnovationShowcase() {
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
               Sub-System: Showcase
             </div>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Innovation <span className="text-accent">Explore</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl font-medium tracking-tight">
            The marketplace for industrial-grade innovation. Discover student solutions ready for MSME deployment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/showcase/submit">
            <Button className="bg-accent text-bg-base rounded-xl uppercase text-[10px] font-black tracking-widest h-12 px-6">
              <Plus className="w-4 h-4 mr-2" /> Submit Project
            </Button>
          </Link>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-bg-surface border border-border p-2 rounded-[2rem] shadow-2xl">
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
            <Input 
              placeholder="SEARCH WORKFLOWS, TECH, OR SECTORS..." 
              className="pl-14 h-14 bg-transparent border-none focus-visible:ring-0 text-[10px] font-black uppercase tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="h-10 w-px bg-border hidden md:block" />
         <Button variant="ghost" className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-bg-raised">
            <Filter className="w-4 h-4 mr-2" /> Categories
         </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-bg-surface border-border overflow-hidden group hover:border-accent/50 transition-all duration-500 rounded-[2.5rem] shadow-xl hover:shadow-accent/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-bg-base font-black italic rounded-lg">CEED {project.ceedScore}</Badge>
                </div>
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {project.sectorTags.map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-accent">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-xs font-bold text-text-secondary leading-relaxed line-clamp-2">{project.shortDescription}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase">
                      <Eye className="w-3.5 h-3.5" /> {project.views}
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase">
                      <Rocket className="w-3.5 h-3.5" /> {project.deployments}
                    </div>
                  </div>
                  <Link href={`/showcase/project/${project.id}`}>
                    <Button variant="ghost" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-accent hover:bg-transparent">
                       View Project <ArrowUpRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Banner */}
      <div className="p-12 bg-accent text-bg-base rounded-[3rem] relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-125 transition-transform duration-700" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
               <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Ready to Disrupt?</h3>
               <p className="text-lg font-bold opacity-80 max-w-xl">
                 Your innovation could be the key to unlocking 10x growth for local MSMEs. Deploy your solution to the marketplace now.
               </p>
            </div>
            <Link href="/showcase/submit">
              <Button size="lg" className="bg-bg-base text-accent hover:bg-bg-raised h-16 px-12 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl">
                 Deploy Workflow
              </Button>
            </Link>
         </div>
      </div>
    </div>
  )
}

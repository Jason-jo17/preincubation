"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Eye, 
  Rocket, 
  ArrowUpRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  sector: string;
  score: number;
  createdAt: Date;
  creator: {
    name: string;
    avatar: string | null;
  };
}

export default function ProjectGrid({ initialProjects }: { initialProjects: Project[] }) {
  const [search, setSearch] = useState("")

  const filteredProjects = initialProjects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.sector.toLowerCase().includes(search.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-12">
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
            {filteredProjects.length} Projects Found
         </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="bg-bg-surface border-border overflow-hidden group hover:border-accent/50 transition-all duration-500 rounded-[2.5rem] shadow-xl hover:shadow-accent/5 h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-raised">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center text-accent/20 font-black text-6xl uppercase italic -rotate-12 select-none pointer-events-none">
                    {project.sector}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-bg-base font-black italic rounded-lg">CEED {project.score.toFixed(1)}</Badge>
                  </div>
                </div>
                
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[8px] font-black uppercase tracking-widest text-accent px-2 py-0.5 bg-accent/10 rounded-full">{project.sector}</span>
                    </div>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-xs font-bold text-text-secondary leading-relaxed line-clamp-3">{project.shortDescription}</p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase">
                        <Eye className="w-3.5 h-3.5" /> 0
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase">
                        <Rocket className="w-3.5 h-3.5" /> 0
                      </div>
                    </div>
                    <Link href={`/showcase/project/${project.slug}`}>
                      <Button variant="ghost" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-accent hover:bg-transparent">
                         View Project <ArrowUpRight className="ml-1 w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

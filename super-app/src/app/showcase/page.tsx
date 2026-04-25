import React from "react"
import { 
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProjects } from "@/app/actions/showcase"
import ProjectGrid from "@/components/showcase/ProjectGrid"

export default async function InnovationShowcase() {
  const projects = await getProjects()

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

      <ProjectGrid initialProjects={projects} />

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

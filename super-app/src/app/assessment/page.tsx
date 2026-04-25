"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  Plus, 
  ArrowRight, 
  History, 
  Target, 
  Zap, 
  ChevronRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { getAllReadinessAssessments } from "@/app/actions/assessment";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function AssessmentHubPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssessments() {
      const result = await getAllReadinessAssessments();
      if (result.success) {
        setAssessments(result.data || []);
      }
      setLoading(false);
    }
    loadAssessments();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-bg-surface border border-border p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Venture Diagnostics</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">
              MEASURE YOUR <br />
              <span className="text-accent">READY STATE.</span>
            </h1>
            
            <p className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed">
              Our 8-framework diagnostic evaluates Technical, Business, Customer, and Operational readiness 
              across 9 maturity levels. Benchmark your startup against global standards.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/assessment/new">
                <button className="h-14 px-8 rounded-2xl bg-accent text-bg-base font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-lg shadow-accent/20">
                  <Plus className="w-5 h-5" />
                  Start New Assessment
                </button>
              </Link>
              <Link href="/assessment/playbook">
                <button className="h-14 px-8 rounded-2xl bg-bg-raised border border-border text-text-primary font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-bg-overlay transition-colors">
                  <ClipboardCheck className="w-5 h-5" />
                  View Readiness Playbook
                </button>
              </Link>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-[400px] aspect-square rounded-3xl bg-bg-base border border-border p-8 relative flex items-center justify-center shadow-inner"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-muted),transparent_70%)]" />
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border border-accent/20">
                <Zap className="w-10 h-10 text-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">Current System Status</p>
                <p className="text-lg font-black tracking-tight">8 FRAMEWORKS ACTIVE</p>
              </div>
              <div className="flex justify-center gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Assessments */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-bg-surface border border-border">
              <History className="w-5 h-5 text-text-secondary" />
            </div>
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-widest text-text-muted">History</h2>
              <h3 className="text-xl font-black tracking-tight">RECENT DIAGNOSTICS</h3>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Locating Data Nodes...</p>
          </div>
        ) : assessments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                        {format(new Date(assessment.createdAt), "MMM dd, yyyy")}
                      </p>
                      <h4 className="font-black tracking-tight group-hover:text-accent transition-colors uppercase">
                        {assessment.stage || "In Progress"} Diagnostic
                      </h4>
                    </div>
                    <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-[9px] font-black text-accent uppercase">
                      v{assessments.length - index}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-bg-raised rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }} // Placeholder for actual calculation
                        className="h-full bg-accent"
                      />
                    </div>
                    <span className="text-[10px] font-black text-text-muted">65%</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      {['TRL', 'BRL', 'CRL'].map((tag) => (
                        <div key={tag} className="w-6 h-6 rounded-full bg-bg-base border-2 border-bg-surface flex items-center justify-center text-[8px] font-black">
                          {tag[0]}
                        </div>
                      ))}
                    </div>
                    <Link href={`/assessment/${assessment.id}`}>
                      <button className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Report
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-border p-24 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-bg-raised border border-border flex items-center justify-center mx-auto opacity-50">
              <ClipboardCheck className="w-8 h-8 text-text-muted" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black tracking-tight">NO DIAGNOSTIC HISTORY</h4>
              <p className="text-text-muted text-sm max-w-sm mx-auto">
                You haven't completed any readiness assessments yet. Start your first one to unlock your venture roadmap.
              </p>
            </div>
            <Link href="/assessment/new">
              <button className="h-12 px-8 rounded-xl bg-accent text-bg-base font-black uppercase tracking-widest text-[10px] inline-flex items-center gap-2 hover:scale-[1.02] transition-transform">
                <Plus className="w-4 h-4" />
                Initialize First Scan
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

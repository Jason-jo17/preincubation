"use client";

import React from "react";
import { 
  Zap, 
  Target, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  MessageSquare,
  Bot,
  Globe,
  ZapIcon,
  Layout,
  Rocket,
  Shield,
  Milestone
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TOOLS = [
  {
    title: "Empathy Map Canvas",
    description: "Map your customer's sensory experience to build deeper empathy.",
    icon: Bot,
    status: "Active",
    impact: "High",
    href: "/stakeholders/tools/empathy_map"
  },
  {
    title: "Stakeholder Mapping",
    description: "Visualize and analyze your entire stakeholder ecosystem.",
    icon: Target,
    status: "Active",
    impact: "Very High",
    href: "/stakeholders/tools/stakeholder_mapping"
  },
  {
    title: "Value Proposition Canvas",
    description: "Align your product features with true customer needs.",
    icon: Lightbulb,
    status: "Active",
    impact: "High",
    href: "/stakeholders/tools/vpc"
  },
  {
    title: "MTP & Ikigai Canvas",
    description: "Define your Massive Transformative Purpose and foundational vision.",
    icon: Zap,
    status: "Active",
    impact: "Medium",
    href: "/stakeholders/tools/mtp_canvas"
  },
  {
    title: "Fishbone Diagram",
    description: "Root cause analysis engine for complex problem decomposition.",
    icon: Activity,
    status: "Active",
    impact: "High",
    href: "/stakeholders/tools/fishbone_diagram"
  },
  {
    title: "Innovation Builder (SCAMPER/TRIZ)",
    description: "Systematic innovation generator using proven frameworks.",
    icon: Layers,
    status: "Beta",
    impact: "Very High",
    href: "/stakeholders/tools/innovation"
  },
  {
    title: "Venture Readiness Diagnostic",
    description: "Multi-framework diagnostic engine to assess startup maturity across P1-P9 pillars.",
    icon: ShieldCheck,
    status: "Priority",
    impact: "Strategic",
    href: "/stakeholders/tools/venture_readiness"
  },
  {
    title: "PESTLE Analysis",
    description: "Map macro-environmental factors: Political, Economic, Social, Technological, Legal, Environmental.",
    icon: Globe,
    status: "Active",
    impact: "Strategic",
    href: "/stakeholders/tools/pestle"
  },
  {
    title: "SWOT Matrix",
    description: "Evaluate Strengths, Weaknesses, Opportunities, and Threats to define strategic direction.",
    icon: Zap,
    status: "Active",
    impact: "High",
    href: "/stakeholders/tools/swot"
  },
  {
    title: "Business Model Canvas",
    description: "The classic 9-block framework to visualize, design and reinvent your business model.",
    icon: Layout,
    status: "Active",
    impact: "Very High",
    href: "/stakeholders/tools/bmc"
  },
  {
    title: "Lean Canvas",
    description: "A fast, concise, and portable version of the business model canvas for early startups.",
    icon: Rocket,
    status: "Active",
    impact: "Very High",
    href: "/stakeholders/tools/lean_canvas"
  },
  {
    title: "Porter's Five Forces",
    description: "Analyze the competitive environment and industry structure for long-term profitability.",
    icon: Shield,
    status: "Active",
    impact: "Strategic",
    href: "/stakeholders/tools/porters"
  },
  {
    title: "Theory of Change",
    description: "Map the logical sequence of inputs, activities, outputs, and outcomes to achieve long-term impact.",
    icon: Milestone,
    status: "Active",
    impact: "Impact",
    href: "/stakeholders/tools/theory_of_change"
  }
];

export default function StakeholderToolsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accent">
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Intelligence Toolset</span>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">
          Recommendation <span className="text-accent">Engines</span>
        </h1>
        <p className="text-text-secondary max-w-2xl font-medium">
          Deploy specialized AI tools to generate actionable insights and strategic recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool, idx) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-8 rounded-3xl hover:border-accent/50 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <tool.icon className="w-16 h-16 -mr-8 -mt-8" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-bg-base rounded-2xl border border-border group-hover:border-accent/30 transition-colors">
                  <tool.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="px-2 py-1 bg-bg-base border border-border rounded text-[7px] font-black uppercase tracking-widest text-text-muted">
                  {tool.status}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black italic tracking-tight uppercase group-hover:text-accent transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs font-medium text-text-secondary leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Impact: {tool.impact}</span>
                </div>
                <Link href={tool.href}>
                  <Button variant="ghost" size="sm" className="h-10 px-4 group-hover:translate-x-1 transition-all text-accent font-black uppercase italic text-[10px] tracking-widest">
                    Launch <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

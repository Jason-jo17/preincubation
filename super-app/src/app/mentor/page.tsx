import React from "react";
import { 
  UserCircle, 
  Users, 
  GitBranch, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Target,
  MessageSquare,
  Share2,
  FileCheck, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Clock,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { getAllMentees } from "@/app/actions/assessment";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as motion from "framer-motion/client";

export default async function MentorDashboard() {
  const menteesResponse = await getAllMentees();
  const mentees = menteesResponse.success ? (menteesResponse.data || []) : [];
  
  // For now, "assigned ventures" is just the mentees we fetched
  const assignedCount = mentees.length;
  
  // Pending reviews: Completed but not validated assessments
  // (Assuming there's a status check or similar, for now just a mockup based on latest assessments)
  const pendingReviewsCount = mentees.filter(m => m.latestReadiness && !m.latestReadiness.mentorScores).length;

  const quickStats = [
    {
      label: "Assigned Ventures",
      value: assignedCount,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending Reviews",
      value: pendingReviewsCount,
      icon: FileCheck,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Upcoming Sessions",
      value: 0,
      icon: Calendar,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Recent Activity",
      value: "Active",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Mentor <span className="text-accent">HQ</span>
        </h1>
        <p className="text-text-muted text-sm max-w-2xl">
          Welcome back to your operational command center. Manage assigned ventures, validate readiness assessments, and track cohort progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-6 bg-bg-surface border-border/50 hover:border-accent/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={stat.color} size={20} />
                </div>
                <div className="text-2xl font-black">{stat.value}</div>
              </div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted px-2">
            Tactical Actions
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { title: "Review Assessments", href: "/mentor/review", desc: "Validate pending readiness diagnostics" },
              { title: "View Mentees", href: "/mentor/mentees", desc: "Access venture portfolios and roadmaps" },
              { title: "Cohort Tracking", href: "/mentor/cohorts", desc: "Monitor program-wide progress" },
            ].map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="p-4 bg-bg-surface border-border/50 hover:bg-bg-base hover:border-accent group transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-sm uppercase tracking-tight group-hover:text-accent transition-colors">
                          {action.title}
                        </div>
                        <div className="text-[10px] text-text-muted mt-1">
                          {action.desc}
                        </div>
                      </div>
                      <ArrowRight className="text-text-muted group-hover:text-accent transition-all group-hover:translate-x-1" size={16} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity Mockup */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted px-2">
            Venture Intelligence Feed
          </h2>
          <Card className="bg-bg-surface border-border/50 overflow-hidden">
            <div className="divide-y divide-border/50">
              {mentees.slice(0, 5).map((mentee, i) => (
                <div key={mentee.id} className="p-4 hover:bg-bg-base/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-black text-accent uppercase text-xs">
                      {mentee.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{mentee.name}</div>
                      <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase font-bold tracking-widest mt-0.5">
                        <Clock size={10} />
                        {mentee.latestReadiness ? "Updated Assessment" : "Created Profile"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {mentee.latestReadiness && (
                      <Badge className="bg-accent/5 text-accent border-accent/20 text-[9px] uppercase tracking-tighter px-2">
                        {mentee.latestReadiness.stage || "IDEATION"}
                      </Badge>
                    )}
                    <ChevronRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>
              ))}
              {mentees.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 bg-border/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-text-muted" size={20} />
                  </div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest">No recent activity detected</div>
                </div>
              )}
            </div>
            {mentees.length > 5 && (
              <Link href="/mentor/mentees" className="block p-3 text-center border-t border-border/50 hover:bg-bg-base transition-colors">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">View All Active Mentorships</span>
              </Link>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

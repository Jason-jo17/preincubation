"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Activity,
  ArrowUpRight,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "framer-motion";

const SECTOR_DATA = [
  { name: "Manufacturing", value: 45, color: "#786BF9" },
  { name: "AgriTech", value: 30, color: "#1EC075" },
  { name: "Fintech", value: 25, color: "#FECE0A" },
  { name: "Clean Energy", value: 20, color: "#3B82F6" },
  { name: "EdTech", value: 15, color: "#F43F5E" },
];

const PROBLEM_SEVERITY = [
  { severity: "Critical", count: 12 },
  { severity: "High", count: 28 },
  { severity: "Medium", count: 45 },
  { severity: "Low", count: 18 },
];

const SPRINT_HISTORY = [
  { week: "Jan 01", count: 4 },
  { week: "Jan 08", count: 7 },
  { week: "Jan 15", count: 5 },
  { week: "Jan 22", count: 9 },
  { week: "Jan 29", count: 12 },
  { week: "Feb 05", count: 8 },
  { week: "Feb 12", count: 15 },
  { week: "Feb 19", count: 14 },
];

const STAT_CARDS = [
  { label: "Total Stakeholders", value: "1,284", change: "+12%", icon: Users },
  { label: "Recent Interactions", value: "342", change: "+5%", icon: Activity },
  { label: "Active Sprints", value: "86", change: "+24%", icon: Zap },
  { label: "Avg CRL Score", value: "7.4", change: "+0.8", icon: Target },
];

export default function StakeholderAnalyticsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accent">
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Intelligence</span>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">
          Ecosystem <span className="text-accent">Analytics</span>
        </h1>
        <p className="text-text-secondary max-w-2xl font-medium">
          Strategic oversight across stakeholders, problem statements, and program progression.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-surface border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-accent/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className="w-12 h-12" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-black italic">{stat.value}</h3>
                <span className="text-[10px] font-bold text-success flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart - Sprint History */}
        <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" /> Sprint Velocity
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SPRINT_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--color-border), 0.5)" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--color-bg-surface)", 
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="var(--color-accent)" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: "var(--color-accent)", strokeWidth: 2, stroke: "var(--color-bg-surface)" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Distribution */}
        <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-accent" /> Sector Penetration
            </h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-[300px]">
            <div className="w-full h-full max-w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SECTOR_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {SECTOR_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {SECTOR_DATA.map((sector) => (
                <div key={sector.name} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sector.color }} />
                  <div className="flex-1 text-[10px] font-black uppercase tracking-widest min-w-[120px]">{sector.name}</div>
                  <div className="text-[10px] font-bold text-text-muted">{sector.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Severity */}
        <div className="bg-bg-surface border border-border p-6 rounded-2xl space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" /> Problem Intensity Matrix
            </h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROBLEM_SEVERITY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--color-border), 0.5)" />
                <XAxis 
                  dataKey="severity" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: "rgba(var(--color-accent), 0.05)" }}
                  contentStyle={{ 
                    backgroundColor: "var(--color-bg-surface)", 
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: 700
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-accent)" 
                  radius={[8, 8, 0, 0]} 
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

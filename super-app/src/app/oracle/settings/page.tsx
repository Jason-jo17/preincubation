'use client';

import React, { useState } from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Save, 
  Lock, 
  UserPlus, 
  Key,
  Terminal,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General System", icon: Globe },
    { id: "security", label: "Security & Auth", icon: Shield },
    { id: "notifications", label: "Alert Matrix", icon: Bell },
    { id: "database", label: "Data Engine", icon: Database },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Configuration</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            System <span className="text-accent">Settings</span>
          </h1>
          <p className="text-text-secondary max-w-2xl font-medium">
            Global administrative control center for the InUnity ecosystem infrastructure.
          </p>
        </div>
        <Button 
          className="bg-accent text-white font-black uppercase italic rounded-none px-8 py-6 h-auto shadow-lg shadow-accent/20 flex items-center gap-2"
          onClick={() => toast.success("Configuration preserved")}
        >
          <Save className="w-5 h-5" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-accent text-white shadow-lg shadow-accent/20" 
                  : "bg-bg-surface text-text-muted hover:bg-bg-base border border-border"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}

          <div className="mt-8 p-6 bg-text-primary rounded-2xl text-bg-base space-y-4">
            <Cpu className="w-8 h-8 opacity-20" />
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50">System Load</p>
              <p className="text-lg font-black italic">OPTIMAL</p>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-1/3" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-bg-surface border border-border rounded-3xl p-8 space-y-8 shadow-sm">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Globe className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Global Parameters</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Platform Name</label>
                    <input 
                      defaultValue="InUnity Super App"
                      className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Environment Node</label>
                    <input 
                      disabled
                      defaultValue="Production-Edge-01"
                      className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Support Endpoint</label>
                  <input 
                    defaultValue="ops@inunity.org"
                    className="w-full bg-bg-base border border-border rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <Terminal className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Feature Flags</h3>
                </div>
                
                {[
                  { id: 'ai-diag', label: 'AI Diagnostic Engine', desc: 'Enable LLM-based diagnostic analysis', enabled: true },
                  { id: 'real-time', label: 'Real-time Telemetry', desc: 'Socket-based UI synchronization', enabled: false },
                  { id: 'guest-mode', label: 'Public Enrollment', desc: 'Allow guest user self-registration', enabled: true },
                ].map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 bg-bg-base rounded-2xl border border-border">
                    <div className="space-y-1">
                      <p className="text-sm font-black uppercase tracking-tight">{feature.label}</p>
                      <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{feature.desc}</p>
                    </div>
                    <div className={cn(
                      "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors",
                      feature.enabled ? "bg-accent" : "bg-border"
                    )}>
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full transition-transform",
                        feature.enabled ? "translate-x-6" : "translate-x-0"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-12">
              <div className="p-6 bg-bg-base rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-border">
                <Lock className="w-10 h-10 text-text-muted" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Security Protocols</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Authentication and access control layers are currently managed via Clerk/NextAuth.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Button variant="outline" className="font-black uppercase italic text-[10px] tracking-widest rounded-xl border-2 h-auto py-4">
                  <Key className="w-4 h-4 mr-2" />
                  Rotate API Keys
                </Button>
                <Button variant="outline" className="font-black uppercase italic text-[10px] tracking-widest rounded-xl border-2 h-auto py-4">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Admin
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react'
import { 
  Shield, Globe, Database, Cpu, 
  Activity, Users, Zap, TrendingUp, 
  ChevronRight, AlertCircle, CheckCircle2 
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const systemStats = [
    { label: 'Global Users', value: '1,284', icon: Users, color: 'text-blue-500' },
    { label: 'Active Ventures', value: '432', icon: Zap, color: 'text-yellow-500' },
    { label: 'Tool Submissions', value: '12.4k', icon: Database, color: 'text-purple-500' },
    { label: 'Avg System Latency', value: '42ms', icon: Cpu, color: 'text-green-500' },
  ]

  const healthChecks = [
    { name: 'Identity Provider (NextAuth)', status: 'Operational', color: 'text-green-500' },
    { name: 'Relational Database (PostgreSQL)', status: 'Operational', color: 'text-green-500' },
    { name: 'AI Generation Service', status: 'Slow Responses', color: 'text-yellow-500' },
    { name: 'Blob Storage', status: 'Operational', color: 'text-green-500' },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">System <span className="text-accent">Oracle</span></h1>
            <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Global Infrastructure Oversight & Intelligence</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2 border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-bg-surface transition-colors">
             Audit Logs
           </button>
           <button className="px-6 py-2 bg-text-base text-bg-base rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
             System Maintenance
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, i) => (
          <div key={i} className="bg-bg-surface border border-border p-6 rounded-[32px] hover:border-accent/30 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-xl bg-white shadow-sm border border-border ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <h3 className="text-[10px] text-text-muted font-black uppercase tracking-widest">{stat.label}</h3>
            </div>
            <p className="text-3xl font-black italic uppercase tracking-tighter">{stat.value}</p>
            <div className="mt-4 w-full h-1 bg-black/5 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-accent" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Analytics */}
        <div className="lg:col-span-2 bg-bg-surface border border-border rounded-[32px] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black uppercase italic tracking-tighter">Growth <span className="text-accent">Vector</span></h2>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer">
               <option>Last 30 Days</option>
               <option>Last Quarter</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
            {[45, 67, 43, 89, 56, 78, 92, 65, 45, 87, 54, 76].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                 <div 
                   className="w-full bg-accent/20 border border-accent/30 rounded-t-lg group-hover:bg-accent transition-all duration-500" 
                   style={{ height: `${h}%` }}
                 />
                 <span className="text-[8px] font-black opacity-20 uppercase tracking-tighter">W{i+1}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-border">
             <div className="flex gap-8">
                <div>
                   <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Retention Rate</p>
                   <p className="text-xl font-black italic uppercase">84.2%</p>
                </div>
                <div>
                   <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Active/Total</p>
                   <p className="text-xl font-black italic uppercase">0.68</p>
                </div>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-1">
               Full Analytics <ChevronRight size={12} />
             </button>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-4">
           <h2 className="text-[11px] font-black uppercase tracking-widest px-2">System Pulse</h2>
           <div className="bg-bg-surface border border-border rounded-[32px] p-6 space-y-4">
              {healthChecks.map((check, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      {check.status === 'Operational' ? (
                        <CheckCircle2 className="text-green-500" size={16} />
                      ) : (
                        <AlertCircle className="text-yellow-500 animate-pulse" size={16} />
                      )}
                      <span className="text-[10px] font-black uppercase tracking-tight text-text-base/80">{check.name}</span>
                   </div>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${check.color}`}>
                     {check.status}
                   </span>
                </div>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase mb-2">
                    <span>Server Load</span>
                    <span className="text-accent">14%</span>
                 </div>
                 <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                    <div className="w-[14%] h-full bg-accent" />
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-bg-surface border border-border rounded-2xl flex flex-col items-center gap-2 hover:border-accent/30 transition-all">
                 <Globe size={18} className="text-text-muted" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Flush Cache</span>
              </button>
              <button className="p-4 bg-bg-surface border border-border rounded-2xl flex flex-col items-center gap-2 hover:border-accent/30 transition-all">
                 <Activity size={18} className="text-text-muted" />
                 <span className="text-[9px] font-black uppercase tracking-widest">Export DB</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

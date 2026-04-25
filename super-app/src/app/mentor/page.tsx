import React from 'react'
import { 
  Users, Rocket, BarChart3, Calendar, 
  ArrowUpRight, TrendingUp, Clock, ChevronRight 
} from 'lucide-react'
import Link from 'next/link'

export default function MentorDashboard() {
  const stats = [
    { label: 'Active Cohorts', value: '12', icon: Users, color: 'text-blue-500', trend: '+2 this month' },
    { label: 'Total Mentees', value: '156', icon: Rocket, color: 'text-purple-500', trend: '98% active' },
    { label: 'Avg Readiness', value: '3.8', icon: BarChart3, color: 'text-green-500', trend: '+12% vs LY' },
    { label: 'Sessions This Week', value: '24', icon: Calendar, color: 'text-orange-500', trend: '4 pending' },
  ]

  const recentMentees = [
    { name: 'Quantum Leap Tech', founder: 'Sarah Chen', stage: 'Problem-Solution Fit', score: 4.2, lastActive: '2h ago' },
    { name: 'EcoFlow Systems', founder: 'Marcus Thorne', stage: 'Concept Validation', score: 3.1, lastActive: '5h ago' },
    { name: 'Zenith Health', founder: 'Elena Rodriguez', stage: 'Product-Market Fit', score: 4.8, lastActive: '1d ago' },
  ]

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mentor <span className="text-accent">Nexus</span></h1>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Portfolio Oversight & Venture Growth Management</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2 bg-bg-surface border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-border transition-colors">
             Generate Report
           </button>
           <button className="px-6 py-2 bg-accent text-bg-base rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
             New Cohort
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-bg-surface border border-border p-6 rounded-[32px] group hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white shadow-sm border border-border ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-[10px] font-black uppercase text-green-500 flex items-center gap-1">
                <TrendingUp size={12} />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-xs text-text-muted font-bold uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-black italic uppercase tracking-tighter mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Mentees Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[11px] font-black uppercase tracking-widest">Priority Mentees</h2>
            <Link href="/mentor/mentees" className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="bg-bg-surface border border-border rounded-[32px] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-black/[0.02] border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Venture / Founder</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Current Stage</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Maturity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentMentees.map((mentee, i) => (
                  <tr key={i} className="group hover:bg-black/[0.01] transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tight">{mentee.name}</span>
                        <span className="text-[10px] text-text-muted font-bold">{mentee.founder}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest">
                        {mentee.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-black/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent" 
                            style={{ width: `${(mentee.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black italic">{mentee.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold uppercase tracking-widest">
                        <Clock size={12} />
                        {mentee.lastActive}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-black uppercase tracking-widest px-2">Upcoming Events</h2>
          <div className="space-y-3">
             {[
               { title: 'Cohort 2024 Demo Day', time: 'Tomorrow, 10:00 AM', type: 'Major' },
               { title: '1:1 Sarah Chen (Quantum)', time: 'Today, 2:30 PM', type: 'Regular' },
               { title: 'Peer Review Session', time: 'Wed, 4:00 PM', type: 'Regular' }
             ].map((event, i) => (
               <div key={i} className="bg-bg-surface border border-border p-4 rounded-2xl flex items-start gap-4 group hover:border-accent/30 transition-all cursor-pointer">
                 <div className="mt-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      event.type === 'Major' ? "bg-accent animate-pulse" : "bg-text-muted/30"
                    )} />
                 </div>
                 <div>
                   <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-accent transition-colors">{event.title}</h4>
                   <p className="text-[10px] text-text-muted font-bold uppercase mt-1">{event.time}</p>
                 </div>
               </div>
             ))}
          </div>
          <button className="w-full py-4 rounded-2xl border-2 border-dashed border-border text-text-muted hover:border-accent/40 hover:text-accent transition-all text-[10px] font-black uppercase tracking-widest">
            Sync Calendar
          </button>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

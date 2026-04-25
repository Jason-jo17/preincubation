import React from 'react'
import { getAllUsers } from '@/app/actions/users'
import { 
  Users, Shield, Search, MoreHorizontal, 
  Mail, Calendar, BadgeCheck, Trash2, 
  UserPlus, Filter, Download
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function AdminUsersPage() {
  const result = await getAllUsers()
  const users = result.success ? result.data : []

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">User <span className="text-accent">Identities</span></h1>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Global directory & Permission management</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2 bg-bg-surface border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-border transition-colors flex items-center gap-2">
             <Download size={12} />
             Export CSV
           </button>
           <button className="px-6 py-2 bg-accent text-bg-base rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
             <UserPlus size={12} />
             Add User
           </button>
        </div>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Identities', value: users.length, sub: 'All registered nodes' },
           { label: 'Privileged Nodes', value: users.filter((u: any) => u.role !== 'STUDENT').length, sub: 'Admin / Mentor / MSME' },
           { label: 'New This Week', value: users.filter((u: any) => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, sub: '+12% growth' },
         ].map((stat, i) => (
           <div key={i} className="bg-bg-surface border border-border p-6 rounded-[32px]">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{stat.label}</h4>
             <p className="text-3xl font-black italic uppercase tracking-tighter mt-1">{stat.value}</p>
             <p className="text-[9px] font-bold text-accent uppercase tracking-widest mt-2">{stat.sub}</p>
           </div>
         ))}
      </div>

      {/* Main Table */}
      <div className="bg-bg-surface border border-border rounded-[40px] overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-black/[0.01]">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
             <input 
               type="text" 
               placeholder="Search by name, email, role..." 
               className="pl-9 pr-4 py-2 bg-bg-base border border-border rounded-full text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-accent/50 w-96"
             />
           </div>
           <div className="flex gap-2">
              <button className="p-2 border border-border rounded-lg hover:bg-bg-raised transition-colors">
                <Filter size={14} className="text-text-muted" />
              </button>
           </div>
        </div>
        
        <table className="w-full text-left border-collapse">
           <thead>
             <tr className="bg-black/[0.01]">
               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Identity</th>
               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Role Configuration</th>
               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted">Joined Node</th>
               <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-border">
             {users.map((u: any) => (
               <tr key={u.id} className="group hover:bg-black/[0.005] transition-colors">
                 <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                     <div className="size-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-black text-accent text-xs">
                       {u.name.charAt(0)}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                          {u.name}
                          {u.role === 'ADMIN' && <Shield size={12} className="text-accent" />}
                        </span>
                        <span className="text-[10px] text-text-muted font-bold flex items-center gap-1">
                          <Mail size={10} />
                          {u.email}
                        </span>
                     </div>
                   </div>
                 </td>
                 <td className="px-8 py-6">
                   <div className={cn(
                     "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                     u.role === 'ADMIN' ? "bg-accent text-bg-base border-accent" : 
                     u.role === 'MENTOR' ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                     u.role === 'STUDENT' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                     "bg-text-muted/10 text-text-muted border-border"
                   )}>
                     {u.role}
                   </div>
                 </td>
                 <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-tight flex items-center gap-1 text-text-muted">
                        <Calendar size={10} />
                        {new Date(u.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                 </td>
                 <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-bg-raised rounded-lg text-text-muted transition-colors">
                         <BadgeCheck size={16} />
                       </button>
                       <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-text-muted transition-colors">
                         <Trash2 size={16} />
                       </button>
                       <button className="p-2 hover:bg-bg-raised rounded-lg text-text-muted transition-colors">
                         <MoreHorizontal size={16} />
                       </button>
                    </div>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  )
}

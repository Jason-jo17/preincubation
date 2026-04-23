'use client';

import { motion } from 'framer-motion';
import { SECTORS } from '@/constants/sectors';

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter italic">Identity Management</h1>
           <p className="text-slate-500 font-medium max-w-lg">Manage your regional innovation profile and terminal configurations.</p>
        </div>

        <button className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/10">
           SAVE PROTOCOL ⚡
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Profile Information */}
         <div className="lg:col-span-12 space-y-12">
            <div className="p-10 bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[3rem] space-y-8 shadow-xl shadow-slate-200/50">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Core Profile</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Public Alias</label>
                     <input 
                        type="text" 
                        defaultValue="Adithya Shenoy"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-lg font-bold text-slate-900 focus:outline-none focus:border-amber-500/30 transition-all shadow-inner"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Archetype</label>
                     <select 
                        defaultValue="INNOVATOR"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-lg font-bold text-slate-900 focus:outline-none focus:border-amber-500/30 appearance-none shadow-inner"
                     >
                        <option value="INNOVATOR">PRIME INNOVATOR</option>
                        <option value="MSME">INDUSTRIAL LEAD</option>
                     </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mission Bio</label>
                     <textarea 
                        defaultValue="Building the next generation of agentic workflows for the coastal industry hub."
                        rows={4}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-sm font-medium text-slate-600 focus:outline-none focus:border-amber-500/30 transition-all resize-none shadow-inner"
                     />
                  </div>
               </div>
            </div>

            <div className="p-10 bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[3rem] space-y-8 shadow-xl shadow-slate-200/50">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Industrial Alignment</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {SECTORS.map((sector) => (
                    <button
                      key={sector.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                        ['seafood', 'cashew', 'agriculture'].includes(sector.id)
                          ? 'bg-amber-500 text-white border-amber-500 scale-[1.05] shadow-lg shadow-amber-500/20 px-6' 
                          : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{sector.icon}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-center">{sector.name}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[3rem] space-y-6">
               <h3 className="text-[10px] font-black text-red-500 uppercase tracking-widest px-2">Danger Zone</h3>
               <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-1">
                     <h4 className="text-lg font-black text-slate-900">Deactivate Protocol</h4>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">This will erase your innovation node and all active outreach threads.</p>
                  </div>
                  <button className="px-10 py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                    DEACTIVATE NODE
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

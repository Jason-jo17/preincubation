'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'discover', label: 'Discover Hub', icon: '🔍', href: '/discover' },
    { id: 'sectors', label: 'Sector Analysis', icon: '📊', href: '/sectors' },
    { id: 'projects', label: 'My Innovation', icon: '✨', href: '/projects' },
    { id: 'matches', label: 'Company Fits', icon: '🎯', href: '/matches' },
    { id: 'inquiries', label: 'Outreach', icon: '📧', href: '/inquiries' },
    { id: 'settings', label: 'Profile', icon: '⚙️', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-white/70 backdrop-blur-3xl border-r border-slate-200 p-8 flex flex-col sticky top-0 h-screen overflow-hidden group/sidebar shadow-xl shadow-slate-200/50">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover/sidebar:bg-amber-500/10 transition-all duration-700" />
        
        {/* Logo Area */}
        <div className="relative z-10 mb-16 px-2">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-[0_10px_20px_rgba(245,158,11,0.2)]">V</div>
              <div className="flex flex-col">
                 <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">InnoVault</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Student Marketplace</span>
              </div>
           </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 space-y-2">
           {navItems.map((item) => {
             const isActive = pathname === item.href;
             return (
               <Link
                 key={item.id}
                 href={item.href}
                 className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                   isActive 
                    ? 'bg-amber-500 text-white font-black shadow-lg shadow-amber-500/20 scale-[1.02]' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                 }`}
               >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'grayscale-0' : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                     {item.icon}
                  </span>
                  <span className="text-xs uppercase font-black tracking-widest pt-0.5">{item.label}</span>
               </Link>
             );
           })}
        </nav>

        {/* User Footer */}
        <div className="relative z-10 mt-auto pt-8 border-t border-slate-100">
           <div className="flex items-center gap-4 group/user cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 shadow-sm group-hover/user:bg-white transition-colors uppercase">
                AS
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-black text-slate-800 leading-none">Adithya Shenoy</span>
                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1">Prime Innovator</span>
              </div>
              <div className="ml-auto text-slate-300 font-black">⋮</div>
           </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto relative p-8 md:p-12">
         {/* Top Header */}
         <div className="fixed top-0 left-80 right-0 h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 flex items-center justify-between px-12 pointer-events-none md:pointer-events-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
            <div className="relative z-10 hidden md:block">
               <h2 className="text-xs uppercase font-black text-slate-500 tracking-[0.3em]">Operational Node: {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</h2>
            </div>

            
            <div className="relative z-10 flex items-center gap-8">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">BuildForX Mainnet</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-xs">⚡</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">750 Gas Credits</span>
                  </div>

               </div>
               
               <Link href="/submit" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                 New Project
               </Link>

            </div>
         </div>

         {/* Content Padding for Header */}
         <div className="pt-24 min-h-full">
            {children}
         </div>
      </main>
    </div>
  );
}

import React from 'react'
import { User, Shield, Bell, Database, Globe, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Settings | InUnity',
  description: 'Manage your profile and venture configurations.',
}

export default function SettingsPage() {
  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User, desc: 'Manage your personal identity and founder bio.' },
    { id: 'security', label: 'Security & Auth', icon: Shield, desc: 'Passwords, 2FA, and session management.' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Configure how you receive mentor updates.' },
    { id: 'data', label: 'Venture Data', icon: Database, desc: 'Export your data or manage model iterations.' },
    { id: 'localization', label: 'Localization', icon: Globe, desc: 'Timezone, language, and regional contexts.' },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-5xl font-black tracking-tighter text-text">System <span className="text-accent">Settings</span></h1>
        <p className="text-text-muted text-lg">Configure your InUnity experience and venture workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {sections.map(section => (
           <div key={section.id} className="bg-bg-surface border border-border p-6 rounded-[32px] flex items-center justify-between group hover:border-accent/40 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-black/5">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-bg-base border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-bg-base transition-all">
                    <section.icon size={28} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-text">{section.label}</h3>
                    <p className="text-sm text-text-muted font-medium">{section.desc}</p>
                 </div>
              </div>
              <div className="p-3 rounded-full bg-bg-base border border-border opacity-30 group-hover:opacity-100 group-hover:text-accent transition-all">
                 <ChevronRight size={20} />
              </div>
           </div>
         ))}
      </div>

      <div className="pt-12 border-t border-border/50">
         <div className="flex justify-between items-center bg-red-500/5 border border-red-500/10 p-8 rounded-[40px]">
            <div>
               <h4 className="text-xl font-black uppercase text-red-500 tracking-tighter">Danger Zone</h4>
               <p className="text-sm text-red-500/60 font-medium mt-1">Irreversible actions for your venture data.</p>
            </div>
            <button className="px-8 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
               Archive Venture
            </button>
         </div>
      </div>
    </div>
  )
}

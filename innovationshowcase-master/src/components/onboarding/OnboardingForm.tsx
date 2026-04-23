'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTORS } from '@/constants/sectors';
import { useRouter } from 'next/navigation';

const STEPS = [
  { id: 'role', title: 'Your Identity', icon: '👤' },
  { id: 'sectors', title: 'Sector Alignment', icon: '🎯' },
  { id: 'profile', title: 'Profile Synthesis', icon: '📝' },
  { id: 'welcome', title: 'Activation', icon: '✨' },
];

export function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    selectedSectors: [] as string[],
    bio: '',
    name: '',
  });
  const router = useRouter();

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const toggleSector = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSectors: prev.selectedSectors.includes(id)
        ? prev.selectedSectors.filter((s) => s !== id)
        : [...prev.selectedSectors, id],
    }));
  };

  const handleComplete = () => {
    // Mock completion
    router.push('/discover');
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="flex items-center justify-between mb-16 px-4">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center group">
            <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-2xl transition-all ${
                i === step ? 'bg-amber-500 text-white scale-110 shadow-amber-500/20' : i < step ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 border border-slate-200 text-slate-400'
              }`}>
                {i < step ? '✓' : s.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${i <= step ? 'text-slate-900' : 'text-slate-400'}`}>{s.title}</span>

            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 h-px mx-4 transition-all duration-1000 ${i < step ? 'bg-emerald-500/30' : 'bg-slate-200'}`} />
            )}

          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: 'circOut' }}
          className="bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

          
          {/* Step 1: Role Selection */}
          {step === 0 && (
            <div className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Define Your Archetype</h2>
                <p className="text-slate-500 font-medium">How will you interface with the Dakshina Kannada innovation hub?</p>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => { setFormData({...formData, role: 'INNOVATOR'}); nextStep(); }}
                  className={`p-8 rounded-[2rem] border-2 transition-all group text-left relative overflow-hidden ${
                    formData.role === 'INNOVATOR' ? 'bg-amber-50 border-amber-500/30' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="text-4xl mb-6">🚀</div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Prime Innovator</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">Student, developer, or dreamer building workflows to disrupt local industry.</p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500/10 rounded-tl-[4rem] group-hover:scale-110 transition-transform" />
                </button>


                <button 
                  onClick={() => { setFormData({...formData, role: 'MSME'}); nextStep(); }}
                  className={`p-8 rounded-[2rem] border-2 transition-all group text-left relative overflow-hidden ${
                    formData.role === 'MSME' ? 'bg-emerald-50 border-emerald-500/30' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="text-4xl mb-6">🏭</div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Industrial Lead</h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">Business owner or MSME looking to adopt agentic intelligence & scale operations.</p>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-tl-[4rem] group-hover:scale-110 transition-transform" />
                </button>

              </div>
            </div>
          )}

          {/* Step 2: Sector Alignment */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Sector Alignment</h2>
                <p className="text-slate-500 font-medium">Which industrial nodes do you intend to impact or operate within?</p>
              </div>


              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => toggleSector(sector.id)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${
                      formData.selectedSectors.includes(sector.id) 
                        ? 'bg-amber-500 text-white border-amber-500 scale-[1.05] shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    <span className="text-2xl">{sector.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-center">{sector.name}</span>
                  </button>
                ))}

              </div>

              <div className="pt-12 flex justify-between">
                 <button onClick={prevStep} className="text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">← Back</button>
                 <button 
                  disabled={formData.selectedSectors.length === 0}
                  onClick={nextStep} 
                  className={`px-10 py-4 rounded-2xl font-black text-xs tracking-widest transition-all ${
                    formData.selectedSectors.length > 0 ? 'bg-slate-900 text-white shadow-xl hover:bg-black' : 'bg-slate-100 text-slate-400 cursor-not-allowed'

                  }`}
                 >
                   CONTINUE SYNTHESIS →
                 </button>
              </div>
            </div>
          )}

          {/* Step 3: Profile Synthesis */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Identity Protocol</h2>
                <p className="text-slate-500 font-medium">Establish your terminal identity for the marketplace.</p>
              </div>


              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Display Name / Alias</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Matrix Innovator"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-xl font-bold text-slate-900 focus:outline-none focus:border-amber-500/30 transition-all placeholder:text-slate-300"
                  />

                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mission Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    placeholder="Tell the hub about your mission..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 text-sm font-medium text-slate-600 focus:outline-none focus:border-amber-500/30 transition-all resize-none placeholder:text-slate-300"
                  />

                </div>
              </div>

              <div className="pt-12 flex justify-between">
                 <button onClick={prevStep} className="text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">← Back</button>
                 <button 
                  disabled={!formData.name}
                  onClick={nextStep} 
                  className={`px-12 py-5 rounded-2xl font-black text-xs tracking-widest transition-all ${
                    formData.name ? 'bg-amber-500 text-white shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'

                  }`}
                 >
                   FINALIZE ACTIVATION ⚡
                 </button>
              </div>
            </div>
          )}

          {/* Step 4: Welcome */}
          {step === 3 && (
            <div className="text-center py-12 space-y-12">
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1, type: 'spring' }}
                 className="relative inline-block"
               >
                  <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-20 animate-pulse" />
                  <div className="w-32 h-32 bg-amber-500 text-white flex items-center justify-center text-5xl rounded-[2rem] font-black relative z-10 shadow-2xl">

                    V
                  </div>
               </motion.div>

               <div className="space-y-4">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Welcome to the Hub, {formData.name || 'Innovator'}.</h2>

                  <p className="text-slate-500 font-medium max-w-md mx-auto">Your identity protocol has been registered. You are now active on the BuildForX Dakshina Kannada node.</p>
               </div>

               <div className="pt-8">
                  <button 
                    onClick={handleComplete}
                    className="px-16 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm tracking-[0.3em] hover:scale-105 transition-all shadow-2xl active:scale-95"

                  >
                    ENTER TERMINAL →
                  </button>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

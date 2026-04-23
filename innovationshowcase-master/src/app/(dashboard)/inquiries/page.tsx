'use client';

import { motion } from 'framer-motion';

const INQUIRIES = [
  {
    id: 'i1',
    company: 'Coastal Seafoods Pvt Ltd',
    subject: 'Collaboration on Shrimp Classifier',
    date: '2 hours ago',
    status: 'URGENT',
    preview: 'We are very interested in testing your classifier at our plant in...',
  },
  {
    id: 'i2',
    company: 'Oceanic Logistics Hub',
    subject: 'Request for Quote: Logistics v1',
    date: 'Yesterday',
    status: 'NEW',
    preview: 'Could you provide a detailed technical blueprint for the gateway...',
  },
  {
    id: 'i3',
    company: 'Vitla Cashew Processors',
    subject: 'Question on Agri-Moisture v2 Deployment',
    date: '3 days ago',
    status: 'WAITING',
    preview: 'How many nodes will I need for a 5-acre drying yard? We currently...',
  },
];

export default function InquiriesPage() {
  return (
    <div className="space-y-12 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter italic">Outreach Hub</h1>
           <p className="text-slate-500 font-medium max-w-lg">Active communication terminal for MSME requests and industrial collaborations.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <div className="text-2xl font-black text-amber-600">3</div>
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Threads</div>
           </div>
        </div>
      </div>

      <div className="flex-1 min-h-[500px] grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Inbox List */}
         <div className="lg:col-span-12 space-y-4">
            {INQUIRIES.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-white/80 backdrop-blur-3xl border border-slate-100 rounded-[2.5rem] flex items-center justify-between hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-hidden shadow-sm"
              >
                <div className="flex items-center gap-8 relative z-10 flex-1">
                   <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">📧</div>
                   <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-4">
                         <h4 className="text-xl font-black text-slate-900 tracking-tight">{item.company}</h4>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest border ${
                           item.status === 'URGENT' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                         }`}>{item.status}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.subject}</p>
                      <p className="text-xs text-slate-600 font-medium line-clamp-1">{item.preview}</p>
                   </div>
                </div>

                <div className="text-right pl-12 relative z-10 flex flex-col items-end gap-2">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</div>
                   <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/10">
                      OPEN TERMINAL
                   </button>
                </div>
              </motion.div>
            ))}

            {INQUIRIES.length === 0 && (
               <div className="text-center py-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                  <div className="text-6xl mb-6 opacity-20">📪</div>
                  <h3 className="text-2xl font-black text-slate-400 tracking-tighter uppercase tracking-[0.2em]">Silence on the Node</h3>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

'use client';

import { FUNCTIONALITIES } from '@/constants/functionalities';

interface FunctionalityTaggerProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export function FunctionalityTagger({ value = [], onChange }: FunctionalityTaggerProps) {
  const toggleFunctionality = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(f => f !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const categories = Array.from(new Set(FUNCTIONALITIES.map(f => f.category)));

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-amber-500/10 rounded-full" />
             <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none mt-1">
               {category}
             </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {FUNCTIONALITIES.filter(f => f.category === category).map((func) => (
              <button
                key={func.id}
                type="button"
                onClick={() => toggleFunctionality(func.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 text-[11px] font-bold text-left group ${
                  value.includes(func.id)
                    ? 'border-blue-500/30 bg-blue-500/5 text-blue-600 shadow-sm'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
              >
                <span>{func.name}</span>
                {value.includes(func.id) ? (
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center scale-110 shadow-lg">
                    <span className="text-[10px] font-black">✓</span>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-slate-100 border border-slate-200 group-hover:border-slate-300 transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

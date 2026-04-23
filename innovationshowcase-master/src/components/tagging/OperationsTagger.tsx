'use client';

import { OPERATIONS } from '@/constants/operations';

interface OperationsTaggerProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export function OperationsTagger({ value = [], onChange }: OperationsTaggerProps) {
  const toggleOperation = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(o => o !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(OPERATIONS).map(([key, category]) => (
        <div key={key} className="space-y-3">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-slate-300" />
             {category.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.operations.map((op) => (
              <button
                key={op.id}
                type="button"
                onClick={() => toggleOperation(op.id)}
                className={`px-4 py-2.5 rounded-xl border transition-all duration-200 text-xs font-bold ${
                  value.includes(op.id)
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 shadow-sm'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm'
                }`}
              >
                {value.includes(op.id) && <span className="mr-2 text-[10px] leading-none transition-all animate-in zoom-in-50">✓</span>}
                {op.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

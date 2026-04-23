'use client';

import { SECTORS } from '@/constants/sectors';

interface SectorTaggerProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export function SectorTagger({ value = [], onChange }: SectorTaggerProps) {
  const toggleSector = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(s => s !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {SECTORS.map((sector) => (
        <button
          key={sector.id}
          type="button"
          onClick={() => toggleSector(sector.id)}
          className={`p-4 rounded-2xl border-2 transition-all duration-200 text-center relative overflow-hidden group ${
            value.includes(sector.id)
              ? 'border-amber-500 bg-amber-500/5 shadow-sm'
              : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
          }`}
        >
          {value.includes(sector.id) && (
            <div className="absolute top-0 right-0 w-6 h-6 bg-amber-500 flex items-center justify-center rounded-bl-lg">
              <span className="text-white font-black text-[10px]">✓</span>
            </div>
          )}
          <span className="text-2xl block mb-2 transition-transform group-hover:scale-110 duration-200">
            {sector.icon}
          </span>
          <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block leading-tight">
            {sector.name}
          </span>
        </button>
      ))}
    </div>
  );
}

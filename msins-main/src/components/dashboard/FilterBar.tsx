import { Search, Download, Filter } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  label: string;
  options: string[];
}

interface FilterBarProps {
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onSearch?: (term: string) => void;
  onExport?: () => void;
  showExport?: boolean;
}

export function FilterBar({ searchPlaceholder = "Search...", filters = [], onSearch, onExport, showExport = true }: FilterBarProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => { setSearch(e.target.value); onSearch?.(e.target.value); }}
          className="w-full pl-9 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
        />
      </div>
      {filters.map((f) => (
        <select key={f.label} className="bg-secondary text-xs text-foreground rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary">
          <option>{f.label}</option>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ))}
      {showExport && (
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-lg transition-colors"
        >
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      )}
    </div>
  );
}

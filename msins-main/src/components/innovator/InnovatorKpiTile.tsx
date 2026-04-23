import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function InnovatorKpiTile({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint?: string;
  href: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(href)}
      className={cn(
        "group text-left rounded-xl border border-border bg-card p-4 shadow-sm transition-all",
        "hover:border-primary/35 hover:shadow-md hover:bg-gradient-to-br hover:from-card hover:to-violet-500/[0.04]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground font-mono">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{hint}</p>}
    </button>
  );
}

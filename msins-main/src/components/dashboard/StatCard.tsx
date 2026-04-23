import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  trend?: { value: string; positive: boolean };
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, trend, subtitle, className, onClick }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border p-5 space-y-2 transition-all",
        onClick && "cursor-pointer hover:border-primary/40 hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-foreground font-mono tracking-tight">{value}</span>
        {trend && (
          <span className={cn(
            "flex items-center gap-0.5 text-xs font-medium pb-0.5",
            trend.positive ? "text-success" : "text-destructive"
          )}>
            {trend.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

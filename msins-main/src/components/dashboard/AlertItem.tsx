import { cn } from "@/lib/utils";

type Severity = "high" | "medium" | "low";

interface AlertItemProps {
  title: string;
  description: string;
  severity: Severity;
  time?: string;
  className?: string;
  onClick?: () => void;
}

const severityConfig = {
  high: { dot: "bg-destructive", bg: "bg-destructive/5 border-destructive/20" },
  medium: { dot: "bg-warning", bg: "bg-warning/5 border-warning/20" },
  low: { dot: "bg-primary", bg: "bg-primary/5 border-primary/20" },
};

export function AlertItem({ title, description, severity, time, className, onClick }: AlertItemProps) {
  const config = severityConfig[severity];
  return (
    <div
      className={cn("rounded-lg border p-3 space-y-1 transition-all", config.bg, onClick && "cursor-pointer hover:shadow-md", className)}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <span className={cn("w-2 h-2 rounded-full flex-shrink-0", config.dot)} />
        <span className="text-xs font-semibold text-foreground flex-1">{title}</span>
        {time && <span className="text-[10px] text-muted-foreground">{time}</span>}
      </div>
      <p className="text-[11px] text-muted-foreground pl-4">{description}</p>
    </div>
  );
}

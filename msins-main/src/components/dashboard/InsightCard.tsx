import { Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "warning" | "success" | "info";

interface InsightCardProps {
  title?: string;
  subtitle?: string;
  message: string;
  type: InsightType;
  action?: string;
  onClick?: () => void;
}

const iconMap = {
  warning: AlertTriangle,
  success: TrendingUp,
  info: Lightbulb,
};

const colorMap = {
  warning: "border-warning/30 bg-warning/5",
  success: "border-success/30 bg-success/5",
  info: "border-primary/30 bg-primary/5",
};

const iconColorMap = {
  warning: "text-warning",
  success: "text-success",
  info: "text-primary",
};

export function InsightCard({ title, subtitle, message, type, action, onClick }: InsightCardProps) {
  const Icon = iconMap[type];

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 flex items-start gap-4 transition-all duration-300",
        colorMap[type],
        onClick && "cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
      )}
      onClick={onClick}
    >
      <div className={cn("p-2 rounded-xl bg-background/50 flex-shrink-0", iconColorMap[type])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        {title && (
          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/70">
            {title}
          </p>
        )}
        {subtitle && (
          <h4 className={cn("text-xs font-bold leading-tight", iconColorMap[type])}>
            {subtitle}
          </h4>
        )}
        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{message}</p>
        {action && (
          <button className="text-[10px] font-bold text-primary uppercase tracking-wider mt-3 hover:underline">
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

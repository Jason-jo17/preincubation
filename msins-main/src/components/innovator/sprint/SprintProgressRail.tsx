import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPRINT_STAGE_LABELS } from "@/data/innovator-sprint-seed";

export function SprintProgressRail({ currentStageIndex }: { currentStageIndex: number }) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex min-w-[720px] items-stretch gap-0">
        {SPRINT_STAGE_LABELS.map((label, i) => {
          const done = i < currentStageIndex;
          const active = i === currentStageIndex;
          return (
            <div key={label} className="flex-1 flex flex-col min-w-0">
              <div
                className={cn(
                  "flex items-center justify-center gap-1.5 px-2 py-2.5 text-center border-b-2 transition-colors",
                  done && "border-primary bg-primary/[0.06]",
                  active && "border-violet-500 bg-violet-500/[0.08]",
                  !done && !active && "border-transparent bg-muted/40",
                )}
              >
                {done ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                      active ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                )}
                <span
                  className={cn(
                    "text-[11px] font-semibold leading-tight truncate",
                    active && "text-violet-800 dark:text-violet-100",
                    done && "text-primary",
                    !done && !active && "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

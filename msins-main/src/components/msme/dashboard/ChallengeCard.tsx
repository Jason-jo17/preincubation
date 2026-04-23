import { MapPin, Timer, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MsmeChallengeCard as MsmeChallengeCardData } from "@/data/msme-dashboard-command-center";

const statusStyles: Record<MsmeChallengeCardData["status"], string> = {
  Open: "bg-blue-500/90",
  "In Review": "bg-violet-500/90",
  "In Progress": "bg-amber-500/90",
  Delayed: "bg-rose-500/90",
  Completed: "bg-emerald-500/90",
};

export function ChallengeCard({
  challenge,
  onView,
  onMessage,
  onApprove,
}: {
  challenge: MsmeChallengeCardData;
  onView: () => void;
  onMessage: () => void;
  onApprove: () => void;
}) {
  return (
    <Card className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">{challenge.title}</p>
            <p className="text-xs text-muted-foreground">{challenge.company}</p>
          </div>
          <Badge className={cn("text-[10px]", statusStyles[challenge.status])}>{challenge.status}</Badge>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {challenge.location}
          </p>
          <p className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Applicants: <span className="font-semibold text-foreground">{challenge.applicants}</span>
          </p>
          <p>
            Savings Potential: <span className="font-semibold text-foreground">{challenge.savingsPotential}</span>
          </p>
          {challenge.eta ? (
            <p className="flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5" />
              ETA: <span className="font-semibold text-foreground">{challenge.eta}</span>
            </p>
          ) : null}
          {challenge.bestMatch ? (
            <p>
              Best Match: <span className="font-semibold text-emerald-700 dark:text-emerald-300">{challenge.bestMatch}</span>
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onView}>
            View
          </Button>
          <Button size="sm" variant="secondary" onClick={onMessage}>
            Message
          </Button>
          {challenge.status === "In Review" ? (
            <Button size="sm" onClick={onApprove}>
              Approve
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

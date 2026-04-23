import { useState } from "react";
import { CalendarDays, Link2, Plus, ShieldOff, Video } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mentorDaySlots, mentorHonorarium, mentorResourceLinks, mentorSessionRequests, mentorWeekSlots } from "@/data/mentor-workspace";
import { getMentorPlatformPulse } from "@/data/mentor-platform-sync";
import { useInnovatorSprintStore } from "@/hooks/use-innovator-sprint-store";

export default function MentorSessionsPage() {
  const [calView, setCalView] = useState<"day" | "week">("week");
  useInnovatorSprintStore();
  const pulse = getMentorPlatformPulse();

  return (
    <div className="max-w-[1100px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Sessions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bookings align with innovator agenda ({pulse.innovatorUpcomingLabel}) and cohort review windows.
          </p>
        </div>
        <div className="flex rounded-lg border border-border bg-muted/40 p-1">
          <Button
            type="button"
            variant={calView === "day" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setCalView("day")}
          >
            Day
          </Button>
          <Button
            type="button"
            variant={calView === "week" ? "secondary" : "ghost"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setCalView("week")}
          >
            Week
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2 flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Calendar
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="h-8 text-xs gap-1" onClick={() => toast.success("Slot added (demo)")}>
              <Plus className="h-3.5 w-3.5" />
              Add Slot
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => toast.message("Time blocked")}>
              <ShieldOff className="h-3.5 w-3.5" />
              Block Time
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => toast.message("Reschedule flow")}>
              Reschedule
            </Button>
            <Button size="sm" variant="ghost" className="h-8 text-xs text-destructive" onClick={() => toast.message("Session cancelled (demo)")}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {calView === "week" ? (
            mentorWeekSlots.map((d) => (
              <div key={d.id} className="rounded-lg border border-border/80 bg-card px-3 py-2.5">
                <p className="text-xs font-semibold text-foreground">{d.day}</p>
                <ul className="mt-2 space-y-1.5">
                  {d.blocks.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border/80 bg-card divide-y divide-border">
              {mentorDaySlots.map((s) => (
                <div key={s.id} className="flex gap-3 px-3 py-2.5 text-sm">
                  <span className="font-mono text-muted-foreground w-14 shrink-0">{s.time}</span>
                  <span className="text-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Session requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mentorSessionRequests.map((r) => (
              <div key={r.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-border px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.from}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.context}</p>
                  <Badge variant="outline" className="mt-1.5 text-[10px] font-normal">
                    {r.type}
                  </Badge>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="h-8 text-xs" onClick={() => toast.success("Session accepted")}>
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => toast.message("Declined — optional message sent")}>
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold inline-flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              Google Meet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full gap-2" variant="secondary" onClick={() => toast.success("Meet link created", { description: "Copied to clipboard (demo)." })}>
              <Link2 className="h-4 w-4" />
              Create Link
            </Button>
            <Button className="w-full gap-2" onClick={() => toast.message("Joining next scheduled Meet")}>
              <Video className="h-4 w-4" />
              Join Session
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Honorarium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sessions completed</span>
              <span className="font-mono font-semibold">{mentorHonorarium.sessionsCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending payout</span>
              <span className="font-mono font-semibold text-amber-700 dark:text-amber-300">
                ₹{mentorHonorarium.pendingPayoutRupee.toLocaleString("en-IN")}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base">
              <span className="font-medium text-foreground">Total earned</span>
              <span className="font-mono font-bold text-primary">₹{mentorHonorarium.totalEarnedRupee.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Resource hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentorResourceLinks.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => toast.message("Resource opened", { description: r.title })}
                className={cn(
                  "w-full text-left rounded-lg border border-border px-3 py-2.5 transition-colors",
                  "hover:border-primary/30 hover:bg-primary/[0.03]",
                )}
              >
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{r.hint}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

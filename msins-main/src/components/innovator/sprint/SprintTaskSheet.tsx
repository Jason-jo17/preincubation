import { useState } from "react";
import { Maximize2, Minimize2, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { SprintTask } from "@/data/innovator-sprint-seed";
import { appendTaskComment, moveTask, toggleTaskChecklistItem, updateTask } from "@/lib/innovator-sprint-store";

export function SprintTaskSheet({
  task,
  open,
  onOpenChange,
}: {
  task: SprintTask | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [focus, setFocus] = useState(false);
  const [comment, setComment] = useState("");

  if (!task) return null;

  const saveDraft = () => {
    toast.success("Draft saved", { description: task.title });
  };

  const markComplete = () => {
    moveTask(task.id, "done");
    toast.success("Moved to Done", { description: task.title });
    onOpenChange(false);
  };

  const sendComment = () => {
    if (!comment.trim()) return;
    appendTaskComment(task.id, comment);
    setComment("");
    toast.message("Comment added");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          "flex flex-col gap-0 p-0 border-l border-border transition-[max-width] duration-300",
          focus ? "w-full sm:max-w-[min(100vw,900px)]" : "w-full sm:max-w-lg",
        )}
      >
        <SheetHeader className="p-5 pb-3 border-b border-border shrink-0 bg-card">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <SheetTitle className="text-left text-base leading-snug pr-8">{task.title}</SheetTitle>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{task.deliverable}</p>
            </div>
            <Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => setFocus((f) => !f)}>
              {focus ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className={cn("flex-1", focus ? "h-[calc(100vh-88px)]" : "h-[calc(100vh-160px)]")}>
          <div className="p-5 space-y-6">
            <section>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Objective</Label>
              <p className="text-sm text-foreground mt-2 leading-relaxed">{task.objective}</p>
            </section>
            <section>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Inputs / context</Label>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{task.context}</p>
            </section>
            <section>
              <Label htmlFor="sprint-notes" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Notes
              </Label>
              <Textarea
                id="sprint-notes"
                className="mt-2 min-h-[120px] text-sm"
                value={task.notesDraft}
                onChange={(e) => updateTask(task.id, { notesDraft: e.target.value })}
                placeholder="Working notes, decisions, links…"
              />
            </section>
            <section>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Checklist</Label>
              <ul className="mt-2 space-y-2">
                {task.checklist.map((item) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <Checkbox
                      id={item.id}
                      checked={item.done}
                      onCheckedChange={() => toggleTaskChecklistItem(task.id, item.id)}
                      className="mt-0.5"
                    />
                    <label htmlFor={item.id} className={cn("text-sm leading-snug", item.done && "line-through text-muted-foreground")}>
                      {item.label}
                    </label>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Files</Label>
              <div className="mt-2 rounded-lg border border-dashed border-border bg-muted/20 px-4 py-6 text-center text-xs text-muted-foreground">
                Drag files here or{" "}
                <button type="button" className="text-primary font-medium underline-offset-2 hover:underline" disabled>
                  browse (demo)
                </button>
              </div>
            </section>
            <Separator />
            <section>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comments</Label>
              <div className="mt-2 space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {task.comments.map((c) => (
                  <div key={c.id} className="rounded-lg border border-border bg-secondary/20 px-3 py-2 text-sm">
                    <p className="text-[11px] text-muted-foreground font-medium">
                      {c.author} · <span className="font-mono">{c.at}</span>
                    </p>
                    <p className="text-sm mt-1 text-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add comment…" className="text-sm h-9" />
                <Button type="button" size="sm" className="h-9 gap-1 shrink-0" onClick={sendComment}>
                  <Send className="h-3.5 w-3.5" />
                  Send
                </Button>
              </div>
            </section>
            <section>
              <Label className="text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
                Mentor feedback
              </Label>
              <div className="mt-2 space-y-2">
                {task.mentorFeedback.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No mentor notes on this task yet.</p>
                ) : (
                  task.mentorFeedback.map((c) => (
                    <div key={c.id} className="rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-3 py-2 text-sm">
                      <p className="text-[11px] text-muted-foreground font-medium">
                        {c.author} · <span className="font-mono">{c.at}</span>
                      </p>
                      <p className="text-sm mt-1 text-foreground">{c.body}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card flex flex-wrap gap-2 shrink-0">
          <Button variant="secondary" onClick={saveDraft}>
            Save Draft
          </Button>
          <Button onClick={markComplete} disabled={task.column === "done"}>
            Mark Complete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

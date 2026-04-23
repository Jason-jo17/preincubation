import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Building2, 
  ChevronDown, 
  ExternalLink, 
  FileVideo, 
  Layers, 
  Link as LinkIcon, 
  Lock, 
  LockOpen, 
  Pencil, 
  Plus, 
  Save, 
  ShieldCheck, 
  Sparkles, 
  Trash, 
  Trash2, 
  UserPlus, 
  Video 
} from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TOOL_TEMPLATES, NAGPUR_NEXT_CYCLE_LABEL, NAGPUR_NEXT_PHASES } from "@/data/nagpur-next-program-config";
import type { NagpurCohortTaskStatus } from "@/lib/nagpur-next-cohort-store";
import {
  getNagpurNextCohortState,
  nagpurNextMentorReviewAction,
  nagpurNextReassignMentor,
  nagpurNextSetTaskDueDate,
  nagpurNextToggleTaskLock,
  nagpurNextUpdateTask,
  nagpurNextUpdateSprint,
  nagpurNextAddSprintResource,
  nagpurNextRemoveSprintResource,
  nagpurNextAddTaskTemplate,
  nagpurNextDeleteTaskTemplate,
  nagpurNextUpdateSmeSection,
  nagpurNextUpdateTaskTemplate,
  nagpurNextAddTaskResource,
  nagpurNextRemoveTaskResource,
  nagpurNextUpdateTaskSmeSection,
} from "@/lib/nagpur-next-cohort-store";
import { cn } from "@/lib/utils";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";
import { mentorProfile } from "@/data/mentor-workspace";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";

const STATUS_OPTIONS: NagpurCohortTaskStatus[] = [
  "not_started",
  "in_progress",
  "submitted",
  "under_review",
  "approved",
  "rework_needed",
  "completed",
  "locked",
];

function statusBadge(status: NagpurCohortTaskStatus) {
  if (status === "completed" || status === "approved")
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100";
  if (status === "under_review" || status === "submitted")
    return "border-amber-500/35 bg-amber-500/10 text-amber-900 dark:text-amber-100";
  if (status === "rework_needed") return "border-rose-500/35 bg-rose-500/10 text-rose-900 dark:text-rose-100";
  if (status === "in_progress") return "border-violet-500/30 bg-violet-500/10 text-violet-900 dark:text-violet-100";
  if (status === "locked") return "border-border bg-muted text-muted-foreground";
  return "border-border bg-secondary/60 text-muted-foreground";
}

export default function CohortProgramBuilderPage() {
  const v = useNagpurNextCohortStoreVersion();
  const state = useMemo(() => getNagpurNextCohortState(), [v]);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  
  // Local UI state for adding new items
  const [editingSprintId, setEditingSprintId] = useState<string | null>(null);
  const [newResource, setNewResource] = useState<{title: string, url: string, kind: "link" | "video"} | null>(null);
  const [activeResSpritId, setActiveResSprintId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="mb-2 -ml-2 h-8 gap-1 text-xs" asChild>
            <Link to="/cohort/dashboard">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to desk
            </Link>
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            Nagpur NEXT · Program builder
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Cohort program framework</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Config-driven structure: phases, sprints, and tasks. Mentor actions write to the same store the innovator sprint
            reads — no duplicate program JSON.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Cycle <span className="font-medium text-foreground">{NAGPUR_NEXT_CYCLE_LABEL}</span> · Primary team{" "}
            <span className="font-medium text-foreground">{innovatorActiveChallenge.student.displayName}</span> ·{" "}
            {innovatorActiveChallenge.msme.company}
          </p>
        </div>
        <Card className="border-border shadow-sm sm:w-[280px] shrink-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Sync rule
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Updates to status, comments, locks, and due dates on this screen persist to local storage and immediately refresh
            the innovator Active Sprint and dashboard execution table.
          </CardContent>
        </Card>
      </div>

      <Accordion type="multiple" defaultValue={state.programFramework.map((p) => p.id)} className="space-y-3">
        {state.programFramework.map((phase) => (
          <AccordionItem key={phase.id} value={phase.id} className="rounded-2xl border border-border bg-card shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline md:px-5 [&[data-state=open]>svg]:rotate-180">
              <div className="flex flex-col gap-0.5 pr-2 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="text-sm font-semibold">
                  Phase {phase.index}: {phase.title}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {phase.sprints.length} sprint{phase.sprints.length > 1 ? "s" : ""}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-border/60 px-0 pb-4 pt-0">
              <div className="space-y-6 px-3 md:px-4 pt-4">
                {phase.sprints.map((sprint) => (
                  <div key={sprint.id} className="rounded-xl border border-border/80 bg-secondary/10 p-3 md:p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sprint</p>
                        {editingSprintId === sprint.id ? (
                          <div className="flex items-center gap-2 mt-1">
                            <Input 
                              defaultValue={sprint.name} 
                              className="h-8 max-w-[300px] font-semibold"
                              onBlur={(e) => {
                                nagpurNextUpdateSprint(sprint.id, { name: e.target.value });
                                setEditingSprintId(null);
                              }}
                              autoFocus
                            />
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditingSprintId(null)}>
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group mt-1">
                            <p className="text-sm font-semibold text-foreground">{sprint.name}</p>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setEditingSprintId(sprint.id)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground">{sprint.evidenceNote}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-[10px] gap-1.5 border-dashed"
                            >
                              <Plus className="h-3 w-3" />
                              Add Tool
                              <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Quick Templates</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {TOOL_TEMPLATES.map((tmpl) => (
                              <DropdownMenuItem 
                                key={tmpl.name} 
                                className="flex flex-col items-start gap-0.5 py-2 cursor-pointer"
                                onClick={() => nagpurNextAddTaskTemplate(sprint.id, tmpl)}
                              >
                                <span className="text-xs font-semibold">{tmpl.name}</span>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">{tmpl.subtitle}</span>
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="gap-2 text-xs py-2 cursor-pointer text-primary font-medium"
                              onClick={() => nagpurNextAddTaskTemplate(sprint.id, {
                                name: "New Custom Tool",
                                subtitle: "Custom description",
                                objective: "Enter objective here..."
                              })}
                            >
                              <Plus className="h-3 w-3" />
                              Custom Tool
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-border/80 bg-card">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[11px] whitespace-nowrap">Task</TableHead>
                            <TableHead className="text-[11px]">Status</TableHead>
                            <TableHead className="text-[11px]">Due</TableHead>
                            <TableHead className="text-[11px]">Mentor</TableHead>
                            <TableHead className="text-[11px] min-w-[220px]">Mentor actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sprint.tasks.map((t) => {
                            const rt = state.taskState[t.id];
                            const st = rt?.status ?? "not_started";
                            return (
                              <TableRow key={t.id}>
                                <TableCell className="max-w-[240px]">
                                  <div className="group/task flex items-start gap-2">
                                    <div className="flex-1 space-y-1">
                                      <Input 
                                        className="h-7 text-sm font-medium border-transparent hover:border-border focus:border-primary px-1 -ml-1"
                                        defaultValue={t.name}
                                        onBlur={(e) => nagpurNextUpdateTaskTemplate(sprint.id, t.id, { name: e.target.value })}
                                      />
                                      <Input 
                                        className="h-6 text-[11px] text-muted-foreground border-transparent hover:border-border focus:border-primary px-1 -ml-1"
                                        defaultValue={t.subtitle}
                                        onBlur={(e) => nagpurNextUpdateTaskTemplate(sprint.id, t.id, { subtitle: e.target.value })}
                                      />
                                    </div>
                                    
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-7 w-7 opacity-0 group-hover/task:opacity-100 transition-opacity"
                                          title="Task resources & SMEs"
                                        >
                                          <ShieldCheck className="h-4 w-4 text-primary" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-80 p-0" align="start">
                                        <div className="bg-muted/30 p-3 border-b border-border">
                                          <h4 className="text-xs font-bold uppercase tracking-tight flex items-center gap-2">
                                            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                                            Task Support: {t.name}
                                          </h4>
                                        </div>
                                        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                          {/* Task Resources */}
                                          <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Resources</p>
                                              <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-6 px-1.5 text-[10px] gap-1"
                                                onClick={() => {
                                                  const res = { id: `res-${Date.now()}`, title: "New Resource", url: "https://", kind: "link" };
                                                  nagpurNextAddTaskResource(sprint.id, t.id, res as any);
                                                }}
                                              >
                                                <Plus className="h-2.5 w-2.5" /> Add
                                              </Button>
                                            </div>
                                            <div className="space-y-2">
                                              {(t.resources || []).map((res) => (
                                                <div key={res.id} className="flex items-center gap-2 group/res">
                                                  <Input 
                                                    className="h-7 text-xs flex-1"
                                                    defaultValue={res.title}
                                                    onBlur={(e) => {
                                                      const newList = t.resources?.map(r => r.id === res.id ? { ...r, title: e.target.value } : r);
                                                      nagpurNextUpdateTaskTemplate(sprint.id, t.id, { resources: newList });
                                                    }}
                                                  />
                                                  <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-7 w-7 opacity-0 group-hover/res:opacity-100"
                                                    onClick={() => nagpurNextRemoveTaskResource(sprint.id, t.id, res.id)}
                                                  >
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          
                                          <Separator />
                                          
                                          {/* Task SMEs */}
                                          <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">SMEs</p>
                                              <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-6 px-1.5 text-[10px] gap-1"
                                                onClick={() => {
                                                  const newSme = { id: `sme-${Date.now()}`, name: "New Expert", role: "Specialist" };
                                                  nagpurNextUpdateTaskSmeSection(sprint.id, t.id, [...(t.smeData || []), newSme]);
                                                }}
                                              >
                                                <UserPlus className="h-2.5 w-2.5" /> Add
                                              </Button>
                                            </div>
                                            <div className="space-y-2">
                                              {(t.smeData || []).map((sme) => (
                                                <div key={sme.id} className="flex flex-col gap-1 p-2 rounded border border-border/40 bg-muted/20 relative group/sme">
                                                  <Input 
                                                    className="h-6 text-xs border-none bg-transparent p-0 font-semibold"
                                                    defaultValue={sme.name}
                                                    onBlur={(e) => {
                                                      const newList = t.smeData?.map(s => s.id === sme.id ? { ...s, name: e.target.value } : s);
                                                      nagpurNextUpdateTaskSmeSection(sprint.id, t.id, newList || []);
                                                    }}
                                                  />
                                                  <Input 
                                                    className="h-5 text-[10px] border-none bg-transparent p-0 text-muted-foreground"
                                                    defaultValue={sme.role}
                                                    onBlur={(e) => {
                                                      const newList = t.smeData?.map(s => s.id === sme.id ? { ...s, role: e.target.value } : s);
                                                      nagpurNextUpdateTaskSmeSection(sprint.id, t.id, newList || []);
                                                    }}
                                                  />
                                                  <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6 absolute right-1 top-1 opacity-0 group-hover/sme:opacity-100"
                                                    onClick={() => {
                                                      const newList = t.smeData?.filter(s => s.id !== sme.id);
                                                      nagpurNextUpdateTaskSmeSection(sprint.id, t.id, newList || []);
                                                    }}
                                                  >
                                                    <Trash2 className="h-3 w-3 text-destructive" />
                                                  </Button>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={st}
                                    onValueChange={(val) =>
                                      nagpurNextUpdateTask(t.id, { status: val as NagpurCohortTaskStatus })
                                    }
                                  >
                                    <SelectTrigger className="h-8 w-[140px] text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STATUS_OPTIONS.map((s) => (
                                        <SelectItem key={s} value={s} className="text-xs">
                                          {s.replace(/_/g, " ")}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Badge variant="outline" className={cn("mt-1.5 text-[10px] font-normal", statusBadge(st))}>
                                    {st.replace(/_/g, " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    className="h-8 w-[120px] text-xs"
                                    defaultValue={rt?.dueDate}
                                    onBlur={(e) => nagpurNextSetTaskDueDate(t.id, e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={rt?.mentor ?? innovatorActiveChallenge.mentor.primaryName}
                                    onValueChange={(val) => nagpurNextReassignMentor(t.id, val)}
                                  >
                                    <SelectTrigger className="h-8 w-[160px] text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={innovatorActiveChallenge.mentor.primaryName} className="text-xs">
                                        {innovatorActiveChallenge.mentor.primaryName}
                                      </SelectItem>
                                      <SelectItem value={mentorProfile.shortName} className="text-xs">
                                        {mentorProfile.shortName}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-1">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-7 text-[10px] px-2"
                                        onClick={() => nagpurNextMentorReviewAction(t.id, "approve", "Approved via builder")}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-[10px] px-2"
                                        onClick={() =>
                                          nagpurNextMentorReviewAction(t.id, "request_changes", "Please refine evidence")
                                        }
                                      >
                                        Request changes
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-0.5 text-[10px] px-2"
                                        onClick={() => {
                                          nagpurNextToggleTaskLock(t.id);
                                          toast.message(rt?.taskLocked ? "Task unlocked" : "Task locked");
                                        }}
                                      >
                                        {rt?.taskLocked ? <LockOpen className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                        {rt?.taskLocked ? "Unlock" : "Lock"}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-xs px-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                        title="Delete task template"
                                        onClick={() => nagpurNextDeleteTaskTemplate(sprint.id, t.id)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                    <div className="flex gap-1">
                                      <Input
                                        className="h-8 flex-1 text-xs"
                                        placeholder="Add comment…"
                                        value={commentDraft[t.id] ?? ""}
                                        onChange={(e) => setCommentDraft((d) => ({ ...d, [t.id]: e.target.value }))}
                                      />
                                      <Button
                                        size="sm"
                                        className="h-8 shrink-0 text-xs"
                                        onClick={() => {
                                          const c = commentDraft[t.id]?.trim();
                                          if (!c) return;
                                          nagpurNextMentorReviewAction(t.id, "comment", c);
                                          setCommentDraft((d) => ({ ...d, [t.id]: "" }));
                                        }}
                                      >
                                        Post
                                      </Button>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => nagpurNextDeleteTaskTemplate(sprint.id, t.id)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Resources & SME Section */}
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      {/* Resource Hub */}
                      <Card className="border-border/50 bg-background/50 shadow-none">
                        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <Layers className="h-3.5 w-3.5" />
                            Resource Hub
                          </CardTitle>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full"
                            onClick={() => {
                              setActiveResSprintId(activeResSpritId === sprint.id ? null : sprint.id);
                              setNewResource({ title: "", url: "", kind: "link" });
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-0 space-y-3">
                          {activeResSpritId === sprint.id && newResource && (
                            <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-2 mb-2">
                              <Input 
                                placeholder="Resource Title" 
                                className="h-8 text-xs bg-background"
                                value={newResource.title}
                                onChange={e => setNewResource({...newResource, title: e.target.value})}
                              />
                              <div className="flex gap-2">
                                <Input 
                                  placeholder="URL (YouTube, Drive, etc.)" 
                                  className="h-8 text-xs flex-1 bg-background"
                                  value={newResource.url}
                                  onChange={e => setNewResource({...newResource, url: e.target.value})}
                                />
                                <Select 
                                  value={newResource.kind} 
                                  onValueChange={(v: any) => setNewResource({...newResource, kind: v})}
                                >
                                  <SelectTrigger className="h-8 w-[100px] text-xs bg-background">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="link">Link</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end gap-2 pt-1">
                                <Button size="sm" variant="ghost" className="h-7 text-[10px]" onClick={() => setActiveResSprintId(null)}>Cancel</Button>
                                <Button 
                                  size="sm" 
                                  className="h-7 text-[10px]"
                                  onClick={() => {
                                    if (newResource.title && newResource.url) {
                                      nagpurNextAddSprintResource(sprint.id, newResource as any);
                                      setActiveResSprintId(null);
                                    }
                                  }}
                                >
                                  Save Resource
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            {(sprint.resources || []).length === 0 && !activeResSpritId && (
                              <p className="text-[11px] text-muted-foreground italic">No specialized resources added yet.</p>
                            )}
                            {(sprint.resources || []).map(res => (
                              <div key={res.id} className="group flex items-center justify-between p-2 rounded-lg border border-border/40 bg-background/30">
                                <div className="flex items-center gap-2 min-w-0">
                                  {res.kind === "video" ? <Video className="h-3.5 w-3.5 text-rose-500" /> : <LinkIcon className="h-3.5 w-3.5 text-blue-500" />}
                                  <a href={res.url} target="_blank" rel="noreferrer" className="text-xs font-semibold hover:text-primary transition-colors truncate">
                                    {res.title}
                                  </a>
                                  <ExternalLink className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                  onClick={() => nagpurNextRemoveSprintResource(sprint.id, res.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* SME & QA Section */}
                      <Card className="border-border/50 bg-background/50 shadow-none">
                        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            QA & Subject Matter Experts
                          </CardTitle>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 rounded-full"
                            onClick={() => {
                              const newList = [...(sprint.smeData || []), { id: `sme-${Date.now()}`, name: "New Expert", role: "Specialist" }];
                              nagpurNextUpdateSmeSection(sprint.id, newList);
                            }}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-0">
                          <div className="space-y-2">
                            {(sprint.smeData || []).length === 0 && (
                              <p className="text-[11px] text-muted-foreground italic">Assign SMEs to support this sprint's objectives.</p>
                            )}
                            {(sprint.smeData || []).map(sme => (
                              <div key={sme.id} className="flex items-center gap-2 p-2 rounded-lg border border-border/40 bg-background/30 group">
                                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                  {sme.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <Input 
                                    className="h-6 text-xs font-semibold p-0 border-none bg-transparent shadow-none focus-visible:ring-0"
                                    defaultValue={sme.name}
                                    onBlur={e => {
                                      const newList = (sprint.smeData || []).map(x => x.id === sme.id ? {...x, name: e.target.value} : x);
                                      nagpurNextUpdateSmeSection(sprint.id, newList);
                                    }}
                                  />
                                  <Input 
                                    className="h-5 text-[10px] text-muted-foreground p-0 border-none bg-transparent shadow-none focus-visible:ring-0"
                                    defaultValue={sme.role}
                                    onBlur={e => {
                                      const newList = (sprint.smeData || []).map(x => x.id === sme.id ? {...x, role: e.target.value} : x);
                                      nagpurNextUpdateSmeSection(sprint.id, newList);
                                    }}
                                  />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                  onClick={() => {
                                    const newList = (sprint.smeData || []).filter(x => x.id !== sme.id);
                                    nagpurNextUpdateSmeSection(sprint.id, newList);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

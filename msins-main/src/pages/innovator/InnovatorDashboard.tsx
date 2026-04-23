import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileStack,
  Layers,
  Lock,
  MessageSquare,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  Mail,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Settings,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Briefcase,
  Building2
} from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import {
  buildInnovatorDashboardHero,
  buildInnovatorProgramCard,
  getInnovatorExecutionPhasesLive,
  innovatorCareerReadiness,
  innovatorDashboardKpis,
  innovatorDashboardOpportunities,
  innovatorDashboardQuickWidgets,
  innovatorMentorFeedbackCards,
  innovatorTeamPanel,
  type ExecutionTaskRow,
} from "@/data/innovator-dashboard-workspace";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";

function taskStatusClass(status: ExecutionTaskRow["status"]) {
  if (status === "Completed" || status === "Approved")
    return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30";
  if (status === "Pending Review" || status === "Under Review" || status === "Submitted")
    return "bg-amber-500/15 text-amber-900 dark:text-amber-100 border-amber-500/35";
  if (status === "Rework Needed") return "bg-rose-500/15 text-rose-900 dark:text-rose-100 border-rose-500/35";
  if (status === "In Progress") return "bg-violet-500/15 text-violet-900 dark:text-violet-100 border-violet-500/35";
  if (status === "Not Started") return "bg-muted text-muted-foreground border-border";
  return "bg-muted/80 text-muted-foreground border-border";
}

export default function InnovatorDashboard() {
  const cohortV = useNagpurNextCohortStoreVersion();
  const hero = useMemo(() => buildInnovatorDashboardHero(), [cohortV]);
  const innovatorProgramCard = useMemo(() => buildInnovatorProgramCard(), [cohortV]);
  const innovatorExecutionPhases = useMemo(() => getInnovatorExecutionPhasesLive(), [cohortV]);

  const navigate = useNavigate();
  const [taskModal, setTaskModal] = useState<ExecutionTaskRow | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("project-drone");

  const portfolio = (innovatorActiveChallenge as any).portfolioProjects || [];
  const selectedProject = portfolio.find((p: any) => p.id === selectedProjectId) || portfolio[0];
  const isDroneProject = selectedProjectId === "project-drone";

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-10">
      {/* Merged Profile Header / Hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-950 px-8 py-10 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 -m-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[80px] opacity-50" />
        <div className="absolute bottom-0 left-0 -m-16 h-[250px] w-[250px] rounded-full bg-violet-600/20 blur-[80px] opacity-50" />
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center text-3xl font-black text-white shadow-xl ring-4 ring-white/10 shrink-0">
            {hero.initials}
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">{hero.name}</h1>
              <p className="text-violet-300 font-medium">{hero.roleLine}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <MapPin className="h-3 w-3 mr-1.5 opacity-60" /> Nagpur, Maharashtra
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <Mail className="h-3 w-3 mr-1.5 opacity-60" /> kiran@example.com
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 py-1 px-3">
                <Globe className="h-3 w-3 mr-1.5 opacity-60" /> portfolio.io
              </Badge>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl text-xs h-9 px-4">
                <Github className="h-3.5 w-3.5 mr-2" /> GitHub
              </Button>
              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl text-xs h-9 px-4">
                <Linkedin className="h-3.5 w-3.5 mr-2" /> LinkedIn
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs h-9 px-4 font-bold">
                <Settings className="h-3.5 w-3.5 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>

          <Card className="hidden lg:block w-72 rounded-3xl border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black text-white/80 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Career Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <div>
                  <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase mb-1">
                    <span>Overall</span>
                    <span>{innovatorCareerReadiness.portfolioScore}%</span>
                  </div>
                  <Progress value={innovatorCareerReadiness.portfolioScore} className="h-1.5 bg-white/10" />
               </div>
               <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Tech", val: innovatorCareerReadiness.techMatchPct },
                    { label: "Soft", val: innovatorCareerReadiness.communicationPct }
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-[9px] font-bold text-white/40 uppercase mb-1">{s.label}</p>
                      <Progress value={s.val} className="h-1 bg-white/5" />
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applied Innovation Deck (Project Selector) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> Applied Innovation Deck
          </h2>
          <p className="text-xs text-muted-foreground font-medium">Select a project to view detailed execution intelligence</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project: any) => (
            <Card 
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={cn(
                "rounded-[2rem] border-border/50 bg-card transition-all shadow-sm cursor-pointer group relative overflow-hidden",
                selectedProjectId === project.id ? "ring-2 ring-primary border-primary/50 bg-primary/[0.02]" : "hover:bg-muted/30 opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
              )}
            >
              {selectedProjectId === project.id && (
                <div className="absolute top-0 right-0 h-12 w-12 bg-primary/10 rounded-bl-[2rem] flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              )}
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg border transition-colors",
                    selectedProjectId === project.id ? "bg-primary text-primary-foreground border-primary" : "bg-neutral-900 text-primary border-primary/20 group-hover:border-primary"
                  )}>
                    {project.icon === "Zap" && <Zap className="h-6 w-6" />}
                    {project.icon === "Activity" && <Activity className="h-6 w-6" />}
                    {project.icon === "Target" && <Target className="h-6 w-6" />}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {project.isLive && <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase font-mono px-2">Live Challenge</Badge>}
                    {project.isComingSoon && <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[8px] font-black uppercase font-mono px-2">Coming Soon</Badge>}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-muted-foreground/60" />
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none translate-y-[0.5px]">
                      {project.company}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-black text-lg leading-tight transition-colors",
                    selectedProjectId === project.id ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>{project.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">{project.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progress</span>
                  <span className="text-xs font-black text-foreground">{project.progress}% Complete</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Conditional Dashboard Body */}
      {!isDroneProject ? (
        <Card className="rounded-[2.5rem] border-border/50 bg-muted/20 py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-background border border-border flex items-center justify-center shadow-inner">
             <Lock className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h2 className="text-xl font-black text-foreground">Archive or Planning Mode</h2>
            <p className="text-sm text-muted-foreground font-medium">Detailed execution intelligence is currently locked for this project selection. Select a "Live Challenge" to see real-time metrics.</p>
          </div>
          <Button variant="outline" className="rounded-xl" onClick={() => setSelectedProjectId("project-drone")}>
            Switch back to Live Challenge
          </Button>
        </Card>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* KPIs — sourced from `innovatorActiveChallenge.dashboard.summaryKpis` */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {innovatorDashboardKpis.map((k) => (
          <Card
            key={k.id}
            className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-semibold",
                    k.positive ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700",
                  )}
                >
                  {k.positive ? <TrendingUp className="mr-0.5 inline h-3 w-3" /> : <TrendingDown className="mr-0.5 inline h-3 w-3" />}
                  {k.delta}
                </Badge>
              </div>
              <p className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick widgets */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
              Assigned problem
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            {innovatorActiveChallenge.problemStatement}
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <MessageSquare className="h-3.5 w-3.5 text-violet-600" />
              Latest mentor comment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">{innovatorDashboardQuickWidgets.latestMentorComment}</CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Upcoming deadline
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <p className="font-medium text-foreground">{innovatorDashboardQuickWidgets.upcomingDeadline.label}</p>
            <p className="mt-1 text-muted-foreground">{innovatorDashboardQuickWidgets.upcomingDeadline.date}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <FileStack className="h-3.5 w-3.5 text-primary" />
              Deliverable status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <p className="font-semibold text-foreground">{innovatorDashboardQuickWidgets.deliverableStatus.summary}</p>
            <Progress
              value={(innovatorDashboardQuickWidgets.deliverableStatus.submitted / innovatorDashboardQuickWidgets.deliverableStatus.expected) * 100}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <Users className="h-3.5 w-3.5 text-primary" />
              Team members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            {innovatorDashboardQuickWidgets.teamMembers.map((m) => (
              <div key={m.name} className="flex justify-between gap-2 border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-muted-foreground">{m.role}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Program + execution */}
        <div className="space-y-4 xl:col-span-2">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">{innovatorProgramCard.programName}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Week {innovatorProgramCard.weekCurrent} of {innovatorProgramCard.weekTotal}
                  </p>
                </div>
                <Button size="sm" className="shrink-0 gap-1" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                  Open active sprint
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Assigned challenge</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{innovatorProgramCard.assignedChallengeTitle}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span>
                    MSME: <span className="font-medium text-foreground">{innovatorProgramCard.assignedMsme}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Status: <span className="font-medium text-foreground">{innovatorProgramCard.challengeStatus}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Next review: <span className="font-medium text-foreground">{innovatorProgramCard.nextReview}</span>
                  </span>
                </div>
                <Button
                  variant="link"
                  className="mt-1 h-auto px-0 text-xs text-primary"
                  onClick={() => navigate(`/innovator/problems/${hero.linkedChallengeId}`)}
                >
                  Open challenge brief
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase text-muted-foreground">Mentor</p>
                  <p className="text-sm font-semibold">{innovatorProgramCard.mentorName}</p>
                </div>
                <div className="rounded-xl border border-border px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase text-muted-foreground">Demo Day</p>
                  <p className="text-sm font-semibold">{innovatorProgramCard.demoDaysLeft} days left</p>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>Program progress</span>
                  <span className="font-mono font-semibold text-foreground">{innovatorProgramCard.overallProgressPct}%</span>
                </div>
                <Progress value={innovatorProgramCard.overallProgressPct} className="h-2" />
              </div>
              <Progress value={(innovatorProgramCard.weekCurrent / innovatorProgramCard.weekTotal) * 100} className="h-1.5 opacity-80" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-base font-semibold">
                <Layers className="h-4 w-4 text-primary" />
                Active execution flow
              </CardTitle>
              <p className="text-xs text-muted-foreground">Phases unlock after sprint gate approval.</p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["nn-p3"]} className="space-y-2">
                {innovatorExecutionPhases.map((phase, idx) => (
                  <AccordionItem
                    key={phase.id}
                    value={phase.id}
                    className="rounded-xl border border-border px-3 data-[state=open]:bg-secondary/20"
                  >
                    <AccordionTrigger className="py-3 text-left hover:no-underline">
                      <div className="flex flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm font-semibold">
                          PHASE {idx + 1}: {phase.title}
                        </span>
                        {phase.lockedUntilGate && idx > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Lock className="h-3 w-3" />
                            Locked until sprint gate approved
                          </span>
                        ) : null}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0">
                      {phase.tasks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Complete the active sprint to unlock tasks for this phase.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-muted-foreground">
                              Sprint: <span className="text-foreground">{phase.sprintLabel}</span>
                            </span>
                            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                              Open sprint board
                            </Button>
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/40">
                                  <TableHead className="text-[11px]">Task</TableHead>
                                  <TableHead className="text-[11px]">Status</TableHead>
                                  <TableHead className="text-[11px]">Mentor</TableHead>
                                  <TableHead className="text-[11px]">Due</TableHead>
                                  <TableHead className="text-right text-[11px]">Tool</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phase.tasks.map((row) => (
                                  <TableRow key={row.id} className="hover:bg-primary/[0.02]">
                                    <TableCell className="text-sm font-medium">{row.name}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline" className={cn("text-[10px]", taskStatusClass(row.status))}>
                                        {row.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{row.mentor}</TableCell>
                                    <TableCell className="font-mono text-xs">{row.dueDate}</TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-8 text-xs"
                                        disabled={row.status === "Locked"}
                                        onClick={() => setTaskModal(row)}
                                      >
                                        <Wrench className="mr-1 h-3 w-3" />
                                        Open tool
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Mentor feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {innovatorMentorFeedbackCards.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    "rounded-xl border p-3 text-sm transition-colors hover:border-primary/25",
                    c.tone === "success" && "border-emerald-500/25 bg-emerald-500/[0.04]",
                    c.tone === "warning" && "border-amber-500/25 bg-amber-500/[0.05]",
                    c.tone === "primary" && "border-primary/25 bg-primary/[0.04]",
                    c.tone === "muted" && "border-border bg-secondary/30",
                  )}
                >
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0 text-xs"
                    onClick={() => toast.message(c.title, { description: c.detail })}
                  >
                    Acknowledge
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-primary" />
                Career readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Portfolio score</span>
                  <span className="font-mono font-bold">{innovatorCareerReadiness.portfolioScore}</span>
                </div>
                <Progress value={innovatorCareerReadiness.portfolioScore} className="mt-1 h-2" />
              </div>
              {(
                [
                  ["Tech match", innovatorCareerReadiness.techMatchPct],
                  ["Communication", innovatorCareerReadiness.communicationPct],
                  ["Leadership", innovatorCareerReadiness.leadershipPct],
                  ["Innovation index", innovatorCareerReadiness.innovationIndexPct],
                ] as const
              ).map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono">{pct}%</span>
                  </div>
                  <Progress value={pct} className="mt-1 h-1.5" />
                </div>
              ))}
              <Button className="w-full" size="sm" onClick={() => window.open("https://inpulse-staging-recruitment.web.app", "_blank")}>
                Open recruit profile
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-violet-600" />
                {innovatorTeamPanel.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-1.5 text-xs">
                {innovatorTeamPanel.membersDetail.map((m) => (
                  <li key={m.name} className="flex justify-between gap-2">
                    <span className="font-medium text-foreground">{m.name}</span>
                    <span className="text-muted-foreground">{m.role}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-border px-2 py-2">
                  <p className="text-muted-foreground">Members</p>
                  <p className="font-semibold">{innovatorTeamPanel.members}</p>
                </div>
                <div className="rounded-lg border border-border px-2 py-2">
                  <p className="text-muted-foreground">Contribution</p>
                  <p className="font-semibold">{innovatorTeamPanel.contributionPct}%</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Last activity: <span className="font-medium text-foreground">{innovatorTeamPanel.lastActivity}</span>
              </p>
              <Badge className="bg-emerald-500/90 text-[10px]">Health: {innovatorTeamPanel.health}</Badge>
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                View team workspace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Opportunities */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Opportunities</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {innovatorDashboardOpportunities.map((o) => (
            <Card key={o.id} className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold leading-snug">{o.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{o.detail}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs"
                  onClick={() => {
                    if (o.id === "op1") navigate(`/innovator/problems/${hero.linkedChallengeId}`);
                    else if (o.id === "op5") navigate("/mentor/sessions");
                    else if (o.id === "op4") navigate("/reports");
                    else navigate("/innovator/marketplace");
                    toast.success(o.action, { description: o.title });
                  }}
                >
                  {o.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
        </div>
      )}


      <Dialog open={!!taskModal} onOpenChange={(o) => !o && setTaskModal(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          {taskModal && (
            <>
              <DialogHeader>
                <DialogTitle>{taskModal.name}</DialogTitle>
                <DialogDescription>
                  {taskModal.toolLabel} · Due {taskModal.dueDate} · Mentor {taskModal.mentor}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Open the linked workspace tool. Submission will sync to your sprint board.</p>
              </div>
              <DialogFooter className="gap-2 sm:justify-between">
                <Button variant="outline" onClick={() => setTaskModal(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Tool session opened", { description: taskModal.toolLabel });
                    setTaskModal(null);
                  }}
                >
                  Launch {taskModal.toolLabel}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

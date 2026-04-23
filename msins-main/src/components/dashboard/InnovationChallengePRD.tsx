import { 
  FileText, 
  Target, 
  Milestone, 
  Zap, 
  ShieldCheck, 
  Settings, 
  BarChart3, 
  Clock, 
  Wallet,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlayCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { type NagpurNextChallenge } from "@/data/nagpur-next-data";

interface InnovationChallengePRDProps {
  challenge: NagpurNextChallenge;
}

export function InnovationChallengePRD({ challenge }: InnovationChallengePRDProps) {
  const prd = challenge.prd;

  if (!prd) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground/50" />
        <div>
          <h3 className="text-lg font-medium">No PRD Available</h3>
          <p className="text-sm text-muted-foreground">Detailed specifications for this challenge are still being finalized.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Executive Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <FileText className="h-5 w-5" />
          <h2 className="text-lg font-bold tracking-tight uppercase">Executive Summary</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg italic">
          "{prd.executive_summary}"
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        {prd.problem_statement && (
          <Card className="border-primary/10 bg-primary/[0.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertCircle className="h-5 w-5" />
                Problem Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Overview</p>
                <p className="text-sm leading-relaxed">{prd.problem_statement?.overview}</p>
              </div>
              
              {prd.problem_statement?.current_state && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Current Blockers</p>
                  <ul className="space-y-1.5">
                    {prd.problem_statement.current_state.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {prd.problem_statement.impact && (
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <p className="text-[11px] font-bold text-red-600 uppercase mb-1">Business Impact</p>
                  <p className="text-sm font-medium">{prd.problem_statement.impact}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Deliverables & Outcomes */}
        <Card className={`border-blue-500/10 bg-blue-500/[0.02] ${!prd.problem_statement ? 'md:col-span-2' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Milestone className="h-5 w-5" />
              Innovation Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Deliverables</p>
              {challenge.student_deliverables.map((item, i) => (
                <div key={i} className="flex gap-3 p-2.5 rounded-md hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CEED Discovery (MOSI Transcripts) */}
      {challenge.mosi_interviews && challenge.mosi_interviews.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-600">
              <Zap className="h-5 w-5 fill-amber-600/20" />
              <h2 className="text-lg font-bold tracking-tight uppercase">CEED: Opportunity Discovery (MOSI)</h2>
            </div>
            <Badge variant="outline" className="bg-amber-500/5 text-amber-600 border-amber-500/20">
              Verified Stakeholder Voice
            </Badge>
          </div>

          <div className="space-y-6">
            {challenge.mosi_interviews.map((interview) => (
              <Card key={interview.id} className="border-amber-500/10 bg-amber-500/[0.02] overflow-hidden">
                <div className="bg-amber-500/5 p-4 border-b border-amber-500/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/20">
                      <span className="text-amber-700 font-bold">{interview.metadata.stakeholder.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-900 dark:text-amber-100">{interview.metadata.stakeholder}</p>
                      <p className="text-[11px] text-amber-700/70 font-medium">{interview.metadata.designation} @ {interview.metadata.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-bold text-amber-700/60 uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {Math.floor(interview.duration / 60)} MINS
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" />
                      {interview.status}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Insights Panel */}
                    <div className="lg:col-span-4 p-6 border-r border-amber-500/10 space-y-6 bg-amber-500/[0.01]">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-amber-700/60 uppercase tracking-widest">Discovery Summary</p>
                        <p className="text-sm leading-relaxed">{interview.summary}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                        <p className="text-[10px] font-bold text-green-600 uppercase mb-1 flex items-center gap-1">
                          <Zap className="h-3 w-3 fill-green-600" /> Potential ROI
                        </p>
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">{interview.potential_roi}</p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] font-bold text-amber-700/60 uppercase tracking-widest text-center py-1 border-y border-amber-500/5">Transcribed Highlights</p>
                        <div className="flex flex-wrap gap-1.5">
                          {interview.tech_stack_recommended.map(tech => (
                            <Badge key={tech} variant="outline" className="bg-white/50 border-amber-500/10 text-[10px] text-amber-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Transcript Feed */}
                    <div className="lg:col-span-8 h-[600px] overflow-y-auto bg-white/40 dark:bg-black/20 p-8 space-y-8 scrollbar-thin scrollbar-thumb-amber-500/20">
                      {interview.transcript.map((msg, i) => (
                        <div key={msg.id} className={`flex flex-col ${msg.speaker === 'Interviewer' ? 'items-start' : 'items-end'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative ${
                            msg.speaker === 'Interviewer' 
                              ? 'bg-muted border border-border rounded-tl-none' 
                              : msg.opportunity 
                                ? 'bg-amber-100 dark:bg-amber-900/30 border border-amber-500/30 rounded-tr-none' 
                                : 'bg-primary/5 border border-primary/10 rounded-tr-none'
                            }`}>
                            <div className="flex items-center justify-between gap-4 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                                {msg.speaker}
                              </span>
                              <span className="text-[9px] opacity-40 font-mono">
                                {Math.floor(msg.timestamp / 60)}:{(msg.timestamp % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            
                            {msg.opportunity && (
                              <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center shadow-lg animate-pulse">
                                <Zap className="h-3 w-3 text-white fill-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Functional Requirements */}
      {prd.functional_requirements && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-5 w-5" />
            <h2 className="text-lg font-bold tracking-tight uppercase">System Requirements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prd.functional_requirements.map((fr) => (
              <div key={fr.id} className="p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-[10px] font-mono">{fr.id}</Badge>
                  <Badge variant={fr.priority === 'P0' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                    {fr.priority}
                  </Badge>
                </div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">{fr.category}</p>
                <p className="text-sm font-medium leading-tight">{fr.requirement}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech Spec & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Technical Specs */}
          {prd.technical_specifications && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Technical Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                   {prd.technical_specifications?.tech_stack_recommended && (
                    <div className="space-y-2">
                       <p className="text-xs font-bold text-muted-foreground uppercase">Recommended Tools</p>
                       <div className="flex flex-wrap gap-2">
                         {prd.technical_specifications.tech_stack_recommended.map(tag => (
                           <Badge key={tag} variant="secondary">{tag}</Badge>
                         ))}
                       </div>
                    </div>
                  )}
                  {prd.technical_specifications?.hardware && (
                    <div className="space-y-2">
                       <p className="text-xs font-bold text-muted-foreground uppercase">Hardware Needs</p>
                       <ul className="text-sm list-disc pl-4 space-y-1">
                         {prd.technical_specifications.hardware.map((h, i) => <li key={i}>{h}</li>)}
                       </ul>
                    </div>
                  )}
                  {prd.technical_specifications?.architecture && (
                    <div className="col-span-2 p-3 rounded-lg bg-muted/50 border border-border">
                       <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Preferred Architecture</p>
                       <p className="text-sm">{prd.technical_specifications.architecture}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Target Success Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {prd.success_metrics?.primary_kpis?.map((kpi, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-semibold">{kpi.metric ?? "Metric Improvement"}</p>
                    <p className="text-sm font-bold text-primary">{kpi.target}</p>
                  </div>
                  {kpi.baseline && (
                    <div className="flex items-center gap-4">
                      <Progress value={45} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground font-mono">Baseline: {kpi.baseline}</span>
                    </div>
                  )}
                  {kpi.timeframe && (
                    <p className="text-[11px] text-muted-foreground italic">Target timeframe: {kpi.timeframe}</p>
                  )}
                </div>
              ))}
              {(!prd.success_metrics?.primary_kpis || prd.success_metrics.primary_kpis.length === 0) && (
                <p className="text-sm text-muted-foreground italic">No specific success metrics defined for this phase.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Project Meta */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/[0.01]">
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Project Timeline</p>
                  <p className="text-xl font-bold">{prd.timeline_weeks} Weeks</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Budget</p>
                  <p className="text-xl font-bold">{prd.budget_estimate}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Domain Specialization</p>
                <div className="flex flex-wrap gap-1.5">
                  {challenge.tags?.slice(0, 4).map(tag => (
                    <Badge key={tag} className="text-[10px] py-0">{tag}</Badge>
                  ))}
                  {(!challenge.tags || challenge.tags.length === 0) && (
                    <p className="text-[10px] text-muted-foreground italic">No tags defined</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Contact Mentor</p>
                <p className="text-sm font-medium">{challenge.company}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Supplements */}
      {(challenge.reference_videos || challenge.existing_product) && (
        <section className="space-y-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-primary">
            <ExternalLink className="h-5 w-5" />
            <h2 className="text-lg font-bold tracking-tight uppercase">Supplemental Resources</h2>
          </div>

          <div className="flex flex-col gap-8">
            <div className="w-full space-y-6">
              {/* Existing Product */}
              {challenge.existing_product && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Global Benchmark / Existing Product</p>
                  <a href={challenge.existing_product} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm truncate">{challenge.existing_product}</p>
                      <p className="text-xs text-muted-foreground">View reference product mapping</p>
                    </div>
                  </a>
                </div>
              )}

              {/* Videos */}
              {challenge.reference_videos && challenge.reference_videos.length > 0 && (
                <div className="space-y-3 w-full">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Reference Media & Tutorials</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenge.reference_videos.map((vid, i) => {
                      let embedUrl = vid;
                      let videoId = "";
                      if (vid.includes("youtu.be/")) videoId = vid.split("youtu.be/")[1]?.split("?")[0];
                      else if (vid.includes("youtube.com/shorts/")) videoId = vid.split("youtube.com/shorts/")[1]?.split("?")[0];
                      else if (vid.includes("youtube.com/watch")) videoId = new URLSearchParams(vid.split("?")[1]).get("v") || "";
                      
                      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
                      
                      return (
                        <div key={i} className="rounded-xl border border-border overflow-hidden bg-black aspect-video relative group">
                          {videoId ? (
                            <iframe src={embedUrl} className="w-full h-full border-0 absolute inset-0" title={`Reference Video ${i+1}`} allowFullScreen />
                          ) : (
                            <a href={vid} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center h-full text-white/50 hover:text-white transition-colors">
                              <PlayCircle className="h-8 w-8 mb-2" />
                              <span className="text-xs font-semibold">External Video</span>
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

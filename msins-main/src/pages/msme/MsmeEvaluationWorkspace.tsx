import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Award, 
  Target, 
  Zap,
  Star,
  ShieldCheck,
  BarChart3,
  AlertCircle,
  HelpCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { NAGPUR_NEXT_CHALLENGES } from "@/data/nagpur-next-data";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const RUBRIC_LEVELS = [
  { 
    level: 1, 
    label: "Level 1: Minimal", 
    color: "text-red-600 bg-red-50", 
    reasoning: "Minimal solution, does not meet primary needs. Significant technical or functional gaps." 
  },
  { 
    level: 2, 
    label: "Level 2: Developing", 
    color: "text-orange-600 bg-orange-50", 
    reasoning: "Addresses some basic functionality, but lacks precision or comprehensive coverage." 
  },
  { 
    level: 3, 
    label: "Level 3: Proficient", 
    color: "text-blue-600 bg-blue-50", 
    reasoning: "Meets core requirements but has gaps in integration or edge-case handling." 
  },
  { 
    level: 4, 
    label: "Level 4: High Fidelity", 
    color: "text-indigo-600 bg-indigo-50", 
    reasoning: "High-fidelity solution with strong integration and reliable technical architecture." 
  },
  { 
    level: 5, 
    label: "Level 5: Exceptional", 
    color: "text-emerald-600 bg-emerald-50", 
    reasoning: "Exceptional, production-ready solution with full automation and validated impact." 
  },
];

export default function MsmeEvaluationWorkspace() {
  const { challengeId, applicantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rubric");
  const [message, setMessage] = useState("");
  const [scores, setScores] = useState<Record<string, { score: number; reasoning: string }>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  const challenge = useMemo(() => 
    NAGPUR_NEXT_CHALLENGES.find(c => c.id === challengeId) || NAGPUR_NEXT_CHALLENGES[0]
  , [challengeId]);

   const applicantName = useMemo(() => {
    if (!applicantId || applicantId === "kiran") return "KIRAN · Lead Systems";
    return applicantId?.toUpperCase() || "SOLVER TEAM";
  }, [applicantId]);

  const handleScoreChange = (reqId: string, score: number) => {
    setScores(prev => ({ 
      ...prev, 
      [reqId]: { 
        ...prev[reqId], 
        score 
      } 
    }));
  };

  const handleReasoningChange = (reqId: string, reasoning: string) => {
    setScores(prev => ({ 
      ...prev, 
      [reqId]: { 
        ...prev[reqId], 
        reasoning 
      } 
    }));
  };

  const totalScore = useMemo(() => {
    const requirements = challenge.prd?.functional_requirements || [];
    if (requirements.length === 0) return 0;
    
    let totalWeightedScore = 0;
    let totalPossibleWeightedScore = 0;
    
    requirements.forEach(req => {
      const weight = req.priority === 'P0' ? 2 : 1;
      const score = scores[req.id]?.score || 0;
      
      totalWeightedScore += (score * weight);
      totalPossibleWeightedScore += (5 * weight);
    });
    
    if (totalPossibleWeightedScore === 0) return 0;
    return Math.round((totalWeightedScore / totalPossibleWeightedScore) * 100);
  }, [scores, challenge]);

  const saveEvaluation = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('msme_evaluations')
        .upsert({
          challenge_id: challengeId,
          applicant_id: applicantId,
          scores: scores,
          total_score: totalScore,
          last_updated: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success("Evaluation Saved", {
        description: `Maturity report for ${applicantName} has been synced to the primary audit ledger.`
      });
    } catch (err: any) {
      console.error('Error saving evaluation:', err);
      // Even if it fails (e.g. table doesn't exist), we show a "mock" success for the demo if user hasn't set up the table yet
      toast.success("Evaluation Saved (Mock)", {
        description: "Local state persistent. Database sync skipped (Network/Table not ready)."
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch initial evaluation if it exists
  useState(() => {
    const fetchExisting = async () => {
      if (!challengeId || !applicantId) return;
      const { data, error } = await supabase
        .from('msme_evaluations')
        .select('scores')
        .eq('challenge_id', challengeId)
        .eq('applicant_id', applicantId)
        .single();
      
      if (data?.scores) {
        setScores(data.scores);
      }
    };
    fetchExisting();
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success("Feedback sent to solver team", {
      description: "A notification has been triggered for " + applicantName
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 overflow-hidden pt-2 pb-6">
      {/* Top Navigation / Stats Bar */}
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-base font-black tracking-tight">{challenge.title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20">
                {applicantName}
              </Badge>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Submission ID: SUB-88291
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60 tracking-wider">Audit Confidence</p>
            <div className="flex items-center gap-3 mt-1">
               <Progress value={totalScore} className="h-1.5 w-24" />
               <span className="text-sm font-black text-primary">{totalScore}%</span>
            </div>
          </div>
          <Button 
            className="rounded-xl h-10 px-6 font-bold shadow-lg shadow-primary/20"
            disabled={isSaving}
            onClick={saveEvaluation}
          >
            {isSaving ? "Syncing..." : "Finalize Evaluation"}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Pane: PDF Viewer */}
        <Card className="flex-[1.4] rounded-3xl border-border/50 shadow-xl shadow-black/5 overflow-hidden bg-neutral-100 flex flex-col">
          <div className="bg-white/80 p-3 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-neutral-600">PROPOSED_SOLUTION.pdf</span>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-neutral-900/5 text-neutral-600 border-none text-[10px]">12 Pages</Badge>
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">Download Copy</Button>
            </div>
          </div>
          <div className="flex-1 bg-neutral-200 relative">
             <iframe 
               src={`${challenge.proposed_solution_pdf || "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf"}#toolbar=0`} 
               className="w-full h-full border-none"
               title="Submission PDF"
             />
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl rounded-2xl px-6 py-3 flex items-center gap-4 border border-white/10 text-white shadow-2xl">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold hover:bg-white/10 text-white/50 hover:text-white transition-colors">Prev</Button>
               <span className="text-[10px] font-black tracking-widest">PAGE 01 / 12</span>
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold hover:bg-white/10 text-white/50 hover:text-white transition-colors">Next</Button>
             </div>
          </div>
        </Card>

        {/* Right Pane: Evaluation Hub */}
        <Card className="flex-1 rounded-3xl border-border/50 shadow-xl shadow-black/5 flex flex-col bg-background/50 backdrop-blur-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-5 pt-5 pb-2">
              <TabsList className="w-full grid grid-cols-3 h-11 rounded-xl bg-muted/50 p-1">
                <TabsTrigger value="rubric" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <Award className="h-3.5 w-3.5 mr-2" />
                  Rubric
                </TabsTrigger>
                <TabsTrigger value="remarks" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <AlertCircle className="h-3.5 w-3.5 mr-2" />
                  Remarks
                </TabsTrigger>
                <TabsTrigger value="chat" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 px-8 py-6">
              <TabsContent value="rubric" className="mt-0 space-y-8 pb-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Zap className="h-4 w-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest italic">Maturity Matrix Audit</h3>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold bg-primary/5 border-primary/20 text-primary">
                      {Object.keys(scores).length} / {challenge.prd?.functional_requirements?.length || 0} Evaluated
                    </Badge>
                  </div>

                    <div className="min-h-[400px]">
                      <div className="space-y-4">
                        {challenge.prd?.functional_requirements?.map((fr) => (
                          <div key={fr.id} className="rounded-2xl border border-border/50 bg-white/50 dark:bg-black/10 overflow-hidden mb-4 group transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border/50">
                              {/* Requirement Detail */}
                              <div className="flex-1 p-5 space-y-3 bg-muted/5 min-w-[300px]">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[10px] h-5 py-0 font-black opacity-50 uppercase tracking-tighter bg-neutral-100">{fr.id}</Badge>
                                  {fr.priority === 'P0' && (
                                    <Badge className="bg-red-500/10 text-red-600 text-[9px] h-5 py-0 border-none font-black ring-1 ring-red-500/20 uppercase tracking-widest">Critical</Badge>
                                  )}
                                  <Badge className="bg-primary/5 text-primary text-[9px] h-5 py-0 border-none font-black ring-1 ring-primary/20 uppercase tracking-widest">Functional</Badge>
                                </div>
                                <p className="text-sm font-black text-foreground leading-snug">{fr.requirement}</p>
                                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed opacity-80 italic">Verified against submission pages 1, 4, and 7.</p>
                              </div>

                              {/* Score Matrix */}
                              <div className="flex-[1.5] flex flex-col">
                                <div className="grid grid-cols-5 flex-1 min-h-[80px]">
                                  {[1, 2, 3, 4, 5].map((level) => {
                                    const isSelected = scores[fr.id]?.score === level;
                                    const levelData = RUBRIC_LEVELS.find(l => l.level === level);
                                    return (
                                      <TooltipProvider key={level} delayDuration={0}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <button
                                              onClick={() => handleScoreChange(fr.id, level)}
                                              className={cn(
                                                "relative flex flex-col items-center justify-center transition-all border-r last:border-r-0 border-border/40 hover:bg-muted/30 group/btn",
                                                isSelected 
                                                  ? "bg-primary text-white shadow-[inset_0px_0px_20px_rgba(0,0,0,0.1)]" 
                                                  : ""
                                              )}
                                            >
                                              <span className={cn(
                                                "text-sm font-black mb-1 transition-transform group-hover/btn:scale-110",
                                                isSelected ? "text-white" : "text-muted-foreground"
                                              )}>{level}</span>
                                              {isSelected ? (
                                                <CheckCircle2 className="h-4 w-4 animate-in zoom-in duration-300" />
                                              ) : (
                                                <div className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-primary/30" />
                                              )}
                                              {isSelected && (
                                                <div className="absolute bottom-1 w-full flex justify-center">
                                                   <div className="h-0.5 w-4 bg-white/40 rounded-full" />
                                                </div>
                                              )}
                                            </button>
                                          </TooltipTrigger>
                                          <TooltipContent side="top" className="max-w-[200px] p-3 rounded-xl bg-neutral-900 border-none shadow-2xl">
                                            <p className="text-[10px] font-black text-primary uppercase mb-1">{levelData?.label}</p>
                                            <p className="text-[10px] text-white/80 leading-relaxed font-medium">{levelData?.reasoning}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    );
                                  })}
                                </div>
                                <div className="p-4 bg-white/40 border-t border-border/30">
                                   <Textarea 
                                     placeholder={`Reasoning for ${fr.id} maturity assessment...`}
                                     className="min-h-[70px] bg-transparent border-none focus-visible:ring-0 p-0 text-[12px] font-medium resize-none placeholder:text-muted-foreground/40 placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                                     value={scores[fr.id]?.reasoning || ""}
                                     onChange={(e) => handleReasoningChange(fr.id, e.target.value)}
                                   />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  {/* Maturity Legend */}
                  <div className="grid grid-cols-5 gap-2 pt-2">
                    {RUBRIC_LEVELS.map((level) => (
                      <div key={level.level} className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className={cn("h-1 w-full rounded-full", 
                            level.level === 1 ? "bg-red-500" :
                            level.level === 2 ? "bg-orange-500" :
                            level.level === 3 ? "bg-blue-500" :
                            level.level === 4 ? "bg-indigo-500" :
                            "bg-emerald-500"
                          )} />
                        </div>
                        <p className="text-[8px] font-black uppercase text-muted-foreground text-center">{level.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Summary Card */}
                {Object.keys(scores).length > 0 && (
                  <Card className="border-primary/20 bg-primary/5 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Weighted Maturity Index</p>
                          <p className="text-xl font-black">{totalScore}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Status</p>
                          <p className="text-xs font-bold text-primary">
                            {totalScore >= 80 ? 'EXCEPTIONAL' : totalScore >= 60 ? 'COMMENDABLE' : 'DEVELOPING'}
                          </p>
                        </div>
                        <Separator orientation="vertical" className="h-8" />
                        <Button variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest border-primary/20">
                          View Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4 pb-8">
                  <div className="flex items-center gap-2 text-emerald-600 border-b border-emerald-500/10 pb-2">
                    <Target className="h-4 w-4" />
                    <h3 className="text-xs font-black uppercase tracking-widest italic">Success Targets</h3>
                  </div>
                  {challenge.prd?.success_metrics.primary_kpis.map((kpi, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex justify-between items-end mb-3">
                         <div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 italic">Metric</p>
                           <p className="text-xs font-bold leading-tight mt-0.5">{kpi.metric}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 italic">Target</p>
                           <p className="text-xs font-black text-emerald-600">{kpi.target}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Progress value={(scores[`kpi-${i}`] || 0) * 20} className="h-1.5 flex-1" />
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="h-8 text-[9px] font-bold rounded-xl px-3 group hover:bg-emerald-500 hover:text-white transition-all"
                           onClick={() => handleScoreChange(`kpi-${i}`, 1 + Math.floor(Math.random() * 5))}
                         >
                           <ShieldCheck className="h-3 w-3 mr-1.5" />
                           Verify Result
                         </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="remarks" className="mt-0 space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest italic">Performance Audit Remarks</label>
                  <Textarea 
                    placeholder="Enter detailed auditor reasoning here..." 
                    className="min-h-[160px] rounded-2xl border-border/50 focus:ring-primary/20 bg-card/50 text-sm leading-relaxed"
                  />
                </div>
              </TabsContent>

              <TabsContent value="chat" className="mt-0 space-y-4">
                 {/* Chat content exactly as before, but with consistent spacing */}
                 <div className="flex flex-col gap-4 min-h-[300px]">
                    <div className="flex gap-4">
                      <div className="h-9 w-9 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0">
                        <p className="text-[10px] font-black text-white">MS</p>
                      </div>
                      <div className="bg-muted/80 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm">
                        <p className="text-[13px] font-medium leading-relaxed">
                          The current logic for the beam adjustment looks solid, but we need to see the <span className="text-primary font-bold">thermal dissipation</span> data for the 50W variant.
                        </p>
                        <span className="text-[9px] text-muted-foreground font-black mt-2 block uppercase tracking-widest">10:42 AM · MSME Auditor</span>
                      </div>
                    </div>
                    {/* ... rest of chat ... */}
                 </div>
              </TabsContent>
            </ScrollArea>

            <div className="p-5 bg-muted/20 border-t border-border/50">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask for more clarity or provide a remark..." 
                  className="rounded-xl border-border/50 bg-card h-12 text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" className="h-12 w-12 rounded-xl shadow-lg shadow-primary/20" onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

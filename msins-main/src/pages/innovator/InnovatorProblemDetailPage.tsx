import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Sparkles, Target, Zap, Waves, Shield, BookOpen, UserCheck, MessageSquare, ExternalLink, Paperclip, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInnovatorProblemById } from "@/data/innovator-workspace";
import { cn } from "@/lib/utils";

export default function InnovatorProblemDetailPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const problem = useMemo(() => (problemId ? getInnovatorProblemById(problemId) : undefined), [problemId]);

  if (!problem) {
    return (
      <div className="max-w-xl mx-auto space-y-4 text-center py-16">
        <h1 className="text-lg font-semibold text-foreground">Problem not found</h1>
        <p className="text-sm text-muted-foreground">This challenge is not in your innovator workspace catalog.</p>
        <Button asChild variant="secondary">
          <Link to="/innovator/problems">Back to problems</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <span className="text-muted-foreground">/</span>
        <Link to="/innovator/problems" className="text-sm text-primary hover:underline">
          Browse problems
        </Link>
      </div>

      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm",
          "bg-gradient-to-br from-card via-card to-violet-500/[0.06]",
        )}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal">
            {problem.sector}
          </Badge>
          <Badge className="bg-primary/90 font-normal gap-1">
            <Sparkles className="h-3 w-3" />
            {problem.matchPct}% match
          </Badge>
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-foreground">{problem.title}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-primary/80" />
            {problem.msme}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary/80" />
            {problem.region}, Maharashtra
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-violet-700 dark:text-violet-300">Estimated value: {problem.valueLabel}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Why you match:</span> {problem.why}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => navigate("/innovator/dashboard")}>Apply on dashboard</Button>
          <Button variant="outline" asChild>
            <Link to="/innovator/sprint">View sprint context</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Core Problem Info */}
        <Card className="border-border shadow-sm col-span-full lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0 text-primary">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Technical Mission Roadmap
            </CardTitle>
            <Badge variant="outline" className="font-mono text-[10px]">VERIFIED CHALLENGE</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-foreground">Mission Objective</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Coordinate a swarm of inflatable LED-equipped UAVs to provide dynamic lighting coverage in disaster zones. 
                Focus on minimizing shadow zones and maximizing lux levels at ground level from a 40m altitude.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Payload Specs</span>
                </div>
                <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1">
                  <li>30,000 Lumen peak output</li>
                  <li>Inflatable reflector system</li>
                  <li>Active thermal cooling via prop-wash</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-violet-600">
                  <Waves className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fleet Control</span>
                </div>
                <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Mesh-network communication</li>
                  <li>Precision station-keeping (±0.5m)</li>
                  <li>Autonomous battery swaps</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Integration (COs) */}
        <Card className="border-border shadow-sm overflow-hidden bg-gradient-to-br from-card to-violet-500/[0.03]">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-600" />
              Academic Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Linked to ECE Major Project Stage 2 (Vidarbha Syllabus 2026).</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 h-4 px-1 text-[9px] font-mono shrink-0">CO1</Badge>
                  <span className="text-xs text-foreground font-medium">Multi-UAV coordination under mesh latency</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 h-4 px-1 text-[9px] font-mono shrink-0">CO2</Badge>
                  <span className="text-xs text-foreground font-medium">Power electronics and inflatable actuators</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 h-4 px-1 text-[9px] font-mono shrink-0">CO3</Badge>
                  <span className="text-xs text-foreground font-medium">Edge processing for optical lux optimization</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-2 border-dashed">
                <Paperclip className="h-3.5 w-3.5" />
                View Syllabus Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mentorship & Guidance */}
        <Card className="border-border shadow-sm lg:col-span-1">
          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              Expert Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-700 font-bold">RK</div>
              <div>
                <p className="text-xs font-bold text-foreground">Mrs. Rashmi Kulkarni</p>
                <p className="text-[10px] text-muted-foreground">Lead Engineer, Navitas Lighting</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground">Priority Guidance:</p>
              <div className="p-2.5 rounded-lg border bg-background text-[11px] text-muted-foreground italic leading-relaxed">
                "We need to see a stable lux contour at 40m before we commit to the hardware build. Focus on the inflatable deployment logic first."
              </div>
            </div>
            <Button size="sm" variant="secondary" className="w-full gap-2 text-[11px] h-8">
              <MessageSquare className="h-3 w-3" />
              Book Design Review
            </Button>
          </CardContent>
        </Card>

        {/* Business Impact & Scale */}
        <Card className="border-border shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              Impact & Value Envelope
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Commercial Reach</p>
                <p className="text-sm text-foreground">₹36 Lakhs prototype development and pilot deployment phase in Vidarbha disaster clusters.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Strategic Outcome</p>
                <p className="text-sm text-foreground">Establishing a proprietary modular drone lighting standard for the Aerospace & Defence sector in Maharashtra.</p>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-900 dark:text-blue-100">Navitas Lighting Integration Pack</p>
                <p className="text-[10px] text-blue-800/70 dark:text-blue-200">Confidential technical drawings & payload APIs.</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 gap-2">
                <Lock className="h-3 w-3" />
                Request Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

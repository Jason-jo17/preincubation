import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BellRing } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MsmeKpiCard } from "@/components/msme/dashboard/MsmeKpiCard";
import { BusinessRadar } from "@/components/msme/dashboard/BusinessRadar";
import { ActionCenter } from "@/components/msme/dashboard/ActionCenter";
import { ChallengeCard } from "@/components/msme/dashboard/ChallengeCard";
import { MatchCard } from "@/components/msme/dashboard/MatchCard";
import { ImpactCard } from "@/components/msme/dashboard/ImpactCard";
import { InsightChip } from "@/components/msme/dashboard/InsightChip";
import { QuickActionsBar } from "@/components/msme/dashboard/QuickActionsBar";
import { 
  MsmeNewChallengeWizard, 
  type NewChallengeWizardPayload 
} from "@/pages/msme/MsmeNewChallengeWizard";
import {
  businessHealthMetrics,
  msmeActiveChallengeCards,
  msmeExecutiveKpis,
  msmeImpactCards,
  msmeOpportunityInsights,
  msmePriorityActions,
  msmeRecommendedTeams,
  msmeTimelineFeed,
  type MsmeChallengeCard as MsmeChallengeCardData,
  type MsmePriorityAction,
} from "@/data/msme-dashboard-command-center";

export default function MsmeDashboard() {
  const navigate = useNavigate();
  const [actions, setActions] = useState(msmePriorityActions);
  const [challenges, setChallenges] = useState(msmeActiveChallengeCards);
  const [selectedChallenge, setSelectedChallenge] = useState<MsmeChallengeCardData | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);

  const kpis = useMemo(() => {
    return msmeExecutiveKpis.map((kpi) =>
      kpi.id === "pending-decisions" ? { ...kpi, value: String(actions.filter((a) => a.type === "Approval" || a.type === "Delay").length) } : kpi,
    );
  }, [actions]);

  const handlePriorityAction = (action: MsmePriorityAction) => {
    if (action.actionLabel === "Join") {
      navigate("/mentor/sessions");
      toast.success("Mentor meeting opened");
      return;
    }
    if (action.actionLabel === "Approve") {
      setChallenges((prev) => prev.map((item) => (item.id === "ch-1" ? { ...item, status: "In Progress" } : item)));
      setActions((prev) => prev.filter((item) => item.id !== action.id));
      toast.success("Teams approved for Packaging Waste challenge");
      return;
    }
    setActions((prev) => prev.filter((item) => item.id !== action.id));
    toast.message(`${action.actionLabel} action completed`, { description: action.title });
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-12">
      <section className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">MSME Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage challenges, review teams, track business outcomes, and take action quickly.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
        {kpis.map((kpi) => (
          <MsmeKpiCard key={kpi.id} kpi={kpi} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <BusinessRadar
            data={businessHealthMetrics}
            onExplore={() => {
              navigate("/msme/matchmaking");
              toast.message("Opening solver recommendations");
            }}
          />

          <ActionCenter items={actions} onAction={handlePriorityAction} />
        </div>

        <Card className="hidden rounded-2xl border-border shadow-sm xl:block">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
              <BellRing className="h-4 w-4 text-primary" />
              Recent Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-0 border-l border-border pl-4">
              {msmeTimelineFeed.map((item) => (
                <li key={item} className="relative pb-4 text-sm text-foreground last:pb-0">
                  <span className="absolute -left-[19px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">My Active Challenges</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/msme/challenges")}>
            Open Challenge Workspace
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onView={() => setSelectedChallenge(challenge)}
              onMessage={() => {
                navigate("/msme/business-hub?tab=messages");
                toast.success("Opening messages");
              }}
              onApprove={() => {
                setChallenges((prev) => prev.map((item) => (item.id === challenge.id ? { ...item, status: "In Progress" } : item)));
                toast.success(`${challenge.title} approved and moved to In Progress`);
              }}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Recommended Teams</h2>
          <p className="text-xs text-muted-foreground">
            Best-fit teams based on skills, tools, domain experience, speed, and previous outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {msmeRecommendedTeams.map((team) => (
            <MatchCard
              key={team.id}
              team={team}
              onInvite={() => toast.success(`${team.name} invited`)}
              onCompare={() => navigate("/msme/matchmaking")}
              onProfile={() => navigate("/msme/applicants")}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Completed Solutions & Impact</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {msmeImpactCards.map((impact) => (
            <ImpactCard key={impact.id} impact={impact} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Growth Opportunities</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          {msmeOpportunityInsights.map((insight) => (
            <InsightChip
              key={insight}
              text={insight}
              onClick={() => {
                if (insight.includes("Mentor")) {
                  navigate("/mentor/sessions");
                } else if (insight.includes("ROI")) {
                  navigate("/msme/business-hub?tab=reports");
                } else {
                  navigate("/msme/matchmaking");
                }
              }}
            />
          ))}
        </div>
      </section>

      <QuickActionsBar
        onPost={() => setWizardOpen(true)}
        onMentor={() => navigate("/mentor/sessions")}
        onExplore={() => navigate("/msme/matchmaking")}
        onReport={() => {
          navigate("/msme/business-hub?tab=reports");
          toast.success("ROI report export initiated");
        }}
      />

      <Dialog open={!!selectedChallenge} onOpenChange={(open) => !open && setSelectedChallenge(null)}>
        <DialogContent className="max-w-xl">
          {selectedChallenge && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedChallenge.title}</DialogTitle>
                <DialogDescription>
                  {selectedChallenge.company} · {selectedChallenge.location}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold">{selectedChallenge.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Applicants</p>
                  <p className="font-semibold">{selectedChallenge.applicants}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Savings Potential</p>
                  <p className="font-semibold">{selectedChallenge.savingsPotential}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ETA</p>
                  <p className="font-semibold">{selectedChallenge.eta ?? "TBD"}</p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedChallenge(null);
                    navigate("/msme/business-hub?tab=messages");
                  }}
                >
                  Message
                </Button>
                <Button onClick={() => navigate("/msme/challenges")}>Open Full Detail</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <MsmeNewChallengeWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onSaveDraft={() => toast.success("Draft Saved", { description: "Your challenge draft is now available in your registry." })}
        onSubmitVerification={(payload) => {
          toast.success("Challenge Submitted", { description: "InUnity and MSME teams will review your requirements." });
          setWizardOpen(false);
        }}
      />
    </div>
  );
}

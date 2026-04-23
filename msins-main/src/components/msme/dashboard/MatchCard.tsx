import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MsmeRecommendedTeamCard } from "@/data/msme-dashboard-command-center";

export function MatchCard({
  team,
  onInvite,
  onCompare,
  onProfile,
}: {
  team: MsmeRecommendedTeamCard;
  onInvite: () => void;
  onCompare: () => void;
  onProfile: () => void;
}) {
  return (
    <Card className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{team.name}</p>
          <Badge className="bg-emerald-500/90 text-[10px]">{team.matchPct}% Match</Badge>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Source: <span className="text-foreground">{team.source}</span></p>
          <p>Skills: <span className="text-foreground">{team.skills}</span></p>
          {team.pastWins ? <p>Past Wins: <span className="text-foreground">{team.pastWins}</span></p> : null}
          {team.deliverySpeed ? <p>Delivery Speed: <span className="text-foreground">{team.deliverySpeed}</span></p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={onInvite}>Invite</Button>
          <Button size="sm" variant="secondary" onClick={onCompare}>Compare</Button>
          <Button size="sm" variant="outline" onClick={onProfile}>View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}

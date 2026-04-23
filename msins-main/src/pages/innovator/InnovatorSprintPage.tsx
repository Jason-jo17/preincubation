import { useSearchParams } from "react-router-dom";
import NagpurNextSprintWorkspace from "@/components/innovator/sprint/NagpurNextSprintWorkspace";
import { InnovatorLegacySprintWorkspace } from "@/pages/innovator/InnovatorLegacySprintWorkspace";

/**
 * Default route: Nagpur NEXT cohort execution workspace (SIP Lite style).
 * Marketplace / EV flows keep the Kanban sprint store (`?challengeId=`, `?project=ev`, etc.).
 */
export default function InnovatorSprintPage() {
  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("challengeId");
  const project = searchParams.get("project");
  const sprint = searchParams.get("sprint");
  const useLegacySprintStore = Boolean(challengeId || project === "ev" || sprint === "spr-msme-ev-cooling");

  if (useLegacySprintStore) {
    return <InnovatorLegacySprintWorkspace />;
  }

  return <NagpurNextSprintWorkspace />;
}

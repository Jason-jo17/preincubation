import { useMemo, useSyncExternalStore } from "react";
import {
  countSubmissionsByStatus,
  getAcceptedSprintContext,
  getInnovatorSubmissions,
  getMarketplaceHubVersion,
  getMarketplaceOriginatedApplicants,
  getSavedProblemIds,
  subscribeInnovatorMarketplaceHub,
} from "@/data/innovator-marketplace-hub";

export function useInnovatorMarketplaceBridge() {
  const version = useSyncExternalStore(
    subscribeInnovatorMarketplaceHub,
    getMarketplaceHubVersion,
    () => 0,
  );

  return useMemo(
    () => ({
      version,
      submissions: getInnovatorSubmissions(),
      savedIds: new Set(getSavedProblemIds()),
      accepted: getAcceptedSprintContext(),
      counts: countSubmissionsByStatus(),
      marketplaceApplicants: getMarketplaceOriginatedApplicants(),
    }),
    [version],
  );
}

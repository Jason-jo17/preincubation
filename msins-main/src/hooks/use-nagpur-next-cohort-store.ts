import { useSyncExternalStore } from "react";
import {
  getNagpurNextCohortStoreVersion,
  subscribeNagpurNextCohortStore,
} from "@/lib/nagpur-next-cohort-store";

/** Subscribe to Nagpur NEXT cohort store updates; use the returned version in useMemo deps when deriving UI. */
export function useNagpurNextCohortStoreVersion() {
  return useSyncExternalStore(
    subscribeNagpurNextCohortStore,
    getNagpurNextCohortStoreVersion,
    () => 0,
  );
}

import { useMemo, useSyncExternalStore } from "react";
import {
  getInnovatorSprintState,
  getInnovatorSprintStoreVersion,
  subscribeInnovatorSprintStore,
} from "@/lib/innovator-sprint-store";

export function useInnovatorSprintStore() {
  const version = useSyncExternalStore(
    subscribeInnovatorSprintStore,
    getInnovatorSprintStoreVersion,
    () => 0,
  );
  return useMemo(() => getInnovatorSprintState(), [version]);
}

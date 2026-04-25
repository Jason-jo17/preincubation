"use client";

import { useEffect } from "react";
import { useAssessmentStore } from "@/lib/store/assessment";

interface StoreHydratorProps {
  data: any;
}

export function StoreHydrator({ data }: StoreHydratorProps) {
  const { hydrateScores } = useAssessmentStore();

  useEffect(() => {
    if (data?.scores) {
      hydrateScores(data.scores);
    }
  }, [data, hydrateScores]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useAssessmentStore, AssessmentScores } from "@/lib/store/assessment";

interface Props {
  scores: AssessmentScores;
}

export function AssessmentHydrator({ scores }: Props) {
  const hydrateScores = useAssessmentStore((state) => state.hydrateScores);

  useEffect(() => {
    if (scores) {
      hydrateScores(scores);
    }
  }, [scores, hydrateScores]);

  return null;
}

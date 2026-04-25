import React from "react";
import { getMentorReviews, getReviewCandidates } from "@/app/actions/reviews";
import ReviewHubClient from "./ReviewHubClient";

export default async function MentorReviewPage() {
  const [reviews, candidates] = await Promise.all([
    getMentorReviews(),
    getReviewCandidates(),
  ]);

  return (
    <ReviewHubClient initialReviews={reviews} candidates={candidates} />
  );
}

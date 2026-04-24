import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for cohort-wide analytics
  // In a real app, this would fetch aggregated stats from Supabase
  const cohortData = {
    cohort_id: "MSME-Q2",
    total_mentees: 42,
    avg_health: 84,
    avg_trl: 3.2,
    at_risk: [
      { id: "stud_012", name: "Karthik Raja", reason: "Low interaction frequency" },
      { id: "stud_005", name: "Rahul Verma", reason: "TRL gap detected" }
    ],
    momentum: "+18%",
    validations_this_week: 12
  };

  return NextResponse.json(cohortData);
}

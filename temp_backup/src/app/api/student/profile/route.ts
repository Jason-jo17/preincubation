import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for student profile/progress
  // In a real app, this would fetch from Supabase
  const profile = {
    id: "stud_001",
    name: "Aravind Sharma",
    cohort: "MSME-Q2",
    institution: "IIT Bombay",
    progress: {
      trl: 4,
      crl: 3,
      irl: 2,
      advancement_rate: "1.2x",
      last_validation: "2026-04-20"
    },
    stakeholders: [
      { id: "s1", name: "Dr. Sameer K.", interactions: 12 },
      { id: "s2", name: "TechCorp Ltd", interactions: 5 }
    ],
    next_step: "Initiate TRL 5 industrial simulation interview."
  };

  return NextResponse.json(profile);
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sectorId = params.id;

  // High-fidelity mock automation needs for the demo MSMEs
  const MOCK_NEEDS = [
    {
      id: "need-001",
      title: "Real-time AI Surface Defect Detection",
      description: "Automate the inspection of die-cast aluminum parts using high-speed computer vision.",
      automation_type: "AI Vision",
      ceed_quadrant: "Efficiency",
      priority_rank: 1
    },
    {
      id: "need-002",
      title: "Predictive Maintenance for Precision Lathes",
      description: "Sensor-based remaining useful life (RUL) prediction for high-tolerance CNC spindles.",
      automation_type: "Predictive Analytics",
      ceed_quadrant: "Core",
      priority_rank: 2
    },
    {
      id: "need-003",
      title: "Collaborative Robotic Deburring",
      description: "Deploying cobots to handle secondary finishing processes for complex aerospace geometries.",
      automation_type: "Robotics",
      ceed_quadrant: "Expansion",
      priority_rank: 3
    }
  ];

  return NextResponse.json(MOCK_NEEDS);
}

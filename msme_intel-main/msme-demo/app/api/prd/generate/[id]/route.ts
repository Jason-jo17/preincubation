import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Simulate AI synthesis delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Return a mock synthesized PRD for the demo
  return NextResponse.json({
    id: `prd-${Math.random().toString(36).substr(2, 9)}`,
    title: "AI Precision Manufacturing Hub: Challenge #01",
    slug: "ai-visual-defect-detection", // Matches existing static content for demo stability
    executive_summary: "High-fidelity challenge generated via MSME Discovery Synthesis.",
    status: "published",
    created_at: new Date().toISOString()
  });
}

"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ToolRunner } from "@/components/tools/ToolRunner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.toolId as string;

  // Mock tool object for the runner
  const mockTool = {
    toolId: toolId,
    toolName: toolId.replace(/_/g, " ").toUpperCase(),
    description: "Execute and track innovation frameworks."
  };

  const mockProgress = {
    data: null
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-text-muted hover:text-text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to Tools
      </Button>

      <div className="bg-bg-surface border border-border p-8 rounded-[2rem] shadow-sm">
        <ToolRunner 
          tool={mockTool} 
          progress={mockProgress} 
          isNewIteration={true} 
          onDataSaved={() => console.log("Data saved successfully.")}
        />
      </div>
    </div>
  );
}

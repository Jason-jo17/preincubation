import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NagpurNextSprintWorkspace from "@/components/innovator/sprint/NagpurNextSprintWorkspace";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MentorWorkspacePage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Mentor Super-Header */}
      <div className="bg-primary/5 border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/mentor/teams")}
            className="hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teams
          </Button>
          <div className="h-6 w-[1px] bg-border mx-2" />
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold tracking-tight">Reviewing Team Trace</h1>
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Mentor View Mode • {teamId === "mt-kiran" ? "Kiran (Innovation)" : "Academic Track"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Review Context Active</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <NagpurNextSprintWorkspace isMentorView={true} />
      </div>
    </div>
  );
};

export default MentorWorkspacePage;

import { Download, Plus, Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QuickActionsBar({
  onPost,
  onMentor,
  onExplore,
  onReport,
}: {
  onPost: () => void;
  onMentor: () => void;
  onExplore: () => void;
  onReport: () => void;
}) {
  return (
    <Card className="sticky bottom-3 z-20 rounded-2xl border-border bg-background/95 p-3 shadow-lg backdrop-blur">
      <div className="flex flex-wrap gap-2">
        <Button className="gap-1.5" onClick={onPost}>
          <Plus className="h-4 w-4" />
          Post New Problem
        </Button>
        <Button variant="secondary" className="gap-1.5" onClick={onMentor}>
          <Video className="h-4 w-4" />
          Book Mentor
        </Button>
        <Button variant="outline" className="gap-1.5" onClick={onExplore}>
          <Search className="h-4 w-4" />
          Explore Teams
        </Button>
        <Button variant="outline" className="gap-1.5" onClick={onReport}>
          <Download className="h-4 w-4" />
          Download ROI Report
        </Button>
      </div>
    </Card>
  );
}

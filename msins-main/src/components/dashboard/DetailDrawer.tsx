import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { X, Maximize2, Shrink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  className?: string; // We'll ignore external width classes in favor of the expand toggle
  children: React.ReactNode;
}

export function DetailDrawer({ open, onClose, title, subtitle, className, children }: DetailDrawerProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Reset expansion when closed
  useEffect(() => {
    if (!open) setExpanded(false);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent className={cn(
        "bg-card border-l border-border overflow-y-auto transition-all duration-300 ease-in-out", 
        expanded ? "w-full sm:max-w-[1000px] lg:max-w-[1200px]" : "w-full sm:max-w-[650px]"
      )}>
        <SheetHeader className="pb-4 border-b border-border pr-12 relative">
          <SheetTitle className="text-foreground pr-8">{title}</SheetTitle>
          {subtitle && <SheetDescription>{subtitle}</SheetDescription>}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-0 right-0 h-6 w-6 text-muted-foreground hover:bg-muted" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <Shrink className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
        </SheetHeader>
        <div className="py-4 space-y-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InsightChip({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-auto w-full justify-start rounded-xl border-primary/20 bg-primary/[0.03] px-3 py-2.5 text-left text-xs whitespace-normal hover:bg-primary/[0.07]"
      onClick={onClick}
    >
      <Lightbulb className="mr-2 h-3.5 w-3.5 shrink-0 text-primary" />
      {text}
    </Button>
  );
}

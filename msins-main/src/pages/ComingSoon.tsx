import { DashboardLayout } from "@/components/DashboardLayout";
import { Wrench } from "lucide-react";

export default function ComingSoon() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="p-5 rounded-full bg-primary/10 border border-primary/20">
          <Wrench className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Integration in Progress</h1>
        <p className="text-muted-foreground text-center max-w-md">
          This portal section is actively being migrated and localized from the legacy MSME Platform into the new Command Center schema. Check back shortly.
        </p>
      </div>
    </DashboardLayout>
  );
}

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORKSPACES } from "@/lib/workspace-identity";
import { cn } from "@/lib/utils";

export default function WorkspaceLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Maharashtra</p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Maharashtra Innovation Platform
          </h1>
          <p className="mt-4 text-pretty text-sm text-muted-foreground sm:text-base">
            Choose your workspace
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {WORKSPACES.map((ws) => {
            const Icon = ws.icon;
            return (
              <article
                key={ws.id}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{ws.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{ws.description}</p>
                <Button
                  className="mt-6 w-full gap-2 rounded-xl font-semibold shadow-none transition-transform duration-300 group-hover:gap-3"
                  onClick={() => navigate(ws.dashboardPath)}
                >
                  Enter workspace
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

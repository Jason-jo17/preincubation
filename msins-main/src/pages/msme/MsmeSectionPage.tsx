interface MsmeSectionPageProps {
  title: string;
  description?: string;
}

/** Lightweight placeholder for MSME menu sections not yet fully built out. */
export function MsmeSectionPage({ title, description }: MsmeSectionPageProps) {
  return (
    <div className="space-y-2 max-w-2xl">
      <h1 className="text-xl font-bold text-foreground tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description ??
          "This section is part of your MSME workspace. Use the sidebar to open the dashboard or other tools."}
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  Inactive: "bg-destructive/10 text-destructive border-destructive/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  "High Innovation": "bg-success/10 text-success border-success/20",
  Emerging: "bg-warning/10 text-warning border-warning/20",
  "Underserved Opportunity": "bg-destructive/10 text-destructive border-destructive/20",
  "On Track": "bg-success/10 text-success border-success/20",
  "At Risk": "bg-warning/10 text-warning border-warning/20",
  Delayed: "bg-destructive/10 text-destructive border-destructive/20",
  Completed: "bg-success/10 text-success border-success/20",
  Graduated: "bg-primary/10 text-primary border-primary/20",
  "High Impact": "bg-success/10 text-success border-success/20",
  "Fast Execution": "bg-primary/10 text-primary border-primary/20",
  "Innovation Leader": "bg-warning/10 text-warning border-warning/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  Warning: "bg-warning/10 text-warning border-warning/20",
  Info: "bg-primary/10 text-primary border-primary/20",
  Resolved: "bg-muted text-muted-foreground border-border",
  Shortlisting: "bg-primary/10 text-primary border-primary/25",
  "In Progress": "bg-success/10 text-success border-success/20",
  Open: "bg-secondary text-secondary-foreground border-border",
  Testing: "bg-warning/10 text-warning border-warning/25",
  Draft: "bg-muted text-muted-foreground border-border",
  "Under Review": "bg-warning/10 text-warning border-warning/25",
  Approved: "bg-primary/10 text-primary border-primary/25",
  Published: "bg-success/10 text-success border-success/20",
  Closed: "bg-muted text-muted-foreground border-border",
  Paused: "bg-secondary text-secondary-foreground border-border",
  New: "bg-primary/10 text-primary border-primary/25",
  Reviewed: "bg-muted text-foreground border-border",
  Shortlisted: "bg-success/10 text-success border-success/25",
  Rejected: "bg-destructive/10 text-destructive border-destructive/25",
  Selected: "bg-primary text-primary-foreground border-primary",
  Sent: "bg-muted text-foreground border-border",
  Viewed: "bg-primary/10 text-primary border-primary/25",
  Declined: "bg-destructive/10 text-destructive border-destructive/25",
  "In Discussion": "bg-warning/10 text-warning border-warning/25",
  Accepted: "bg-success/10 text-success border-success/20",
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || "bg-muted text-muted-foreground border-border";
  return (
    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap", style)}>
      {status}
    </span>
  );
}

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    backHref?: string;
    backLabel?: string;
}

export function PageHeader({ title, description, action, backHref, backLabel }: PageHeaderProps) {
    return (
        <div className="space-y-4 pb-6">
            {backHref && (
                <Link href={backHref} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-2">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {backLabel || "Back"}
                </Link>
            )}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/design-tokens';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
  isBorderless?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  isBorderless = false,
}: EmptyStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      {Icon && (
        <div className="p-4 bg-slate-100 rounded-full text-slate-400">
          <Icon className="h-8 w-8" />
        </div>
      )}
      <div className="max-w-xs space-y-1">
        <h3 className={typography.cardTitle}>{title}</h3>
        <p className={typography.muted}>{description}</p>
      </div>
      {action && <div className="mt-2 text-center flex justify-center">{action}</div>}
    </div>
  );

  if (isBorderless) {
    return <div className={cn('w-full', className)}>{content}</div>;
  }

  return (
    <Card className={cn('border-dashed border-2 border-slate-200/60 bg-transparent shadow-none w-full shrink-0', className)}>
      <CardContent className="p-0">
        {content}
      </CardContent>
    </Card>
  );
}

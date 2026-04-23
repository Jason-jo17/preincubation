import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/design-tokens';

interface ContentCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  onClick?: () => void;
}

export function ContentCard({
  title,
  description,
  children,
  footer,
  headerActions,
  className,
  contentClassName,
  headerClassName,
  onClick,
}: ContentCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        'overflow-hidden border-slate-200/60 shadow-sm transition-all',
        onClick && 'cursor-pointer hover:shadow-md hover:border-slate-300',
        className
      )}
    >
      {(title || description || headerActions) && (
        <CardHeader className={cn('flex flex-row items-start justify-between space-y-0 pb-3', headerClassName)}>
          <div className="space-y-1">
            {title && <CardTitle className={typography.cardTitle}>{title}</CardTitle>}
            {description && <CardDescription className={typography.muted}>{description}</CardDescription>}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </CardHeader>
      )}
      <CardContent className={cn('pb-4', contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn('bg-slate-50/50 border-t py-3', onClick && 'group-hover:bg-slate-100/50 transition-colors')}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

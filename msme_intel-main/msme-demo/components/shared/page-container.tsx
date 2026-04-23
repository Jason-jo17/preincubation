import React from 'react';
import { cn } from '@/lib/utils';
import { typography, spacing } from '@/lib/design-tokens';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageContainer({
  children,
  title,
  description,
  actions,
  breadcrumbs,
  className,
}: PageContainerProps) {
  return (
    <div className={cn(spacing.page, 'page-transition', className)}>
      {breadcrumbs && (
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div>
            {title && <h1 className={typography.pageTitle}>{title}</h1>}
            {description && (
              <p className={cn(typography.body, 'text-muted-foreground mt-1')}>
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

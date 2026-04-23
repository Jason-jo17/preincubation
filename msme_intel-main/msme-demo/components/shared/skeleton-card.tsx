import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden border-slate-200/60 shadow-none', className)}>
      <CardHeader className="pb-3 border-b-0 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-full" />
      </CardHeader>
      <CardContent className="py-6 space-y-4">
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
           <Skeleton className="h-4 w-16 rounded-full" />
           <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonMetric({ className }: { className?: string }) {
  return (
    <Card className={cn('p-4 space-y-3 shadow-none border-slate-200/60', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-32" />
    </Card>
  );
}

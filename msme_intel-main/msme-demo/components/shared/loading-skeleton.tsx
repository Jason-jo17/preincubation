import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
    count?: number;
    className?: string;
}

export function LoadingSkeleton({ count = 3, className }: LoadingSkeletonProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
        </div>
    );
}

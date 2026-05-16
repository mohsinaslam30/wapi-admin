"use client";

import { Skeleton } from "@/src/elements/ui/skeleton";

const PlanSkeleton = () => {
  return (
    <div className="relative bg-white dark:bg-(--card-color) rounded-lg border border-slate-200 dark:border-(--card-border-color) p-6 flex flex-col h-full w-full">
      {/* Plan Header */}
      <div className="text-center mb-6 flex flex-col items-center">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-baseline justify-center gap-1">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Usage Limits Section */}
      <div className="mb-6">
        <Skeleton className="h-4 w-1/3 mb-3" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-1">
              <Skeleton className="mt-0.5 h-4 w-4 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="mb-6">
        <Skeleton className="h-4 w-1/3 mb-3" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="mt-0.5 h-4 w-4 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto flex-wrap">
        <Skeleton className="h-14 flex-1 rounded-lg" />
        <Skeleton className="h-14 flex-1 rounded-lg" />
      </div>
    </div>
  );
};

export default PlanSkeleton;

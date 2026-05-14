import React from 'react';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/5 ${className}`}
      {...props}
    />
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-6 bg-surface border border-white/5 rounded-2xl">
          <Skeleton className="w-24 h-3 mb-4" />
          <Skeleton className="w-16 h-8" />
        </div>
      ))}
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="p-8 bg-surface border border-white/5 rounded-3xl h-[300px]">
      <Skeleton className="w-40 h-4 mb-8" />
      <div className="flex items-end gap-4 h-[180px]">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 80 + 20}%` }} />
        ))}
      </div>
    </div>
  );
};

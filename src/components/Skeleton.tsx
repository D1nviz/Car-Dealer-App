import { cn } from '@/lib/utils';
import React from 'react';

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className = 'w-full h-10' }) => {
  return (
    <div className={cn('animate-pulse bg-gray-200 rounded-md', className)} />
  );
};

export default Skeleton;

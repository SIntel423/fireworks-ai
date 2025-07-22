import { Skeleton } from 'molecules/skeleton';

const ResultSkeletonCard = () => (
  <div className="flex w-full items-center justify-between gap-2 p-4">
    <div className="flex items-center gap-3">
      <Skeleton className="size-8 min-w-8 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-7 w-[200px]" />
        <Skeleton className="h-4.5 w-12" />
      </div>
    </div>
  </div>
);

export default ResultSkeletonCard;

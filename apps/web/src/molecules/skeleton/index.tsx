import { twJoin } from 'tailwind-merge';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={twJoin('animate-pulse rounded-md bg-neutrals-500/10', className)} {...props} />
);

export { Skeleton };

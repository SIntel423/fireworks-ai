'use client';

import { usePathname } from 'next/navigation';

import generateBreadcrumbs from 'molecules/breadcrumbs/utils/generateBreadcrumbs';
import Icon from 'molecules/icon';
import Link from 'molecules/link';

import type { FC } from 'react';

interface BreadcrumbProps {
  breadcrumbTitle?: string;
}

const Deliminator = () => (
  <div className="">
    <Icon icon="chevron-right" size={14} className="shrink-0" />
  </div>
);

const BreadcrumbLink = ({ link, label }: { link: string; label: string }) => (
  <>
    <Link href={link} className="text-sm text-nowrap text-neutrals-900 dark:text-white">
      {label}
    </Link>
    <Deliminator />
  </>
);

const Breadcrumbs: FC<BreadcrumbProps> = ({ breadcrumbTitle }) => {
  const pathname = usePathname(),
    breadcrumbs = generateBreadcrumbs(pathname || '');

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link href="/">
        <Icon icon="home-02" size={20} className="stroke-2" />
      </Link>
      <Deliminator />
      {breadcrumbs.map(({ id, link, label }, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return isLast ? (
          <span key={id} className="truncate text-sm text-purple-400 dark:text-purple-200">
            {breadcrumbTitle || label}
          </span>
        ) : (
          <BreadcrumbLink key={id} link={link} label={label} />
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

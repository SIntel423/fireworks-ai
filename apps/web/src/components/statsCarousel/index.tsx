'use client';

import { useEffect } from 'react';

import StatCarouselContent from 'components/statsCarousel/components/content';
import StatCarouselMedia from 'components/statsCarousel/components/media';
import StatCarouselPagination from 'components/statsCarousel/components/pagination';
import StatCarouselSteps from 'components/statsCarousel/components/steps';
import { setTotalPages } from 'components/statsCarousel/store';

import { hasArrayValues } from '@packages/utils/src/arrays';

import type { StatsCarouselFragment } from 'components/statsCarousel/query';
import type { FC } from 'react';

const StatsCarousel: FC<StatsCarouselFragment> = ({ panels }) => {
  useEffect(() => {
    setTotalPages(panels?.length || 1);
  }, [panels]);

  return (
    <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl bg-white lg:grid-cols-12">
      <div className="col-span-7 flex w-full shrink-0 flex-col gap-12 px-4 py-8 sm:gap-16 sm:p-12">
        <div className="flex flex-col gap-8 sm:gap-12">
          <StatCarouselContent panels={panels} />
          {hasArrayValues(panels) && panels.length > 1 &&
            <div className="flex w-full flex-col gap-16 lg:flex-row lg:items-center lg:gap-20">
              <StatCarouselSteps />
              <StatCarouselPagination />
            </div>
          }
        </div>
      </div>
      <StatCarouselMedia panels={panels} />
    </div>
  );
};

export default StatsCarousel;

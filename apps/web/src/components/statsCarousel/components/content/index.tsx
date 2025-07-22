import { hasArrayValues } from '@packages/utils/src/arrays';

import { useStatsPage } from 'components/statsCarousel/store';

import type { StatsCarouselFragment } from 'components/statsCarousel/query';
import type { FC } from 'react';

const StatCarouselContent: FC<Pick<StatsCarouselFragment, 'panels'>> = ({ panels }) => {
  const currentPage = useStatsPage();

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      {hasArrayValues(panels) &&
        panels.map((panel, index) => (
          <div
            key={panel._key}
            className="col-start-1 row-start-1 transition-opacity duration-300 aria-[hidden=false]:z-10 aria-[hidden=true]:pointer-events-none aria-[hidden=true]:z-0 aria-[hidden=true]:opacity-0 aria-[hidden=true]:select-none"
            aria-hidden={currentPage !== index}
          >
            <h3 className="pb-8 text-display-md font-medium sm:text-display-lg">{panel.title}</h3>
            {hasArrayValues(panel.stats) &&
              panel.stats.map(stat => (
                <div key={stat._key} className="border-t border-gray/20 py-6">
                  {stat.stat && <h4 className="mb-2 text-display-sm font-medium text-purple-400">{stat.stat}</h4>}
                  {stat.description && <div className="text-md font-medium text-gray/80">{stat.description}</div>}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default StatCarouselContent;

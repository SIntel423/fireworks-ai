import { hasArrayValues } from '@packages/utils/src/arrays';

import Image from 'molecules/image';
import Rive from 'molecules/richText/config/components/rive';
import Video from 'molecules/richText/config/components/video';

import { useStatsPage } from 'components/statsCarousel/store';

import type { StatsCarouselFragment, StatsPanelFragment } from 'components/statsCarousel/query';
import type { FC } from 'react';

const getMedia = (
  mediaType: StatsPanelFragment['mediaType'],
  featuredImage?: StatsPanelFragment['featuredImage'],
  media?: StatsPanelFragment['media'],
) => {
  switch (mediaType) {
    case 'image':
      return featuredImage && <Image {...featuredImage} noFill objectCover className="size-full" />;
    case 'media':
      switch (media?._type) {
        case 'rive':
          return <Rive {...media} />;
        case 'video':
          return <Video {...media} noAspect />;
        default:
          return null;
      }
    default:
      return null;
  }
};

const StatCarouselMedia: FC<Pick<StatsCarouselFragment, 'panels'>> = ({ panels }) => {
  const currentPage = useStatsPage();

  return (
    <div className="grid w-full shrink-0 grid-cols-1 grid-rows-1 lg:col-span-5">
      {hasArrayValues(panels) &&
        panels.map((panel, index) => (
          <div
            key={`featured-${panel._key}`}
            className="col-start-1 row-start-1 transition-opacity duration-300 aria-[hidden=true]:pointer-events-none aria-[hidden=true]:z-0 aria-[hidden=true]:opacity-0 aria-[hidden=true]:select-none [&_canvas]:h-full! [&>div]:h-full!"
            aria-hidden={currentPage !== index}
          >
            {getMedia(panel.mediaType, panel.featuredImage, panel.media)}
          </div>
        ))}
    </div>
  );
};

export default StatCarouselMedia;

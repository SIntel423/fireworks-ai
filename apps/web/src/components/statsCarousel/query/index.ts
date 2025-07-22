import { imageFragment } from 'molecules/image';
import { riveFragment } from 'molecules/richText/config/components/rive/query';
import { videoFragment } from 'molecules/richText/config/components/video/query';
import { sectionFragment } from 'molecules/section';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type StatsCarouselQuery = ExtractSanityType<Page, 'statsCarousel'>;
type StatsPanelQuery = StripMaybe<StripArray<StatsCarouselQuery['panels']>>;

export const statPanelFragment = q.fragment<StatsPanelQuery>().project(panel => ({
  _key: q.string(),
  title: q.string().optional().nullable(),
  stats: panel.field('stats[]').project({
    _key: q.string(),
    stat: q.string().optional().nullable(),
    description: q.string().optional().nullable(),
  }).nullable(true),
  featuredImage: panel.field('featuredImage').project(imageFragment).nullable(true),
  mediaType: q
    .union([q.literal('image'), q.literal('media')])
    .optional()
    .nullable(),
  media: panel
    .field('media')
    .deref()
    .project(media => ({
      ...media.conditionalByType({
        rive: riveFragment,
        video: videoFragment,
      }),
    }))
    .nullable(true),
}));

export const statsCarouselFragment = q.fragment<StatsCarouselQuery>().project(stats => ({
  _key: q.string(),
  panels: stats.field('panels[]').project(statPanelFragment).nullable(true),
  ...sectionFragment,
}));

export type StatsCarouselFragment = InferFragmentType<typeof statsCarouselFragment>;
export type StatsPanelFragment = InferFragmentType<typeof statPanelFragment>;

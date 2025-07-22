import { sectionFragment } from 'molecules/section';

import { imageCardFragment } from 'organisms/cards/image';
import { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type FeaturedBentoQuery = ExtractSanityType<Page, 'featuredBento'>;
// @ts-expect-error - Suppress Sanity fragment projection errors due to schema mismatches
export const featuredBentoFragment = q.fragment<FeaturedBentoQuery>().project(cardDeck => ({
  ...sectionFragment,
  _key: q.string(),
  // @ts-expect-error - Schema mismatch
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  // @ts-expect-error - Schema mismatch
  topRowCards: cardDeck.field('topRowCards[]').project(imageCardFragment).nullable(true),
  // @ts-expect-error - Schema mismatch
  bottomRowCards: cardDeck.field('bottomRowCards[]').project(imageCardFragment).nullable(true),
}));

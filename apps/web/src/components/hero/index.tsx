import dynamic from 'next/dynamic';

import { riveFragment } from 'molecules/richText/config/components/rive/query';
import { sectionFragment } from 'molecules/section';

import { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { BackgroundImageTypes } from '@packages/ui/backgrounds';
import type { InferFragmentType } from 'groqd';
import type { HeadingProps } from 'organisms/heading';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

const SimpleHero = dynamic(() => import('components/hero/variations/simple')),
  LeftAlignedHero = dynamic(() => import('components/hero/variations/statement'));

export interface HeroFragment extends Omit<InferFragmentType<typeof heroFragment>, 'heading'> {
  heading: HeadingProps | null;
}

const Hero: FC<HeroFragment> = ({ variation, ...props }) => {
  switch (variation) {
    case 'simple':
      return <SimpleHero {...props} />;
    case 'statement':
      return <LeftAlignedHero {...props} />;
    default:
      return null;
  }
};

type HeroQuery = ExtractSanityType<Page, 'hero'>;
export const heroFragment = q.fragment<HeroQuery>().project(hero => ({
  _key: q.string(),
  variation: q
    .union([q.literal('simple'), q.literal('statement')])
    .optional()
    .nullable(),
  heading: hero.field('heading').project(headingFragment).nullable(true),
  bgImage: hero.field('bgImage').as<BackgroundImageTypes>().nullable(),
  rive: hero.field('rive').deref().project(riveFragment).nullable(true),
  alignment: q.union([q.literal('left'), q.literal('center')]).nullable(),
  disableBreadcrumbs: q.boolean().optional().nullable(),
  buttonType: q
    .union([q.literal('standard'), q.literal('wide')])
    .optional()
    .nullable(),
  ...sectionFragment,
}));

export default Hero;

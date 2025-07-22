import dynamic from 'next/dynamic';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Section from 'molecules/section';
import { splitSectionProps } from 'molecules/section/utils';

import { featuredBentoFragment } from 'components/cardDeck/featuredBento/fragment';
import { iconCardDeckFragment } from 'components/cardDeck/icon';
import { imageCardDeckFragment } from 'components/cardDeck/image';
import { leadershipCardDeckFragment } from 'components/cardDeck/leadership';
import { partnerCardDeckFragment } from 'components/cardDeck/partner';
import { pricingCardDeckFragment } from 'components/cardDeck/pricing';
import { providerCardDeckFragment } from 'components/cardDeck/provider';
import { resourceCardDeckFragment } from 'components/cardDeck/resource';
import { headingComponentFragment } from 'components/heading';
import { heroFragment } from 'components/hero';
import { listingFragment } from 'components/listing';
import { statsCarouselFragment } from 'components/statsCarousel/query';
import { switchbackFragment } from 'components/switchback';
import { tableFragment } from 'components/table';
import { testimonialsFragment } from 'components/testimonials';
import { trustbarFragment } from 'components/trustbar';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { SectionQueryProps } from 'molecules/section';
import type { FC } from 'react';
import type { Page } from 'types/sanity.types';

const Heading = dynamic(() => import('components/heading')),
  Hero = dynamic(() => import('components/hero')),
  FeaturedBento = dynamic(() => import('components/cardDeck/featuredBento')),
  IconCardDeck = dynamic(() => import('components/cardDeck/icon')),
  ImageCardDeck = dynamic(() => import('components/cardDeck/image')),
  LeadershipCardDeck = dynamic(() => import('components/cardDeck/leadership')),
  Listing = dynamic(() => import('components/listing')),
  ResourceCardDeck = dynamic(() => import('components/cardDeck/resource')),
  PartnerCardDeck = dynamic(() => import('components/cardDeck/partner')),
  PricingCardDeck = dynamic(() => import('components/cardDeck/pricing')),
  ProviderCardDeck = dynamic(() => import('components/cardDeck/provider')),
  StatsCarousel = dynamic(() => import('components/statsCarousel')),
  Switchback = dynamic(() => import('components/switchback')),
  Table = dynamic(() => import('components/table')),
  Testimonials = dynamic(() => import('components/testimonials')),
  Trustbar = dynamic(() => import('components/trustbar'));

export type ComponentProps = InferFragmentType<typeof componentGeneratorFragment>;
export type ComponentPropsWithSymbols = InferFragmentType<typeof componentGeneratorWithSymbolsFragment>;

interface componentGeneratorProps {
  sections: ComponentPropsWithSymbols[] | null;
}

const getComponent = (component: ComponentProps, sectionProps: SectionQueryProps) => {
  // Type guard to ensure component has required properties
  if (!component || typeof component !== 'object' || !component._type)
    return null;

  try {
    switch (component._type) {
      case 'heading':
        return <Heading {...(component as any)} />;
      case 'hero':
        return <Hero {...(component as any)} />;
      case 'featuredBento':
        return <FeaturedBento {...(component as any)} />;
      case 'iconCardDeck':
        return <IconCardDeck {...(component as any)} />;
      case 'leadershipCardDeck':
        return <LeadershipCardDeck {...(component as any)} />;
      case 'listing':
        return <Listing {...(component as any)} />;
      case 'resourceCardDeck':
        return <ResourceCardDeck {...(component as any)} />;
      case 'partnerCardDeck':
        return <PartnerCardDeck {...(component as any)} />;
      case 'pricingCardDeck':
        return <PricingCardDeck {...(component as any)} />;
      case 'providerCardDeck':
        return <ProviderCardDeck {...(component as any)} />;
      case 'statsCarousel':
        return <StatsCarousel {...(component as any)} />;
      case 'switchback':
        return <Switchback {...(component as any)} />;
      case 'table':
        return <Table {...(component as any)} />;
      case 'testimonials':
        // Add type guard for testimonials component
        if ('heading' in component || 'testimonials' in component)
          return <Testimonials {...(component as any)} />;

        return null;
      case 'imageCardDeck':
        // Add type guard for imageCardDeck component
        if ('heading' in component || 'cards' in component)
          return <ImageCardDeck {...(component as any)} />;

        return null;
      case 'trustbar':
        // Add type guard for trustbar component
        if ('companies' in component || Object.keys(component).length > 1)
          return <Trustbar isDark={sectionProps.backgroundColor?.label === 'dark'} {...(component as any)} />;

        return null;
      default:
        return null;
    }
  } catch (error) {
    console.warn(`Error rendering component of type ${component._type}:`, error);
    return null;
  }
};

const ComponentGenerator: FC<componentGeneratorProps> = ({ sections }) => {
  if (hasArrayValues(sections))
    return (
      <>
        {hasArrayValues(sections) &&
          sections.map(section => {
            // Skip sections without _key or _id instead of throwing an error
            if (!('_key' in section) && !('_id' in section)) {
              console.warn(`Warning: Skipping section with type ${section._type} - missing _key or _id`);
              
              return null;
            }

            const { sectionProps, rest } = splitSectionProps(section),
              key = '_key' in section ? section._key : section._id;

            // Handle symbol type
            if (section._type === 'symbol') {
              if (section.content)
                return <ComponentGenerator key={key} sections={section.content} />;
              
              return null;
            }
            
            // Get the component for this section type
            const component = getComponent(rest, sectionProps);
            
            // If no matching component is found, skip this section instead of breaking
            if (component === null) {
              console.warn(`Warning: Unknown section type '${section._type}' - skipping this section`);
              
              return null;
            }
            
            // Render the section with its component
            
            return (
              <Section key={key} {...sectionProps} className={rest._type === 'testimonials' ? 'overflow-hidden' : ''}>
                {component}
              </Section>
            );
          })}
      </>
    );

  return null;
};

export type PageBody = Page['body'];

export const componentGeneratorCondition = {
  heading: headingComponentFragment,
  hero: heroFragment,
  featuredBento: featuredBentoFragment,
  iconCardDeck: iconCardDeckFragment,
  imageCardDeck: imageCardDeckFragment,
  leadershipCardDeck: leadershipCardDeckFragment,
  listing: listingFragment,
  partnerCardDeck: partnerCardDeckFragment,
  pricingCardDeck: pricingCardDeckFragment,
  providerCardDeck: providerCardDeckFragment,
  resourceCardDeck: resourceCardDeckFragment,
  statsCarousel: statsCarouselFragment,
  switchback: switchbackFragment,
  table: tableFragment,
  testimonials: testimonialsFragment,
  trustbar: trustbarFragment,
};

const symbolFragment = q.fragmentForType<'symbol'>().project(body => ({
  _id: q.string(),
  name: q.string().optional().nullable(),
  // @ts-expect-error - Sanity fragment projection type mismatch
  content: body.field('content[]').project(content => ({ ...content.conditionalByType(componentGeneratorCondition) })),
}));

export const componentGeneratorConditionWithSymbol = {
  ...componentGeneratorCondition,
  symbol: symbolFragment,
  symbolReference: {
    _type: q.literal('symbolReference'),
    _key: q.string(),
    // @ts-expect-error ts having a hard time with conditional derefs
    symbolReference: q.raw('@->').project(symbolFragment),
  },
};

// @ts-expect-error - Suppress Sanity fragment projection errors
export const componentGeneratorFragment = q
    .fragment<PageBody>()
    .project(body => ({ ...body.conditionalByType(componentGeneratorCondition) })),
  // @ts-expect-error - Sanity fragment projection type mismatch
  componentGeneratorWithSymbolsFragment = q
    .fragment<PageBody>()
    .project(body => ({ ...body.conditionalByType(componentGeneratorConditionWithSymbol) }));

export default ComponentGenerator;

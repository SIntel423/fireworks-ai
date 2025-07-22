import { objectEntries } from '@packages/utils/src/typeUtils';

import featuredBento from '@/schemas/components/featuredBento';
import heading from '@/schemas/components/heading';
import hero from '@/schemas/components/hero';
import iconCardDeck from '@/schemas/components/iconCardDeck';
import imageCardDeck from '@/schemas/components/imageCardDeck';
import leadershipCardDeck from '@/schemas/components/leadershipCardDeck';
import listing from '@/schemas/components/listing';
import partnerCardDeck from '@/schemas/components/partnerCardDeck';
import pricingCardDeck from '@/schemas/components/pricingCardDeck';
import providerCardDeck from '@/schemas/components/providerCardDeck';
import resourceCardDeck from '@/schemas/components/resourceCardDeck';
import StatsCarousel from '@/schemas/components/statsCarousel';
import switchback from '@/schemas/components/switchback';
import table from '@/schemas/components/table';
import testimonials from '@/schemas/components/testimonials';
import trustbar from '@/schemas/components/trustbar';
import { symbolReference } from '@/schemas/documents/symbol/reference';

import type { InsertMenuOptions, ObjectDefinition, ReferenceDefinition } from 'sanity';

type ComponentTypes = 'Intro' | 'Block' | 'Deck' | 'Reusable' | 'Singleton';
type MenuGroups = InsertMenuOptions['groups'];

interface ComponentSchema {
  type: ComponentTypes;
  component: ObjectDefinition | ReferenceDefinition;
}

const componentSchemas = {
  hero: { type: 'Intro', component: hero },
  heading: { type: 'Block', component: heading },
  featuredBento: { type: 'Deck', component: featuredBento },
  iconCardDeck: { type: 'Deck', component: iconCardDeck },
  imageCardDeck: { type: 'Deck', component: imageCardDeck },
  leadershipCardDeck: { type: 'Deck', component: leadershipCardDeck },
  listing: { type: 'Singleton', component: listing },
  partnerCardDeck: { type: 'Deck', component: partnerCardDeck },
  pricingCardDeck: { type: 'Deck', component: pricingCardDeck },
  providerCardDeck: { type: 'Deck', component: providerCardDeck },
  resourceCardDeck: { type: 'Deck', component: resourceCardDeck },
  testimonials: { type: 'Block', component: testimonials },
  statsCarousel: { type: 'Block', component: StatsCarousel },
  switchback: { type: 'Block', component: switchback },
  table: { type: 'Block', component: table },
  trustbar: { type: 'Block', component: trustbar },

  symbol: {
    type: 'Reusable',
    component: symbolReference,
  },
} as Record<string, ComponentSchema>;

export const components = Object.values(componentSchemas).map(({ component }) => component);
export const componentsByType = objectEntries(componentSchemas).reduce(
  (acc, [key, { type }]) => {
    const typeIndex = acc && acc.findIndex(group => group.name === type);

    if (typeIndex >= 0) {
      acc[typeIndex].of?.push(key);

      return acc;
    }

    return [...acc, { name: type, title: type, of: [key] }];
  },
  [] as Exclude<MenuGroups, undefined | null | never>,
);

export default componentSchemas;

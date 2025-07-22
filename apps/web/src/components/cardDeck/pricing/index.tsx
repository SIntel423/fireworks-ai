import { hasArrayValues } from '@packages/utils/src/arrays';

import { sectionFragment } from 'molecules/section';

import PricingCard, { pricingCardFragment } from 'organisms/cards/pricing';
import Heading, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type PricingCardDeckFragment = InferFragmentType<typeof pricingCardDeckFragment>;

const PricingCardDeck: FC<PricingCardDeckFragment> = ({ heading, cards }) => (
  <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
    <Heading {...heading} alignment="left" size="lg" />
    {hasArrayValues(cards) && (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(card => (
          <PricingCard key={card._key} {...card} />
        ))}
      </div>
    )}
  </div>
);

type PricingCardDeckQuery = ExtractSanityType<Page, 'pricingCardDeck'>;
export const pricingCardDeckFragment = q.fragment<PricingCardDeckQuery>().project(cardDeck => ({
  _key: q.string(),
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  cards: cardDeck.field('cards[]').project(pricingCardFragment).nullable(true),
  ...sectionFragment,
}));

export default PricingCardDeck;

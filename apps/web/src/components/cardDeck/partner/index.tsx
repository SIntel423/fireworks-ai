import { hasArrayValues } from '@packages/utils/src/arrays';

import { sectionFragment } from 'molecules/section';

import PartnerCard, { partnerCardFragment } from 'organisms/cards/partner';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type PartnerCardDeckFragment = InferFragmentType<typeof partnerCardDeckFragment>;

const PartnerCardDeck: FC<PartnerCardDeckFragment> = ({ heading, cards }) => (
  <div className="flex w-full flex-col gap-6 sm:gap-8">
    {heading && (
      <h2 className="py-6 text-display-xs font-medium text-headline sm:py-8 sm:text-display-sm lg:py-10 lg:text-display-lg">
        {heading}
      </h2>
    )}
    <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 md:gap-6 lg:gap-4.5">
      {hasArrayValues(cards) && cards.map(card => <PartnerCard key={card._key} {...card} />)}
    </div>
  </div>
);

type PartnerCardDeckQuery = ExtractSanityType<Page, 'partnerCardDeck'>;

export const partnerCardDeckFragment = q.fragment<PartnerCardDeckQuery>().project(deck => ({
  _key: q.string(),
  heading: q.string().optional().nullable(),
  cards: deck.field('cards[]').project(partnerCardFragment).nullable(true),
  ...sectionFragment,
}));

export default PartnerCardDeck;

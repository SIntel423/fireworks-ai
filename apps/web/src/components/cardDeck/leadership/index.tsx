import { hasArrayValues } from '@packages/utils/src/arrays';

import { personFragment } from 'molecules/attribution';
import { sectionFragment } from 'molecules/section';

import PersonCard from 'organisms/cards/person';
import Heading, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type LeadershipCardDeckFragment = InferFragmentType<typeof leadershipCardDeckFragment>;

const LeadershipCardDeck: FC<LeadershipCardDeckFragment> = ({ heading, cards }) => (
  <div className="flex w-full flex-col gap-6 sm:gap-8">
    {heading && <Heading {...heading} alignment="left" size="2xl" />}
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {hasArrayValues(cards) && cards.map(card => <PersonCard key={card._id} {...card} />)}
    </div>
  </div>
);

type LeadershipCardDeckQuery = ExtractSanityType<Page, 'leadershipCardDeck'>;

export const leadershipCardDeckFragment = q.fragment<LeadershipCardDeckQuery>().project(deck => ({
  _key: q.string(),
  heading: deck.field('heading').project(headingFragment).nullable(true),
  cards: deck.field('cards[]').deref().project(personFragment).nullable(true),
  ...sectionFragment,
}));

export default LeadershipCardDeck;

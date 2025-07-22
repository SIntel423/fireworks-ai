import { hasArrayValues } from '@packages/utils/src/arrays';

import ElementAnimation from 'molecules/elementAnimation';
import { sectionFragment } from 'molecules/section';

import ResourceCard, { resourceCardFragment } from 'organisms/cards/resource';
import Heading, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ResourceCardDeckFragment = InferFragmentType<typeof resourceCardDeckFragment>;

const ResourceCardDeck: FC<ResourceCardDeckFragment> = ({ heading, cards, latestBlogs }) => {
  const resources = [...(cards || []), ...(latestBlogs || [])].slice(0, 3);

  return (
    <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
      <Heading {...heading} alignment="left" size="lg" />
      {hasArrayValues(cards) && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:flex">
          {resources.map((card, ind) => (
            <ElementAnimation
              key={card._id}
              animation="slideInBottom"
              delay={ind * 100}
              className="w-full lg:shrink-0 lg:grow lg:basis-0"
            >
              <ResourceCard {...card} />
            </ElementAnimation>
          ))}
        </div>
      )}
    </div>
  );
};

type ResourceCardDeckQuery = ExtractSanityType<Page, 'resourceCardDeck'>;
export const resourceCardDeckFragment = q.fragment<ResourceCardDeckQuery>().project(cardDeck => ({
  _key: q.string(),
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  cards: cardDeck.field('cards[]').deref().project(resourceCardFragment).nullable(true),
  latestBlogs: q.star
    .filterByType('blog')
    .order('publishedDate desc')
    .slice(0, 3)
    .project(resourceCardFragment)
    .nullable(),
  ...sectionFragment,
}));

export default ResourceCardDeck;

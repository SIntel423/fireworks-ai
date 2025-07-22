import { hasArrayValues } from '@packages/utils/src/arrays';

import ElementAnimation from 'molecules/elementAnimation';
import { sectionFragment } from 'molecules/section';

import ImageCard, { imageCardFragment } from 'organisms/cards/image';
import Heading, { headingFragment } from 'organisms/heading';

import Carousel from 'components/cardDeck/image/components/Carousel';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ImageCardDeckFragment = InferFragmentType<typeof imageCardDeckFragment>;

const ImageCardDeck: FC<ImageCardDeckFragment> = ({ heading, cards, variants }) => (
  <div className="flex w-full flex-col gap-18 sm:gap-20 lg:gap-24">
    <Heading {...heading} alignment="left" size="lg" />
    {hasArrayValues(cards) && (variants === 'grid' ? (
      <div className="grid h-full grid-cols-1 items-stretch gap-6 [&>div>div]:h-full md:grid-cols-3">
        {cards.map((card, index) => (
            <ElementAnimation key={`card-${index + 1}`} animation="slideInBottom" delay={index * 100}>
              <ImageCard {...card} />
            </ElementAnimation>
        ))}
      </div>
    ) : (
      <Carousel slides={cards} />
    ))}
  </div>
);

type ImageCardDeckQuery = ExtractSanityType<Page, 'imageCardDeck'>;
export const imageCardDeckFragment = q.fragment<ImageCardDeckQuery>().project(cardDeck => ({
  _key: q.string(),
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  variants: q
    .union([q.literal('grid'), q.literal('carousel')])
    .optional()
    .nullable(),
  cards: cardDeck.field('cards[]').project(imageCardFragment).nullable(true),
  ...sectionFragment,
}));

export default ImageCardDeck;

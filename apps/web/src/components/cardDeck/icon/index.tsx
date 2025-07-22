import { hasArrayValues } from '@packages/utils/src/arrays';

import ElementAnimation from 'molecules/elementAnimation';
import { sectionFragment } from 'molecules/section';

import IconCard, { iconCardFragment } from 'organisms/cards/icon';
import Heading, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type IconCardDeckFragment = InferFragmentType<typeof iconCardDeckFragment>;

const IconCardDeck: FC<IconCardDeckFragment> = ({ heading, decks, showArrowBgGraphic }) => (
  <div className="dark flex flex-col gap-8 overflow-hidden rounded-2xl bg-black px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:p-10">
    <Heading {...heading} alignment="left" size="2xl" />
    {showArrowBgGraphic && <div className="bleed-x-4 h-[104px] bg-[url('/backgrounds/arrows.svg')] mask-image-marquee bg-repeat-x mask-composite-add sm:bleed-x-8 sm:h-[140px] lg:bleed-x-10" />}
    {hasArrayValues(decks) && (
      <div className="flex w-full flex-col gap-12 lg:gap-8">
        {decks.map(deck => (
          <div key={deck.title} className="flex w-full flex-col gap-8">
            {deck.title && <h3 className="text-display-xs font-medium text-headline">{deck.title}</h3>}
            <div className="grid h-full grid-cols-2 items-stretch gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:gap-6">
              {hasArrayValues(deck.cards) &&
                deck.cards.map((card, index) => (
                  <ElementAnimation key={`card-${index + 1}`} animation="slideInBottom" delay={index * 100}>
                    <IconCard {...card} />
                  </ElementAnimation>
                ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

type IconCardDeckQuery = ExtractSanityType<Page, 'iconCardDeck'>;
export const iconCardDeckFragment = q.fragment<IconCardDeckQuery>().project(cardDeck => ({
  _key: q.string(),
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  decks: cardDeck
    .field('decks[]')
    .project(deck => ({
      title: q.string().optional().nullable(),
      cards: deck.field('cards[]').project(iconCardFragment).nullable(true),
    }))
    .nullable(true),
  showArrowBgGraphic: q.boolean().nullable(),
  ...sectionFragment,
}));

export default IconCardDeck;

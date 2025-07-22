import { hasArrayValues } from '@packages/utils/src/arrays';

import { sectionFragment } from 'molecules/section';

import ProviderCard, { providerCardFragment } from 'organisms/cards/provider';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ProviderCardDeckFragment = InferFragmentType<typeof providerCardDeckFragment>;

const ProviderCardDeck: FC<ProviderCardDeckFragment> = ({ providers, heading }) => (
  <div>
    {heading && (
      <h2 className="py-6 text-display-xs font-medium text-headline sm:py-8 sm:text-display-sm lg:py-10 lg:text-display-lg">
        {heading}
      </h2>
    )}
    {hasArrayValues(providers) && (
      <div
        className="grid grid-cols-2 gap-5 sm:grid-cols-[repeat(calc(var(--cards)/2),_minmax(0,_1fr))] xl:grid-cols-[repeat(var(--cards),_minmax(0,_1fr))]"
        style={{ '--cards': providers?.length || 0 }}
      >
        {providers?.map(provider => <ProviderCard key={provider._key} {...provider} />)}
      </div>
    )}
  </div>
);

export type ProviderCardDeckQuery = ExtractSanityType<Page, 'providerCardDeck'>;
export const providerCardDeckFragment = q.fragment<ProviderCardDeckQuery>().project(deck => ({
  _key: q.string(),
  heading: q.string().optional().nullable(),
  providers: deck
    .field('providers[]')
    .project({
      _key: q.string(),
      ...providerCardFragment,
    })
    .nullable(true),
  ...sectionFragment,
}));

export default ProviderCardDeck;

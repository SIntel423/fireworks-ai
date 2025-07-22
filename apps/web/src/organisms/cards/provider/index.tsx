import { companyFragment } from 'molecules/attribution';
import Image from 'molecules/image';
import Link, { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import type { ProviderCardDeckQuery } from 'components/cardDeck/provider';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type ProviderCardFragment = InferFragmentType<typeof providerCardFragment>;

const ProviderCard: FC<ProviderCardFragment> = ({ provider, link }) => (
  <Link
    href={link}
    className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg bg-white p-4 shadow-none transition-shadow hover:shadow-lg sm:p-5"
  >
    {provider?.company?.mark && (
      <Image
        {...provider.company.mark}
        aspectRatio="1/1"
        className="max-w-24 shrink-0 grow-1 object-contain"
        unsetMaxWidth
      />
    )}
    <h3 className="text-xs text-neutrals-400">{provider?.company?.name}</h3>
  </Link>
);

export const providerFragment = q.fragmentForType<'provider'>().project(provider => ({
  company: provider.field('company').deref().project(companyFragment).nullable(true),
}));

export const providerCardFragment = q.fragment<StripArray<ProviderCardDeckQuery['providers']>>().project(provider => ({
  provider: provider.field('provider').deref().project(providerFragment).nullable(true),
  link: provider.field('link').project(linkFragment).nullable(true),
}));

export default ProviderCard;

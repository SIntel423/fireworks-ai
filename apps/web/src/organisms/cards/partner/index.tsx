import { type BackgroundImageTypes, isDarkImage } from '@packages/ui/backgrounds';

import { companyFragment } from 'molecules/attribution';
import BackgroundImage from 'molecules/backgroundImage';
import Image from 'molecules/image';
import Link, { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import { getCompanyLogo } from 'utils/getCompanyLogo';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type PartnerCardFragment = InferFragmentType<typeof partnerCardFragment>;

const PartnerCard: FC<PartnerCardFragment> = ({ background, company, link }) => {
  const isDark = !isDarkImage(background),
    logo = getCompanyLogo(company, isDark);

  return (
    <Link
      href={link}
      className="relative aspect-[300/181] w-full rounded-[10px] shadow-none transition-shadow hover:shadow-lg md:aspect-[48/29] lg:aspect-[83/50]"
    >
      <BackgroundImage
        image={background || 'texture-1'}
        className="z-10 size-full overflow-hidden rounded-lg object-cover"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        {logo && (
          <Image
            {...logo}
            alt={`${company?.name}'s logo`}
            noFill
            objectCover
            className="h-auto max-h-[78px] w-[150px] [&_img]:object-contain"
          />
        )}
      </div>
    </Link>
  );
};

type PartnerCardDeckQuery = StripMaybe<StripArray<ExtractSanityType<Page, 'partnerCardDeck', 'cards'>>>;
export const partnerCardFragment = q.fragment<PartnerCardDeckQuery>().project(card => ({
  _key: q.string(),
  company: card.field('company').deref().project(companyFragment).nullable(true),
  background: card.field('background').as<BackgroundImageTypes>().nullable(),
  link: card.field('link').project(linkFragment).nullable(true),
}));

export default PartnerCard;

import Button from 'molecules/button';
import Icon from 'molecules/icon';
import Image, { imageFragment } from 'molecules/image';
import { linkFragment } from 'molecules/link';
import RichText, { richTextFragment } from 'molecules/richText';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type ImageCardFragment = InferFragmentType<typeof imageCardFragment>;

const ImageCard: FC<ImageCardFragment> = ({ icon, content, title, featuredImage, link }) => (
  <div className="flex w-full flex-col gap-6 rounded-[10px] border border-neutrals-400 p-6 bg-image-card">
    {featuredImage && (
      <div className="aspect-video">
        <Image {...featuredImage} unsetMaxWidth unsetRatio className="aspect-video [&_img]:object-contain" />
      </div>
    )}
    <div className="flex gap-4 flex-col">
      <h4 className="text-display-xs font-medium text-purple-400 flex gap-2">
        {icon && <Icon icon={icon as IconIds} size={24} className="text-purple-400" />}
        <span>{title}</span>
      </h4>
      {content && <div className="text-lg text-black line-clamp-4 [&_strong]:font-semibold"><RichText blocks={content} /></div>}
      {(link?.link?.href || link?.internalLink?.link) &&
        <div className="pt-4">
          <Button link={link} hierarchy="link" icon="arrow-right" iconPosition="end" className="text-gray !w-fit" />
        </div>
      }
    </div>
  </div>
);

type ImageCardQuery = StripMaybe<StripArray<ExtractSanityType<Page, 'imageCardDeck', 'cards'>>>;
export const imageCardFragment = q.fragment<ImageCardQuery>().project(card => ({
  _key: q.string(),
  icon: card.field('icon').as<IconIds>().nullable(),
  title: card.field('title').nullable(true),
  subtitle: card.field('subtitle').nullable(true),
  content: card.field('content[]').project(richTextFragment).nullable(true),
  featuredImage: card.field('featuredImage').project(imageFragment).nullable(true),
  link: card.field('link').project(linkFragment).nullable(true),
}));

export default ImageCard;

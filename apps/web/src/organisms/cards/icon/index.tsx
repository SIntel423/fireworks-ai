import Icon from 'molecules/icon';
import RichText, { richTextFragment } from 'molecules/richText';

import iconCardStyles, { iconCardContentStyles } from 'organisms/cards/icon/styles';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type IconCardFragment = InferFragmentType<typeof iconCardFragment> & VariantProps<typeof iconCardStyles>;

const IconCard: FC<IconCardFragment> = ({ icon, content, theme }) => (
  <div className={iconCardStyles({ theme })}>
    <Icon icon={icon as IconIds} size={24} className="text-purple-400" />
    <div className={iconCardContentStyles({ theme })}>{content && <RichText blocks={content} />}</div>
  </div>
);

type IconCardQuery = StripMaybe<
  StripArray<StripMaybe<StripArray<ExtractSanityType<Page, 'iconCardDeck', 'decks'>>>['cards']>
>;
export const iconCardFragment = q.fragment<IconCardQuery>().project(card => ({
  _key: q.string(),
  icon: card.field('icon').as<IconIds>().nullable(),
  content: card.field('content[]').project(richTextFragment).nullable(true),
  theme: q.union([q.literal('light'), q.literal('dark')]).nullable(),
}));

export default IconCard;

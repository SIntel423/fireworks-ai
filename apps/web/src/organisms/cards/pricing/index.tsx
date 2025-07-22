import Button from 'molecules/button';
import Icon from 'molecules/icon';
import { linkFragment } from 'molecules/link';
import RichText, { richTextFragment } from 'molecules/richText';

import { pricingCardStyles } from 'organisms/cards/icon/styles';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type PricingCardFragment = InferFragmentType<typeof pricingCardFragment>;

const PricingCard: FC<PricingCardFragment> = ({ title, subtitle, icon, content, link, theme }) => (
  <div className={pricingCardStyles({ theme })}>
    <div className="flex h-full flex-col gap-12">
      <div className="flex gap-4">
        {icon && (
          <div className="w-fit text-purple-400">
            <Icon icon={icon} size={66} />
          </div>
        )}
        <div className="flex flex-col gap-1.5 text-headline">
          {title && <h3 className="text-display-xs font-medium">{title}</h3>}
          {subtitle && <p className="font-favorit text-mono-md font-medium">{subtitle}</p>}
        </div>
      </div>
      <div className="text-copy">{content && <RichText blocks={content} />}</div>
    </div>
    {link && (link.link?.href || link?.internalLink?.link) && (
      <Button
        label={link?.label || 'Sign up'}
        hierarchy="primary"
        className="w-fit"
        link={link}
        icon={null}
        iconPosition={null}
      />
    )}
  </div>
);

type PricingCardQuery = StripMaybe<StripArray<ExtractSanityType<Page, 'pricingCardDeck', 'cards'>>>;
export const pricingCardFragment = q.fragment<PricingCardQuery>().project(card => ({
  _key: q.string(),
  icon: card.field('icon').as<IconIds>().nullable(),
  title: q.string().optional().nullable(),
  subtitle: q.string().optional().nullable(),
  content: card.field('content[]').project(richTextFragment).nullable(true),
  theme: q.union([q.literal('light'), q.literal('dark')]).nullable(),
  link: card.field('link').project(linkFragment).nullable(true),
}));

export default PricingCard;

import { q } from 'lib/client';

import parseUrl, { ensureLeadingSlash } from 'utils/parseUrl';
import customTwMerge from 'utils/twMerge';

import type { InferFragmentType } from 'groqd';
import type { ComponentPropsWithoutRef, FC } from 'react';
import type { Settings } from 'types/sanity.types';

export type LinkProps = Omit<ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'div'>, 'href'> & {
  /**
   * The optional link data for the button component.
   * This can be a string representing a URL or an object with more detailed link properties.
   */
  href?: LinkFragment | string | null;
  disableFocus?: boolean;
};

export const getLinkData = (link?: LinkFragment | string | null) => {
  if (!link) return '';

  if (typeof link === 'string') return link;

  switch (link?.type) {
    case 'internalLink':
      return ensureLeadingSlash(link.internalLink?.link || '');
    case 'link':
      return link.link?.href;
  }
};

const Link: FC<LinkProps> = ({ children, href, className, disableFocus, ...props }) => {
  const { as: Component, ...rest } = parseUrl(getLinkData(href) || '');

  return (
    <Component
      {...rest}
      {...props}
      className={customTwMerge(
        disableFocus ? 'outline-none' : 'focus-outline-primary dark:focus-outline-marine',
        className,
      )}
    >
      {children}
    </Component>
  );
};

type LinkQuery = StripMaybe<StripMaybe<StripArray<Settings['socials']>>['link']>;
export type InternalLinkQuery = StripMaybe<LinkQuery['internalLink']>;
export type ExternalLinkQuery = StripMaybe<LinkQuery['link']>;

export const internalLinkFragment = q.fragment<InternalLinkQuery>().project(link => ({
  link: link.field('reference').deref().field('seo').field('slug.current', q.string().nullable()),
  blank: q.boolean().optional().nullable(),
  alt: q.string().optional().nullable(),
}));

export const externalLinkFragment = q.fragment<ExternalLinkQuery>().project({
  href: q.string().optional().nullable(),
  alt: q.string().optional().nullable(),
});

export const linkFragment = q.fragment<LinkQuery>().project(sub => ({
  type: q
    .union([q.literal('link'), q.literal('internalLink')])
    .optional()
    .nullable(),
  label: q.string().optional().nullable(),
  internalLink: sub.field('internalLink').project(internalLinkFragment).nullable(true),
  link: q.object(externalLinkFragment).optional().nullable(),
}));

export type LinkFragment = InferFragmentType<typeof linkFragment>;

export default Link;

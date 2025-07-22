import Link, { externalLinkFragment, internalLinkFragment } from 'molecules/link';

import { q } from 'lib/client';

import type { ExternalLinkQuery, InternalLinkQuery } from 'molecules/link';
import type { PortableTextComponents } from 'next-sanity';

export const hyperLinkStyles =
  'text-purple-400 transition-colors hover:text-purple-500 focus-outline-primary dark:text-purple-50 dark:hover:text-purple-25';

const marks = {
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  underline: ({ children }) => <u>{children}</u>,
  code: ({ children }) => <code>{children}</code>,
  internalLink: ({ children, value }) => {
    const slug = value?.link;

    return (
      <Link href={slug} className={hyperLinkStyles}>
        {children}
      </Link>
    );
  },
  link: ({ children, value }) => (
    <Link href={value?.href} className={hyperLinkStyles}>
      {children}
    </Link>
  ),
} satisfies PortableTextComponents['marks'];

type InternalRichLinkQuery = InternalLinkQuery & { _key: string };
export const internalRichLinkFragment = q.fragment<InternalRichLinkQuery>().project({
  _key: q.string().optional().nullable(),
  ...internalLinkFragment,
});

type ExternalRichLinkQuery = ExternalLinkQuery & { _key: string };
export const externalRichLinkFragment = q.fragment<ExternalRichLinkQuery>().project({
  _key: q.string().optional().nullable(),
  ...externalLinkFragment,
});

export default marks;

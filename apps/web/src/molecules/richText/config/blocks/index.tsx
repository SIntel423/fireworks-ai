import { twJoin } from 'tailwind-merge';

import Heading from 'molecules/richText/config/components/headings';

import type { PortableTextComponents } from 'next-sanity';

const block = (additionalHeadingStyles?: string, customHeaderStyles?: boolean): PortableTextComponents['block'] => ({
  h1: ({ children }) => (
    <Heading level={1} className={twJoin(!customHeaderStyles && 'text-rich-h1', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading level={2} className={twJoin(!customHeaderStyles && 'text-rich-h2', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading level={3} className={twJoin(!customHeaderStyles && 'text-rich-h3', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading level={4} className={twJoin(!customHeaderStyles && 'text-rich-h4', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading level={5} className={twJoin(!customHeaderStyles && 'text-rich-h5', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading level={6} className={twJoin(!customHeaderStyles && 'text-rich-h6', additionalHeadingStyles)}>
      {children}
    </Heading>
  ),
  blockquote: ({ children }) => <blockquote className="border-l border-l-neutrals-300 pl-6">{children}</blockquote>,
  normal: ({ children }) => <p className="">{children}</p>,
});

export default block;

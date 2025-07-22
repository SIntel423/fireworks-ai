import { PortableText } from 'next-sanity';

import block from 'molecules/richText/config/blocks';
import Code, { codeFragment } from 'molecules/richText/config/components/code';
import HR from 'molecules/richText/config/components/hr';
import RichImage, { richImageFragment } from 'molecules/richText/config/components/richImage';
import Rive from 'molecules/richText/config/components/rive';
import { riveFragment } from 'molecules/richText/config/components/rive/query';
import Video from 'molecules/richText/config/components/video';
import { videoFragment } from 'molecules/richText/config/components/video/query';
import listItem from 'molecules/richText/config/listItem';
import list from 'molecules/richText/config/lists';
import marks, { externalRichLinkFragment, internalRichLinkFragment } from 'molecules/richText/config/marks';
import TableMolecule, { tableMoleculeFragment } from 'molecules/table';

import { q } from 'lib/client';

import customTwMerge from 'utils/twMerge';

import type { InferFragmentType } from 'groqd';
import type { PortableTextComponents } from 'next-sanity';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Blog, Page } from 'types/sanity.types';

export type RichTextFragment = InferFragmentType<typeof richTextFragment>;
type ArticleFragment = InferFragmentType<typeof articleFragment>;

interface RichTextProps {
  blocks: RichTextFragment[] | ArticleFragment[];
  className?: string;
  additionalHeadingStyles?: string;
  customHeaderStyles?: boolean;
}

const portableTextOptions = (
  additionalHeadingStyles?: string,
  customHeaderStyles?: boolean,
): PortableTextComponents => ({
  types: {
    code: props => <Code {...props.value} />,
    hr: HR,
    richImage: RichImage,
    rive: props => <Rive {...props.value.rive} />,
    table: props => <TableMolecule {...props.value} />,
    video: props => <Video {...props.value.video} />,
  },
  block: block(additionalHeadingStyles, customHeaderStyles),
  marks,
  list,
  listItem,
});

const RichText: FC<RichTextProps> = ({ blocks, className, additionalHeadingStyles, customHeaderStyles }) => (
  <div className={customTwMerge('flex flex-col gap-4', className)}>
    <PortableText
      value={blocks as RichTextFragment[]}
      components={portableTextOptions(additionalHeadingStyles, customHeaderStyles)}
      onMissingComponent={(message, options) => {
        throw new Error(
          `Error rendering PortableText: ${message}. Type: ${options.type}. NodeType: ${options.nodeType}`,
        );
      }}
    />
  </div>
);

interface RichTextQuery
  extends Omit<StripArray<StripMaybe<StripMaybe<ExtractSanityType<Page, 'heading', 'heading'>>['body']>>, '_type'> {
  _type: string;
}

export const richTextFragment = q.fragment<RichTextQuery>().project(richText => ({
  _type: q.string(),
  _key: q.string(),
  children: q
    .array(
      q.object({
        _key: q.string(),
        _type: q.string(),
        text: q.string().optional(),
        marks: q.array(q.string()).optional(),
      }),
    )
    .optional()
    .nullable(),
  markDefs: richText
    .field('markDefs[]')
    .project(mark => ({
      ...mark.conditionalByType({
        link: externalRichLinkFragment,
        internalLink: internalRichLinkFragment,
      }),
    }))
    .nullable(true),
  style: q.string().optional().nullable(),
  listItem: q.string().optional().nullable(),
  level: q.number().optional().nullable(),
}));

type ArticleQuery = Blog['content'];

export const articleCondition = {
  block: richTextFragment,
  code: codeFragment,
  richImage: richImageFragment,
  rive: {
    _type: q.literal('rive'),
    // @ts-expect-error ts having a hard time with conditional derefs
    rive: q.raw('@->').project(riveFragment),
  },
  table: tableMoleculeFragment,
  video: {
    _type: q.literal('video'),
    // @ts-expect-error ts having a hard time with conditional derefs
    video: q.raw('@->').project(videoFragment).nullable(true),
  },
};

export const articleFragment = q.fragment<ArticleQuery>().project(content => ({
  ...content.conditionalByType(articleCondition),
}));

export default RichText;

import { hasArrayValues } from '@packages/utils/src/arrays';

import RichText, { articleFragment, richTextFragment } from 'molecules/richText';
import Section from 'molecules/section';

import SimpleHero from 'components/hero/variations/simple';

import { q } from 'lib/client';

import { seoFragment } from 'utils/constructMetadata';

import type { InferResultType } from 'groqd';
import type { FC } from 'react';

export const legalQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('legal')
    .filterBy('seo.slug.current == $slug')
    .project(legal => ({
      postTitle: q.string().optional().nullable(),
      subtitle: legal.field('subtitle[]').project(richTextFragment).nullable(true),
      content: legal.field('content[]').project(articleFragment),
      _updatedAt: q.string().optional().nullable(),
    })),
  legalSeoQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('legal')
    .filterBy('seo.slug.current == $slug')
    .project(legal => ({
      seo: legal.field('seo').project(seoFragment),
    }));

type LegalTemplateProps = StripArray<InferResultType<typeof legalQuery>>;

const LegalTemplate: FC<LegalTemplateProps> = ({ postTitle, subtitle, content, _updatedAt }) => (
  <>
    <Section padding={{ top: 'lg', bottom: 'md' }}>
      <SimpleHero heading={{ heading: postTitle, body: subtitle }} alignment="left" />
    </Section>
    {hasArrayValues(content) && (
      <Section wrapperClassName="flex flex-col gap-4 items-start">
        <RichText
          blocks={content}
          additionalHeadingStyles="text-mud-950 pt-6"
          className="font-inter mx-auto w-full text-rich-body text-copy"
        />
        {_updatedAt && <span className="text-copy">Last Modified: {new Date(_updatedAt).toLocaleDateString()}</span>}
      </Section>
    )}
    {/* {hasArrayValues(body) && <ComponentGenerator sections={body} />} */}
  </>
);

export default LegalTemplate;

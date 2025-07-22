import { z } from 'groqd';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import Image, { imageFragment } from 'molecules/image';
import RichText, { articleFragment } from 'molecules/richText';
import Section from 'molecules/section';

import { blogCategoryFragment } from 'organisms/cards/resource';
import TableOfContents from 'organisms/tableOfContents';

import SimpleHero from 'components/hero/variations/simple';

import { q, runQuery } from 'lib/client';

import constructMetadata, { seoFragment } from 'utils/constructMetadata';

import type { Metadata } from 'next';
import type { PortableTextBlock } from 'next-sanity';

const pageQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('blog')
    .filterBy('seo.slug.current == $slug')
    .project(blog => ({
      postTitle: z.string().optional().nullable(),
      publishedDate: z.string().optional().nullable(),
      featuredImage: blog.field('featuredImage').project(imageFragment).nullable(true),
      content: blog.field('content[]').project(articleFragment).nullable(true),
      blogTags: blog.field('blogTags[]').deref().project(blogCategoryFragment).nullable(true),
    })),
  pagesQuery = q.star.filterByType('blog').project(page => ({
    slug: page.field('seo').field('slug.current', q.string().nullable()),
  })),
  pageSeoQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('blog')
    .filterBy('seo.slug.current == $slug')
    .project(page => ({
      seo: page.field('seo').project(seoFragment),
    }));

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params,
    draft = (await draftMode()).isEnabled,
    query = pageQuery,
    data = (await runQuery(query, { parameters: { slug }, draft }))[0];

  if (!data) return notFound();

  return (
    <>
      <Section padding={{ top: 'lg', bottom: 'lg' }}>
        <SimpleHero
          alignment="left"
          heading={{
            heading: data.postTitle,
          }}
        />
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="h-full lg:col-span-3 lg:col-start-1 lg:row-start-1">
            {data?.content && <TableOfContents content={data.content as PortableTextBlock[]} />}
          </aside>
          <div className="flex flex-col gap-8 lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:pl-20">
            {data?.featuredImage && <Image {...data.featuredImage} className="w-full overflow-hidden rounded-2xl" />}
            {data.content && <RichText blocks={data.content} className="gap-10" />}
          </div>
        </div>
      </Section>
    </>
  );
};

export const generateStaticParams = async () => {
  const res = await runQuery(pagesQuery, {});

  return res;
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params,
    data = (await runQuery(pageSeoQuery, { parameters: { slug } }))[0];

  if (!data?.seo) return {};

  return constructMetadata(data.seo, `blog/${slug}`);
};

export const revalidate = 60;
export const dynamicParams = true;

export default Blog;

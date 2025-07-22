import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import ModelTemplate from 'templates/model';
import { modelFragment } from 'templates/model/query';

import { q, runQuery } from 'lib/client';

import { componentGeneratorFragment } from 'utils/componentGenerator';
import constructMetadata, { seoFragment } from 'utils/constructMetadata';

import type { Metadata } from 'next';

const pageQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('model')
    .filterBy('seo.slug.current == $slug')
    .project(model => ({
      ...modelFragment,
      body: model.field('body[]').project(componentGeneratorFragment).nullable(true),
    })),
  pagesQuery = q.star.filterByType('model').project(page => ({
    slug: page.field('seo').field('slug.current', q.string().nullable()),
  })),
  pageSeoQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('model')
    .filterBy('seo.slug.current == $slug')
    .project(page => ({
      seo: page.field('seo').project(seoFragment),
    }));

const Blog = async ({ params }: { params: Promise<{ account: string; slug: string }> }) => {
  const { account, slug } = await params,
    draft = (await draftMode()).isEnabled,
    data = (await runQuery(pageQuery, { parameters: { slug: `${account}/${slug}` }, draft }))[0];

  if (!data) return notFound();

  return <ModelTemplate {...data} />;
};

export const generateStaticParams = async () => {
  const res = await runQuery(pagesQuery, {});

  return res;
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string, account: string }> }): Promise<Metadata> => {
  const { account, slug } = await params,
    data = (await runQuery(pageSeoQuery, { parameters: { slug: `${account}/${slug}` } }))[0];

  if (!data?.seo) return {};

  return constructMetadata(data.seo, `models/${slug}`);
};

export const revalidate = 60;
export const dynamicParams = true;

export default Blog;

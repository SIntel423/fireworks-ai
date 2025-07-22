import { q, runQuery } from 'lib/client';

import ComponentGenerator, { componentGeneratorWithSymbolsFragment } from 'utils/componentGenerator';
import constructMetadata, { seoFragment } from 'utils/constructMetadata';

import type { Metadata } from 'next';

const pageQuery = q.star.filterByType('notFound').project(notFound => ({
    body: notFound.field('body[]').project(componentGeneratorWithSymbolsFragment),
  })),
  pageSeoQuery = q.star.filterByType('notFound').project(page => ({
    seo: page.field('seo').project(seoFragment),
  }));

const NotFound = async () => {
  const pageData = (await runQuery(pageQuery, {}))[0];

  if (!pageData) return <></>;

  return (
    <>
      <ComponentGenerator sections={pageData.body} />
    </>
  );
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const resolvedParams = await params,
    slug = (Array.isArray(resolvedParams.slug) && resolvedParams.slug?.join('/')) || 'home',
    data = (await runQuery(pageSeoQuery, {}))[0];

  if (!data?.seo) return {};

  return constructMetadata(data.seo, slug);
};

export default NotFound;

import { objectKeys } from '@packages/utils/src/typeUtils';

import { q, runQuery } from 'lib/client';

import { SITE_DOMAIN } from 'constants/general';

import type { MetadataRoute } from 'next';

const rootPages = ['page', 'legal'],
  overrides = [{ from: 'home', to: '' }] as { from: string; to: string }[];

const overrideUrl = (url: string): string => {
  const hasOverride = overrides.find(override => override.from === url);

  return hasOverride ? hasOverride.to : url;
};

const sitemapQuery = q.project({
  page: q.star.filterByType('page').field('seo.slug.current'),
  blog: q.star.filterByType('blog').field('seo.slug.current'),
  legal: q.star.filterByType('legal').field('seo.slug.current'),
});

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const res = await runQuery(sitemapQuery, {}),
    templates = objectKeys(res),
    urls = templates.flatMap(template =>
      rootPages.includes(template) ? res[template] : res[template].map(page => `${template}/${page}`),
    ) as string[];

  return urls.map(url => ({
    url: `https://${SITE_DOMAIN}/${overrideUrl(url)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
};

export default sitemap;

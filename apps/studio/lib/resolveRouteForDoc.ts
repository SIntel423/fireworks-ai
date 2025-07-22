import { objectEntries } from '@packages/utils/src/typeUtils';

import { PRESENTATION_PATHS } from '@/lib/constants';

import type { DocumentResolverContext } from 'sanity/presentation';

type DocumentResolver = {
  filter: string;
  params?: Record<string, string>;
};

const getType = (route: string) =>
  objectEntries(PRESENTATION_PATHS).reduce(
    (acc, [values, key]) => (route.includes(values) ? [...acc, key] : acc),
    [] as string[],
  );

const getSlug = (route: string, slug?: string) => {
  switch (true) {
    case route === '/':
      return route;

    default:
      return slug;
  }
};

export const resolveDocForRoute = (context: DocumentResolverContext): DocumentResolver => {
  const route = context.path,
    slug = route.split('/').pop(),
    types = getType(route);

  const filterParams = {
    types,
    slug: getSlug(route, slug),
  };

  return {
    filter: 'seo.slug.current == $slug',
    // @ts-expect-error - valid filter params can include records with a string array value
    params: filterParams,
  };
};

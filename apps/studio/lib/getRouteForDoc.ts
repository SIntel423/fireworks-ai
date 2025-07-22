import { keyExistsOnObject } from '@packages/utils/src/typeUtils';

import { PRESENTATION_PATHS } from '@/lib/constants';

type DocWithType = {
  _type?: string;
  seo?: {
    slug: {
      current: string;
    };
  };
};

const getRoutePrefixForType = (type: string) =>
  keyExistsOnObject(PRESENTATION_PATHS, type) ? PRESENTATION_PATHS[type] : null;

export const getRouteForDoc = ({ _type, seo }: DocWithType) => {
  if (!_type || !seo?.slug?.current) {
    return '';
  }

  if (seo.slug.current === '/') {
    return '/';
  }

  const prefix = getRoutePrefixForType(_type),
    routeSegments = [prefix ? `/${prefix}` : undefined, `/${seo.slug.current}`],
    route = routeSegments.filter(Boolean).join('');

  return route;
};

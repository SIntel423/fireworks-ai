import { imageNoMetaFragment } from 'molecules/image';

import { q } from 'lib/client';

import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_NAME } from 'constants/general';

import type { InferFragmentType } from 'groqd';
import type { Metadata } from 'next';
import type { Page } from 'types/sanity.types';

type SanityMetadata = Omit<InferFragmentType<typeof seoFragment>, 'image'> & {
  image?: InferFragmentType<typeof seoFragment>['image'];
};

const constructMetadata = (metadata: SanityMetadata | null, slug: string): Metadata => {
  const title = metadata?.pageTitle || SITE_NAME,
    description = metadata?.pageDescription || SITE_DESCRIPTION,
    image = metadata?.image?.asset?.url || '/images/OG-Fallback.png',
    site = `https://${SITE_DOMAIN}`,
    url = `${site}/${slug || ''}`,
    index = !metadata?.noIndex;

  return {
    title,
    description,
    openGraph: {
      images: [image],
      title,
      description,
      url,
      siteName: SITE_NAME,
    },
    robots: {
      index,
    },
    metadataBase: new URL(site),
    alternates: {
      canonical: url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image,
    },
  };
};

type MetaQuery = StripMaybe<Page['seo']>;
export const seoFragment = q.fragment<MetaQuery>().project(meta => ({
  pageTitle: q.string().optional().nullable(),
  pageDescription: q.string().optional().nullable(),
  image: meta.field('openGraphImage').project(imageNoMetaFragment).nullable(true),
  noIndex: q.boolean().optional().nullable(),
  noFollow: q.boolean().optional().nullable(),
}));

export default constructMetadata;

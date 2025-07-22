import dynamic from 'next/dynamic';
import { type FC, Suspense } from 'react';

import { blogListingFragment } from 'components/listing/blog';
import { modelListingFragment } from 'components/listing/model/query';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ListingFragment = InferFragmentType<typeof listingFragment>;

const BlogListing = dynamic(() => import('components/listing/blog')),
  ModelListing = dynamic(() => import('components/listing/model'));

const Listing: FC<ListingFragment> = ({ listingType, ...props }) => {
  switch (listingType) {
    case 'blog':
      return <BlogListing {...props} />;
    case 'model':
      return (
        <Suspense fallback={null}>
          <ModelListing {...props} />
        </Suspense>
      );
    default:
      return null;
  }
};

export type ListingQuery = ExtractSanityType<Page, 'listing'>;
export const listingFragment = q.fragment<ListingQuery>().project({
  listingType: q
    .union([q.literal('blog'), q.literal('model')])
    .optional()
    .nullable(),
  ...blogListingFragment,
  ...modelListingFragment,
});

export default Listing;

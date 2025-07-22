import { z } from 'groqd';

import { modelCardFragment, modelTypeFragment } from 'organisms/cards/model';
import { providerFragment } from 'organisms/cards/provider';
import { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { ListingQuery } from 'components/listing';

export const PAGE_SIZE = 8;

export const modelListingFragment = q.fragment<ListingQuery>().project(model => ({
  _key: z.string(),
  models: q.star.filterByType('model').filterRaw('featured == true').slice(0, PAGE_SIZE).project(modelCardFragment),
  totalModels: q.count(q.star.filterByType('model')),
  modelTypes: q.star.filterByType('modelType').project(modelTypeFragment),
  providers: q.star
    .filterByType('provider')
    // @ts-expect-error The order operator does work just is not typed
    .order('company->name asc')
    .project({ _id: z.string(), ...providerFragment }),
  heading: model.field('heading').project(headingFragment).nullable(true),
}));

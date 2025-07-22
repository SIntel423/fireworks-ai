import createImageUrlBuilder from '@sanity/image-url';

import { DATASET_PROD, PROJECT_ID } from '@/lib/constants';

import type { Image } from 'sanity';

const imageBuilder = createImageUrlBuilder({
  projectId: PROJECT_ID,
  dataset: DATASET_PROD,
});

export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

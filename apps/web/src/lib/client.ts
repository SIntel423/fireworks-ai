import imageUrlBuilder from '@sanity/image-url';
import { createGroqBuilder, makeSafeQueryRunner } from 'groqd';
import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from 'lib/env';

import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type * as SanityTypes from 'types/sanity.types';

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
  perspective: 'previewDrafts',
  // stega
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_READ_TOKEN,
  useCdn: true,
  perspective: 'published',
});

export const runQuery = makeSafeQueryRunner(
  (query, params?: { parameters?: Record<string, unknown>; draft?: boolean }) =>
    params?.draft ? previewClient.fetch(query, params?.parameters) : client.fetch(query, params?.parameters),
);

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

type SchemaConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes;
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo;
};
export const q = createGroqBuilder<SchemaConfig>();

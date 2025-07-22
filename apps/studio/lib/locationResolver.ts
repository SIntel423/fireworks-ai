import { map } from 'rxjs';

import { getRouteForDoc } from '@/lib/getRouteForDoc';

import type { Observable } from 'rxjs';
import type { DocumentLocationResolver, DocumentLocationsState } from 'sanity/presentation';

/**
 *
 * This function will display the locations that a document is being referenced from to the content Editor.
 * https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
 *
 * A document location resolver that retrieves the locations (URLs) for a given document based on its references.
 *
 * This resolver listens to the document store for the document with the provided ID, as well as any documents that reference it. It then filters the results to only include documents with a valid slug, and maps them to an array of location objects with a title and href.
 *
 * If no references can be resolved, the resolver returns a state object with a critical message.
 *
 * @param params - The parameters for the document location resolver, including the document ID.
 * @param context - The context for the document location resolver, including the document store.
 * @returns An observable that emits the document locations state, which includes the resolved locations or an error message.
 */
export const locationResolver: DocumentLocationResolver = (params, context) => {
  const references$ = context.documentStore.listenQuery(
    '*[_id == $id || references($id)] { _type, seo, title, internalName }',
    { ...params, version: params.version || '' },
    { perspective: 'previewDrafts' },
  ) as Observable<
    | {
        _type: string;
        seo?: { slug: { current: string } };
        title?: string;
        internalName?: string;
      }[]
    | null
  >;

  return references$.pipe(
    map(references => {
      if (!references) {
        return {
          message: 'Unable to resolve references for this document',
          tone: 'critical',
        } satisfies DocumentLocationsState;
      }
      // We can only resolve locations for document types with slugs
      const pageLocations = references
        .filter(({ seo }) => seo?.slug?.current)
        .map(({ _type, title, internalName, seo }) => ({
          title: internalName || title || 'Title missing',
          href: getRouteForDoc({ _type, seo }),
        }));

      return {
        locations: [...pageLocations].filter(Boolean),
      } satisfies DocumentLocationsState;
    }),
  );
};

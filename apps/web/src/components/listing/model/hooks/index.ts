import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { modelCardFragment } from 'organisms/cards/model';

import { setModelResultCount, useModelFilter, useModelProviders } from 'components/listing/model/store';

import { q, runQuery } from 'lib/client';

import type { ModelCardQuery } from 'organisms/cards/model';

const modelQuery = (type: string | null, provider: string | null) =>
  q.star
    .filterByType('model')
    .filter(type ? `count(modelType[_type == "reference" && @->name == "${type}"]) > 0` : '')
    .filter(provider ? `provider->company->name == "${provider}"` : '')
    .project(modelCardFragment);

const totalModelCountQuery = (type: string | null, provider: string | null) =>
  q.count(
    q.star
      .filterByType('model')
      .filter(type ? `count(modelType[_type == "reference" && @->name == "${type}"]) > 0` : '')
      .filter(provider ? `provider->company->name == "${provider}"` : ''),
  );
const useSetSearchParams = (updatedParams: Record<string, string>[]) => {
  const searchParams = useSearchParams(),
    pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  updatedParams.forEach(v => {
    const key = Object.keys(v)[0],
      value = v[key];

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = pathname;
    url.search = params.toString();
    window.history.replaceState(null, '', url.toString());
  }, [params.toString(), pathname]);
};

const useFilteredBlogs = (initialBlogCards: ModelCardQuery[], totalModels: number) => {
  const [cards, setCards] = useState<ModelCardQuery[]>(initialBlogCards),
    filter = useModelFilter(),
    provider = useModelProviders();

  useSetSearchParams([{ filter }, { provider }]);

  useEffect(() => {
    (async () => {
      setCards(
        !(filter || provider) || filter === 'Featured'
          ? initialBlogCards
          : await runQuery(modelQuery(filter === 'Featured' ? null : filter, provider)),
      );
      setModelResultCount(
        !(filter || provider) || filter === 'Featured'
          ? totalModels
          : ((await runQuery(totalModelCountQuery(filter, provider))) as number),
      );
    })();
  }, [filter, initialBlogCards, totalModels, provider]);

  return cards;
};

export default useFilteredBlogs;

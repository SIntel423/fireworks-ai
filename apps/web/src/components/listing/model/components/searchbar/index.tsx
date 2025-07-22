'use client';

import { useClickOutside, useDebouncedEffect } from '@react-hookz/web';
import { useEffect, useRef, useState } from 'react';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Icon from 'molecules/icon';

import { modelCardFragment } from 'organisms/cards/model';

import ResultCard from 'components/listing/model/components/resultCard';
import ResultSkeletonCard from 'components/listing/model/components/resultSkeletonCard';

import { q, runQuery } from 'lib/client';

import type { ModelCardQuery } from 'organisms/cards/model';

const searchQuery = q
  .parameters<{ search: string }>()
  .star.filterByType('model')
  .filter('modelName match $search || count(modelType[_type == "reference" && @->name match $search]) > 0')
  .slice(0, 5)
  .project(modelCardFragment);

const baseHeight = 52;

const Searchbar = () => {
  const containerRef = useRef<HTMLDivElement>(null),
    [search, setSearch] = useState(''),
    [results, setResults] = useState<ModelCardQuery[]>([]),
    [loading, setLoading] = useState(false),
    [height, setHeight] = useState(baseHeight),
    [isFocused, setIsFocused] = useState(false);

  useClickOutside(containerRef, () => setIsFocused(false));

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollHeight = containerRef.current.scrollHeight;

    setHeight(search && isFocused ? scrollHeight : baseHeight);
  }, [search, results, loading, isFocused]);

  useDebouncedEffect(
    () => {
      (async () => {
        const cards = search ? await runQuery(searchQuery, { parameters: { search: `*${search}*` } }) : [];

        setResults(cards);
        setLoading(false);
      })();
    },
    [search],
    300,
  );

  return (
    <div className="relative flex h-[52px] w-full items-start justify-center">
      <div
        ref={containerRef}
        style={{ height }}
        className="absolute z-10 w-full max-w-[calc(100dvw-64px)] overflow-hidden rounded-4xl bg-white px-6 py-3 shadow-none transition-[height,box-shadow] data-[searched=true]:shadow-lg sm:max-w-[800px]"
        data-searched={!!search}
      >
        <div className="flex items-center gap-2">
          <Icon icon="search" size={24} iconColor="black" />
          <input
            className="w-full text-lg text-black outline-none placeholder:text-neutrals-200"
            placeholder="Search model library"
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={e => {
              setLoading(true);
              setSearch(e.target.value);
            }}
          />
        </div>
        {!!search && isFocused && (
          <div className="pt-12 pb-3">
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading ? (
              <ResultSkeletonCard />
            ) : hasArrayValues(results) ? (
              results.map(card => <ResultCard key={card._id} {...card} />)
            ) : (
              <div className="flex flex-col gap-1 pl-4">
                <span className="text-lg font-medium text-black">No results</span>
                <span className="text-sm text-neutrals-400">Try searching for a specific model name</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;

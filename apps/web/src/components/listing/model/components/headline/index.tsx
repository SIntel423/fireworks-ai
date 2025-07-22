'use client';

import Icon from 'molecules/icon';

import {
  setModelFilter,
  useModelFilter,
  useModelProviders,
  useModelResultCount,
  useModelTotalModels,
} from 'components/listing/model/store';

const ModelFilterHeadline = () => {
  const filter = useModelFilter(),
    provider = useModelProviders(),
    totalModels = useModelTotalModels(),
    count = useModelResultCount();

  const filterName = filter || provider || 'Featured';

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-medium text-headline sm:text-display-xs lg:text-display-md">{`${filterName} Models${count && count !== totalModels ? ` (${count})` : ''}`}</h2>
      {filterName !== 'Featured' && (
        <button
          className="cursor-pointer rounded-sm bg-neutrals-100 p-1 text-black"
          onClick={() => setModelFilter('Featured')}
        >
          <Icon icon="x-close" size={16} />
        </button>
      )}
    </div>
  );
};

export default ModelFilterHeadline;

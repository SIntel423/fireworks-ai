import Badge from 'molecules/badge';
import Image from 'molecules/image';
import Link from 'molecules/link';

import type { ModelCardQuery } from 'organisms/cards/model';
import type { FC } from 'react';

const ResultCard: FC<ModelCardQuery> = ({ modelName, new: isNew, provider, modelType, slug }) => (
  <Link
    href={`/models/${slug}`}
    className="flex w-full items-center justify-between gap-2 rounded-lg bg-transparent p-4 transition-colors hover:bg-neutrals-25"
  >
    <div className="flex items-center gap-3">
      {provider?.company?.mark && <Image {...provider.company.mark} className="size-8 min-w-8" />}
      <div className="flex flex-col">
        <span className="text-lg font-medium text-black">{modelName}</span>
        {modelType?.[0]?.name && <span className="text-xs text-neutrals-400">{modelType[0].name}</span>}
      </div>
    </div>
    {isNew && <Badge label="New" color="green" />}
  </Link>
);

export default ResultCard;

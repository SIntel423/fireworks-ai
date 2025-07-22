'use client';

import { hasArrayValues } from '@packages/utils/src/arrays';

import FilterTab from 'molecules/filterTab';

import FilterDrawer from 'components/listing/model/components/filterDrawer';
import { setModelFilter, setModelProviders, useModelFilter, useModelProviders } from 'components/listing/model/store';

import type { ModelListingProps } from 'components/listing/model';
import type { FilterTabProps } from 'molecules/filterTab';
import type { FC } from 'react';

export type ModelFiltersProps = Pick<ModelListingProps, 'modelTypes' | 'providers'>;

const generateOptionsFromProviders = (providers: ModelListingProps['providers']) =>
  providers
    .filter(provider => provider.company?.name)
    .map(provider => ({
      label: provider.company?.name || '',
      value: provider.company?.name || '',
      logo: provider.company?.mark,
    }));

const ModelFilters: FC<ModelFiltersProps> = ({ modelTypes, providers }) => {
  const filter = useModelFilter(),
    provider = useModelProviders();

  return (
    <>
      <div className="relative mx-auto hidden items-center gap-4 sm:flex">
        <FilterTab label="Featured" icon="flame" setValue={setModelFilter} selected={filter === 'Featured'} />
        {hasArrayValues(modelTypes) &&
          modelTypes.map(type => (
            <FilterTab
              key={type._id}
              label={type.name}
              icon={type.icon}
              iconColor={(type.iconColor?.value as FilterTabProps['iconColor']) || 'blue'}
              setValue={setModelFilter}
              selected={filter === type.name}
            />
          ))}
        <FilterTab
          label="Providers"
          icon="grid"
          iconColor="neutral"
          options={generateOptionsFromProviders(providers)}
          value={provider}
          setValue={setModelProviders}
        />
      </div>
      <div className="block sm:hidden">
        <FilterDrawer modelTypes={modelTypes} providers={providers} />
      </div>
    </>
  );
};

export default ModelFilters;

import { Item, Content as RadContent, Root, Trigger } from '@radix-ui/react-accordion';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button from 'molecules/button';
import Drawer from 'molecules/drawer';
import { closeDrawer } from 'molecules/drawer/store';
import FilterTab, { type FilterTabProps } from 'molecules/filterTab';
import Icon from 'molecules/icon';

import { setModelFilter, setModelProviders, useModelFilter, useModelProviders } from 'components/listing/model/store';

import { generateSlug } from 'utils/slugs';

import type { ModelFiltersProps } from 'components/listing/model/components/filters';
import type { FC, ReactNode } from 'react';

const FilterTrigger = ({ label }: { label: string }) => (
  <Trigger className="group flex w-full items-center justify-between gap-2">
    <div className="flex items-center gap-2.5">
      <Icon icon="grid" size={18} className="text-neutrals-400" />
      <span className="text-sm text-black">{label}</span>
    </div>
    <Icon
      icon="chevron-down"
      size={24}
      className="text-black transition-transform group-data-[state=open]:rotate-180"
    />
  </Trigger>
);

const FilterItem = ({ children, label }: { children: ReactNode; label: string }) => (
  <Item value={generateSlug(label)} className="border-t border-t-neutrals-300 p-4">
    <FilterTrigger label={label} />
    <RadContent className="overflow-hidden data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down)">
      {children}
    </RadContent>
  </Item>
);

const FilterDrawer: FC<ModelFiltersProps> = ({ modelTypes, providers }) => {
  const filter = useModelFilter(),
    activeProvider = useModelProviders();

  return (
    <Drawer
      trigger={<Button hierarchy="outline" label="Filters" icon="settings" iconPosition="end" className="w-fit" />}
      label="Filters"
      position="bottom"
      size={100}
    >
      <div className="flex h-full flex-col justify-between gap-4">
        <Root collapsible type="single" className="border-b border-b-neutrals-300">
          <FilterItem label="Model Types">
            {hasArrayValues(modelTypes) && (
              <div className="mt-4 flex w-full flex-wrap gap-2">
                <FilterTab label="Featured" icon="flame" setValue={setModelFilter} selected={filter === 'Featured'} />
                {modelTypes.map(type => (
                  <FilterTab
                    key={type._id}
                    label={type.name}
                    icon={type.icon}
                    iconColor={(type.iconColor?.value as FilterTabProps['iconColor']) || 'blue'}
                    setValue={setModelFilter}
                    selected={filter === type.name}
                  />
                ))}
              </div>
            )}
          </FilterItem>
          <FilterItem label="Providers">
            {hasArrayValues(providers) && (
              <div className="mt-4 flex w-full flex-wrap gap-2">
                {providers.map(provider => (
                  <FilterTab
                    key={provider._id}
                    label={provider.company?.name || ''}
                    logo={provider.company?.mark}
                    setValue={setModelProviders}
                    selected={activeProvider === provider.company?.name}
                  />
                ))}
              </div>
            )}
          </FilterItem>
        </Root>
        <Button hierarchy="primary" label="Done" className="w-full" onClick={closeDrawer} />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;

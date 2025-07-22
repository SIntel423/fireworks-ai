import {
  Content,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Select,
  Icon as SelectIcon,
  Trigger,
  Value,
} from '@radix-ui/react-select';

import { hasArrayValues } from '@packages/utils/src/arrays';

import { filterIconStyles } from 'molecules/filterTab/styles';
import Icon from 'molecules/icon';
import Image from 'molecules/image';

import type { FilterTabProps } from 'molecules/filterTab';
import type { FC } from 'react';

const FilterTabSelect: FC<FilterTabProps> = ({ options, label, icon, iconColor, selected, value, setValue }) => (
  <Select value={value} onValueChange={setValue}>
    <Trigger
      className="flex cursor-pointer items-center gap-1.5 rounded-sm border border-neutrals-200 bg-neutrals-50 px-[15px] py-[7px] text-sm text-black focus-outline-primary transition-colors hover:bg-neutrals-100 data-[selected=true]:stateful-outline-primary"
      data-selected={selected}
    >
      {icon && <Icon icon={icon} size={18} className={filterIconStyles({ iconColor })} />}
      <Value placeholder={label} aria-label={value}>
        {value}
      </Value>
      {options && (
        <SelectIcon asChild>
          <Icon icon="chevron-down" size={16} iconColor="black" />
        </SelectIcon>
      )}
    </Trigger>
    <Portal>
      <Content
        position="popper"
        avoidCollisions
        collisionBoundary={null}
        className="z-50 flex max-h-[292px] w-[var(--radix-select-content-available-width)] max-w-[400px] flex-col gap-1 overflow-y-auto rounded-sm bg-white p-4 shadow-lg"
      >
        {hasArrayValues(options) &&
          options.map(option => (
            <Item
              key={option.value}
              value={option.value}
              className="flex w-full cursor-pointer items-center gap-2 rounded-sm bg-transparent p-2 transition-colors outline-none hover:bg-neutrals-50"
            >
              {option.logo && <Image {...option.logo} aspectRatio="1/1" className="size-6" />}
              <ItemText className="text-sm text-black">{option.label}</ItemText>
              <ItemIndicator />
            </Item>
          ))}
      </Content>
    </Portal>
  </Select>
);

export default FilterTabSelect;

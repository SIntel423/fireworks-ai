import FilterTabButton from 'molecules/filterTab/components/button';
import FilterTabSelect from 'molecules/filterTab/components/select';

import type { IconIds } from '@packages/ui/icons';
import type { VariantProps } from 'class-variance-authority';
import type { filterIconStyles } from 'molecules/filterTab/styles';
import type { ImageProps } from 'molecules/image';
import type { FC } from 'react';

export interface FilterTabProps extends VariantProps<typeof filterIconStyles> {
  label: string;
  icon?: IconIds | null;
  options?: { label: string; value: string; logo?: ImageProps | null }[];
  selected?: boolean;
  value?: string;
  setValue: (value: string) => void;
  logo?: ImageProps | null;
}

const FilterTab: FC<FilterTabProps> = ({ options, ...props }) =>
  options ? <FilterTabSelect {...props} options={options} /> : <FilterTabButton {...props} />;

export default FilterTab;

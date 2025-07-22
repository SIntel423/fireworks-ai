import { filterIconStyles } from 'molecules/filterTab/styles';
import Icon from 'molecules/icon';
import Image from 'molecules/image';

import type { FilterTabProps } from 'molecules/filterTab';
import type { FC } from 'react';

const FilterTabButton: FC<FilterTabProps> = ({ label, icon, iconColor, setValue, selected, logo }) => (
  <button
    className="flex cursor-pointer items-center gap-1.5 rounded-sm border border-neutrals-200 bg-neutrals-50 px-[15px] py-[7px] text-sm text-black focus-outline-primary transition-colors hover:bg-neutrals-100 data-[selected=true]:stateful-outline-primary"
    data-selected={selected}
    onClick={() => setValue(label)}
  >
    {icon && <Icon icon={icon} size={18} className={filterIconStyles({ iconColor })} />}
    {logo && !icon && <Image {...logo} className="size-6" />}
    {label}
  </button>
);

export default FilterTabButton;

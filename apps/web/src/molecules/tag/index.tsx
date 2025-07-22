import Icon from 'molecules/icon';
import { tagIconStyles } from 'molecules/tag/styles';

import type { IconIds } from '@packages/ui/icons';
import type { VariantProps } from 'class-variance-authority';
import type { FC } from 'react';

export type TagVariations = VariantProps<typeof tagIconStyles>;
export interface TagProps extends TagVariations {
  label: string;
  icon?: IconIds;
}

const BadgeIcon: FC<Pick<TagProps, 'icon' | 'color'>> = ({ icon, color }) =>
  icon && (
    <div className={tagIconStyles({ color })}>
      <Icon icon={icon} size="100%" className="size-3 min-w-3" />
    </div>
  );

const Tag: FC<TagProps> = ({ color, label, icon }) => (
  <div className="flex w-fit items-center gap-1 rounded-[50px] border border-neutrals-100 px-[11px] py-[3px] text-xs text-black">
    {icon && <BadgeIcon icon={icon} color={color} />}
    {label}
  </div>
);

export default Tag;

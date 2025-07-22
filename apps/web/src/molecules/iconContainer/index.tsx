import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import Icon from 'molecules/icon';

import type { IconIds } from '@packages/ui/icons';
import type { VariantProps } from 'class-variance-authority';
import type { FC } from 'react';

interface IconContainerProps extends VariantProps<typeof iconContainerStyles> {
  icon: IconIds;
  className?: string;
  size?: number;
  bold?: boolean;
}

const iconContainerStyles = cva('flex items-center justify-center rounded-lg text-black', {
  variants: {
    color: {
      blue: 'bg-[var(--icon-color,--color-blue-25)]',
      yellow: 'bg-[var(--icon-color,--color-warning-200)]',
      green: 'bg-[var(--icon-color,--color-marine-200)]',
      red: 'bg-[var(--icon-color,--color-red-300)]',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

const IconContainer: FC<IconContainerProps> = ({ icon, size, color, className, bold }) => (
  <div
    className={twMerge(iconContainerStyles({ color }), className)}
    style={{ width: size || 40, height: size || 40, minWidth: size || 40, minHeight: size || 40 }}
  >
    <Icon icon={icon} size={(size || 40) / 2} className={bold ? 'stroke-[1.75]' : 'stroke-[1.25]'} />
  </div>
);

export default IconContainer;

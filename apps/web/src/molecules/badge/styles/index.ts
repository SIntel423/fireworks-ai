import { cva } from 'class-variance-authority';

import { badgeVariations } from '@packages/ui/badge';

export const badgeStyles = cva('rounded-sm px-2 py-0.5 text-xs font-medium uppercase', {
  variants: {
    color: badgeVariations,
  },
});

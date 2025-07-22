import { cva } from 'class-variance-authority';

export const quoteStyle = cva('text-display-xs text-neutrals-900 sm:text-display-xs', {
  variants: {
    expanded: {
      true: 'group-data-[state=closed]:opacity-0',
      false:
        'col-start-1 row-start-1 w-full opacity-0 transition-colors group-hover:text-gray/50 group-data-[state=closed]:opacity-100 [&>p]:line-clamp-1',
    },
  },
  defaultVariants: {
    expanded: true,
  },
});

import { cva } from 'class-variance-authority';

const DEFAULT_ALIGNMENT = 'center';

export const headingStyles = cva('flex w-full flex-col gap-6 sm:gap-8', {
  variants: {
    alignment: {
      left: 'items-start',
      center: 'items-center text-center',
    },
  },
  defaultVariants: {
    alignment: DEFAULT_ALIGNMENT,
  },
});

export const headingSizeStyles = cva('font-medium text-headline', {
  variants: {
    size: {
      md: 'text-lg sm:text-display-xs lg:text-display-md',
      lg: 'text-display-md sm:text-display-lg',
      xl: 'text-display-sm sm:text-display-md lg:text-display-xl',
      '2xl': 'text-display-md sm:text-display-lg lg:text-display-2xl',
      '3xl': 'text-display-lg sm:text-display-xl lg:text-display-3xl',
      '4xl': 'text-display-xl sm:text-display-2xl lg:text-display-4xl',
    },
    setMaxWidth: {
      true: 'max-w-[860px]',
    },
  },
  defaultVariants: {
    size: 'lg',
    setMaxWidth: true,
  },
});

export const bodyStyles = 'max-w-[950px] text-md sm:text-lg lg:text-display-xs text-subtitle';

export const buttonContainerStyles = cva('flex w-full flex-wrap items-center gap-x-4 gap-y-3 sm:flex-nowrap', {
  variants: {
    alignment: {
      left: 'justify-start',
      center: 'justify-center text-center',
    },
  },
  defaultVariants: {
    alignment: DEFAULT_ALIGNMENT,
  },
});

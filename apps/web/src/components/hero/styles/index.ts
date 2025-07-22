import { cva } from 'class-variance-authority';

export const containerStyle = cva(
  'relative flex flex-col justify-end overflow-hidden rounded-2xl px-4 pt-12 pb-4 sm:px-8 sm:py-20 lg:py-40',
  {
    variants: {
      isDark: {
        true: 'dark',
        false: '',
      },
    },
    defaultVariants: {
      isDark: false,
    },
  },
);

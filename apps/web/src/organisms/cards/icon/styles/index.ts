import { cva } from 'class-variance-authority';

const iconCardStyles = cva('flex size-full flex-col items-start gap-12 rounded-[10px] p-6', {
  variants: {
    theme: {
      light: 'bg-white',
      dark: 'bg-neutrals-900',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
});

export const iconCardContentStyles = cva('w-full font-favorit -tracking-[0.02em] break-words', {
  variants: {
    theme: {
      light: 'text-neutrals-900',
      dark: 'text-white',
    },
  },
  defaultVariants: {
    theme: 'dark',
  },
});

export const pricingCardStyles = cva('flex w-full flex-col gap-12 rounded-[10px] p-6', {
  variants: {
    theme: {
      dark: 'dark bg-neutrals-900',
      light: 'bg-white',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

export default iconCardStyles;

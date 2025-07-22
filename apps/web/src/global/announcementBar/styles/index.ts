import { cva } from 'class-variance-authority';

export const bgStyle = cva('', {
  variants: {
    background: {
      purple: 'bg-purple-50',
      gradient: 'bg-(image:--gradient-banner)',
      dark: 'dark bg-(image:--gradient-dark-banner)',
    },
  },
  defaultVariants: {
    background: 'purple',
  },
});

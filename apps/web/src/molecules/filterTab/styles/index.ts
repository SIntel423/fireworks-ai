import { cva } from 'class-variance-authority';

export const filterIconStyles = cva('', {
  variants: {
    iconColor: {
      blue: 'text-blue-300',
      green: 'text-success-500',
      orange: 'text-warning-500',
      purple: 'text-purple-400',
      neutral: 'text-neutral-400',
    },
  },
  defaultVariants: {
    iconColor: 'blue',
  },
});

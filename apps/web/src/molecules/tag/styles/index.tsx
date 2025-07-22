import { cva } from 'class-variance-authority';

export const tagStyles = cva('', {
  variants: {},
});

export const tagIconStyles = cva('', {
  variants: {
    color: {
      blue: 'text-blue-300',
      green: 'text-success-500',
      orange: 'text-warning-500',
      purple: 'text-purple-400',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

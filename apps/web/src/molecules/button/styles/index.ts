import { cva } from 'class-variance-authority';

import buttonVariations from '@packages/ui/button';

export const buttonIconContainerVariants = cva('', {
  variants: {
    isWide: {
      true: 'flex h-18 w-[50px] items-center justify-center rounded-lg',
      false: '',
    },
    hierarchy: {
      primary: '',
      outline: '',
      link: '',
      linkColor: '',
      'wide-purple': 'bg-neutrals-900',
      'wide-black': 'bg-purple-400',
    },
  },
  defaultVariants: {
    isWide: false,
  },
});

export const buttonVariants = cva(
  'flex w-full items-center justify-center gap-2 font-favorit text-md leading-[1] font-medium tracking-[0.04em] whitespace-nowrap uppercase focus-outline-primary transition-colors sm:w-fit dark:focus-outline-marine',
  {
    variants: {
      hierarchy: {
        ...buttonVariations,
        'wide-purple':
          'justify-between rounded-xl bg-purple-400 py-1.5 text-white group-hover:bg-neutrals-900 hover:bg-neutrals-900 focus-visible:bg-neutrals-900 sm:w-full',
        'wide-black':
          'justify-between rounded-xl bg-neutrals-900 py-1.5 text-white group-hover:bg-purple-900 hover:bg-purple-400 focus-visible:bg-purple-400 sm:w-full',
        linkColor: [
          'text-purple-400',
          'group-hover:text-purple-300 hover:text-purple-300',
          'focus-visible:text-purple-300',
        ],
      },
      iconPosition: {
        start: '',
        end: '',
      },
    },
    compoundVariants: [
      {
        hierarchy: ['primary'],
        class: 'px-4 py-3',
      },
      {
        hierarchy: ['outline'],
        class: 'px-[15px] py-[11px]',
      },
      {
        hierarchy: ['link'],
        class: '',
      },
      {
        hierarchy: ['wide-purple', 'wide-black'],
        iconPosition: 'start',
        class: 'pr-8 pl-1.5',
      },
      {
        hierarchy: ['wide-purple', 'wide-black'],
        iconPosition: 'end',
        class: 'pr-1.5 pl-8',
      },
    ],
    defaultVariants: {
      hierarchy: 'primary',
    },
  },
);

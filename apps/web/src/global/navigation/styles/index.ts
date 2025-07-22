import { cva } from 'class-variance-authority';

export const headerContainer = cva('top-0 z-10 w-full', {
  variants: {
    isOpen: {
      true: 'bg-wood-50 border-mud-200 border-b',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

export const hamburgerLineStyle = cva(
  ['absolute left-0 block h-0.5 w-full rotate-0 bg-current transition-all duration-300'],
  {
    variants: {
      line: {
        0: ['top-0 group-aria-[expanded=true]:top-2 group-aria-[expanded=true]:rotate-[135deg]'],
        1: ['top-2 group-aria-[expanded=true]:-left-5 group-aria-[expanded=true]:opacity-0'],
        2: [
          'top-4 group-aria-[expanded=false]:left-1/3 group-aria-[expanded=false]:w-2/3 group-aria-[expanded=true]:top-2 group-aria-[expanded=true]:rotate-[-135deg]',
        ],
      },
    },
  },
);

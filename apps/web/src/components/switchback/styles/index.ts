import { cva } from 'class-variance-authority';

export const mediaStyles = cva('', {
  variants: {
    hasBackground: {
      true: 'z-10 w-full p-8 sm:p-16 lg:p-24 [&>*]:drop-shadow-lg',
      false: 'contents',
    },
  },
});

export const mediaContainerStyle = cva('relative col-span-1 flex h-full items-center lg:col-span-6 lg:row-start-1', {
  variants: {
    reverse: {
      true: 'lg:col-start-7',
      false: 'lg:col-start-1',
    },
  },
  defaultVariants: {
    reverse: false,
  },
});

export const headingContainerStyle = cva(
  'col-span-1 row-start-1 flex h-full items-center lg:col-span-6 [&_.body]:text-lg sm:[&_.body]:text-lg lg:[&_.body]:text-lg [&_ul]:font-favorit [&_ul]:text-mono-md [&_ul]:uppercase',
  {
    variants: {
      reverse: {
        true: 'lg:col-start-1',
        false: 'lg:col-start-7',
      },
      items: {
        start: 'items-start',
        center: 'items-center',
      },
    },

    defaultVariants: {
      reverse: false,
      items: 'center',
    },
  },
);

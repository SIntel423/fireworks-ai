import { cva } from 'class-variance-authority';

const drawerStyles = cva('fixed z-999 flex flex-col gap-6 bg-white px-4 py-6', {
  variants: {
    position: {
      top: 'data-[state=closed]:animate-slide-out-top data-[state=open]:animate-slide-in-top top-0',
      right: 'right-0 data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right',
      bottom: 'bottom-0 data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom',
      left: 'data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left left-0',
    },
  },
  compoundVariants: [
    {
      position: ['top', 'bottom'],
      class: 'h-[calc(100dvh-(var(--dialog-size)))] w-full overflow-y-auto',
    },
    {
      position: ['left', 'right'],
      class: 'h-full w-[calc(100dvw-(var(--dialog-size)))] overflow-x-auto',
    },
  ],
  defaultVariants: {
    position: 'right',
  },
});

export default drawerStyles;

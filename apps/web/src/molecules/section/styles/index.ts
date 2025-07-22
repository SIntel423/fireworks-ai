import { cva } from 'class-variance-authority';

import sectionVariations, { sectionBgClasses } from '@packages/ui/section';
import { objectKeys } from '@packages/utils/src/typeUtils';

const sectionStyles = cva('relative scroll-mt-16', {
  variants: {
    noContain: {
      true: '',
      false: '',
    },
    bgColor: sectionBgClasses,
    overrideThemeMode: {
      true: '',
    },
  },
  compoundVariants: [
    {
      bgColor: 'dark',
      overrideThemeMode: false,
      class: 'dark',
    },
  ],
  defaultVariants: {
    noContain: false,
    bgColor: 'light',
  },
});

export const wrapperStyles = cva('mx-auto max-w-[1344px] px-4 sm:px-8', {
  variants: {
    top: { ...sectionVariations.top, footer: 'pt-6 sm:pt-10' },
    bottom: { ...sectionVariations.bottom, footer: 'pb-0 sm:pb-16 lg:pb-18' },
  },
  defaultVariants: {
    top: 'lg',
    bottom: 'lg',
  },
});

export const paddingOptions = objectKeys(sectionVariations.top);

export default sectionStyles;

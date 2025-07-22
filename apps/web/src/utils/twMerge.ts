import { extendTailwindMerge } from 'tailwind-merge';

// Prevent twMerge from overwriting font sizes with colors
// see @https://github.com/dcastil/tailwind-merge/blob/v1.13.2/docs/configuration.md
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            'display-xs',
            'display-sm',
            'display-md',
            'display-lg',
            'display-xl',
            'display-2xl',
            'mono-xs',
            'mono-sm',
            'mono-md',
            'mono-lg',
            'eyebrow-xs',
            'eyebrow-sm',
            'eyebrow-md',
            'eyebrow-lg',
            'rich-h1',
            'rich-h2',
            'rich-h3',
            'rich-h4',
            'rich-h5',
            'rich-h6',
            'rich-body',
          ],
        },
      ],
    },
  },
});

export default customTwMerge;

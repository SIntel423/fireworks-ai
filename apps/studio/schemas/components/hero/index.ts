import { BlockContentIcon } from '@sanity/icons';
import { defineField } from 'sanity';

import heading from '@/schemas/fields/heading';

import defineBackground from '@/utils/definitions/background';
import definePageComponent from '@/utils/definitions/component';
import { genValuesFromArray } from '@/utils/genValuesFromArray';

const hero = definePageComponent({
  name: 'hero',
  title: 'Hero',
  icon: BlockContentIcon,
  fields: [
    heading,
    defineField({
      name: 'variation',
      title: 'Variation',
      type: 'string',
      options: {
        list: genValuesFromArray(['simple', 'statement']),
        layout: 'radio',
      },
      initialValue: 'simple',
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: genValuesFromArray(['texture', 'rive']),
        layout: 'radio',
      },
      initialValue: 'texture',
    }),
    defineField({
      name: 'rive',
      title: 'Rive',
      type: 'reference',
      to: [{ type: 'rive' }],
      hidden: ({ parent }) => parent?.backgroundType === 'texture',
    }),
    defineBackground({
      name: 'bgImage',
      title: 'Background Image',
      hidden: ({ parent }) => parent?.backgroundType === 'rive',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      hidden: ({ parent }) => parent?.variation !== 'simple',
    }),
    defineField({
      name: 'buttonType',
      title: 'Button Type',
      type: 'string',
      options: {
        list: genValuesFromArray(['standard', 'wide']),
        layout: 'radio',
      },
      description: 'If wide buttons are selected you will not see updates when choosing the buttons hierarchy.',
      initialValue: 'standard',
      hidden: ({ parent }) => parent?.variation === 'simple',
    }),
    defineField({
      name: 'disableBreadcrumbs',
      title: 'Disable Breadcrumbs',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.variation === 'statement',
    }),
  ],

  preview: {
    select: {
      title: 'heading.heading',
      variation: 'variation',
    },
    prepare: ({ title, variation }) => {
      return {
        title: `Hero - ${variation}`,
        subtitle: title,
      };
    },
  },
});

export default hero;

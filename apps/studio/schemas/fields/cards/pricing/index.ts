import { defineField } from 'sanity';

import link from '@/schemas/fields/links';

import defineRichText from '@/utils/definitions/richText';
import { genValuesFromArray } from '@/utils/genValuesFromArray';

import icon from '../../icon';

const pricingCard = defineField({
  name: 'pricingCard',
  title: 'Pricing Card',
  type: 'object',
  fields: [
    icon,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineRichText({
      name: 'content',
      title: 'Content',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'number'],
      annotations: ['link', 'internalLink'],
      decorators: ['strong'],
    }),
    link,
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: genValuesFromArray(['light', 'dark']),
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
});

export default pricingCard;

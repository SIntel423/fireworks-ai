import { defineField } from 'sanity';

import defineRichText from '@/utils/definitions/richText';

const accordionItem = defineField({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required().warning('Please provide a label'),
    }),

    defineRichText({
      name: 'content',
      title: 'Content',
      annotations: ['link', 'internalLink'],
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      decorators: ['strong', 'underline', 'code'],
      validation: Rule => Rule.required().warning('Please provide content'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
});

export default accordionItem;

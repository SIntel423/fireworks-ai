import { PiCards } from 'react-icons/pi';
import { defineField } from 'sanity';

import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const resourceCardDeck = definePageComponent({
  name: 'resourceCardDeck',
  title: 'Resource Card Deck',
  icon: PiCards,
  fields: [
    heading,
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blog' }],
        },
      ],
      validation: Rule => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Resource Card Deck',
        subtitle: title,
      };
    },
  },
});

export default resourceCardDeck;

import { FaIcons } from 'react-icons/fa';
import { defineField } from 'sanity';

import iconCard from '@/schemas/fields/cards/icon';
import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const iconCardDeck = definePageComponent({
  name: 'iconCardDeck',
  title: 'Icon Card Deck',
  icon: FaIcons,
  fields: [
    heading,
    defineField({
      name: 'showArrowBgGraphic',
      title: 'Show Arrow Graphic',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'decks',
      title: 'Decks',
      type: 'array',
      of: [
        defineField({
          name: 'deck',
          title: 'Deck',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [iconCard],
              validation: Rule => Rule.min(1).max(5),
            }),
          ],
        }),
      ],
      validation: Rule => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Icon Card Deck',
      subtitle: title,
    }),
  },
});

export default iconCardDeck;

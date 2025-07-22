import { FaImages } from 'react-icons/fa';
import { defineField } from 'sanity';

import imageCard from '@/schemas/fields/cards/image';
import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const imageCardDeck = definePageComponent({
  name: 'imageCardDeck',
  title: 'Image Card Deck',
  icon: FaImages,
  fields: [
    heading,
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
        ]
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [imageCard],
      validation: Rule => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Image Card Deck',
      subtitle: title,
    }),
  },
});

export default imageCardDeck;

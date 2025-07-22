import { FaImages } from 'react-icons/fa';
import { defineField } from 'sanity';

import imageCard from '@/schemas/fields/cards/image';
import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const featuredBento = definePageComponent({
  name: 'featuredBento',
  title: 'Featured Bento',
  icon: FaImages,
  fields: [
    heading,
    defineField({
      name: 'topRowCards',
      title: 'Top Row Cards',
      type: 'array',
      of: [imageCard],
      validation: Rule => Rule.min(1).max(2),
      description: 'Large cards displayed in the top row (maximum 2 cards)',
    }),
    defineField({
      name: 'bottomRowCards',
      title: 'Bottom Row Cards',
      type: 'array',
      of: [{
        ...imageCard,
        fields: imageCard.fields?.filter(field => field.name !== 'featuredImage') || [],
      }],
      validation: Rule => Rule.min(0).max(5),
      description: 'Text-only cards displayed in the bottom row (maximum 5 cards, no images)',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Featured Bento',
      subtitle: title,
    }),
  },
});

export default featuredBento;

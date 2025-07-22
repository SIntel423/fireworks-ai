import { IoMdPricetags } from 'react-icons/io';
import { defineField } from 'sanity';

import pricingCard from '@/schemas/fields/cards/pricing';
import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const pricingCardDeck = definePageComponent({
  name: 'pricingCardDeck',
  title: 'Pricing Card Deck',
  icon: IoMdPricetags,
  fields: [
    heading,
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [pricingCard],
      validation: Rule => Rule.min(1).max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Pricing Card Deck',
      subtitle: title,
    }),
  },
});

export default pricingCardDeck;

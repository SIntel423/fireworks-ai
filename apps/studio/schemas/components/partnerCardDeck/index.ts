import { FaPeoplePulling } from 'react-icons/fa6';
import { defineField } from 'sanity';

import partnerCard from '@/schemas/fields/cards/partner';

import definePageComponent from '@/utils/definitions/component';

const partnerCardDeck = definePageComponent({
  name: 'partnerCardDeck',
  title: 'Partner Card Deck',
  icon: FaPeoplePulling,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [partnerCard],
      validation: Rule => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title: 'Partner Card Deck',
      subtitle: title,
    }),
  },
});

export default partnerCardDeck;

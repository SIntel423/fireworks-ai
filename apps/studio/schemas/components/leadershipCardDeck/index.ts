import { FaPeopleGroup } from 'react-icons/fa6';
import { defineField } from 'sanity';

import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const leadershipCardDeck = definePageComponent({
  name: 'leadershipCardDeck',
  title: 'Leadership Card Deck',
  icon: FaPeopleGroup,
  fields: [
    heading,
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      validation: Rule => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Leadership Card Deck',
      subtitle: title,
    }),
  },
});

export default leadershipCardDeck;

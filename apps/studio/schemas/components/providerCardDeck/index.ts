import { SchemaIcon } from '@sanity/icons';
import { defineField } from 'sanity';

import link from '@/schemas/fields/links';

import definePageComponent from '@/utils/definitions/component';

const providerCardDeck = definePageComponent({
  name: 'providerCardDeck',
  title: 'Provider Card Deck',
  icon: SchemaIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'providers',
      title: 'Providers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{ name: 'provider', type: 'reference', to: [{ type: 'provider' }] }, link],
          preview: { select: { title: 'provider.company.name', media: 'provider.company.mark' } },
        },
      ],
      validation: Rule => Rule.min(1).max(10),
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

export default providerCardDeck;

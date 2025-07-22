import { defineField } from 'sanity';

import defineBackground from '@/utils/definitions/background';

import link from '../../links';

const partnerCard = defineField({
  name: 'partnerCard',
  title: 'Partner Card',
  type: 'object',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
    defineBackground({
      name: 'background',
      title: 'Background',
    }),
    link,
  ],
  preview: {
    select: {
      title: 'company.name',
      subtitle: 'company.name',
    },
  },
});

export default partnerCard;

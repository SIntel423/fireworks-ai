import { TbListSearch } from 'react-icons/tb';
import { defineField } from 'sanity';

import heading from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';
import { genValuesFromArray } from '@/utils/genValuesFromArray';

const listing = definePageComponent({
  name: 'listing',
  title: 'Listing',
  icon: TbListSearch,
  fields: [
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: genValuesFromArray(['blog', 'model']),
        layout: 'radio',
      },
    }),
    defineField({ ...heading, hidden: ({ parent }) => parent?.listingType !== 'model' }),
  ],
  preview: {
    select: {
      listingType: 'listingType',
    },
    prepare: ({ listingType }) => ({
      title: 'Listing',
      subtitle: listingType,
    }),
  },
});

export default listing;

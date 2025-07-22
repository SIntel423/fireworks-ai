import { BlockContentIcon } from '@sanity/icons';

import headingMolecule from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const heading = definePageComponent({
  name: 'heading',
  title: 'Heading',
  icon: BlockContentIcon,
  fields: [
    headingMolecule,
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => ({
      title: 'Heading',
      subtitle: title,
    }),
  },
});

export default heading;

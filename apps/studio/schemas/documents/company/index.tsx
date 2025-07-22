import { CaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import defineImage from '@/utils/definitions/image';

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().error('You must provide a name for this company.'),
    }),
    defineImage({
      name: 'lightLogo',
      title: 'Light Logo',
      description: 'Make sure to upload the logo with a white color',
    }),
    defineImage({
      name: 'darkLogo',
      title: 'Dark Logo',
      description: 'Make sure to upload the logo with a black color',
    }),
    defineImage({
      name: 'mark',
      title: 'Mark',
      description:
        'This will be used on model pages. Colored marks will be fine. Please do not include text. 1:1 aspect ratio.',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      lightLogo: 'lightLogo',
      darkLogo: 'darkLogo',
      mark: 'mark',
    },
    prepare: ({ name, lightLogo, darkLogo, mark }) => ({
      title: name,
      media: mark || lightLogo || darkLogo,
    }),
  },
});

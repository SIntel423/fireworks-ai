import { DatabaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const provider = defineType({
  name: 'provider',
  title: 'Provider',
  type: 'document',
  icon: DatabaseIcon,
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
  ],
  preview: {
    select: {
      name: 'company.name',
      lightLogo: 'company.lightLogo',
      darkLogo: 'company.darkLogo',
      mark: 'company.mark',
    },
    prepare: ({ name, lightLogo, darkLogo, mark }) => ({
      title: name,
      media: mark || lightLogo || darkLogo,
    }),
  },
});

export default provider;

import { defineField, defineType } from 'sanity';

import icon from '@/schemas/fields/icon';

const modelType = defineType({
  name: 'modelType',
  title: 'Model Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    icon,
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'simplerColor',
      options: {
        colorList: [
          { label: 'Blue', value: 'blue' },
          { label: 'Green', value: 'green' },
          { label: 'Orange', value: 'orange' },
          { label: 'Purple', value: 'purple' },
        ],
      },
      initialValue: 'blue',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      iconColor: 'iconColor.label',
    },
    prepare: ({ name, iconColor }) => ({
      title: name,
      subtitle: iconColor,
    }),
  },
});

export default modelType;

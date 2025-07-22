import { defineField, defineType } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import heading from '@/schemas/fields/heading';
import icon from '@/schemas/fields/icon';
import link from '@/schemas/fields/links';

const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    heading,
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        defineField({
          name: 'menu',
          title: 'Menu',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'object', fields: [icon, link], preview: { select: { title: 'link.label' } } }],
            }),
          ],
          preview: {
            select: {
              label: 'label',
              links: 'links',
            },
            prepare: ({ label, links }) => ({
              title: label,
              subtitle: hasArrayValues(links) ? `${links.length} Links` : 'No Links',
            }),
          },
        }),
      ],
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default footer;

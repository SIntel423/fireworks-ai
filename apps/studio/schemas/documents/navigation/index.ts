import { MenuIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import button from '@/schemas/fields/button';
import icon from '@/schemas/fields/icon';
import link from '@/schemas/fields/links';

const navigationItem = defineField({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    icon,
    link,
    defineField({ name: 'badge', title: 'Badge', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
      subtitle: 'description',
    },
  },
});

const menuItem = defineField({
  name: 'menu',
  title: 'Menu',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [navigationItem],
      validation: rule => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      links: 'menu',
    },
    prepare: ({ label, links }) => ({
      title: label,
      subtitle: hasArrayValues(links) ? `${links.length} Links` : 'No Links',
    }),
  },
});

const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        menuItem,
        defineField({
          name: 'megaMenu',
          title: 'Mega Menu',
          type: 'object',
          icon: MenuIcon,
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'column',
              title: 'Column',
              type: 'array',
              of: [menuItem],
              validation: rule => rule.min(1).max(6),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              columns: 'column',
            },
            prepare: ({ label, columns }) => ({
              title: label,
              subtitle: hasArrayValues(columns) ? `${columns.length} Columns` : 'No Columns',
            }),
          },
        }),
        link,
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [button],
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default navigation;

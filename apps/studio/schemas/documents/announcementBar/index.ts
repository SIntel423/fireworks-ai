import { defineField, defineType } from 'sanity';

import link from '@/schemas/fields/links';

import defineRichText from '@/utils/definitions/richText';

const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'document',
  fields: [
    defineRichText({
      name: 'announcement',
      title: 'Announcement',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'bullet', 'number'],
      decorators: ['strong'],
    }),
    link,
    defineField({
      name: 'background',
      title: 'Background',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient', value: 'gradient' },
          { title: 'Purple', value: 'purple' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default announcementBar;

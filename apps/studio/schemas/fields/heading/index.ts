import { defineField } from 'sanity';

import button from '@/schemas/fields/button';

import defineRichText from '@/utils/definitions/richText';

const heading = defineField({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),

    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),

    defineRichText({
      name: 'body',
      title: 'Body',
      annotations: ['link', 'internalLink'],
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
      decorators: ['strong', 'underline', 'code'],
    }),

    // this field can be buttons, app downloads, or images ( can we restrict the images to logos? )
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [button],
      validation: rule => rule.max(2),
    }),
  ],
});

export default heading;

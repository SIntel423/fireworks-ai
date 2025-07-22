import { defineField } from 'sanity';

import link from '@/schemas/fields/links';

import defineRichText from '@/utils/definitions/richText';
import defineImage from '@/utils/definitions/image';
import icon from '../../icon';

const imageCard = defineField({
  name: 'imageCard',
  title: 'Image Card',
  type: 'object',
  fields: [
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
    }),
    icon,
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineRichText({
      name: 'content',
      title: 'Content',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'number'],
      decorators: ['strong', 'underline']
    }),
    link,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
});

export default imageCard;

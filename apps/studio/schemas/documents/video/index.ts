import { PlayIcon } from '@sanity/icons';
import { defineField } from 'sanity';

import defineImage from '@/utils/definitions/image';

const video = defineField({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineImage({
      name: 'thumbnail',
      title: 'Thumbnail',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'video',
    },
  },
});

export default video;

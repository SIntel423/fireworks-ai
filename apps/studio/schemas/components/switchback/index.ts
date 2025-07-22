import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { defineField } from 'sanity';

import heading from '@/schemas/fields/heading';

import defineBackground from '@/utils/definitions/background';
import definePageComponent from '@/utils/definitions/component';
import defineImage from '@/utils/definitions/image';

const switchback = definePageComponent({
  name: 'switchback',
  title: 'Switchback',
  icon: HiOutlineSwitchHorizontal,
  fields: [
    heading,
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Media', value: 'media' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
      hidden: ({ parent }) => parent?.mediaType === 'media',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'reference',
      to: [{ type: 'video' }, { type: 'rive' }, { type: 'hubspotForm' }],
      hidden: ({ parent }) => parent?.mediaType === 'image',
    }),
    defineBackground({
      name: 'mediaBackground',
      title: 'Media Background',
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse',
      type: 'boolean',
      initialValue: false,
      description:
        'Reverse the order of the switchback. If enabled the image will appear on the right on desktop. On Mobile and tablet the image will always appear above the content. ',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Switchback',
        subtitle: title,
      };
    },
  },
});

export default switchback;

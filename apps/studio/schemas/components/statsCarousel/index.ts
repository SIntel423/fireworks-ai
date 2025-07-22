import { ChartUpwardIcon } from '@sanity/icons';
import { defineField } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import definePageComponent from '@/utils/definitions/component';
import defineImage from '@/utils/definitions/image';

const StatsCarousel = definePageComponent({
  name: 'statsCarousel',
  title: 'Stats Carousel',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'panels',
      type: 'array',
      of: [
        defineField({
          name: 'panel',
          title: 'Panel',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({
              name: 'stats',
              type: 'array',
              of: [
                defineField({
                  name: 'statObject',
                  title: 'Stat Object',
                  type: 'object',
                  fields: [
                    defineField({ name: 'stat', title: 'Stat', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'string' }),
                  ],
                  preview: {
                    select: {
                      title: 'stat',
                      subtitle: 'description',
                    },
                  },
                }),
              ],
              validation: Rule => Rule.min(1).max(3),
            }),
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
              to: [{ type: 'video' }, { type: 'rive' }],
              hidden: ({ parent }) => parent?.mediaType === 'image',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
      validation: Rule => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {
      panels: 'panels',
    },
    prepare: ({ panels }) => {
      return {
        title: 'Stats Carousel',
        subtitle: hasArrayValues(panels) ? `${panels.length} Panels` : 'No Panels',
      };
    },
  },
});

export default StatsCarousel;

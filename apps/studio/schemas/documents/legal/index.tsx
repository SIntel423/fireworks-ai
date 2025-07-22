import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { pageBody } from '@/schemas/fields/pageBody';
import { seo } from '@/schemas/fields/seo';

import defineImage from '@/utils/definitions/image';
import defineRichText from '@/utils/definitions/richText';

const legal = defineType({
  name: 'legal',
  title: 'Legal',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    seo(),
    defineField({
      name: 'postTitle',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineRichText({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'This field will show up underneath the title.',
      group: 'content',
    }),
    defineRichText({
      name: 'content',
      title: 'Content',
      group: 'content',
      decorators: ['strong', 'underline', 'code'],
      annotations: ['link', 'internalLink'],
      excludedTextStyles: ['h1'],
      includeHorizontalRule: true,
      additionalSchemas: [
        defineImage({
          name: 'richImage',
          title: 'Rich Image',
        }),
      ],
    }),
    pageBody,
  ],
  initialValue: () => ({
    // body: [{ _type: 'symbolReference', _ref: '3f8eb38c-a989-4d6b-bee4-efad841c1113' }],
  }),
  preview: {
    select: {
      title: 'postTitle',
      slug: 'seo.slug.current',
    },
    prepare: ({ title, slug }) => {
      const slugPreview = slug ? `${slug}` : 'Not published';

      return {
        title,
        subtitle: slugPreview,
      };
    },
  },
});

export default legal;

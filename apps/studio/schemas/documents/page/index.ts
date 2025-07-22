import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { pageBody } from '@/schemas/fields/pageBody';
import { seo } from '@/schemas/fields/seo';

const page = defineType({
  name: 'page',
  title: 'Page',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    pageBody,
  ],
  preview: {
    select: {
      title: 'title',
      internalName: 'internalName',
      slug: 'seo.slug.current',
    },
    prepare: ({ title, internalName, slug }) => {
      const slugPreview = slug ? `${slug}` : 'Not published';

      return {
        title: internalName || title,
        subtitle: slugPreview,
      };
    },
  },
});

export default page;

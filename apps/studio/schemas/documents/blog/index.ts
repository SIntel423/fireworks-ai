/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditIcon, HashIcon, TagsIcon, WrenchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import code from '@/schemas/fields/code';
import { seo } from '@/schemas/fields/seo';

import defineImage from '@/utils/definitions/image';
import defineRichText from '@/utils/definitions/richText';

const blog = defineType({
  name: 'blog',
  title: 'Blog',
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
      name: 'tags',
      title: 'Tags',
      icon: TagsIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    {
      ...seo(),
      options: {
        slugPrefix: 'blog',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'postTitle',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),

    defineRichText({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'This field will show up on resource cards.',
      group: 'content',
    }),
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
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
        defineField({
          name: 'video',
          title: 'Video',
          type: 'reference',
          to: [{ type: 'video' }],
        }),
        code,
        defineField({
          name: 'rive',
          title: 'Rive',
          type: 'reference',
          to: [{ type: 'rive' }],
        }),
        defineField({
          name: 'table',
          title: 'Table',
          type: 'object',
          fields: [
            defineField({
              name: 'columnHeadings',
              title: 'Column Headings',
              type: 'array',
              of: [
                {
                  name: 'columnHeading',
                  title: 'Column Heading',
                  type: 'object',
                  fields: [{ name: 'label', title: 'Label', type: 'string' }],
                },
              ],
              validation: rule =>
                rule.custom((colHeadings, context: any) => {
                  const tableColumns = context.parent.table?.rows?.[0].cells;

                  if (!hasArrayValues(colHeadings) || colHeadings.length !== tableColumns.length) {
                    return 'Must match number of columns';
                  }

                  return true;
                }),
            }),
            defineField({
              name: 'table',
              title: 'Table',
              type: 'table',
            }),
          ],
        }),
      ],
    }),
    // pageBody,
    defineField({
      name: 'blogTags',
      title: 'Blog Tags',
      type: 'array',
      group: 'tags',
      of: [
        {
          type: 'reference',
          to: { type: 'blogCategory' },
          options: {
            disableNew: true,
          },
        },
      ],
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'settings',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required().error('You must provide a published date for this blog post.'),
      group: 'settings',
    }),
    defineField({
      name: 'deList',
      title: 'Remove from Listing Page',
      description:
        'Check this box to remove this blog post from the listing page. The post will still be indexed and reachable on the front end',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
  ],
  initialValue: () => ({
    publishedDate: new Date(),
    // Add in common components here
    // body: [
    //   { _type: 'symbolReference', _ref: '970505b8-173f-441f-8968-606aa6592760' },
    //   { _type: 'symbolReference', _ref: '3f8eb38c-a989-4d6b-bee4-efad841c1113' },
    // ],
  }),
  preview: {
    select: {
      title: 'postTitle',
      slug: 'seo.slug.current',
      media: 'featuredImage',
      published: 'publishedDate',
    },
    prepare: ({ title, slug, media, published }) => {
      const slugPreview = slug ? `${slug}` : 'Not published';

      return {
        title,
        subtitle: published || slugPreview,
        media,
      };
    },
  },
});

export default blog;

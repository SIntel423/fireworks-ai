import { CodeBlockIcon, ComponentIcon, EditIcon, HashIcon, WrenchIcon } from '@sanity/icons';
import { FaDollarSign } from 'react-icons/fa6';
import { defineArrayMember, defineField, defineType } from 'sanity';

import icon from '@/schemas/fields/icon';
import link from '@/schemas/fields/links';
import { pageBody } from '@/schemas/fields/pageBody';
import { seo } from '@/schemas/fields/seo';

import defineRichText from '@/utils/definitions/richText';

const model = defineType({
  name: 'model',
  title: 'Model',
  type: 'document',
  groups: [
    {
      name: 'model',
      title: 'Model',
      icon: CodeBlockIcon,
      default: true,
    },
    {
      name: 'content',
      title: 'Content',
      icon: ComponentIcon,
    },
    {
      name: 'details',
      title: 'Details',
      icon: EditIcon,
    },
    {
      name: 'pricing',
      title: 'Pricing',
      icon: FaDollarSign,
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
  fieldsets: [
    { name: 'info', title: 'Info' },
    { name: 'pricing', title: 'Pricing', options: { columns: 2 } },
  ],
  fields: [
    {
      ...seo(),
      options: {
        slugPrefix: 'models',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'modelName',
      title: 'Model Name',
      type: 'string',
      group: 'model',
      fieldset: 'info',
    }),
    defineRichText({
      name: 'description',
      title: 'Description',
      group: 'model',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'bullet', 'number'],
      decorators: ['strong', 'underline'],
      annotations: ['link', 'internalLink'],
      fieldset: 'info',
    }),
    defineField({
      ...link,
      name: 'modelLink',
      title: 'Model Link',
      fieldset: 'info',
      group: 'model',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'model',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            icon,
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            link,
          ],
        }),
      ],
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'reference',
      group: 'details',
      to: [{ type: 'provider' }],
    }),
    defineField({
      name: 'modelType',
      title: 'Model Type',
      type: 'array',
      group: 'details',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'modelType' }],
        }),
      ],
    }),
    defineField({
      name: 'contextLength',
      title: 'Context Length',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'serverless',
      title: 'Serverless',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'onDemandDeployment',
      title: 'On-Demand Deployment',
      type: 'boolean',
      group: 'details',
      initialValue: true,
    }),
    defineField({
      name: 'fineTuning',
      title: 'Fine-Tuning',
      type: 'boolean',
      group: 'details',
    }),
    defineField({
      name: 'collapsePricing',
      title: 'Collapse Pricing',
      type: 'boolean',
      group: 'pricing',
      initialValue: false,
    }),
    defineField({
      name: 'pricingInput',
      type: 'number',
      group: 'pricing',
      fieldset: 'pricing',
      validation: Rule => Rule.min(0).max(10).positive(),
    }),
    defineField({
      name: 'pricingOutput',
      title: 'Pricing Output',
      type: 'number',
      group: 'pricing',
      fieldset: 'pricing',
      validation: Rule => Rule.min(0).max(10).positive(),
      hidden: ({ parent }) => parent?.collapsePricing,
    }),
    defineField({
      name: 'pricingUnit',
      title: 'Pricing Unit',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'Per Million', value: 'million' },
          { title: 'Per Image', value: 'image' },
          { title: 'Per Step', value: 'step' },
          { title: 'Per Minute', value: 'minute' },
        ],
        layout: 'radio',
      },
      initialValue: 'million',
    }),
    defineField({
      name: 'new',
      title: 'New',
      type: 'boolean',
      group: 'settings',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'settings',
    }),
    defineField({
      name: 'color',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
      validation: Rule => Rule.required(),
    }),
    pageBody,
  ],
  initialValue: () => ({}),
  preview: {
    select: {
      title: 'modelName',
      slug: 'seo.slug.current',
      provider: 'provider.icon',
    },
    prepare: ({ title, slug, provider }) => {
      const slugPreview = slug ? `${slug}` : 'Not published';

      return {
        title,
        subtitle: slugPreview,
        media: provider,
      };
    },
  },
});

export default model;

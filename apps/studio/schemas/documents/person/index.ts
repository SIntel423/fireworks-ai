import { EditIcon, LinkIcon, UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import image from '@/utils/definitions/image';
import { genValuesFromArray } from '@/utils/genValuesFromArray';

import { company } from '../company';

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'name',
      title: 'Name',
      options: { columns: 2 },
    },
    {
      name: 'employment',
      title: 'Employment',
    },
    {
      name: 'socialMediaUrls',
      title: 'Social Media Links',
    },
  ],
  groups: [
    { name: 'basics', title: 'Basics', icon: EditIcon, default: true },
    { name: 'social', title: 'Social Links', icon: LinkIcon },
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: Rule => Rule.required().warning('You must provide a first name for this person.'),
    }),
    defineField({
      name: 'lastName',
      title: 'Last',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: Rule => Rule.required().warning('You must provide a last name for this person.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'previousRole',
      title: 'Previous Role',
      type: 'string',
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [company],
      fieldset: 'employment',
      group: 'basics',
    }),
    image({ name: 'headshot', title: 'Headshot', group: 'basics' }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      group: 'social',
      of: [
        {
          name: 'social',
          title: 'Social',
          type: 'object',
          fields: [
            { name: 'url', type: 'url', validation: Rule => Rule.required() },
            {
              name: 'account',
              type: 'string',
              options: {
                list: genValuesFromArray(['linkedin', 'x', 'facebook', 'instagram', 'github']),
                layout: 'radio',
              },
              validation: Rule => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'account',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      companyName: 'company.name',
      media: 'headshot',
    },
    prepare({ firstName, lastName, role, companyName, media }) {
      const title = [firstName, lastName].filter(i => i).join(' ');

      let subtitle: string[] | string = [role, companyName];

      if (role && companyName) {
        subtitle = subtitle.join(' | ');
      } else {
        subtitle = subtitle.filter(i => i).join('');
      }

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});

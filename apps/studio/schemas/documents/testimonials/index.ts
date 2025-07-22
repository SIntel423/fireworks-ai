import { defineField, defineType } from 'sanity';

import defineRichText from '@/utils/definitions/richText';

import { person } from '../person';

const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineRichText({
      name: 'testimonial',
      title: 'Testimonial',
      decorators: ['strong'],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [person],
    }),
  ],
  preview: {
    select: {
      firstName: 'author.firstName',
      lastName: 'author.lastName',
      company: 'author.company.name',
      media: 'author.headshot',
    },
    prepare: ({ firstName, lastName, company, media }) => ({
      title: `${firstName} ${lastName}`,
      subtitle: company,
      media,
    }),
  },
});

export default testimonial;

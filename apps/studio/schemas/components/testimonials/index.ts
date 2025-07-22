import { MdOutlineRateReview } from 'react-icons/md';
import { defineField } from 'sanity';

import headingMolecule from '@/schemas/fields/heading';

import definePageComponent from '@/utils/definitions/component';

const testimonials = definePageComponent({
  name: 'testimonials',
  title: 'Testimonials',
  icon: MdOutlineRateReview,
  fields: [
    headingMolecule,
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: Rule => Rule.min(3).max(12),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Accordion', value: 'accordion' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'accordion',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Testimonials',
        subtitle: title,
      };
    },
  },
});

export default testimonials;

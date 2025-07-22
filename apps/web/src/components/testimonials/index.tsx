import { Root } from '@radix-ui/react-accordion';

import { hasArrayValues } from '@packages/utils/src/arrays';

import ElementAnimation from 'molecules/elementAnimation';
import { sectionFragment } from 'molecules/section';

import { headingFragment } from 'organisms/heading';
import Testimonial, { testimonialFragment } from 'organisms/testimonial';

import Carousel from 'components/testimonials/components/Carousel';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type TestimonialsFragment = InferFragmentType<typeof testimonialsFragment>;

const Testimonials: FC<TestimonialsFragment> = ({ testimonials, layout }) => layout === 'accordion' ? (
  <Root type="single" collapsible className="flex w-full flex-col">
    {hasArrayValues(testimonials) &&
      testimonials.map((testimonial, index) => (
        <ElementAnimation key={`${testimonial._id}${index + 1}`} animation="slideInRight" delay={index * 100}>
          <Testimonial index={index} {...testimonial} />
        </ElementAnimation>
      ))}
  </Root>
) : (
  hasArrayValues(testimonials) && <Carousel slides={testimonials} />
);

type TestimonialsQuery = ExtractSanityType<Page, 'testimonials'>;

export const testimonialsFragment = q.fragment<TestimonialsQuery>().project(testimonials => ({
  _key: q.string(),
  heading: testimonials.field('heading').project(headingFragment).nullable(true),
  layout: q.union([q.literal('carousel'), q.literal('accordion')]).nullable(),
  testimonials: testimonials.field('testimonials[]').deref().project(testimonialFragment).nullable(true),
  ...sectionFragment,
}));

export default Testimonials;

import { Content, Item, Trigger } from '@radix-ui/react-accordion';

import Attribution, { personFragment } from 'molecules/attribution';
import Icon from 'molecules/icon';
import Image from 'molecules/image';
import RichText, { richTextFragment } from 'molecules/richText';

import { quoteStyle } from 'components/testimonials/styles';

import { q } from 'lib/client';

import { getCompanyLogo } from 'utils/getCompanyLogo';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

export type TestimonialFragment = InferFragmentType<typeof testimonialFragment>;
type TestimonialProps = TestimonialFragment & { index: number };

const Testimonial: FC<TestimonialProps> = ({ _id, author, testimonial, index }) => {
  const companyLogo = getCompanyLogo(author?.company, true);

  return (
    <Item value={`${_id}${index + 1}`} className="group font-mono border-t border-gray/20 py-12">
      <div className="relative flex w-full flex-col gap-y-8 lg:flex-row lg:items-start lg:justify-between">
        <Trigger className="group flex w-full grow cursor-pointer items-center gap-12 outline-hidden lg:w-fit">
          <span className="flex size-12 shrink-0 grow-0 basis-12 items-center justify-center">
            <span className="relative flex size-10 text-purple-500 transition-transform group-data-[state=open]:rotate-180">
              <Icon
                icon="plus"
                size={40}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-data-[state=open]:opacity-0"
              />
              <Icon
                icon="minus"
                size={40}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-data-[state=open]:opacity-100"
              />
            </span>
          </span>
          <span className="block w-fit text-left transition-opacity group-hover:group-data-[state=closed]:opacity-50">
            {companyLogo && (
              <Image
                {...companyLogo}
                noFill
                objectCover
                unsetMaxWidth
                className="h-[55px] w-auto brightness-0 contrast-30"
              />
            )}
          </span>
          <div className="absolute top-0 left-0 z-10 h-[100px] w-full" />
        </Trigger>
        <div className="relative grid w-full grid-cols-1 grid-rows-1 lg:w-[737px]">
          {testimonial && <RichText blocks={testimonial} className={quoteStyle({ expanded: false })} />}
          <Content className="col-start-1 row-start-1 flex w-full flex-col gap-8 overflow-hidden data-[state=closed]:max-h-full data-[state=closed]:animate-(--animate-testimonial-accordion-slide-up) data-[state=open]:animate-(--animate-testimonial-accordion-slide-down)">
            {testimonial && <RichText blocks={testimonial} className={quoteStyle({ expanded: true })} />}
            {author && <Attribution {...author} />}
          </Content>
        </div>
      </div>
    </Item>
  );
};

export const testimonialFragment = q.fragmentForType<'testimonial'>().project(testimonial => ({
  _id: q.string(),
  author: testimonial.field('author').deref().project(personFragment).nullable(true),
  testimonial: testimonial.field('testimonial[]').project(richTextFragment).nullable(true),
}));

export default Testimonial;

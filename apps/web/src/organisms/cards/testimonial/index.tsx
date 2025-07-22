import Attribution from 'molecules/attribution';
import Image from 'molecules/image';
import RichText from 'molecules/richText';

import { getCompanyLogo } from 'utils/getCompanyLogo';

import type { TestimonialFragment } from 'organisms/testimonial';
import type { FC } from 'react';

const Testimonial: FC<TestimonialFragment> = ({ author, testimonial }) => {
  const companyLogo = getCompanyLogo(author?.company, true);

  return (
    <div className="group font-mono flex h-full flex-col gap-8 rounded-xl bg-white px-12 py-12 sm:px-12 lg:px-12">
      {companyLogo && (
        <Image
          {...companyLogo}
          noFill
          objectCover
          unsetMaxWidth
          className="h-auto w-[100px] brightness-0 contrast-30"
        />
      )}
      {testimonial && <RichText blocks={testimonial} className="text-md text-neutrals-900" />}
      {author && <Attribution {...author} size="large" />}
    </div>
  );
};

export default Testimonial;

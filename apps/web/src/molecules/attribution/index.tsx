import Image, { imageFragment } from 'molecules/image';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type AttributionProps = Omit<InferFragmentType<typeof personFragment>, 'company'> & {
  company?: InferFragmentType<typeof companyFragment> | null;
  size?: 'default' | 'large';
};

export const constructName = (firstName?: string | null, lastName?: string | null) =>
  [firstName, lastName].filter(Boolean).join(' ');

const Attribution: FC<AttributionProps> = ({ firstName, lastName, role, company, headshot, size = 'default' }) => (
  <div className="flex items-center gap-4">
    {headshot && (
      <Image
        {...headshot}
        objectCover
        className={`shrink-0 overflow-hidden rounded-md ${size === 'large' ? 'size-[64px] basis-[64px]' : 'size-16 basis-16 sm:size-20 sm:basis-20'}`}
      />
    )}
    <div
      className={`flex flex-col leading-[1em] font-medium tracking-[0.04em] text-purple-500 uppercase ${size === 'large' ? 'gap-2 text-[12px]' : 'gap-4 text-xs sm:text-md'}`}
    >
      {(firstName || lastName) && (
        <div>
          {constructName(firstName, lastName)} {role && <span>• {role}</span>}
        </div>
      )}

      {company?.name && <div>{company?.name}</div>}
    </div>
  </div>
);

export const companyFragment = q.fragmentForType<'company'>().project(company => ({
  name: q.string().optional().nullable(),
  lightLogo: company.field('lightLogo').project(imageFragment).nullable(true),
  darkLogo: company.field('darkLogo').project(imageFragment).nullable(true),
  mark: company.field('mark').project(imageFragment).nullable(true),
}));

export const socialFragment = q.fragment<FragmentAny>().project({
  url: q.string().optional().nullable(),
  account: q.string().optional().nullable(),
});

export const personFragment = q.fragmentForType<'person'>().project(person => ({
  _id: q.string().optional().nullable(),
  firstName: q.string().optional().nullable(),
  lastName: q.string().optional().nullable(),
  role: q.string().optional().nullable(),
  previousRole: q.string().optional().nullable(),
  company: person.field('company').deref().project(companyFragment),
  headshot: person.field('headshot').project(imageFragment),
  socials: person.field('socials[]').project(socialFragment).nullable(true),
}));

export default Attribution;

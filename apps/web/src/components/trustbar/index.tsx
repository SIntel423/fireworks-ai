import Marquee from 'react-fast-marquee';

import { hasArrayValues } from '@packages/utils/src/arrays';

import { companyFragment } from 'molecules/attribution';
import Image from 'molecules/image';
import { sectionFragment } from 'molecules/section';

import { q } from 'lib/client';

import { getCompanyLogo } from 'utils/getCompanyLogo';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

interface TrustbarFragment extends InferFragmentType<typeof trustbarFragment> {
  isDark?: boolean;
}

interface LogoProps {
  company: InferFragmentType<typeof companyFragment>;
  isDark?: boolean;
  noPadding?: boolean;
}

const Logo: FC<LogoProps> = ({ company, isDark, noPadding }) => {
  const logo = getCompanyLogo(company, isDark);

  return (
    logo && (
      <div className={noPadding ? '' : 'px-7 py-2'}>
        <Image
          {...logo}
          alt={`${company.name}'s logo`}
          noFill
          objectCover
          unsetMaxWidth
          className="h-10 w-auto [&_img]:object-center"
        />
      </div>
    )
  );
};

const Trustbar: FC<TrustbarFragment> = ({ companies, isDark }) => (
  <div className="relative">
    {hasArrayValues(companies) &&
      (companies.length > 4 ? (
        <Marquee
          autoFill
          speed={20}
          gradient
          gradientWidth={200}
          gradientColor={isDark ? 'var(--color-black)' : 'var(--color-neutrals-50)'}
        >
          {companies.map(company => (
            <Logo key={company.name} company={company} isDark={isDark} />
          ))}
        </Marquee>
      ) : (
        <div className="flex flex-wrap items-center gap-10">
          {companies.map(company => (
            <Logo key={company.name} company={company} isDark={isDark} noPadding />
          ))}
        </div>
      ))}
  </div>
);

type TrustbarQuery = ExtractSanityType<Page, 'trustbar'>;

export const trustbarFragment = q.fragment<TrustbarQuery>().project(trustbar => ({
  _key: q.string(),
  companies: trustbar.field('companies[]').deref().project(companyFragment).nullable(true),
  ...sectionFragment,
}));

export default Trustbar;

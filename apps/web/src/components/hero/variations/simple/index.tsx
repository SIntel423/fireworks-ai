import Breadcrumbs from 'molecules/breadcrumbs';

import Heading from 'organisms/heading';

import type { HeroFragment } from 'components/hero';
import type { FC } from 'react';

type SimpleHeroProps = Maybify<StripSectionProps<Omit<HeroFragment, 'bgImage' | 'variation'>>>;

const SimpleHero: FC<SimpleHeroProps> = ({ heading, disableBreadcrumbs, alignment }) => (
  <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
    {!disableBreadcrumbs && <Breadcrumbs />}
    <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-14">
      <Heading {...heading} size="xl" alignment={alignment} headingTag="h1" setMaxWidth={false} />
    </div>
  </div>
);

export default SimpleHero;

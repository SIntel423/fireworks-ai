import { isDarkImage } from '@packages/ui/backgrounds';

import BackgroundImage from 'molecules/backgroundImage';
import ElementAnimation from 'molecules/elementAnimation';

import Heading from 'organisms/heading';

import { containerStyle } from 'components/hero/styles';

import type { HeroFragment } from 'components/hero';
import type { FC } from 'react';

type StatementHeroProps = Maybify<StripSectionProps<Omit<HeroFragment, 'variation'>>>;

const StatementHero: FC<StatementHeroProps> = ({ heading, bgImage, rive, buttonType }) => (
  <div className={containerStyle({ isDark: isDarkImage(bgImage) })}>
    {(bgImage || rive) && (
      <ElementAnimation animation="fadeIn" asChild>
        <BackgroundImage image={bgImage} rive={rive} className="absolute inset-0" />
      </ElementAnimation>
    )}
    <div
      className="relative z-10"
      style={{
        '--text-subtitle-override': 'var(--color-neutrals-900)',
      }}
    >
      <Heading
        {...heading}
        size="2xl"
        setMaxWidth={false}
        alignment="left"
        headingTag="h1"
        hasWideButton={buttonType === 'wide'}
      />
    </div>
  </div>
);

export default StatementHero;

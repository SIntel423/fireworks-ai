import { hasArrayValues } from '@packages/utils/src/arrays';

import Section from 'molecules/section';

import ModelHero from 'components/hero/variations/model';

import ModelFeatureCard from 'templates/model/components/featureCard';
import ModelInfo from 'templates/model/components/info';

import ComponentGenerator from 'utils/componentGenerator';

import type { FC } from 'react';
import type { ModelFragment } from 'templates/model/query';
import type { ComponentProps } from 'utils/componentGenerator';

const colors = {
  blue: 'blue-25',
  yellow: 'warning-100',
  green: 'marine-50',
  red: 'red-200',
};

const ModelTemplate: FC<ModelFragment & { body?: ComponentProps[] | null }> = ({
  modelName,
  provider,
  description,
  modelLink,
  features,
  color,
  body,
  ...rest
}) => (
  <>
    <Section padding={{ top: 'md', bottom: 'md' }}>
      <ModelHero
        modelName={modelName}
        providerLogo={provider?.company?.mark}
        description={description}
        modelLink={modelLink}
        color={color}
      />
    </Section>
    <Section padding={{ top: 'md', bottom: 'lg' }}>
      <div
        className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        style={{ '--icon-color': color ? `var(--color-${colors[color]})` : 'var(--color-blue-25)' }}
      >
        {hasArrayValues(features) && (
          <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-7 lg:gap-10">
            <h2 className="text-lg text-headline sm:text-display-xs lg:text-display-md">Fireworks Features</h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {features.map(feature => (
                <ModelFeatureCard key={feature._key} {...feature} />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-6 sm:gap-8 lg:col-span-5 lg:gap-10">
          <h2 className="text-lg text-headline sm:text-display-xs lg:text-display-md">Info</h2>
          <ModelInfo provider={provider} {...rest} />
        </div>
      </div>
    </Section>
    {/* @ts-expect-error The type matches, it's just being difficult */}
    <ComponentGenerator sections={body} />
  </>
);

export default ModelTemplate;

import { cva } from 'class-variance-authority';

import Button from 'molecules/button';
import Image from 'molecules/image';
import RichText from 'molecules/richText';

import type { ImageProps } from 'molecules/image';
import type { LinkFragment } from 'molecules/link';
import type { RichTextFragment } from 'molecules/richText';
import type { FC } from 'react';
import type { ModelFragment } from 'templates/model/query';

interface ModelHeroProps {
  providerLogo?: ImageProps | null;
  modelName?: string | null;
  description?: RichTextFragment[] | null;
  modelLink?: LinkFragment | null;
  color?: ModelFragment['color'] | null;
}

const modelHeroStyles = cva(
  'flex flex-col gap-6 rounded-2xl px-6 py-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6',
  {
    variants: {
      color: {
        blue: 'bg-(image:--gradient-model-blue)',
        yellow: 'bg-(image:--gradient-model-yellow)',
        green: 'bg-(image:--gradient-model-green)',
        red: 'bg-(image:--gradient-model-red)',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  },
);

const constructSandboxLinkFromExternalLink = (modelLink: ModelHeroProps['modelLink']) => {
  if (!modelLink) return null;

  const values = modelLink.link?.href?.split('/');

  if (!values) return null;

  const idx = values.indexOf('models'),
    [accountId, modelId] = values.splice(idx + 1);

  return encodeURI(`accounts/${accountId}/models/${modelId}`);
};

const ModelHero: FC<ModelHeroProps> = ({ providerLogo, modelName, description, modelLink, color }) => (
  <div className={modelHeroStyles({ color })}>
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
      {providerLogo && (
        <div className="flex size-20 min-w-20 items-center justify-center rounded-sm bg-white p-5 sm:size-34 sm:min-w-34 sm:rounded-lg sm:p-8 lg:size-36 lg:min-w-36 lg:rounded-xl lg:p-9">
          <Image {...providerLogo} className="w-full" />
        </div>
      )}
      <div className="flex max-w-[520px] flex-col gap-4">
        {modelName && <h1 className="text-display-lg font-medium text-black">{modelName}</h1>}
        {description && <RichText blocks={description} className="text-md text-black" />}
      </div>
    </div>
    {modelLink && (
      <Button
        link={`https://app.fireworks.ai/playground?model=${constructSandboxLinkFromExternalLink(modelLink)}`}
        hierarchy="wide-black"
        label="Try Model"
        icon="chevron-right"
        iconPosition="end"
        className="h-fit lg:max-w-[300px]"
      />
    )}
  </div>
);

export default ModelHero;

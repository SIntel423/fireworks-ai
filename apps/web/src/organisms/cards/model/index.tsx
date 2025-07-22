import { z } from 'groqd';

import Badge from 'molecules/badge';
import Image from 'molecules/image';
import Link from 'molecules/link';
import Tag from 'molecules/tag';

import { providerFragment } from 'organisms/cards/provider';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';
import type { TagVariations } from 'molecules/tag';
import type { FC } from 'react';

export type ModelCardQuery = InferFragmentType<typeof modelCardFragment>;

const collapsedUnits = {
    million: 'M Tokens',
    image: 'Image',
    step: 'Step',
    minute: 'Minute',
  },
  units = {
    million: 'M',
    image: 'Img',
    step: 'Step',
    minute: 'Min',
  };

const generateUnit = (unit: ModelCardQuery['pricingUnit'], isCollapsed: boolean, suffix?: string) =>
    (isCollapsed ? collapsedUnits[unit || 'million'] : units[unit || 'million']) + (suffix || ''),
  generatePrice = (price: ModelCardQuery['pricingInput'], unit: string) => `$${price}/${unit}`,
  getPrices = (
    input: ModelCardQuery['pricingInput'],
    output: ModelCardQuery['pricingOutput'],
    unit: ModelCardQuery['pricingUnit'],
    collapse: ModelCardQuery['collapsePricing'],
  ) => {
    const isCollapsed = Boolean(collapse) || input === output;

    return isCollapsed
      ? [generatePrice(input, generateUnit(unit, isCollapsed))]
      : [
          generatePrice(input, generateUnit(unit, isCollapsed, ' Input')),
          generatePrice(output, generateUnit(unit, isCollapsed, ' Output')),
        ];
  },
  generateContext = (context: ModelCardQuery['contextLength']) =>
    context ? `${context.toLocaleString()} Context` : null;

const ModelCard: FC<ModelCardQuery> = ({
  modelName,
  new: isNew,
  provider,
  modelType,
  contextLength,
  pricingInput,
  pricingOutput,
  pricingUnit,
  collapsePricing,
  slug,
}) => {
  const prices = getPrices(pricingInput, pricingOutput, pricingUnit, collapsePricing),
    stats = [...prices, generateContext(contextLength)].filter(Boolean);

  return (
    <Link
      href={`/models/${slug}`}
      className="flex h-full flex-col justify-between gap-2 rounded-lg bg-white p-6 shadow-none transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          {provider?.company?.mark && <Image {...provider.company.mark} className="size-10" unsetMaxWidth />}
          {isNew && <Badge label="New" color="green" />}
        </div>
        {modelName && <h3 className="min-h-[3em] text-md font-medium">{modelName}</h3>}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-neutrals-400">{stats.join(' \u2022 ')}</div>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(modelType) && modelType.length > 0 && (
            // Handle array of model types
            modelType.map((type) => 
              type?.icon && (
                <Tag
                  key={type._id}
                  icon={type.icon}
                  color={(type.iconColor?.value as TagVariations['color']) || 'blue'}
                  label={type.name}
                />
              )
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export const modelTypeFragment = q.fragmentForType<'modelType'>().project(modelType => ({
  _id: z.string(),
  name: z.string(),
  iconColor: z
    .object({
      value: z.string().optional(),
      label: z.string().optional(),
    })
    .optional()
    .nullable(),
  icon: modelType.field('icon').as<IconIds>().nullable(),
}));

export const modelCardFragment = q.fragmentForType<'model'>().project(card => ({
  _id: z.string(),
  modelName: z.string().optional().nullable(),
  new: z.boolean().optional().nullable(),
  provider: card.field('provider').deref().project(providerFragment).nullable(true),
  modelType: card.field('modelType[]').deref().project(modelTypeFragment).nullable(true),
  contextLength: z.string().optional().nullable(),
  pricingInput: z.number().optional().nullable(),
  pricingOutput: z.number().optional().nullable(),
  pricingUnit: z
    .union([z.literal('million'), z.literal('image'), z.literal('step'), z.literal('minute')])
    .optional()
    .nullable(),
  collapsePricing: z.boolean().optional().nullable(),
  slug: ['seo.slug.current', q.string().optional().nullable()],
}));

export default ModelCard;

import { z } from 'groqd';

import { linkFragment } from 'molecules/link';
import { richTextFragment } from 'molecules/richText';

import { modelCardFragment } from 'organisms/cards/model';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';

export const modelFragment = q.fragmentForType<'model'>().project(model => ({
  ...modelCardFragment,
  description: model.field('description[]').project(richTextFragment).nullable(true),
  modelLink: model.field('modelLink').project(linkFragment).nullable(true),
  features: model
    .field('features[]')
    .project(feature => ({
      _key: z.string(),
      icon: feature.field('icon').as<IconIds>().nullable(),
      label: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      link: feature.field('link').project(linkFragment).nullable(true),
    }))
    .nullable(true),
  serverless: z.boolean().optional().nullable(),
  onDemandDeployment: z.boolean().optional().nullable(),
  fineTuning: z.boolean().optional().nullable(),
  color: z
    .union([z.literal('blue'), z.literal('green'), z.literal('red'), z.literal('yellow')])
    .optional()
    .nullable(),
}));

export type ModelFragment = InferFragmentType<typeof modelFragment>;

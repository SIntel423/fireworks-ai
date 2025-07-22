import { z } from 'zod';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';

// From Sanity

export type HubspotFormQuery = InferFragmentType<typeof hubspotFormFragment>;

export const hubspotFormFragment = q.fragmentForType<'hubspotForm'>().project({
  formId: q.string().optional().nullable(),
});

// From Hubspot

const fieldType = z
  .union([
    z.literal('text'),
    z.literal('textarea'),
    z.literal('date'),
    z.literal('file'),
    z.literal('number'),
    z.literal('select'),
    z.literal('radio'),
    z.literal('checkbox'),
    z.literal('booleancheckbox'),
    z.literal('phonenumber'),
  ])
  .optional();

export const validationSchema = z
  .object({
    data: z.string().optional(),
    message: z.string().optional(),
    name: z.string().optional(),
    useDefaultBlockList: z.boolean().optional(),
    blockedEmailAddresses: z.array(z.string()).optional(),
  })
  .optional();

export const baseField = z.object({
  defaultValue: z.string().optional(),
  description: z.string().optional(),
  label: z.string().optional(),
  fieldType,
  type: z
    .union([
      z.literal('string'),
      z.literal('number'),
      z.literal('date'),
      z.literal('datetime'),
      z.literal('enumeration'),
    ])
    .optional(),
  options: z
    .array(z.string())
    .or(z.array(z.object({ label: z.string(), value: z.string() })))
    .optional(),
  selectedOptions: z.array(z.string()).optional(),
  name: z.string().optional(),
  placeholder: z.string().optional(),
  hidden: z.boolean().optional(),
  isSmartField: z.boolean().optional(),
  validation: validationSchema,
  required: z.boolean().optional(),
  objectTypeId: z.string().optional(),
});

export const dependentFieldFilters = z
  .array(
    z.object({
      dependentFormField: baseField,
      filters: z
        .array(
          z.object({
            strValues: z.array(z.string()).optional(),
            operator: z.literal('SET_ANY'),
          }),
        )
        .optional(),
      formFieldAction: z.literal('DISPLAY'),
    }),
  )
  .optional();

const field = baseField.extend({
  dependentFieldFilters,
});

export const fieldGroups = z.object({
  fields: z.array(field),
  default: z.boolean().optional(),
  isSmartGroup: z.boolean().optional(),
  richText: z
    .object({
      content: z.string().optional(),
      type: z.literal('TEXT').optional(),
    })
    .optional(),
});

export const metadata = z.object({
  name: z.string(),
  value: z.string(),
});

export const hubspotForm = z.object({
  formFieldGroups: z.array(fieldGroups).optional(),
  submitText: z.string().optional(),
  name: z.string().optional(),
  metadata: z.array(metadata).optional(),
  notifyRecipients: z.string().optional(),
  redirect: z.string().optional(),
  inlineMessage: z.string().optional(),
  captchaEnabled: z.boolean().optional(),
  guid: z.string().optional(),
  portalId: z.number().optional(),
});

export type HubspotField = z.infer<typeof field>;
export type HubspotFieldGroups = z.infer<typeof fieldGroups>;
export type HubspotForm = z.infer<typeof hubspotForm>;

export interface FieldObjectIds {
  fieldName?: string;
  objectTypeId?: string;
}

import type { ConditionalProperty, FieldDefinition } from 'sanity';

/**
 * Adds a `hidden` property to each field definition in the provided array.
 *
 * @param fields - An array of field definitions.
 * @param hidden - A conditional property value to set the `hidden` property of each field.
 * @returns A new array of field definitions with the `hidden` property added.
 */
export const addHiddenPropToFields = (fields: FieldDefinition[], hidden: ConditionalProperty): FieldDefinition[] =>
  fields.map(field => ({ ...field, hidden }));

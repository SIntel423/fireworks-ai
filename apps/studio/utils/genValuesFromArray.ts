import { camelToTitleCase } from '@packages/utils/src/strings';

/**
 * Generates an array of objects with `title` and `value` properties from a given array of strings.
 *
 * @param list - An array of strings to be converted to objects.
 * @returns An array of objects with `title` and `value` properties, where the `title` and `value` are both set to the corresponding string from the input array.
 */
export const genValuesFromArray = (list: string[] | readonly string[]) =>
  list.map(id => ({ title: camelToTitleCase(id), value: id }));

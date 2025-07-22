/**
 * Consolidates an array of objects with a `name` property by merging duplicate objects and removing the `hidden` property if present.
 *
 * @param array - An array of objects with a `name` property.
 * @returns A new array with consolidated objects.
 *
 * NOTE: This will only really work if you are merging two fields objects.
 * If you do three, there is a chance that the hidden fields will not work as desired.
 * More work on this is needed to combine hidden field values correctly.
 */
export const consolidateFields = <T extends { name: string }>(array: T[]): T[] => {
  const seen = new Map<string, T>();

  array.forEach(item => {
    if (seen.has(item.name)) {
      const existing = seen.get(item.name)!,
        fields = { ...existing, ...item };

      if ('hidden' in fields) {
        delete fields.hidden;
      }

      seen.set(item.name, fields);
    } else {
      seen.set(item.name, item);
    }
  });

  return Array.from(seen.values());
};

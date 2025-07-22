import { defineField } from 'sanity';

import sectionVariations from '@packages/ui/section';
import { objectKeys } from '@packages/utils/src/typeUtils';

import { genValuesFromArray } from '@/utils/genValuesFromArray';

const sectionSizing = objectKeys(sectionVariations.top),
  sectionBgColors = objectKeys(sectionVariations.bgColor).map(key => ({
    label: key,
    value: sectionVariations.bgColor[key].value,
  }));
const componentLayoutFields = [
  defineField({
    name: 'padding',
    title: 'Vertical Padding',
    description: 'The amount of padding above and below the component, in pixels.',
    type: 'object',
    group: 'layout',
    options: {
      collapsible: false,
      columns: 2,
    },
    fields: [
      defineField({
        name: 'top',
        title: 'Top',
        type: 'string',
        options: {
          list: genValuesFromArray(sectionSizing),
        },
        initialValue: 'lg',
      }),
      defineField({
        name: 'bottom',
        title: 'Bottom',
        type: 'string',
        options: {
          list: genValuesFromArray(sectionSizing),
        },
        initialValue: 'lg',
      }),
    ],
  }),
  defineField({
    name: 'backgroundColor',
    title: 'Background Color',
    type: 'simplerColor',
    group: 'layout',
    options: {
      collapsible: false,
      colorList: sectionBgColors,
    },
    initialValue: 'light',
  }),
];

export default componentLayoutFields;

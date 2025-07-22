/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTable } from 'react-icons/fa6';
import { defineField } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import definePageComponent from '@/utils/definitions/component';
import defineRichText from '@/utils/definitions/richText';

const table = definePageComponent({
  name: 'table',
  title: 'Table',
  icon: FaTable,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineRichText({
      name: 'preTableDescription',
      title: 'Pre-Table Description',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      annotations: ['link', 'internalLink'],
      decorators: ['strong', 'underline', 'code'],
    }),
    defineField({
      name: 'columnHeadings',
      title: 'Column Headings',
      type: 'array',
      of: [
        {
          name: 'columnHeading',
          title: 'Column Heading',
          type: 'object',
          fields: [{ name: 'label', title: 'Label', type: 'string' }],
        },
      ],
      validation: rule =>
        rule.custom((colHeadings, context: any) => {
          const tableColumns = context.parent.table?.rows?.[0].cells;

          if (hasArrayValues(colHeadings) && colHeadings.length !== tableColumns.length) {
            return 'Must match number of columns';
          }

          return true;
        }),
    }),
    defineField({
      name: 'table',
      title: 'Table',
      type: 'table',
    }),
    defineRichText({
      name: 'postTableDescription',
      title: 'Post-Table Description',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      annotations: ['link', 'internalLink'],
      decorators: ['strong', 'underline', 'code'],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Table',
        subtitle: title,
      };
    },
  },
});

export default table;

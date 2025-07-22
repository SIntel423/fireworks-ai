import { Schema } from '@sanity/schema';

const demoSchema = Schema.compile({
  name: 'hubspotRichText',
  types: [
    {
      type: 'document',
      name: 'hubspotRichText',
      fields: [
        {
          name: 'richText',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'Heading 1', value: 'h1' },
                { title: 'Heading 2', value: 'h2' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'URL',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

// @ts-expect-error - Type 'Type' is not assignable to type 'Type'
export const blockContentType = demoSchema.get('hubspotRichText').fields.find(field => field.name === 'richText').type;

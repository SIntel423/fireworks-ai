import { SiHubspot } from 'react-icons/si';
import { defineField, defineType } from 'sanity';

export const hubspotForm = defineType({
  name: 'hubspotForm',
  title: 'HubSpot Form',
  type: 'document',
  icon: SiHubspot,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        "This is the name that will be used to reference this form in the code. Try to use something that makes this form's purpose clear.",
      type: 'string',
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      description: 'This is the ID of the form in Marketo.',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'formId',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `Form ID: ${subtitle}`,
    }),
  },
});

import { DocumentVideoIcon } from '@sanity/icons';
import { defineField } from 'sanity';

const rive = defineField({
  name: 'rive',
  title: 'Rive',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rive',
      title: 'Rive',
      type: 'file',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'stateMachines',
      title: 'State Machines',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Enter the name of the state machine to use. If no state machine is selected, the default state machine will be used.',
    }),
    defineField({
      name: 'webGL',
      title: 'WebGL',
      type: 'boolean',
      initialValue: false,
      description:
        'ADVANCED: If enabled, the Rive will be rendered in WebGL. If disabled, the Rive will be rendered in Canvas.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});

export default rive;

import { defineField } from 'sanity';

import { IconPickerInput } from '../../../components/IconPickerInput';

// This comment might be outdated now with the new custom component.

const icon = defineField({
  name: 'icon',
  title: 'Icon',
  type: 'string',
  components: {
    input: IconPickerInput,
  },
  // Preview block removed to resolve TS error.
  // Sanity will default to showing the string value.
});

export default icon;


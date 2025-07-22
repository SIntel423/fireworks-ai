import { defineField } from 'sanity';

import AsyncSelect from '@/components/AsyncSelect';

import type { AsyncSelectSchemaTypeOptions } from '@/components/AsyncSelect';
import type { FieldDefinitionBase, FieldGroup } from 'sanity';

type Options = AsyncSelectSchemaTypeOptions;

const defineAsyncSelect = (definition: FieldDefinitionBase & FieldGroup, options: Options) =>
  defineField({
    ...definition,
    type: 'string',
    options: {
      list: [],
      ...options,
    },
    components: {
      // @ts-expect-error: I just have not figured out the correct typing for this yet. @cjcartier
      input: AsyncSelect,
    },
  });

export default defineAsyncSelect;

import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { defineField } from 'sanity';

import definePageComponent from '@/utils/definitions/component';

const trustbar = definePageComponent({
  name: 'trustbar',
  title: 'Trustbar',
  icon: VscWorkspaceTrusted,
  fields: [
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'company' }] }],
      validation: Rule => Rule.min(2).max(12),
    }),
  ],
  preview: {
    select: {
      companies: 'companies',
    },
    prepare: ({ companies }: Record<string, unknown[]>) => ({
      title: 'Trustbar',
      subtitle: companies?.length ? `Companies: ${companies.length}` : 'No companies',
    }),
  },
});

export default trustbar;

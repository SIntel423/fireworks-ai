import { defineField } from 'sanity';

import ImageSelect from '@/components/ImageSelect';

import type { FieldDefinitionBase, FieldGroup } from 'sanity';

type ImageDefinition = FieldDefinitionBase & Omit<FieldGroup, 'fields'>;

export const backgroundOptions = [
  { title: 'Texture 1', value: 'texture-1', fileType: 'jpg' },
  { title: 'Texture 2', value: 'texture-2', fileType: 'jpg' },
  { title: 'Texture 3', value: 'texture-3', fileType: 'jpg' },
  { title: 'Texture 4', value: 'texture-4', fileType: 'jpg' },
  { title: 'Texture 5', value: 'texture-5', fileType: 'jpg' },
  { title: 'Texture 6', value: 'texture-6', fileType: 'jpg' },
  { title: 'Texture 7', value: 'texture-7', fileType: 'jpg' },
  { title: 'Texture 8', value: 'texture-8', fileType: 'jpg' },
  { title: 'Texture 9', value: 'texture-9', fileType: 'svg' },
  { title: 'Texture 10', value: 'texture-10', fileType: 'jpg' },
  { title: 'Texture 11', value: 'texture-11', fileType: 'svg' },
  { title: 'Texture 12', value: 'texture-12', fileType: 'svg' },
  { title: 'Texture 13', value: 'texture-13', fileType: 'svg' },
  { title: 'Texture 14', value: 'texture-14', fileType: 'svg' },
  { title: 'Texture 15', value: 'texture-15', fileType: 'svg' },
];

const defineBackground = (definition: ImageDefinition) =>
  defineField({
    ...definition,
    type: 'string',
    options: {
      list: backgroundOptions,
    },
    components: {
      input: props => <ImageSelect {...props} dirPath="/backgrounds" buttonLabel="Select Background" />,
    },
  });

export default defineBackground;

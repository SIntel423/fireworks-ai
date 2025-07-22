export const backgroundImages = [
  'texture-1',
  'texture-2',
  'texture-3',
  'texture-4',
  'texture-5',
  'texture-6',
  'texture-7',
  'texture-8',
  'texture-9',
  'texture-10',
  'texture-11',
  'texture-12',
  'texture-13',
  'texture-14',
  'texture-15',
] as const;

export type BackgroundImageTypes = (typeof backgroundImages)[number];

export const isDarkImage = (img?: BackgroundImageTypes | null) =>
  [
    'texture-5',
    'texture-6',
    'texture-7',
    'texture-8',
    'texture-9',
    'texture-10',
    'texture-11',
    'texture-12',
    'texture-13',
    'texture-14',
    'texture-15',
  ].includes(img || '');

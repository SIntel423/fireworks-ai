import { cva } from 'class-variance-authority';

import Image, { imageFragment } from 'molecules/image';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { ImageProps } from 'molecules/image';
import type { PortableTextTypeComponentProps } from 'next-sanity';
import type { ExtractSanityType } from 'types/global';
import type { Blog } from 'types/sanity.types';

export type RichImageFragment = InferFragmentType<typeof richImageFragment>;

const richImageStyles = cva('flex flex-col gap-4', {
  variants: {
    hasCaption: {
      true: 'border-b border-b-neutrals-300 pb-6',
      false: '',
    },
  },
});

const RichImage = ({ value }: PortableTextTypeComponentProps<RichImageFragment>) => (
  <figure className={richImageStyles({ hasCaption: !!value?.caption })}>
    {value && <Image {...(value as ImageProps)} className="w-full overflow-hidden rounded-xl" />}
    {value.caption && <figcaption className="text-sm text-copy">{value.caption}</figcaption>}
  </figure>
);

type RichImageQuery = ExtractSanityType<Blog, 'richImage', undefined, 'content'>;
export const richImageFragment = q.fragment<RichImageQuery>().project({
  _type: q.literal('richImage'),
  _key: q.string(),
  ...imageFragment,
});

export default RichImage;

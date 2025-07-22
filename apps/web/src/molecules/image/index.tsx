import { getImageDimensions } from '@sanity/asset-utils';
import { type InferFragmentType, z } from 'groqd';
import NextImage from 'next/image';
import { twJoin, twMerge } from 'tailwind-merge';

import { q, urlFor } from 'lib/client';

import type { ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ImageFragment = Omit<NonNullable<InferFragmentType<typeof imageFragment>>, '_key' | '_type'>;
export interface ImageProps extends ImageFragment, Pick<NextImageProps, 'height' | 'width' | 'className'> {
  /**
   * The `aspectRatio` prop allows you to specify the aspect ratio of the image. The aspect ratio should be provided as a string in the format `"${number}/${number}"`, where the two numbers represent the width and height of the image, respectively.
   */
  aspectRatio?: `${number}/${number}`;
  /**
   * Determines whether the aspect ratio of the image should be unset, allowing the image to fill the container.
   */
  unsetRatio?: boolean;
  /**
   * Determines whether the image should override the default fill behavior and maintain its original aspect ratio.
   */
  noFill?: boolean;
  /**
   * Sets the object-fit property of the image to "cover".
   */
  objectCover?: boolean;
  /**
   * Determines whether the image should have its maximum width unset, allowing it to fill the container.
   */
  unsetMaxWidth?: boolean;
}

const Image: FC<ImageProps> = ({
  asset,
  aspectRatio,
  alt,
  noFill,
  height,
  width,
  unsetMaxWidth,
  objectCover,
  className,
  unsetRatio,
}) => {
  if (!asset?._id) return null;

  const imgWidth = width || getImageDimensions(asset).width,
    imgHeight = height || getImageDimensions(asset).height;

  return (
    <picture
      className={twMerge('relative block', className)}
      style={{
        maxWidth: unsetMaxWidth ? undefined : `${imgWidth}px`,
        aspectRatio: unsetRatio
          ? undefined
          : aspectRatio || getImageDimensions(asset).aspectRatio || `${width}/${height}`,
      }}
    >
      <NextImage
        src={asset.extension === 'svg' ? urlFor(asset).url() : urlFor(asset).auto('format').url()}
        alt={alt || ''}
        title={alt || ''}
        fill={!noFill}
        width={noFill ? imgWidth : undefined}
        height={noFill ? imgHeight : undefined}
        placeholder={asset.metadata?.blurHash ? 'blur' : 'empty'}
        blurDataURL={asset.metadata?.blurHash ?? undefined}
        className={twJoin(objectCover && 'size-full object-cover')}
      />
    </picture>
  );
};

export type ImageQuery = StripMaybe<ExtractSanityType<Page, 'switchback', 'featuredImage'>>;
export const imageFragment = q.fragment<ImageQuery>().project(image => ({
  asset: image
    .field('asset')
    .deref()
    .validate(
      z.object({
        _id: z.string(),
        _type: z.literal('sanity.imageAsset'),
        _createdAt: z.string(),
        _updatedAt: z.string(),
        _rev: z.string(),
        url: z.string().optional(),
        extension: z.string().optional(),
        metadata: z
          .object({
            _type: z.literal('sanity.imageMetadata'),
            dimensions: q
              .object({
                _type: z.literal('sanity.imageDimensions'),
                aspectRatio: z.number().optional(),
                height: z.number().optional(),
                width: z.number().optional(),
              })
              .optional(),
            blurHash: z.string().optional(),
          })
          .optional(),
      }).nullable(),
    ),
  alt: q.string().optional().nullable(),
  caption: q.string().optional().nullable(),
}));

export const imageNoMetaFragment = q.fragment<ImageQuery>().project(image => ({
  asset: image
    .field('asset')
    .deref()
    .validate(
      q.object({
        _id: q.string(),
        _type: q.literal('sanity.imageAsset'),
        _createdAt: q.string(),
        _updatedAt: q.string(),
        _rev: q.string(),
        url: q.string().optional(),
        extension: q.string().optional(),
        metadata: q
          .object({
            _type: q.literal('sanity.imageMetadata'),
            dimensions: q
              .object({
                _type: q.literal('sanity.imageDimensions'),
                aspectRatio: q.number().optional(),
                height: q.number().optional(),
                width: q.number().optional(),
              })
              .optional(),
            blurHash: q.string().optional(),
          })
          .optional(),
      }).nullable(),
    ),
}));

export default Image;

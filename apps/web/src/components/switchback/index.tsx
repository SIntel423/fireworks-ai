import BackgroundImage from 'molecules/backgroundImage';
import ElementAnimation from 'molecules/elementAnimation';
import Image, { imageFragment } from 'molecules/image';
import Rive from 'molecules/richText/config/components/rive';
import { riveFragment } from 'molecules/richText/config/components/rive/query';
import Video from 'molecules/richText/config/components/video';
import { videoFragment } from 'molecules/richText/config/components/video/query';
import { sectionFragment } from 'molecules/section';

import HubspotForm from 'organisms/form';
import { hubspotFormFragment } from 'organisms/form/query';
import Heading, { headingFragment } from 'organisms/heading';

import { headingContainerStyle, mediaContainerStyle, mediaStyles } from 'components/switchback/styles';

import { q } from 'lib/client';

import type { BackgroundImageTypes } from '@packages/ui/backgrounds';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type SwitchbackFragment = InferFragmentType<typeof switchbackFragment>;

const getMedia = (
  mediaType: SwitchbackFragment['mediaType'],
  featuredImage?: SwitchbackFragment['featuredImage'],
  media?: SwitchbackFragment['media'],
) => {
  switch (mediaType) {
    case 'image':
      return (
        featuredImage && (
          <Image
            {...featuredImage}
            noFill
            objectCover
            className="w-full overflow-hidden rounded-sm [&_img]:object-center"
          />
        )
      );
    case 'media':
      switch (media?._type) {
        case 'rive':
          return <Rive {...media} />;
        case 'video':
          return <Video {...media} />;
        case 'hubspotForm':
          return <HubspotForm {...media} />;
        default:
          return null;
      }
    default:
      return null;
  }
};

const Switchback: FC<SwitchbackFragment> = ({ heading, featuredImage, reverse, media, mediaType, mediaBackground }) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
    <div className={mediaContainerStyle({ reverse: !!reverse })}>
      {mediaBackground && <BackgroundImage image={mediaBackground} className="overflow-hidden rounded-lg" />}
      <ElementAnimation
        animation={reverse ? 'slideInLeft' : 'slideInRight'}
        delay={200}
        className="justify-items-center"
      >
        <div className={mediaStyles({ hasBackground: !!mediaBackground })}>
          {getMedia(mediaType, featuredImage, media)}
        </div>
      </ElementAnimation>
    </div>
    <div
      className={headingContainerStyle({
        reverse: !!reverse,
        items: mediaType === 'media' && media?._type === 'hubspotForm' ? 'start' : 'center',
      })}
    >
      <Heading {...heading} size="lg" alignment="left" animationDirection={reverse ? 'right' : 'left'} />
    </div>
  </div>
);

type SwitchbackQuery = ExtractSanityType<Page, 'switchback'>;
export const switchbackFragment = q.fragment<SwitchbackQuery>().project(switchback => ({
  _key: q.string(),
  heading: switchback.field('heading').project(headingFragment).nullable(true),
  featuredImage: switchback.field('featuredImage').project(imageFragment).nullable(true),
  mediaType: q
    .union([q.literal('image'), q.literal('media')])
    .optional()
    .nullable(),
  media: switchback
    .field('media')
    .deref()
    .project(media => ({
      ...media.conditionalByType({
        rive: riveFragment,
        video: videoFragment,
        hubspotForm: hubspotFormFragment,
      }),
    }))
    .nullable(true),
  mediaBackground: switchback.field('mediaBackground').as<BackgroundImageTypes>().nullable(),
  reverse: q.boolean().optional().nullable(),
  ...sectionFragment,
}));

export default Switchback;

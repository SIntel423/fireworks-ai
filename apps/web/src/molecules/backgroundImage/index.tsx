import Image from 'next/image';
import { twJoin, twMerge } from 'tailwind-merge';

import texture1 from 'assets/backgrounds/texture-1.jpg';
import texture10 from 'assets/backgrounds/texture-10.jpg';
import texture11 from 'assets/backgrounds/texture-11.svg';
import texture12 from 'assets/backgrounds/texture-12.svg';
import texture13 from 'assets/backgrounds/texture-13.svg';
import texture14 from 'assets/backgrounds/texture-14.svg';
import texture15 from 'assets/backgrounds/texture-15.svg';
import texture2 from 'assets/backgrounds/texture-2.jpg';
import texture3 from 'assets/backgrounds/texture-3.jpg';
import texture4 from 'assets/backgrounds/texture-4.jpg';
import texture5 from 'assets/backgrounds/texture-5.jpg';
import texture6 from 'assets/backgrounds/texture-6.jpg';
import texture7 from 'assets/backgrounds/texture-7.jpg';
import texture8 from 'assets/backgrounds/texture-8.jpg';
import texture9 from 'assets/backgrounds/texture-9.svg';

import Rive from 'molecules/richText/config/components/rive';

import type { BackgroundImageTypes } from '@packages/ui/backgrounds';
import type { RiveFragment } from 'molecules/richText/config/components/rive';
import type { StaticImageData } from 'next/image';
import type { FC } from 'react';

interface BackgroundImageProps {
  image?: BackgroundImageTypes | null;
  className?: string;
  rive?: RiveFragment | null;
}

const imageMap: Record<BackgroundImageTypes, StaticImageData> = {
  'texture-1': texture1,
  'texture-2': texture2,
  'texture-3': texture3,
  'texture-4': texture4,
  'texture-5': texture5,
  'texture-6': texture6,
  'texture-7': texture7,
  'texture-8': texture8,
  'texture-9': texture9,
  'texture-10': texture10,
  'texture-11': texture11,
  'texture-12': texture12,
  'texture-13': texture13,
  'texture-14': texture14,
  'texture-15': texture15,
};

const BackgroundImage: FC<BackgroundImageProps> = ({ image, rive, className }) =>
  rive ? (
    <Rive {...rive} className={twMerge(className, '[&_canvas]:h-full! [&>div]:h-full!')} />
  ) : (
    <Image
      src={image ? imageMap[image] : imageMap['texture-1']}
      alt=""
      fill
      className={twJoin('object-cover', className)}
    />
  );

export default BackgroundImage;

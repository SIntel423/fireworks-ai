'use client';

import { YouTubeEmbed } from '@next/third-parties/google';
import { cva } from 'class-variance-authority';
import { useState } from 'react';

import BackgroundImage from 'molecules/backgroundImage';
import Image from 'molecules/image';
import PlayButton from 'molecules/playButton';

import type { InferFragmentType } from 'groqd';
import type { videoFragment } from 'molecules/richText/config/components/video/query';
import type { FC } from 'react';

type VideoFragment = InferFragmentType<typeof videoFragment> & { noAspect?: boolean };

const containerStyles = cva('relative w-full', {
  variants: {
    noAspect: {
      true: 'h-full object-cover',
      false: 'aspect-video',
    },
  },
  defaultVariants: {
    noAspect: false,
  },
});

const videoStyles = cva('absolute inset-0 size-full overflow-hidden rounded-lg', {
  variants: {
    noAspect: {
      true: 'h-full object-cover [&_lite-youtube]:h-full [&>div]:h-full!',
      false: 'aspect-video',
    },
  },
  defaultVariants: {
    noAspect: false,
  },
});

const Video: FC<VideoFragment> = ({ videoId, thumbnail, noAspect }) => {
  const [playing, setPlaying] = useState(false);

  if (!videoId) return null;

  return (
    <div className={containerStyles({ noAspect })}>
      {!playing && (
        <div className="relative flex h-full items-center justify-center">
          {thumbnail ? (
            <Image
              {...thumbnail}
              className="z-10 size-full overflow-hidden rounded-lg"
              objectCover
              aspectRatio="16/9"
            />
          ) : (
            <BackgroundImage
              image="texture-1"
              className="z-10 aspect-video size-full overflow-hidden rounded-lg object-cover"
            />
          )}
          <div className="absolute-cover z-10 flex items-center justify-center">
            <PlayButton onClick={() => setPlaying(true)} />
          </div>
        </div>
      )}
      <div className={videoStyles({ noAspect })}>
        <YouTubeEmbed videoid={videoId} />
      </div>
    </div>
  );
};

export default Video;

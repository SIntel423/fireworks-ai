'use client';

import { Fit, Layout, useRive } from '@rive-app/react-webgl2';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { RiveFragment } from '..';
import type { FC } from 'react';

const RiveWebGL: FC<Omit<RiveFragment, 'webGL'>> = ({ rive, stateMachines, className }) => {
  const [animate, setAnimate] = useState(false);

  if (!rive) return null;

  const { RiveComponent } = useRive(
    {
      src: rive,
      layout: new Layout({ fit: Fit.Cover }),
      autoplay: true,
      stateMachines: stateMachines || 'State Machine 1',
      onLoad: () => setAnimate(true),
    },
    {
      fitCanvasToArtboardHeight: true,
    },
  );

  return (
    <div className={twMerge('size-full overflow-hidden rounded-xl', className)} data-animate={animate}>
      <RiveComponent />
    </div>
  );
};

export default RiveWebGL;

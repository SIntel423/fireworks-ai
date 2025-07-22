'use client';

import dynamic from 'next/dynamic';

import type { InferFragmentType } from 'groqd';
import type { riveFragment } from 'molecules/richText/config/components/rive/query';
import type { FC } from 'react';

const RiveCanvas = dynamic(() => import('molecules/richText/config/components/rive/variants/canvas'), {
  ssr: false,
});
const RiveWebGL = dynamic(() => import('molecules/richText/config/components/rive/variants/webGL'), {
  ssr: false,
});

export type RiveFragment = InferFragmentType<typeof riveFragment> & {
  className?: string;
};

const Rive: FC<RiveFragment> = ({ webGL, ...props }) => (webGL ? <RiveWebGL {...props} /> : <RiveCanvas {...props} />);

export default Rive;

import { imageFragment } from 'molecules/image';

import { q } from 'lib/client';

export const videoFragment = q.fragmentForType<'video'>().project(video => ({
  _type: q.literal('video'),
  _id: q.string().nullable(),
  videoId: q.string().optional().nullable(),
  thumbnail: video.field('thumbnail').project(imageFragment).nullable(true),
}));

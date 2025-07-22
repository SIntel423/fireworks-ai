import { q } from 'lib/client';

export const riveFragment = q.fragmentForType<'rive'>().project(rive => ({
  _type: q.literal('rive'),
  _id: q.string().nullable(),
  rive: rive.field('rive.asset').deref().field('url', q.string().nullable()).nullable(true),
  stateMachines: q.array(q.string()).optional().nullable(),
  webGL: q.boolean().optional().nullable(),
}));

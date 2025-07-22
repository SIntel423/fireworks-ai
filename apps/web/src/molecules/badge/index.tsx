import { badgeStyles } from 'molecules/badge/styles';

import { q } from 'lib/client';

import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type BadgeQuery = Maybify<InferFragmentType<typeof BadgeQuery>>;
export type BadgeVariations = VariantProps<typeof badgeStyles>;

// const BadgeIcon: FC<Pick<BadgeQuery, 'icon' | 'color'>> = ({ icon, color }) =>
//   icon && (
//     <div className={badgeIconContainerStyles({ color })}>
//       <Icon icon={icon} size="100%" className="size-2.5 md:size-[14px]" />
//     </div>
//   );

const Badge: FC<BadgeQuery> = ({ color, label }) => <div className={badgeStyles({ color })}>{label}</div>;

export const BadgeQuery = q.fragment<FragmentAny>().project(badge => ({
  label: q.string().optional(),
  color: badge.field('color').as<BadgeVariations['color']>(),
}));

export default Badge;

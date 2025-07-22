import type { SVGProps } from 'react';

export { Icon, type SharedIconProps } from './Icon';

export const buttonIds = [] as const;
export type ButtonIds = (typeof buttonIds)[number];

export const miscIds = ['twitter-x', 'instagram', 'youtube', 'linkedin', 'discord'] as const;
export type MiscIds = (typeof miscIds)[number];

export const socialIds = [
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-up-right',
  'briefcase-02',
  'building-03',
  'check-circle',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'code-square-01',
  'coins-hand',
  'corner-down-arrow',
  'currency-dollar-circle',
  'film',
  'flame',
  'grid',
  'home-01',
  'home-02',
  'image',
  'info-circle',
  'message-text-square',
  'minus',
  'play',
  'plus',
  'recording',
  'rocket',
  'search',
  'settings',
  'spacing-width',
  'text-align-justify',
  'upload-cloud',
  'users-01',
  'wrench',
  'x-close',
  'tool-02',
  'loading-03',
  'speedometer-01',
  'dataflow-04',
] as const;
export type SocialIds = (typeof socialIds)[number];

export const iconSet = new Set([...buttonIds, ...miscIds, ...socialIds]);
export const iconIds = Array.from(iconSet);

// Extended to accept any string for dynamic icons from the sprite file
export type IconIds = (typeof iconIds)[number] | string;

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Defines the props for an icon component.
   */
  icon: IconIds;
  /**
   * Defines the size and color properties for an icon component.
   */
  size?: number | `${number}%` | null;
  /**
   * Defines an optional label attribute for the icon component.
   */
  label?: string;
  /**
   * Defines the color of the icon component.
   */
  iconColor?: string;
}

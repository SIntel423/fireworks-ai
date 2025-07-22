import React from 'react';
import type { IconIds } from './icons';

// Extended IconProps that accepts IconIds
export interface SharedIconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconIds;
  size?: number | `${number}%` | null;
  label?: string;
  spritePath?: string; // Allow customizing the path to the sprites file
  iconColor?: string; // Allow customizing the icon color
}

/**
 * Shared Icon component that can be used in both studio and web apps
 * Uses the SVG sprite file to render icons
 * Supports dark/light mode with proper color inheritance
 * Properly handles color classes by setting currentColor
 */
export const Icon: React.FC<SharedIconProps> = ({ 
  icon, 
  size, 
  spritePath = '/static/icons/sprites.svg', // Default path for Sanity Studio
  className,
  ...props 
}) => (
  <div
    style={{
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    className={className} // Pass the className to the wrapper div
  >
    <svg
      width={size || 24}
      height={size || 24}
      role="img"
      aria-label={icon}
      fill="currentColor" // Use currentColor to inherit color from CSS classes
      stroke="currentColor" // Use currentColor to inherit color from CSS classes
      {...props}
    >
      <use href={`${spritePath}#${icon}`} />
    </svg>
  </div>
);

export default Icon;

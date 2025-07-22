import { Icon as SharedIcon, type SharedIconProps } from '@packages/ui/icons';

import type { FC } from 'react';

/**
 * Web app Icon component that uses the shared Icon implementation
 * Uses the correct sprite path for the web app
 * 
 * Note: Icons now use currentColor for color inheritance from CSS
 * No need to pass dark mode state as it inherits from the parent styling
 */
const Icon: FC<SharedIconProps> = ({ icon, size, className, ...props }) => (
  <SharedIcon 
    icon={icon}
    size={size}
    spritePath="/icons/sprites.svg" // Path to sprites in web app
    className={className}
    {...props}
  />
);

export default Icon;

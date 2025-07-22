import type { FC } from 'react';

import { Box } from '@sanity/ui';

import { Icon as SharedIcon } from '@packages/ui/icons';
import type { IconProps } from '@packages/ui/icons';

// We're using the shared Icon component but wrapping it with Sanity UI's Box
const Icon: FC<IconProps> = ({ icon, size, ...props }) => (
  <Box padding={1}>
    <SharedIcon 
      icon={icon} 
      size={size} 
      spritePath="/static/icons/sprites.svg"
      {...props} 
    />
  </Box>
);

export default Icon;

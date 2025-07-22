import { hasArrayValues } from '@packages/utils/src/arrays';

import Button from 'molecules/button';

import type { NavigationFragment } from 'global/navigation/query';
import type { FC } from 'react';

interface HeaderButtonProps {
  buttons?: NavigationFragment['buttons'];
}

const HeaderButtons: FC<HeaderButtonProps> = ({ buttons }) => (
  <div className="flex items-center gap-4">
    <div className="hidden gap-4 sm:flex">
      {hasArrayValues(buttons) &&
        buttons.map(button => (
          <Button
            key={button._key}
            {...button}
          />
        ))}
    </div>
  </div>
);

export default HeaderButtons;

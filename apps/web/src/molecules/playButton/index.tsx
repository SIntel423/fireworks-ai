import Icon from 'molecules/icon';

import type { ComponentPropsWithoutRef, FC } from 'react';

interface PlayButtonProps {
  /**
   * The onClick event handler for the PlayButton component.
   * This allows the parent component to handle the button click event.
   */
  onClick: ComponentPropsWithoutRef<'button'>['onClick'];
}

const PlayButton: FC<PlayButtonProps> = ({ onClick }) => (
  <button
    className="flex size-[56px] cursor-pointer items-center justify-center rounded-lg bg-purple-400 text-white shadow-lg focus-outline-primary transition-colors hover:bg-purple-500 sm:size-20"
    onClick={onClick}
  >
    <Icon icon="play" size={16} className="text-wood-50 relative left-0.5 size-5 sm:left-1 sm:size-10" />
  </button>
);

export default PlayButton;

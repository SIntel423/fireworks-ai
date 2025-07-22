'use client';

import Icon from 'molecules/icon';

import type { FC } from 'react';

const CloseButton: FC = () => {
  const handleClick = () => {
    const el = document.querySelector('#announcementBar') as HTMLDivElement;
    if (el) {
      const constHeight = el.getBoundingClientRect()?.height;
      el.style.marginTop = `-${constHeight}px`;
      el.style.opacity = '0';
      el.style.height = `${constHeight}px`;
      el.style.overflow = 'hidden';
    }
  };

  return (
    <button
      className="absolute top-0 right-0 z-20 flex size-9 cursor-pointer items-center justify-center p-2"
      onClick={() => handleClick()}
    >
      <Icon icon="x-close" size={20} />
    </button>
  );
};

export default CloseButton;

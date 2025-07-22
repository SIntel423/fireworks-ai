'use client';

import { Item, Content as RadContent, Root } from '@radix-ui/react-accordion';
import { useEffect, useRef } from 'react';

import useHeaderStore from 'global/navigation/store';

import useHeaderHeight from 'utils/hooks/useHeaderHeight';

import type { FC, ReactNode } from 'react';

const MainMobileAccordion: FC<{ children: ReactNode }> = ({ children }) => {
  const open = useHeaderStore(state => state.mobileMenuOpen),
    headerHeight = useHeaderHeight({ includeAnnouncementBar: true }),
    menuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <Root
      type="single"
      collapsible
      value={open ? 'mobile-open' : ''}
      className="absolute top-18 left-0 z-50 w-full select-none xl:hidden"
      style={{ '--header-height': `${headerHeight}px` }}
    >
      <Item ref={menuRef} value="mobile-open">
        <RadContent className="overflow-auto bg-neutrals-50 shadow-lg data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down) max-h-[calc(100vh-var(--header-height)-100px)]">
          <div className="pb-8">{children}</div>
        </RadContent>
      </Item>
    </Root>
  );
};

export default MainMobileAccordion;

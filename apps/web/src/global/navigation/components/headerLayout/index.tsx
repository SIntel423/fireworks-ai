'use client';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Image from 'molecules/image';
import Link from 'molecules/link';

import Hamburger from 'global/navigation/components/hamburger';
import HeaderButton from 'global/navigation/components/headerButtons';
import MobileNav from 'global/navigation/components/mobile';
import Navigation from 'global/navigation/components/navigation';
import { closeMobileMenu } from 'global/navigation/store';

import useWindowScrolledPast from 'utils/hooks/useWindowScrolledPast';

import type { NavigationFragment } from 'global/navigation/query';
import type { ImageProps } from 'molecules/image';
import type { FC } from 'react';

const HeaderLayout: FC<NavigationFragment & { logo?: ImageProps | null }> = ({ menus, buttons, logo }) => {
  const isScrolled = useWindowScrolledPast(10);

  return (
    <header
      id="header"
      className="sticky top-0 z-100 w-full bg-neutrals-50 shadow-none transition-shadow data-[scrolled=true]:shadow-lg"
      data-scrolled={isScrolled}
    >
      <div className="mx-auto w-full max-w-[1392px] px-4 sm:px-16 lg:px-8">
        <div className="relative flex h-18 w-full items-center justify-between gap-8 lg:py-5">
          <Link aria-label="To Fireworks AI Homepage" href="/" onClick={() => closeMobileMenu()}>
            {logo && <Image {...logo} className="h-[23px] w-auto object-contain" />}
          </Link>
          {hasArrayValues(menus) && <Navigation menuItems={menus} />}
          <HeaderButton buttons={buttons} />
          <Hamburger />
        </div>
      </div>
      {hasArrayValues(menus) && <MobileNav menuItems={menus} buttons={buttons} />}
    </header>
  );
};

export default HeaderLayout;

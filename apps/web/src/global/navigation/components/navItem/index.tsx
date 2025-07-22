'use client';

import Icon from 'molecules/icon';
import Link from 'molecules/link';

import { toggleMobileMenu } from 'global/navigation/store';

import type { NavItemFragment } from 'global/navigation/query';
import type { FC } from 'react';

const NavItem: FC<NavItemFragment & { isMobile?: boolean }> = ({ icon, link, description, isMobile }) => (
  <Link
    href={link}
    className="flex w-full gap-2.5 rounded-lg p-[7px] hover:bg-gray/10"
    onClick={() => isMobile && toggleMobileMenu()}
  >
    {icon && (
      <span className="flex size-4.5 min-w-4.5 items-center justify-center text-purple-400">
        <Icon icon={icon} size={16} />
      </span>
    )}
    <div className="flex flex-col gap-0.5">
      {link?.label && <span className="text-sm font-aspekta font-medium text-headline">{link.label}</span>}
      {description && <span className="text-xs leading-normal text-copy">{description}</span>}
    </div>
  </Link>
);

export default NavItem;

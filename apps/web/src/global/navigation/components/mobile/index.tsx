'use client';

import { Item, Root, Trigger } from '@radix-ui/react-accordion';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button from 'molecules/button';
import Icon from 'molecules/icon';
import Link from 'molecules/link';

import Content from 'global/navigation/components/mobile/accordionContent';
import MainMobileAccordion from 'global/navigation/components/mobile/mainMobileAccordion';
import { toggleMobileMenu } from 'global/navigation/store';

import type { MenuFragment, MegaMenuFragment, NavigationFragment } from 'global/navigation/query';
import type { LinkFragment } from 'molecules/link';
import type { FC } from 'react';

interface MobileNavigationProps {
  menuItems?: NavigationFragment['menus'];
  buttons?: NavigationFragment['buttons'];
}

interface MobileNavAccordionProps {
  item: MenuFragment | MegaMenuFragment | (LinkFragment & { _type: 'link' });
}

const MobileNavAccordion: FC<MobileNavAccordionProps> = ({ item }) =>
  (item?._type === 'menu' || item?._type === 'megaMenu') ? (
    <div className="relative w-full">
      <Trigger className="group flex w-full cursor-pointer items-center justify-between gap-2 border-b border-neutrals-300 px-8 py-6 text-headline transition-colors hover:text-purple-400 sm:px-10">
        <span className="font-aspekta text-md font-medium">{item?.label}</span>
        <Icon icon="chevron-down" size={22} className="transition-transform group-data-[state=open]:rotate-180" />
      </Trigger>
      <Content {...item} />
    </div>
  ) : (
    <Link
      href={item}
      onClick={() => toggleMobileMenu()}
      className="flex w-full items-center justify-between border-b border-neutrals-300 px-8 py-6 font-aspekta text-md font-medium text-headline transition-colors hover:text-purple-400 sm:px-10"
    >
      <span>{item?.label}</span>
      <Icon icon="arrow-up-right" size={24} />
    </Link>
  );

const MobileNavigation: FC<MobileNavigationProps> = ({ menuItems, buttons }) => (
  <MainMobileAccordion>
    <Root type="single" collapsible className="w-full">
      <div className="border-t border-neutrals-100 bg-neutrals-50 pb-3">
        {hasArrayValues(menuItems) &&
          menuItems.map(mainItem => (
            <Item key={mainItem._key} value={mainItem?.label || ''} className="relative w-full">
              <MobileNavAccordion item={mainItem} />
            </Item>
          ))}
      </div>
    </Root>
    {hasArrayValues(buttons) && (
      <div className="flex w-full flex-row gap-4 px-4 py-6 pb-20 sm:hidden">
        {buttons.map(button => (
          <Button key={button._key} {...button} />
        ))}
      </div>
    )}
  </MainMobileAccordion>
);

export default MobileNavigation;

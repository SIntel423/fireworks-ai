import { Content, Item, List, Link as RadLink, Root, Trigger } from '@radix-ui/react-navigation-menu';
import { Fragment } from 'react';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button from 'molecules/button';
import Link from 'molecules/link';

import DropDownMenu from 'global/navigation/components/dropDownMenu';

import twMerge from 'utils/twMerge';

import type { MenuFragment, MegaMenuFragment, NavigationFragment } from 'global/navigation/query';
import type { LinkFragment } from 'molecules/link';
import type { FC } from 'react';

interface NavigationProps {
  menuItems?: NavigationFragment['menus'];
}

type MenuItemProps = {
  item: LinkFragment;
};

type MenuDropdownItemProps = {
  item: MenuFragment | MegaMenuFragment;
};

const MenuLink: FC<MenuItemProps> = ({ item }) => (
  <RadLink asChild key={item.label}>
    <Link href={item} className="font-favorit text-sm text-headline capitalize tracking-[-0.02em] hover:text-purple-400">
      {item?.label || ''}
    </Link>
  </RadLink>
);

const MenuDropdown: FC<MenuDropdownItemProps> = ({ item }) => (
  <Trigger asChild>
    <Button
      label={item?.label || ''}
      hierarchy="link"
      icon="chevron-down"
      iconPosition="end"
      className="font-favorit text-sm text-headline capitalize tracking-[-0.02em] hover:outline-none data-[state=open]:[&_svg]:rotate-180"
    />
  </Trigger>
);

const Navigation: FC<NavigationProps> = ({ menuItems }) => (
  <Root className="w-full">
    <List className="hidden w-full items-center gap-5 lg:justify-center xl:flex xl:gap-8">
      {hasArrayValues(menuItems) &&
        menuItems.map(item => {
          const hasDropdown = item?._type === 'menu' || item?._type === 'megaMenu';

          return (
            <Fragment key={item._key}>
              <Item className="flex justify-center" value={item._key}>
                {hasDropdown ? (
                  <>
                    <MenuDropdown item={item} />
                    <Content asChild>
                      <div className={
                        twMerge(
                          'absolute top-[calc(100%_+_24px)] z-50 hidden data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in lg:flex',
                          item._type === 'menu' ? '-ml-8' : 'left-1/2 -translate-x-1/2'
                        )
                      }>
                        <DropDownMenu {...item} />
                      </div>
                    </Content>
                  </>
                ) : (
                  <MenuLink item={item} />
                )}
              </Item>
            </Fragment>
          );
        })}
    </List>
  </Root>
);

export default Navigation;

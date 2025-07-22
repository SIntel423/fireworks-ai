import { Content as RadContent } from '@radix-ui/react-accordion';

import { hasArrayValues } from '@packages/utils/src/arrays';

import NavItem from 'global/navigation/components/navItem';

import customTwMerge from 'utils/twMerge';

import type { MenuFragment, MegaMenuFragment } from 'global/navigation/query';
import type { FC } from 'react';

const Content: FC<MenuFragment | MegaMenuFragment> = (props) => {
  const Column:FC<{menu?: MenuFragment['menu']}> = ({menu}) => (
    hasArrayValues(menu) && (
      <div className="grid w-full grid-cols-1 gap-4 px-8 py-6 sm:grid-cols-2 sm:px-10">
        {menu.map(menuItem => (
          <NavItem key={menuItem._key} {...menuItem} isMobile />
        ))}
      </div>
    )
  )
  
  const getContent = () => {
    switch (props._type) {
      case 'menu': {
        const menu = props.menu;
        return <Column menu={menu} />
      }
      case 'megaMenu': {
        const { column } = props;

        return (
          <div className="flex w-full flex-col">
            {hasArrayValues(column) && column.map((col, index) => (
              <div className={customTwMerge('flex w-full flex-col gap-2 py-6', index !== 0 && 'border-t border-neutrals-300')}>
                <span className="text-sm font-favorit leading-6 tracking-[-0.02em] text-neutrals-900 px-8 sm:px-10">{col.label}</span>
                <Column menu={col.menu} />
              </div>
            ))}
          </div>
        )
      }
      default:
        return <></>;
    }
  }
  return (
    <RadContent className="overflow-hidden bg-white data-[state=closed]:animate-(--animate-accordion-slide-up) data-[state=open]:animate-(--animate-accordion-slide-down)">
      {getContent()}
    </RadContent>
  );
};

export default Content;

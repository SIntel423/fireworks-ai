import { hasArrayValues } from '@packages/utils/src/arrays';

import NavItem from 'global/navigation/components/navItem';

import customTwMerge from 'utils/twMerge';

import type { MegaMenuFragment, MenuFragment } from 'global/navigation/query';
import type { FC } from 'react';

const DropDownMenu: FC<MegaMenuFragment | MenuFragment> = props => {
  const Column: FC<{ menu?: MenuFragment['menu'] }> = ({ menu }) => (
    <div className="flex w-[310px] flex-col gap-4">
      {hasArrayValues(menu) && menu.map(menuItem => <NavItem key={menuItem._key} {...menuItem} />)}
    </div>
  );
  const getContent = () => {
    switch (props._type) {
      case 'menu': {
        const menu = props.menu;

        return <Column menu={menu} />;
      }
      case 'megaMenu': {
        const { column } = props;

        return (
          hasArrayValues(column) &&
          column.map((col, index) => (
            <div className={customTwMerge('flex flex-col gap-2', index !== 0 && 'border-l border-neutrals-300 pl-6')}>
              <span className="font-favorit text-sm leading-6 tracking-[-0.02em] text-neutrals-900">{col.label}</span>
              <Column menu={col.menu} />
            </div>
          ))
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <div className="flex rounded-b-lg border border-t-0 border-neutrals-100 bg-neutrals-50 p-5 shadow-md">
      {getContent()}
    </div>
  );
};

export default DropDownMenu;

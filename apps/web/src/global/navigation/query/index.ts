import { buttonFragment } from 'molecules/button';
import { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui/icons';
import type { InferFragmentType } from 'groqd';
import type { ExtractSanityType } from 'types/global';
import type { Navigation } from 'types/sanity.types';

type NavItemQuery = StripArray<StripMaybe<ExtractSanityType<Navigation, 'menu', 'menu', 'menus'>>>;
const navItemFragment = q.fragment<NavItemQuery>().project(navItem => ({
  icon: navItem.field('icon').as<IconIds>().nullable(),
  link: navItem.field('link').project(linkFragment).nullable(true),
  badge: q.string().optional().nullable(),
  description: q.string().optional().nullable(),
}));

type MenuQuery = ExtractSanityType<Navigation, 'menu', undefined, 'menus'>;
const menuFragment = q.fragment<MenuQuery>().project(menu => ({
  _type: q.literal('menu'),
  _key: q.string(),
  label: q.string().optional().nullable(),
  menu: menu
    .field('menu[]')
    .project({ _key: q.string(), ...navItemFragment })
    .nullable(true),
}));

type MegaMenuQuery = ExtractSanityType<Navigation, 'megaMenu', undefined, 'menus'>;
const megaMenuFragment = q.fragment<MegaMenuQuery>().project(menu => ({
  _type: q.literal('megaMenu'),
  _key: q.string(),
  label: q.string().optional().nullable(),
  column: menu
    .field('column[]')
    .project(menuFragment)
    .nullable(true),
}));

export const navigationFragment = q.fragmentForType<'navigation'>().project(nav => ({
  menus: nav.field('menus[]').project(menus => ({
    ...menus.conditionalByType({
      menu: menuFragment,
      megaMenu: megaMenuFragment,
      link: { _key: q.string(), _type: q.literal('link'), ...linkFragment },
    }),
  })),
  buttons: nav
    .field('buttons[]')
    .project(button => ({
      ...button.conditionalByType({
        button: buttonFragment,
      }),
    }))
    .nullable(true),
}));

export type NavItemFragment = InferFragmentType<typeof navItemFragment>;
export type MenuFragment = InferFragmentType<typeof menuFragment>;
export type MegaMenuFragment = InferFragmentType<typeof megaMenuFragment>;
export type NavigationFragment = InferFragmentType<typeof navigationFragment>;

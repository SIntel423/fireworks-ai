import { imageFragment } from 'molecules/image';

import HeaderLayout from 'global/navigation/components/headerLayout';
import { navigationFragment } from 'global/navigation/query';

import { q, runQuery } from 'lib/client';

import type { FC } from 'react';

const headerQuery = q.star.filterByType('navigation').project({
  ...navigationFragment,
  settings: q.star.filterByType('settings').project(settings => ({
    logo: settings.field('logo').project(imageFragment),
  })),
});

const Header: FC = async () => {
  const query = headerQuery,
    data = (await runQuery(query, {}))[0],
    { logo } = data.settings[0];

    return <HeaderLayout {...data} logo={logo} />;
};
export default Header;

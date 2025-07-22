import { twJoin } from 'tailwind-merge';

import type { PortableTextComponents } from 'next-sanity';

const commonBulletClasses = 'flex flex-col gap-2 [&_li]:before:top-1';

const list: PortableTextComponents['list'] = ({ children, value }) => {
  switch (value.listItem) {
    case 'number':
      return (
        <ol className="flex flex-col gap-2 marker:font-bold [&_li]:before:content-[attr(data-index)]">{children}</ol>
      );
    case 'bullet':
    default:
      return (
        <ul
          className={twJoin(
            commonBulletClasses,
            "[&_li]:before:bg-[url('/icons/bullet-icon.svg')] dark:[&_li]:before:bg-[url('/icons/bullet-icon-dark.svg')] [&_li]:before:bg-cover",
          )}
        >
          {children}
        </ul>
      );
  }
};

export default list;

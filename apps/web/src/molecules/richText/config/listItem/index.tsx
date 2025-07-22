import type { PortableTextComponents } from 'next-sanity';

const listItem: PortableTextComponents['listItem'] = ({ children, index }) => (
  <li
    className="text-left before:relative before:mr-3 before:inline-block before:size-4 before:align-top before:font-bold [&_ol]:mt-2 [&_ul]:mt-2"
    data-index={`${index + 1}.`}
  >
    <span className="inline-block w-[calc(100%_-_28px)]">{children}</span>
  </li>
);

export default listItem;

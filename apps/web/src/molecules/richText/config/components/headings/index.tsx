import HeadingObserver from 'molecules/richText/config/components/headings/components/observer';
import { generateHeadingId } from 'molecules/richText/config/components/headings/utils/generateHeadingId';

import type { ElementType, ReactNode } from 'react';

const Heading = ({ level, className, children }: { level: number; className: string; children: ReactNode }) => {
  const Tag = `h${level}` as ElementType,
    headingId = children ? generateHeadingId(children) : '';

  return (
    <HeadingObserver headingId={headingId}>
      <Tag id={headingId} className={className}>
        {children}
      </Tag>
    </HeadingObserver>
  );
};

export default Heading;

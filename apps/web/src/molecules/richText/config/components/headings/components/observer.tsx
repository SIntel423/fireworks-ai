'use client';

import { useInView } from 'react-intersection-observer';

import { addActiveHeading, removeActiveHeading } from 'organisms/tableOfContents/store';

import type { FC, ReactNode } from 'react';

interface HeadingObserverProps {
  headingId: string;
  children: ReactNode;
}

const HeadingObserver: FC<HeadingObserverProps> = ({ headingId, children }) => {
  const { ref } = useInView({
    threshold: 0,
    rootMargin: '-200px 0px',
    onChange: isInView => (isInView ? addActiveHeading(headingId) : removeActiveHeading(headingId)),
  });

  return <div ref={ref}>{children}</div>;
};

export default HeadingObserver;

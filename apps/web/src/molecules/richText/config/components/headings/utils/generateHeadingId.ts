import { generateSlug } from 'utils/slugs';
import reactNodeToString from 'utils/strings/reactNodeToString';

import type { ReactNode } from 'react';

export const generateHeadingId = (children: ReactNode) => {
  const headingText = reactNodeToString(children),
    headingId = headingText ? generateSlug(headingText) : '';

  return headingId;
};

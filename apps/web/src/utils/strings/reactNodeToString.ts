import { isValidElement } from 'react';

import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

const reactNodeToString = function (reactNode: ReactNode): string {
  let string = '';

  switch (true) {
    case typeof reactNode === 'string':
      string = reactNode;
      break;
    case typeof reactNode === 'number':
      string = reactNode.toString();
      break;
    case reactNode instanceof Array:
      reactNode.forEach(child => {
        string += reactNodeToString(child);
      });
      break;
    case isValidElement(reactNode):
      string += reactNodeToString((reactNode.props as PropsWithChildren<ReactElement>).children);
      break;
  }

  return string;
};

export default reactNodeToString;

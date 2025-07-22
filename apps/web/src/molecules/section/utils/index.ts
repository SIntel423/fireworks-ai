import { hasArrayValues } from '@packages/utils/src/arrays';
import { objectEntries } from '@packages/utils/src/typeUtils';

import { sectionFragment } from '..';

import type { SectionQueryProps } from '..';
import type { ComponentProps, ComponentPropsWithSymbols } from 'utils/componentGenerator';

type LiteralComponentProps = StripArray<StripMaybe<ComponentProps>>;

export const splitSectionProps = (
  props: ComponentPropsWithSymbols,
): { sectionProps: SectionQueryProps; rest: LiteralComponentProps } => {
  if (props._type === 'symbol' || hasArrayValues(props)) {
    return { sectionProps: {} as unknown as SectionQueryProps, rest: props as unknown as LiteralComponentProps };
  }

  return objectEntries(props).reduce(
    (acc, [key, value]) => {
      if (Object.keys(sectionFragment).includes(key as string)) {
        return { ...acc, sectionProps: { ...acc.sectionProps, [key]: value } };
      }

      return { ...acc, rest: { ...acc.rest, [key]: value } };
    },
    { sectionProps: {} as SectionQueryProps, rest: {} as LiteralComponentProps },
  );
};

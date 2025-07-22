import { COLORS } from '@packages/ui/colors';

import type { FC } from 'react';
import type { BlockDecoratorDefinition } from 'sanity';

type Highlight = {
  title: string;
  value: string;
  color: string;
};

const highlightColors = [{ title: 'Mud', value: 'mud-100', color: COLORS.neutrals[100] }] as Highlight[];

const ColorDot: FC<{ color: string }> = ({ color }) => (
  <span
    style={{
      display: 'inline-block',
      width: '1em',
      height: '1em',
      transform: 'translateY(0.125em)',
      backgroundColor: color,
      borderRadius: '50%',
    }}
  />
);

const colorDecorator = highlightColors.map(({ title, value }) => ({
  title,
  value,
  component: children => <span style={{ color: value }}>{children}</span>,
  icon: () => <ColorDot color={value} />,
})) as BlockDecoratorDefinition[];

export default colorDecorator;

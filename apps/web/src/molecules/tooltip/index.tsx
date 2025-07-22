import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import { twJoin } from 'tailwind-merge';

import Icon from 'molecules/icon';

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The content to be displayed in the tooltip.
   */
  children?: ReactNode;
  /**
   * The label to be displayed in the tooltip.
   */
  label?: string;
  /**
   * The description to be displayed in the tooltip.
   */
  description?: string;
  /**
   * The duration delay in milliseconds before the tooltip is displayed.
   */
  delayDuration?: number;
}

const Tooltip: FC<TooltipProps> = ({ children, label, description, className, delayDuration }) => (
  <Provider>
    <Root delayDuration={delayDuration}>
      <Trigger
        className={twJoin(
          children && '[&_>_span]:underline [&_>_span]:decoration-dashed [&_>_span]:underline-offset-2',
          className,
        )}
      >
        {children || <Icon icon="info-circle" iconColor="gray-400" size={16} />}
      </Trigger>
      <Portal>
        <Content className="flex max-w-[300px] flex-col gap-1 rounded-xs border p-3 shadow-md" sideOffset={4}>
          <p className="">{label}</p>
          {description && <p className="">{description}</p>}
          <Arrow className="" />
        </Content>
      </Portal>
    </Root>
  </Provider>
);

export default Tooltip;

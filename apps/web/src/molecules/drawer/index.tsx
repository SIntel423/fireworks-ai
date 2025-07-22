'use client';

import { Close, Content, Dialog, Overlay, Portal, Trigger } from '@radix-ui/react-dialog';

import { toggleDrawer, useDrawer } from 'molecules/drawer/store';
import drawerStyles from 'molecules/drawer/styles';
import Icon from 'molecules/icon';

import type { VariantProps } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';
import type { IntRange } from 'types/global';

interface DrawerProps extends VariantProps<typeof drawerStyles> {
  trigger: ReactNode;
  children: ReactNode;
  size?: IntRange<0, 100>;
  label?: string;
}

const Drawer: FC<DrawerProps> = ({ children, trigger, label, position, size }) => {
  const drawerOpen = useDrawer();

  return (
    <Dialog modal open={drawerOpen} onOpenChange={toggleDrawer}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay asChild>
          <Content className={drawerStyles({ position })} style={{ '--dialog-size': `${100 - (size || 70)}%` }}>
            <div className="flex w-full items-center justify-between gap-2">
              {label && <span className="font-favorit text-mono-md text-black uppercase">{label}</span>}
              <Close className="text-black">
                <Icon icon="x-close" size={24} />
              </Close>
            </div>
            {children}
          </Content>
        </Overlay>
      </Portal>
    </Dialog>
  );
};

export default Drawer;

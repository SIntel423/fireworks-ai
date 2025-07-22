'use client';

import { Portal, normalizeProps, useMachine } from '@zag-js/react';
import * as select from '@zag-js/select';
import { useEffect, useId } from 'react';
import { twJoin } from 'tailwind-merge';

import FieldControl from 'molecules/formInputs/fieldControl';
import Icon from 'molecules/icon';

import type { IconIds } from '@packages/ui/icons';
import type { FieldControlProps } from 'molecules/formInputs/fieldControl';
import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface DropdownProps extends Omit<FieldControlProps, 'defaultValue'> {
  /**
   * Determines whether the dropdown should allow multiple selections.
   */
  multiple?: boolean;
  /**
   * Determines whether the dropdown should be disabled and not interactive.
   */
  disabled?: boolean;
  /**
   * A callback function that is called when the value of the dropdown changes.
   * @param value - The new value of the dropdown.
   */
  onChange?: (value: string | string[]) => void;
  /**
   * The ID of the icon to display in the dropdown.
   */
  icon?: IconIds;
  /**
   * The ID of the icon to display to the left of the dropdown control.
   */
  startIcon?: IconIds;
  /**
   * An optional `FieldControlProps` object that can be used to customize the appearance and behavior of the dropdown control.
   */
  control?: ControllerRenderProps;
  /**
   * The default value for the dropdown. If the `multiple` prop is true, this should be an array of strings. If `multiple` is false, this should be a single string.
   */
  defaultValue?: string | string[];
  /**
   * The value of the dropdown. If the `multiple` prop is true, this should be an array of strings. If `multiple` is false, this should be a single string.
   */
  value?: string[];
}

const generateOptions = (options?: DropdownProps['options']) => {
  if (!options) return [];

  return options.map(option => {
    const value = typeof option === 'string' ? option : option.value;
    const label = typeof option === 'string' ? option : option.label;

    return { label, value };
  });
};

const DropDown: FC<DropdownProps> = ({
  options,
  multiple,
  disabled,
  error,
  icon,
  startIcon,
  control,
  defaultValue,
  onChange: defaultOnChange,
  value,
  placeholder,
  ...props
}) => {
  const items = generateOptions(options),
    { onChange: controlChange, name, ...restControl } = control || {},
    onChange = defaultOnChange || controlChange;

  const collection = select.collection({
    items,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      multiple,
      disabled,
      name,
      value: typeof defaultValue === 'string' ? [defaultValue] : defaultValue,
      onValueChange: onChange ? results => onChange(multiple ? results.value : results.value[0]) : undefined,
      onFocusOutside(event) {
        event.preventDefault();
      },
      positioning: {
        sameWidth: true,
        slide: true,
        fitViewport: true,
      },
    }),
  );

  const api = select.connect(state, send, normalizeProps);

  useEffect(() => {
    if (value) api.setValue(value);
  }, [value]);

  return (
    <FieldControl error={error} {...props}>
      <div className="group" data-error={error} {...api.getRootProps()}>
        <button
          {...api.getTriggerProps()}
          className="flex w-full items-center justify-between gap-2 rounded-lg border-stroke-1 bg-transparent focus-outline-primary dark:focus-outline-marine child-has-value:bg-white"
        >
          {startIcon && <Icon icon={startIcon} size={24} />}
          <input
            className="w-full cursor-pointer rounded-lg px-[11px] py-[7px] text-md text-copy placeholder:text-copy focus-visible:outline-none disabled:cursor-not-allowed"
            placeholder={placeholder || 'Select Option'}
            value={api.valueAsString}
            onChange={() => null}
            {...restControl}
          />
          <Icon
            icon={icon || 'chevron-down'}
            size={20}
            className="stroke-2 transition-transform data-[state=open]:rotate-180"
            data-state={api.open ? 'open' : 'closed'}
          />
        </button>
        <Portal>
          <div
            {...api.getPositionerProps()}
            className={twJoin(
              'border-coolGrey-100 overflow-y-auto rounded-md border bg-white p-4 shadow-xs',
              api.open ? 'visible' : 'hidden',
            )}
          >
            <ul {...api.getContentProps()} className="flex flex-col gap-1 outline-none">
              {items.map(item => (
                <li
                  key={item.value}
                  {...api.getItemProps({ item })}
                  className="group flex cursor-pointer items-center gap-2 rounded-sm bg-white p-2 text-sm text-copy focus-outline-primary transition-colors select-none hover:bg-neutrals-50 data-[highlighted]:bg-neutrals-50 data-[state=checked]:bg-neutrals-100"
                >
                  {/* {multiple && (
                    <div className="group-data-[state=checked]:border-navy-500 border-gray-300 relative flex size-4 min-w-4 items-center justify-center rounded border">
                      <Icon icon="check" size={12} className="stroke-2 group-data-[state=unchecked]:hidden" />
                    </div>
                  )} */}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </Portal>
      </div>
    </FieldControl>
  );
};

export default DropDown;

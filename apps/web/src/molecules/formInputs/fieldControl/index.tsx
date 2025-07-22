import customTwMerge from 'utils/twMerge';

import type { HubspotField } from 'organisms/form/query';
import type { ComponentPropsWithoutRef, FC } from 'react';

export interface FieldControlProps
  extends HubspotField,
    Pick<ComponentPropsWithoutRef<'div'>, 'children' | 'className'> {
  /**
   * An optional boolean prop that indicates whether the field control has an error.
   */
  error?: boolean;
  /**
   * An optional string error text for the field control.
   */
  errorText?: string;
}

const FieldControl: FC<FieldControlProps> = ({
  children,
  label,
  required,
  description,
  error,
  errorText,
  className,
}) => (
  <div className={customTwMerge('flex w-full flex-col gap-1.5', className)}>
    {label && (
      <label className="text-sm font-medium text-copy">
        {label}
        {required && <span>*</span>}
      </label>
    )}
    {children}
    {description && !error && <div className="text-sm text-copy">{description}</div>}
    {error && errorText && <div className="text-sm text-red-500">{errorText}</div>}
  </div>
);

export default FieldControl;

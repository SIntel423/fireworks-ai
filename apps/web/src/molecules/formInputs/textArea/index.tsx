import FieldControl from 'molecules/formInputs/fieldControl';

import type { FieldControlProps } from 'molecules/formInputs/fieldControl';
import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

export interface TextAreaProps extends FieldControlProps {
  /**
   * Indicates whether the text input should be disabled and not interactive.
   */
  disabled?: boolean;
  /**
   * Specifies the React Hook Form controller render props to be used with the text input field.
   */
  control?: ControllerRenderProps;
}

const TextArea: FC<TextAreaProps> = ({ error, disabled, name, placeholder, control, ...props }) => (
  <FieldControl error={error} {...props}>
    <textarea
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      data-error={error}
      rows={4}
      className="form-inputs"
      {...control}
    />
  </FieldControl>
);

export default TextArea;

import FieldControl from 'molecules/formInputs/fieldControl';

import type { FieldControlProps } from 'molecules/formInputs/fieldControl';
import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

export interface TextInputProps extends FieldControlProps {
  /**
   * Indicates whether the text input should be disabled and not interactive.
   */
  disabled?: boolean;
  /**
   * Specifies the React Hook Form controller render props to be used with the text input field.
   */
  control?: ControllerRenderProps;
  /**
   * Specifies the type of the text input field.
   */
  inputType?: 'email' | 'tel' | 'text' | 'password';
}

const TextInput: FC<TextInputProps> = ({ error, disabled, name, placeholder, control, inputType, ...props }) => (
  <FieldControl error={error} {...props}>
    <input
      name={name}
      disabled={disabled}
      placeholder={placeholder || ' '}
      type={inputType}
      data-error={error}
      className="form-inputs"
      {...control}
    />
  </FieldControl>
);

export default TextInput;

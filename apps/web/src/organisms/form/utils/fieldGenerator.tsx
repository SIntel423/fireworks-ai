import { htmlToBlocks } from '@portabletext/block-tools';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { Controller } from 'react-hook-form';

import { hasArrayValues } from '@packages/utils/src/arrays';

import DropDown from 'molecules/formInputs/select';
import TextInput from 'molecules/formInputs/text';
import TextArea from 'molecules/formInputs/textArea';
import RichText from 'molecules/richText';

import { blockContentType } from 'organisms/form/utils/richSchema';

import type { RichTextFragment } from 'molecules/richText';
import type { FieldObjectIds, HubspotField, HubspotFieldGroups } from 'organisms/form/query';
import type { Control, ControllerRenderProps, FieldError, FieldErrors, FieldValues } from 'react-hook-form';

export interface FieldGeneratorProps {
  fieldGroups: HubspotFieldGroups[];
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
  fieldObjectIds: FieldObjectIds[];
  setFieldObjectIds: Dispatch<SetStateAction<FieldObjectIds[]>>;
}

interface GeneratorProps extends Omit<FieldGeneratorProps, 'fieldGroups' | 'control' | 'errors'> {
  field: HubspotField;
  control: ControllerRenderProps;

  error: FieldError;
}

const Generator: FC<GeneratorProps> = ({ field, control, error, fieldObjectIds, setFieldObjectIds }) => {
  const props = {
    ...field,
    control,
    error: !!error,
    errorText: error?.message?.toString() || '',
  };

  useEffect(() => {
    if (!fieldObjectIds.some(obj => obj['fieldName'] === field.name))
      setFieldObjectIds([...fieldObjectIds, { fieldName: field.name, objectTypeId: field.objectTypeId }]);
  }, []);

  // if (field.hidden) {
  //   return <HiddenInput key={field.name} {...props} />;
  // }

  switch (field.fieldType) {
    case 'textarea':
      return <TextArea key={field.name} {...props} />;
    case 'text':
      return <TextInput key={field.name} {...props} />;
    case 'select':
      return <DropDown key={field.name} options={field.options} {...props} />;
    // case 'phonenumber':
    //   return <PhoneInput key={field.name} {...props} />;
    // case 'number':
    //   return <NumberInput key={field.name} {...props} />;
    // case 'booleancheckbox':
    //   return <Checkbox key={field.name} {...props} />;
    // case 'checkbox': {
    //   return <CheckboxGroup key={field.name} {...props} />;
    // }
    case 'file':
    case 'date':
    case 'radio':
    default: {
      console.warn(`[HubForm] - No field for ${field.fieldType}`);

      return <></>;
    }
  }
};

const FieldGenerator: FC<FieldGeneratorProps> = ({
  fieldGroups,
  control,
  errors,
  fieldObjectIds,
  setFieldObjectIds,
}) => {
  if (!hasArrayValues(fieldGroups)) {
    console.error('[HubForm] - No fields returned');

    return null;
  }

  return fieldGroups.map((group, ind) => (
    <div key={group.fields[0]?.name || ind} data-key={group.fields[0]?.name || ind} className="flex flex-row gap-4">
      {group.fields.map((input, i) => (
        <Controller
          key={input.name || i}
          name={input.name || ''}
          defaultValue={input.defaultValue ?? ''}
          control={control}
          render={({ field }) => (
            <Generator
              field={input}
              control={field}
              error={errors?.[field.name] as FieldError}
              fieldObjectIds={fieldObjectIds}
              setFieldObjectIds={setFieldObjectIds}
            />
          )}
          rules={{
            required: input?.required || false,
          }}
        />
      ))}
      {group.richText?.content && (
        <RichText
          blocks={htmlToBlocks(group.richText.content, blockContentType) as RichTextFragment[]}
          className="text-center text-xs text-copy"
        />
      )}
    </div>
  ));
};

export default FieldGenerator;

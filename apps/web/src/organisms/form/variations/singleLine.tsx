import { type FC, useEffect } from 'react';

import Button from 'molecules/button';

import type { HubspotFieldGroups } from 'organisms/form/query';
import type { FieldGeneratorProps } from 'organisms/form/utils/fieldGenerator';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

interface SingleLineFormProps extends Omit<FieldGeneratorProps, 'fieldGroups'> {
  fieldGroups?: HubspotFieldGroups[];
  submitLabel?: string;
  onSubmit: () => void;
  state: 'submitted' | 'loading' | 'default';
  register: UseFormRegister<FieldValues>;
}

const SingleLineForm: FC<SingleLineFormProps> = ({
  state,
  submitLabel,
  onSubmit,
  fieldGroups,
  register,
  fieldObjectIds,
  setFieldObjectIds,
}) => {
  const disabled = Boolean(state === 'loading'),
    field = fieldGroups?.[0]?.fields?.[0];

  useEffect(() => {
    if (!fieldObjectIds.some(obj => obj['fieldName'] === field?.name))
      setFieldObjectIds([...fieldObjectIds, { fieldName: field?.name, objectTypeId: field?.objectTypeId }]);
  }, []);

  return (
    <div className="flex w-full max-w-[500px] flex-col items-start gap-2">
      <form
        data-disabled={disabled}
        className="bg-wood-50 data-[disabled=true]:bg-neutralGrey-100 flex w-full items-center justify-between gap-2 rounded-lg py-1 pr-1 pl-4 shadow-lg focus-within:stateful-outline-primary sm:pl-5"
        onSubmit={onSubmit}
      >
        <input
          placeholder={field?.placeholder || 'Type your email...'}
          disabled={disabled}
          type="text"
          className="text-neutralGrey-600 placeholder:text-neutralGrey-500 disabled:text-neutralGrey-500 w-full bg-transparent text-sm outline-none sm:text-md"
          {...register(field?.name || 'email')}
        />
        <Button
          hierarchy="primary"
          label={submitLabel || 'Submit'}
          type="submit"
          disabled={disabled}
          className="w-fit"
        />
      </form>
      {Boolean(state === 'submitted') && (
        <div className="text-mud-900 dark:text-mud-50 flex items-center gap-1 font-semibold">
          {/* <Icon icon="sealCheck" size={16} /> */}
          <span className="font-mono text-mono-sm text-mud-800 dark:text-mud-100">Submitted! Thank you.</span>
        </div>
      )}
    </div>
  );
};

export default SingleLineForm;

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button from 'molecules/button';
import Icon from 'molecules/icon';
import Loader from 'molecules/loader';

import FieldGenerator from 'organisms/form/utils/fieldGenerator';

import type { HubspotFieldGroups, HubspotForm } from 'organisms/form/query';
import type { FieldGeneratorProps } from 'organisms/form/utils/fieldGenerator';
import type { FC } from 'react';

interface GeneralFormProps extends Omit<FieldGeneratorProps, 'fieldGroups'> {
  fieldGroups?: HubspotFieldGroups[];
  submitText?: HubspotForm['submitText'];
  onSubmit: () => void;
  state: 'submitted' | 'loading' | 'default';
}

const FormState: FC<GeneralFormProps> = ({ onSubmit, state, fieldGroups, submitText, ...props }) => {
  switch (state) {
    case 'submitted':
      return (
        <div className="flex min-h-[720px] flex-col items-center justify-center gap-2 text-center">
          <Icon icon="check-circle" size={80} className="text-purple-400" />
          <h3 className="mt-2 text-display-md font-medium text-copy">Thank you!</h3>
          <p className="text-sm text-copy">We've received your request and will get back to you soon.</p>
        </div>
      );
    case 'loading':
      return (
        <div className="flex min-h-[720px] flex-col items-center justify-center gap-4">
          <Loader />
          <h3 className="text-display-md font-medium text-copy">Loading...</h3>
        </div>
      );
    default:
      return hasArrayValues(fieldGroups) ? (
        <form className="flex flex-col gap-4" autoComplete="on" onSubmit={onSubmit}>
          <FieldGenerator fieldGroups={fieldGroups} {...props} />
          <Button
            type="submit"
            label={submitText || 'Submit'}
            hierarchy="primary"
            semanticFallback="button"
            className="mt-4 cursor-pointer sm:w-full"
          />
        </form>
      ) : (
        <div className="font-mono text-mono-lg text-neutralGrey-500">No form fields defined</div>
      );
  }
};

const GeneralForm: FC<GeneralFormProps> = ({ ...props }) => (
  <div className="w-full rounded-lg border-stroke-1 px-4 py-6 sm:px-6">
    <FormState {...props} />
  </div>
);

export default GeneralForm;

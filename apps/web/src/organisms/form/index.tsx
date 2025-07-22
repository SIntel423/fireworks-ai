'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import fetchHubspotForm from 'organisms/form/utils/fetchHubspotForm';
import getFormState from 'organisms/form/utils/getFormState';
import submitHubspotForm from 'organisms/form/utils/submitHubspotForm';
import GeneralForm from 'organisms/form/variations/general';

import type { FieldObjectIds, HubspotForm, HubspotFormQuery } from 'organisms/form/query';
import type { BaseSyntheticEvent, FC } from 'react';
import type { FieldValues } from 'react-hook-form';

const Form: FC<HubspotFormQuery> = ({ formId }) => {
  const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      mode: 'all',
    }),
    [loading, setLoading] = useState(true),
    [submitted, setSubmitted] = useState(false),
    [formData, setFormData] = useState<HubspotForm | null>(null),
    [fieldObjectIds, setFieldObjectIds] = useState<FieldObjectIds[]>([]);

  const onSubmit = async (data: FieldValues, e?: BaseSyntheticEvent<object, unknown, unknown>) => {
    e?.preventDefault();

    try {
      const res = await submitHubspotForm(data, formData?.portalId || 0, formData?.guid || '', fieldObjectIds),
        success = res?.status === 200;

      if (success) {
        reset();
        setSubmitted(true);
      }
    } catch (error) {
      throw new Error(`Failed to submit Hubspot form: ${error}`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHubspotForm(formId || '');

        setFormData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(`[HubForm] Could not fetch data for form with ID: ${formId} with error: ${error}`);
      }
    })();
  }, [formId]);

  return (
    <GeneralForm
      fieldGroups={formData?.formFieldGroups}
      submitText={formData?.submitText}
      control={control}
      errors={errors}
      fieldObjectIds={fieldObjectIds}
      setFieldObjectIds={setFieldObjectIds}
      onSubmit={handleSubmit(onSubmit)}
      state={getFormState(submitted, loading)}
    />
  );
};

export default Form;

import { hubspotForm } from 'organisms/form/query';

import zodFetch from 'lib/zodFetch';

const fetchHubspotForm = async (formId: string) => {
  if (!formId) {
    throw new Error('[HubForm] You must pass a HubForm ID.');
  }

  try {
    return await zodFetch(`/api/forms/${formId}`, hubspotForm);
  } catch (error) {
    throw new Error(`Failed to fetch Hubspot form: ${formId} with error: ${error}`);
  }
};

export default fetchHubspotForm;

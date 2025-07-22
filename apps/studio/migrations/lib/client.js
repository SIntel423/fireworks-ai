import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pv37i0yn',
  dataset: 'production',
  token: '',
  apiVersion: '2024-11-21',
  useCdn: false,
});

export default client;

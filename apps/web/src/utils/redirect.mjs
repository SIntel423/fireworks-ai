import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET_PROD,
  useCdn: true,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
});

const fetchRedirects = async () => {
  try {
    const query = '*[_type == "redirect"]',
      documents = await client.fetch(query);

    return documents;
  } catch (error) {
    throw new Error('Error fetching redirects:', error);
  }
};

export default fetchRedirects;

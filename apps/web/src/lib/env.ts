const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
};

export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2024-07-09';

// Allow selecting dataset via environment variable
const datasetEnv = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Map dataset environment name to actual dataset name
const datasetMap: Record<string, string> = {
  production: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET_PROD || 'production',
  staging: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET_STAGING || 'staging',
};

export const dataset = assertValue(datasetMap[datasetEnv], `Invalid or missing dataset: ${datasetEnv}`);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
);

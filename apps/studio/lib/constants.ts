const assertEnvConstant = <T>(value?: T, errorMessage?: string): T => {
  if (value === undefined) {
    throw new Error(errorMessage || 'An error occurred while asserting value');
  }

  return value;
};

export const PROJECT_ID = assertEnvConstant(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
);

export const DATASET_PROD = assertEnvConstant(
  process.env.SANITY_STUDIO_DATASET_PROD,
  'Missing environment variable: SANITY_STUDIO_DATASET_PROD',
);

export const DATASET_STAGING = assertEnvConstant(
  process.env.SANITY_STUDIO_DATASET_STAGING || 'staging',
  'Missing environment variable: SANITY_STUDIO_DATASET_STAGING',
);

export const STUDIO_API_VERSION = assertEnvConstant(
  process.env.SANITY_STUDIO_API_VERSION,
  'Missing environment variable: SANITY_STUDIO_API_VERSION',
);

/**
 * Defines the presentation paths for different document types.
 */
export const PRESENTATION_PATHS = {
  page: '',
  blog: '/blog',
  models: '/models',
} as const;

export const PAGE_TYPES = ['page', 'legal', 'blog'] as const;

export const REFERENCEABLE_DOCUMENT_TYPES = [...PAGE_TYPES];

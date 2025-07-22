import type { InferFragmentType } from 'groqd';
import type { companyFragment } from 'molecules/attribution';

type Company = InferFragmentType<typeof companyFragment>;

export const getCompanyLogo = (company?: Company | null, isDark?: boolean) => {
  if (!company) return null;

  return isDark ? company.darkLogo || company.lightLogo : company.lightLogo || company.darkLogo;
};

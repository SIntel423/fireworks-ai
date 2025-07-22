import { hasArrayValues } from '@packages/utils/src/arrays';
import { kebabToTitleCase } from '@packages/utils/src/strings';

type BreadcrumbData = {
  id: string;
  label: string;
  link: string;
};

type ReplaceSlugList = {
  source: string;
  destination: string;
};

const replaceSlugList = [] as ReplaceSlugList[];

/**
 * Generates an array of breadcrumb data based on the provided pathname.
 *
 * @param pathname - The pathname to generate breadcrumb data for.
 * @returns An array of breadcrumb data objects, each with an id, label, and link.
 */
const generateBreadcrumbs = (pathname?: string) => {
  let breadcrumbData: BreadcrumbData[] = [];
  const pathArray = pathname?.split('/');

  pathArray?.forEach((path: string, index: number) => {
    const cleanPath = path.replace('/', '');

    if (cleanPath === '') {
      return;
    }

    const label = kebabToTitleCase(cleanPath);
    const slugList = pathArray.slice(0, index + 1);

    const parsedSlugList = slugList.map(
      slug =>
        (hasArrayValues(replaceSlugList) &&
          replaceSlugList.find((listSlug: { source: string }) => listSlug.source === slug)?.destination) ||
        slug,
    );

    const data = {
      id: `${path}${index}`,
      label,
      link: `${parsedSlugList.join('/')}`,
    };

    breadcrumbData = [...breadcrumbData, data];
  });

  return breadcrumbData;
};

export default generateBreadcrumbs;

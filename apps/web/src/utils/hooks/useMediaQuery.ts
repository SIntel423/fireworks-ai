import { useEffect, useState } from 'react';

/**
 * A React hook that returns a boolean indicating whether the current browser window matches the provided media query string.
 *
 * @param mediaQueryString - The media query string to match against.
 * @returns A boolean indicating whether the current browser window matches the provided media query string.
 */
const useMediaQuery = (mediaQueryString: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, [mediaQueryString]);

  return matches;
};

export default useMediaQuery;

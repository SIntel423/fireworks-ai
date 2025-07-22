import { useWindowSize } from '@react-hookz/web';
import { type RefObject, useEffect, useState } from 'react';

const useIsSticky = <T extends HTMLElement>(elementRef: RefObject<T>, topOffset: number) => {
  const [scrolled, setScrolled] = useState(false);
  const { width } = useWindowSize();

  const handleStickyElement = () => {
    if (elementRef?.current) {
      const refTop = elementRef.current.getBoundingClientRect().top;
      if (window.scrollY <= 0) {
        setScrolled(false);
      }

      setScrolled(Math.floor(refTop) <= topOffset);
    }
  };

  const effect = () => {
    window.addEventListener('scroll', () => handleStickyElement());
    window.addEventListener('resize', () => handleStickyElement());

    return () => {
      window.removeEventListener('scroll', () => handleStickyElement());
      window.removeEventListener('resize', () => handleStickyElement());
    };
  };

  useEffect(effect, [width, topOffset]);

  return scrolled;
};

export default useIsSticky;

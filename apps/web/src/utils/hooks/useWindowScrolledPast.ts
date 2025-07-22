import { useEffect, useState } from 'react';

const useWindowScrolledPast = (threshold: number) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const scrollPosition = window.scrollY;

      setIsPastThreshold(Math.abs(scrollPosition) > threshold);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return isPastThreshold;
};

export default useWindowScrolledPast;

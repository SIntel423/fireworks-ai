'use client';

import useHeaderStore, { toggleMobileMenu } from 'global/navigation/store';
import { hamburgerLineStyle } from 'global/navigation/styles';

const Hamburger = () => {
  const open = useHeaderStore(state => state.mobileMenuOpen);

  return (
    <button
      tabIndex={0}
      onClick={toggleMobileMenu}
      className="group relative flex h-4 w-6 shrink-0 basis-6 cursor-pointer items-center justify-center xl:hidden"
      aria-expanded={open}
    >
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <span key={`line-${index + 1}`} className={hamburgerLineStyle({ line: index as 0 | 1 | 2 })} />
        ))}
    </button>
  );
};

export default Hamburger;

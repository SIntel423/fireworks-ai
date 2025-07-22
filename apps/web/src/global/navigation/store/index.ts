import { create } from 'zustand';

interface HeaderStore {
  desktopMenuOpen: boolean;
  mobileMenuOpen: boolean;
}

const useHeaderStore = create<HeaderStore>(() => ({
  desktopMenuOpen: false,
  mobileMenuOpen: false,
}));

export const openDesktopMenu = () => useHeaderStore.setState({ desktopMenuOpen: true });
export const closeDesktopMenu = () => useHeaderStore.setState({ desktopMenuOpen: false });

export const toggleMobileMenu = () => useHeaderStore.setState(state => ({ mobileMenuOpen: !state.mobileMenuOpen }));
export const openMobileMenu = () => useHeaderStore.setState({ mobileMenuOpen: true });
export const closeMobileMenu = () => useHeaderStore.setState({ mobileMenuOpen: false });

export default useHeaderStore;

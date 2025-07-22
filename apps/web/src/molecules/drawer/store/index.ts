import { create } from 'zustand';

interface DrawerStore {
  drawerOpen: boolean;
}

const useDrawerStore = create<DrawerStore>(() => ({
  drawerOpen: false,
}));

export const useDrawer = () => useDrawerStore(state => state.drawerOpen);

export const openDrawer = () => useDrawerStore.setState({ drawerOpen: true });
export const closeDrawer = () => useDrawerStore.setState({ drawerOpen: false });
export const toggleDrawer = () => useDrawerStore.setState(state => ({ drawerOpen: !state.drawerOpen }));

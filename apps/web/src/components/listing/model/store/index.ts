import { create } from 'zustand';

import { closeDrawer } from 'molecules/drawer/store';

interface ModelStore {
  filter: string;
  providers: string;
  resultCount: number;
  totalModels: number;
}

const defaultState = {
  filter: '',
  providers: '',
  resultCount: 0,
  totalModels: 0,
} as const;

const useModelStore = create<ModelStore>()(() => defaultState);

// Filter
export const useModelFilter = () => useModelStore(state => state.filter);
export const setModelFilter = (filter: string) => {
  useModelStore.setState(() => ({ providers: defaultState.providers, filter }));
  closeDrawer();
};

// Providers
export const useModelProviders = () => useModelStore(state => state.providers);
export const setModelProviders = (providers: string) => {
  useModelStore.setState(() => ({ filter: defaultState.filter, providers }));
  closeDrawer();
};

// Result Count
export const useModelResultCount = () => useModelStore(state => state.resultCount);
export const setModelResultCount = (resultCount: number) => useModelStore.setState(() => ({ resultCount }));

// Total Models
export const useModelTotalModels = () => useModelStore(state => state.totalModels);
export const setModelTotalModels = (totalModels: number) => useModelStore.setState(() => ({ totalModels }));

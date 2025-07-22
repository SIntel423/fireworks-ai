import { create } from 'zustand';

interface StatsStore {
  page: number;
  totalPages: number;
}

const defaultState = {
  page: 0,
  totalPages: 1,
} as const;

const useStatsStore = create<StatsStore>()(() => defaultState);

// Page

export const useStatsPage = () => useStatsStore(state => state.page);

export const setPage = (page: number) => useStatsStore.setState({ page });

export const setNextStatsPage = () =>
  useStatsStore.setState(state => ({ page: state.page + 1 === state.totalPages ? 0 : state.page + 1 }));

export const setPreviousStatsPage = () =>
  useStatsStore.setState(state => ({ page: state.page === 0 ? state.totalPages - 1 : state.page - 1 }));

// Total Pages

export const useTotalPages = () => useStatsStore(state => state.totalPages);

export const setTotalPages = (totalPages: number) => useStatsStore.setState({ totalPages });

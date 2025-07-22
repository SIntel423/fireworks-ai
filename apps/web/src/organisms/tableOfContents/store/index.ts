import { create } from 'zustand';

interface TocStore {
  activeHeadings: string[];
  noHeadingsInView: boolean;
}

const defaultState = {
  activeHeadings: [],
  noHeadingsInView: false,
};

const useTocStore = create<TocStore>()(() => defaultState);

export const useTocActiveHeading = () => {
  const activeHeadings = useTocStore(state => state.activeHeadings);

  return activeHeadings[0];
};

export const setActiveHeading = (newHeading: string) =>
  useTocStore.setState(state => ({ activeHeadings: [newHeading, ...state.activeHeadings] }));

export const addActiveHeading = (newHeading: string) =>
  useTocStore.setState(state => {
    return state.noHeadingsInView
      ? { noHeadingsInView: false, activeHeadings: [newHeading] }
      : { activeHeadings: [...state.activeHeadings, newHeading] };
  });

export const removeActiveHeading = (heading: string) =>
  useTocStore.setState(state => {
    const newHeadingArray = state.activeHeadings.filter(h => h !== heading),
      isEmpty = newHeadingArray.length === 0;

    return isEmpty ? { noHeadingsInView: true } : { activeHeadings: newHeadingArray };
  });

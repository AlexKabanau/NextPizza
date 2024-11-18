import { create } from 'zustand';

type StateType = {
  activeId: number;
  setActiveId: (activeId: number) => void;
};

export const useCategoryStore = create<StateType>((set) => ({
  activeId: 1,
  setActiveId: (activeId) => set({ activeId }),
}));

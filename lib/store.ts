import { create } from "zustand";
import { shallow } from 'zustand/shallow';

export interface StoreState {
  showMenu: boolean,
  invertMenu: boolean,
  setShowMenu: (showMenu: boolean) => void,
  setInvertMenu: (invertMenu: boolean) => void
}

const useStore = create<StoreState>((set) => ({
  showMenu: true,
  invertMenu: true,
  setShowMenu: (showMenu) => set({ showMenu }),
  setInvertMenu: (invertMenu) => set({ invertMenu })
}));

export { shallow, useStore };

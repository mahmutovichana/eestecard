// Store za mobile state i preference

import { create } from 'zustand';

interface MobileStore {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userToken: string | null;
  setUserToken: (token: string | null) => void;
}

export const useMobileStore = create<MobileStore>((set) => ({
  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  darkMode: false,
  setDarkMode: (dark) => set({ darkMode: dark }),
  userToken: null,
  setUserToken: (token) => set({ userToken: token }),
}));

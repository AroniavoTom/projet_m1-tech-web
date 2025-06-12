import {create} from 'zustand';
export const useMenuStore = create((set) => ({
    activeMenu:null,
    setActiveMenu: (menu) => set({ activeMenu: menu }),

}))
import { create } from "zustand";


export const useCountStore = create((set) => ({
    count: 0,
    setCount: {
        add: () =>
            set((state) => ({
                count: state.count + 1,
            })),
        remove: () =>
            set((state) => ({
                count: state.count > 0 ? state.count - 1 : 0, // évite un count négatif
            })),
        reset: () =>
            set(() => ({
                count: 0,
            })),
        set: (value) =>
            set(() => ({
                count: value,
            })),
    },
}));

import { create } from "zustand";

export const useOrderStory = create<Order>((set) => ({
    freeTime: [],
    setFreeTime: (val: any) => set({ freeTime: val }),
}));
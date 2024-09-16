import { create } from "zustand";
import { AuthStoreTypes } from "@/types/auth/auth";

export const useAuthStore = create<AuthStoreTypes>((set) => ({
    phoneNumber: '',
    setPhoneNumber: (val: string) => set({ phoneNumber: val }),
}));
import { create } from "zustand";
import { AuthStoreTypes } from "@/types/auth/auth";

export const useAuthStore = create<AuthStoreTypes>((set) => ({
    role: '',
    setRole: (val: string) => set({ role: val }),
    firstName: '',
    setFirstName: (val: string) => set({ firstName: val }),
    lastName: '',
    setLastName: (val: string) => set({ lastName: val }),
    phoneNumber: '',
    setPhoneNumber: (val: string) => set({ phoneNumber: val }),
}));
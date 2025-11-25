"use client"
import { User } from "@/src/types";
import { persist } from "zustand/middleware";
import { create } from "zustand/react";

type AuthState = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData: User) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" } 
  )
);

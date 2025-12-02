"use client";

import { AuthUser } from "@/src/types";
import { create } from "zustand";
import { useSplitStore } from "./splitStore";

type AuthState = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user: AuthUser) => {
    set({ user });
    localStorage.setItem("auth_user", JSON.stringify(user));
  },
  logout: () => {
    const resetSplits = useSplitStore.getState().resetSplits;
    resetSplits();
    set({ user: null });
    localStorage.removeItem("auth_user");
  },
}));

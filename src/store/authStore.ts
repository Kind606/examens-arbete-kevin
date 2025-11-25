"use client";

import { create } from "zustand";
import { AuthUser } from "@/src/types";

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
    set({ user: null });
    localStorage.removeItem("auth_user");
  },
}));

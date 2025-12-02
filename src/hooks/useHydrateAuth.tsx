"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { AuthUser } from "@/src/types";

export function useHydrateAuth(user: AuthUser) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user, login]);
}

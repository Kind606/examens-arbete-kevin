"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useGuestRoute = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // Already logged in
      return;
    }

    // Check cookie if Zustand is empty
    const match = document.cookie.match(/auth_token=([^;]+)/);
    if (match) {
      const token = match[1];
      // Rehydrate mock user (or fetch from server)
      login({ id: "1", username: "mockuser", token });
      router.push("/"); // redirect after hydration
    }
  }, [user, login, router]);
};

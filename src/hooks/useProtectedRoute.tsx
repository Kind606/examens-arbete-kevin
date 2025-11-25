"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

// Hook to protect pages for logged-in users
export const useProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  useEffect(() => {
    // If Zustand has no user, try to read from cookie
    if (!user) {
      const match = document.cookie.match(/auth_token=([^;]+)/);
      if (match) {
        const token = match[1];
        // Mocked user reconstruction
        login({ id: "1", username: "mockuser", token });
      } else {
        // No cookie -> redirect to login
        router.push("/login");
      }
    }
  }, [user, login, router]);
};

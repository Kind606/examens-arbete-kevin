"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { AuthUser } from "@/src/types";
import { verifyToken } from "@/src/components/loginComps/loginFormActions"; // new server-side function

// Hook to protect pages for logged-in users and return user info
export const useProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      const match = document.cookie.match(/auth_token=([^;]+)/);
      if (!match) {
        router.push("/login");
        setLoading(false);
        return;
      }

      const token = match[1];

      try {
        // Verify the token on the server side
        const authUser: AuthUser | null = await verifyToken(token);

        if (!authUser) {
          router.push("/login");
        } else {
          login(authUser);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [user, login, router]);

  return { user, loading };
};

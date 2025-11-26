"use client";

import { useAuthStore } from "@/src/store/authStore";
import { AuthUser, User } from "@/src/types";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { loginUser } from "./loginFormActions";

export const useLogin = () => {
  const loginZustand = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (
    username: string,
    password: string,
    setError: UseFormSetError<User>
  ) => {
    try {
      const user: AuthUser | null = await loginUser(username, password); // server action

      if (!user) {
        setError("password", {
          type: "manual",
          message: "Fel användarnamn eller lösenord",
        });
        setError("username", {
          type: "manual",
        });
        return false;
      }

      // Persist in Zustand + cookie
      loginZustand(user);
      document.cookie = `auth_token=${user.token}; path=/; max-age=86400; samesite=strict`;

      // Redirect to start page
      router.push("/");
      return true;
    } catch (err) {
      setError("username", { type: "manual" });
      setError("password", { type: "manual", message: "Något gick fel" });
      return false;
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    document.cookie = "auth_token=; path=/; max-age=0"; // clear cookie
    router.push("/login");
  };

  return { handleLogin, handleLogout };
};

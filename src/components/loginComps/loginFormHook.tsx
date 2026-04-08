"use client";

import { useAuthStore } from "@/src/store/authStore";
import { User } from "@/src/types";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import { loginUser } from "./loginFormActions";

export const useLogin = () => {
  const loginZustand = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = async (
    username: string,
    password: string,
    setError: UseFormSetError<User>,
  ) => {
    try {
      const result = await loginUser(username, password);

      if (!result.success || !result.user) {
        setError("password", {
          type: "manual",
          message: result.error || "Invalid credentials",
        });
        setError("username", {
          type: "manual",
        });
        return false;
      }

      // Cookie is now set server-side with httpOnly flag
      loginZustand(result.user);
      router.push("/");
      router.refresh();
      return true;
    } catch {
      setError("username", { type: "manual" });
      setError("password", { type: "manual", message: "Något gick fel" });
      return false;
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
    // Cookie cleanup is handled server-side
    router.push("/login");
    router.refresh();
  };

  return { handleLogin, handleLogout };
};

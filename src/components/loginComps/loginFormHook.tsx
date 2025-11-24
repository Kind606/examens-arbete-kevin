"use client";

import { useAuthStore } from "@/src/store/authStore";
import { User, mockUser } from "@/src/types";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const loginZustand = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = (
    credentials: User,
    setError: (
      field: keyof User,
      error: { type: string; message: string }
    ) => void
  ) => {
    if (
      credentials.username === mockUser.username &&
      credentials.password === mockUser.password
    ) {
      loginZustand(mockUser);

      router.push("/");
      return true;
    } else {
      setError("password", {
        type: "manual",
        message: "Fel användarnamn eller lösenord",
      });
      return false;
    }
  };

  return { handleLogin };
};

"use client";

import { User, mockUser } from "@/src/types";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const login = (credentials: User) => {
    if (
      credentials.username === mockUser.username &&
      credentials.password === mockUser.password
    ) {
      router.push("/");
      return null; // no error
    } else {
      return "Fel användarnamn eller lösenord"; // return error
    }
  };

  return { login };
};

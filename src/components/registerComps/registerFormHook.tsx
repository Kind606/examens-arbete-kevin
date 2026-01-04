"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { registerUser } from "./registerFormAction";

interface RegisterFormData {
  username: string;
  password: string;
}

export function useRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    username: string,
    password: string,
    setError: UseFormSetError<RegisterFormData>
  ) => {
    setLoading(true);

    try {
      const user = await registerUser(username, password);
      console.log("User registered:", user);

      router.push("/login");
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Något gick fel";

      if (errorMessage === "Username already taken") {
        setError("username", {
          type: "manual",
          message: "Användarnamnet är redan taget",
        });
      } else {
        setError("username", { type: "manual" });
        setError("password", { type: "manual", message: errorMessage });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleRegister,
    loading,
  };
}

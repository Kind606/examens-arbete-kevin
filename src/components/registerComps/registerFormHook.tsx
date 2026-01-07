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
      const result = await registerUser(username, password);

      if (!result.success) {
        if (result.error === "Username already taken") {
          setError("username", {
            type: "manual",
            message: "Användarnamnet är redan taget",
          });
        } else {
          setError("password", {
            type: "manual",
            message: result.error || "Något gick fel",
          });
        }
        return false;
      }

      console.log("User registered:", result.data);
      router.push("/login");
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Något gick fel";
      setError("password", { type: "manual", message: errorMessage });
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

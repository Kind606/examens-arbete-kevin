"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./registerFormAction";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  username: string;
  password: string;
}

export function useRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = rhfHandleSubmit(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const user = await registerUser(data.username, data.password);
      console.log("User registered:", user);

      // Client-side navigation
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  });

  return {
    register,
    handleSubmit: onSubmit,
    errors,
    loading,
    error,
  };
}

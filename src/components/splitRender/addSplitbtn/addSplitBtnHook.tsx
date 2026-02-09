"use client";

import type { Split } from "@/generated/prisma/client";
import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { slugify } from "@/src/utils/slugify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addSplitAction } from "./addSplitBtnAction";

interface AddSplitFormData {
  title: string;
}

export function useAddSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [showPopover, setShowPopover] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSplitFormData>({
    defaultValues: {
      title: "",
    },
  });

  const validateSplitName = (value: string) => {
    const newSlug = slugify(value.trim());
    const existingSplit = splits.find((split) => split.slug === newSlug);

    if (existingSplit) {
      return "A split with this name already exists";
    }

    return true;
  };

  const openPopover = () => {
    reset({ title: "" });
    setShowPopover(true);
  };

  const handleCancel = () => {
    reset({ title: "" });
    setShowPopover(false);
  };

  const onSubmit = async (data: AddSplitFormData) => {
    if (!data.title.trim() || !user) return;

    try {
      const newSplit: Split = await addSplitAction(data.title.trim(), user.id);
      reset({ title: "" });
      setShowPopover(false);
      router.push(`/splits/${newSplit.slug}`);
    } catch (err) {
      console.error("Failed to add split:", err);
    }
  };

  return {
    showPopover,
    register,
    handleSubmit,
    errors,
    openPopover,
    onSubmit,
    handleCancel,
    validateSplitName,
  };
}

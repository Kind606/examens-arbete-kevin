"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { slugify } from "@/src/utils/slugify";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editSplitAction } from "./editSplitBtnAction";

interface EditSplitFormData {
  title: string;
}

export function useEditSplit(splitId: string, currentTitle: string) {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  const [showPopover, setShowPopover] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSplitFormData>({
    defaultValues: {
      title: currentTitle,
    },
  });

  const validateSplitName = (value: string) => {
    const newSlug = slugify(value.trim());
    const existingSplit = splits.find(
      (split) => split.slug === newSlug && split.id !== splitId,
    );

    if (existingSplit) {
      return "A split with this name already exists";
    }

    return true;
  };

  const openPopover = () => {
    reset({ title: currentTitle });
    setShowPopover(true);
  };

  const handleCancel = () => {
    reset({ title: currentTitle });
    setShowPopover(false);
  };

  const onSubmit = async (data: EditSplitFormData) => {
    if (!data.title.trim() || !user) return;

    try {
      const result = await editSplitAction(splitId, data.title.trim(), user.id);

      setSplits(
        splits.map((split) =>
          split.id === splitId
            ? { ...split, title: data.title.trim(), slug: result.slug }
            : split,
        ),
      );

      if (pathname?.startsWith("/splits/")) {
        router.push(`/splits/${result.slug}`);
      }

      setShowPopover(false);
    } catch (err) {
      console.error("Failed to edit split:", err);
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

"use client";

import type { Split } from "@/generated/prisma/client";
import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addSplitAction } from "./addSplitBtnAction";

export function useAddSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const [showPopover, setShowPopover] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewTitle("");
    setShowPopover(false);
  };

  const handleAdd = async () => {
    if (!newTitle.trim() || !user) return;

    try {
      const newSplit: Split = await addSplitAction(newTitle.trim(), user.id);
      setNewTitle("");
      setShowPopover(false);
      router.push(`/splits/${newSplit.slug}`);
    } catch (err) {
      console.error("Failed to add split:", err);
    }
    setShowPopover(false);
  };

  return {
    showPopover,
    newTitle,
    setNewTitle,
    openPopover,
    handleAdd,
    handleCancel,
  };
}

"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import type { Split } from "@/generated/prisma/client";
import { useState } from "react";
import { addSplitAction } from "./addSplitBtnAction";

export function useAddSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);

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
      setSplits([...splits, newSplit]);
    } catch (err) {
      console.error("Failed to add split:", err);
    }

    setNewTitle("");
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

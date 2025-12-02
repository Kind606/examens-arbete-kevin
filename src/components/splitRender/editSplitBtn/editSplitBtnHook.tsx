"use client";

import { useState } from "react";
import { useSplitStore } from "@/src/store/splitStore";
import { useAuthStore } from "@/src/store/authStore";
import { editSplitAction } from "./editSplitBtnAction";

export function useEditSplit(splitId: string, currentTitle: string) {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);

  const [showPopover, setShowPopover] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);

  const openPopover = () => setShowPopover(true);

  const handleCancel = () => {
    setNewTitle(currentTitle);
    setShowPopover(false);
  };

  const handleSave = async () => {
    if (!newTitle.trim() || !user) return;

    try {
      await editSplitAction(splitId, newTitle.trim(), user.id);

      setSplits(
        splits.map((split) =>
          split.id === splitId ? { ...split, title: newTitle.trim() } : split
        )
      );
    } catch (err) {
      console.error("Failed to edit split:", err);
    } finally {
      setShowPopover(false);
    }
  };

  return {
    showPopover,
    newTitle,
    setNewTitle,
    openPopover,
    handleSave,
    handleCancel,
  };
}

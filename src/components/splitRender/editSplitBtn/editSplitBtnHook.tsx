"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useAuthStore } from "@/src/store/authStore";
import { editSplitAction } from "./editSplitBtnAction";

export function useEditSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user); 

  const editSplit = async (splitId: string, newTitle: string) => {
    if (!user) {
      console.error("Cannot edit split: user not logged in");
      return;
    }

    try {
      await editSplitAction(splitId, newTitle, user.id);
      setSplits(
        splits.map((split) =>
          split.id === splitId ? { ...split, title: newTitle } : split
        )
      );
    } catch (err) {
      console.error("Failed to edit split:", err);
    }
  };

  return { editSplit };
}

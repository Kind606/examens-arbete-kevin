"use client";

import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { addSplitAction } from "./addSplitBtnAction";

export function useAddSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user);

  const addSplit = async (title: string) => {
    if (!user) {
      console.error("Cannot add split: user not logged in");
      return;
    }

    try {
      const newSplit = await addSplitAction(title, user.id);
      setSplits([...splits, newSplit]);
    } catch (err) {
      console.error("Failed to add split:", err);
    }
  };

  return { addSplit };
}

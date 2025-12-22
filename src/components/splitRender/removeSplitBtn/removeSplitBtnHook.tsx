"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useAuthStore } from "@/src/store/authStore";
import { removeSplitAction } from "./removeSplitBtnAction";

export function useRemoveSplit() {
  const { splits, setSplits } = useSplitStore();
  const user = useAuthStore((state) => state.user); // get current logged-in user

  const removeSplit = async (splitId: string) => {
    if (!user) {
      console.error("Cannot remove split: user not logged in");
      return;
    }


    try {
      await removeSplitAction(splitId, user.id); // pass userId
      setSplits(splits.filter((split) => split.id !== splitId));
    } catch (err) {
      console.error("Failed to remove split:", err);
    }
  };

  return { removeSplit };
}

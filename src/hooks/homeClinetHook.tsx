"use client";

import { fetchUserSplits } from "@/src/components/splitRender/splitRenderActions";
import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { useEffect } from "react";
import { AuthUser } from "../types";

export function useHomeClient(user: AuthUser | null) {
  const { setSplits, resetSplits } = useSplitStore();
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const loadSplits = async () => {
      if (!user) return;

      if (!currentUser || currentUser.id !== user.id) {
        resetSplits();
      }

      try {
        const freshSplits = await fetchUserSplits(user.id);
        setSplits(freshSplits);
      } catch (err) {
        console.error("Failed to fetch splits:", err);
      }
    };

    loadSplits();
  }, [user, currentUser, setSplits, resetSplits]);
}

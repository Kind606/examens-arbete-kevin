"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useSplitStore } from "@/src/store/splitStore";
import { fetchUserSplits } from "@/src/components/splitRender/splitRenderActions";
import { AuthUser } from "../types";

export function useHomeClient(user: AuthUser | null) {
  const { setSplits, resetSplits } = useSplitStore();
  const currentUser = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const loadSplits = async () => {
      if (!user) return;

      // Reset splits if logging in as a different user
      if (!currentUser || currentUser.id !== user.id) {
        resetSplits();
      }

      // Update auth store
      login(user);

      // Fetch latest splits
      try {
        const freshSplits = await fetchUserSplits(user.id);
        setSplits(freshSplits);
      } catch (err) {
        console.error("Failed to fetch splits:", err);
      }
    };

    loadSplits();
  }, [user, currentUser, login, setSplits, resetSplits]);
}

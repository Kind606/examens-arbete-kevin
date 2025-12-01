"use client";

import { useSplitStore } from "@/src/store/splitStore";
import { useCallback } from "react";
import { fetchUserSplits } from "./splitRenderActions";

export function useFetchSplits() {
  const { setSplits, setLoading, setError } = useSplitStore();

  const fetchSplits = useCallback(
    async (userId: string) => {
      setLoading(true);
      setError(null);

      try {
        // Call the server action directly
        const data = await fetchUserSplits(userId);
        setSplits(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [setSplits, setLoading, setError]
  );

  return { fetchSplits };
}

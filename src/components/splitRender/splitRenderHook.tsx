import { useSplitStore } from "@/src/store/splitStore";
import { useEffect } from "react";
import { fetchUserSplits } from "./splitRenderActions";

export function useFetchSplits(userId: string) {
  const { setSplits, setLoading, setError } = useSplitStore();

  useEffect(() => {
    const fetchSplits = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserSplits(userId);
        setSplits(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch splits");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSplits();
  }, [userId, setSplits, setLoading, setError]);
}

// splitStore.ts
import { create } from "zustand";
import { Split } from "../types";

interface SplitState {
  splits: Split[];
  loading: boolean;
  error: string | null;
  setSplits: (splits: Split[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSplitStore = create<SplitState>((set) => ({
  splits: [],
  loading: false,
  error: null,
  setSplits: (splits) => set({ splits }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

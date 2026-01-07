// splitStore.ts
import { create } from "zustand";
import { Split, SplitState } from "../types";

export const useSplitStore = create<SplitState>((set) => ({
  splits: [],
  loading: false,
  error: null,
  setSplits: (splits) => set({ splits }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetSplits: () => set({ splits: [], loading: false, error: null }),
}));

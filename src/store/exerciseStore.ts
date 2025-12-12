// exerciseStore.ts
import { create } from "zustand";
import { Exercise } from "@/src/types";

interface ExerciseState {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
}));

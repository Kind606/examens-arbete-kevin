// exerciseStore.ts
import { create } from "zustand";
import { Exercise, ExerciseState } from "@/src/types";

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  removeExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.filter((ex) => ex.id !== id),
    })),
}));

// exerciseStore.ts
import { create } from "zustand";
import { Exercise } from "@/src/types";

interface ExerciseState {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (id: string) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises) => set({ exercises }),
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
    removeExercise: (id) =>
    set((state) => ({ exercises: state.exercises.filter((ex) => ex.id !== id) }))
}));

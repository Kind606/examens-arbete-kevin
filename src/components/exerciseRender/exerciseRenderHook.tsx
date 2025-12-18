"use client";

import { useExerciseStore } from "@/src/store/exerciseStore";
import { Exercise } from "@/src/types";
import { useEffect } from "react";
import { deleteExerciseAction } from "./exerciseRenderAction";

export function useExerciseRender(initialExercises: Exercise[]) {
  const { exercises, setExercises, removeExercise } = useExerciseStore();

  useEffect(() => {
    setExercises(initialExercises);
  }, [initialExercises, setExercises]);

  const handleDelete = async (id: string) => {
    try {
      await deleteExerciseAction(id);
      removeExercise(id);
    } catch (err) {
      console.error("Failed to delete exercise:", err);
    }
  };

  return { exercises, handleDelete };
}

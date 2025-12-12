"use client";

import { useEffect } from "react";
import { useExerciseStore } from "@/src/store/exerciseStore";
import { Exercise } from "@/src/types";

export function useExerciseRender(initialExercises: Exercise[]) {
  const { exercises, setExercises } = useExerciseStore();

  useEffect(() => {
    setExercises(initialExercises);
  }, [initialExercises, setExercises]);

  return { exercises };
}

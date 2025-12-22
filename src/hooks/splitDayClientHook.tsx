"use client";

import { useEffect } from "react";
import { useExerciseStore } from "@/src/store/exerciseStore";
import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { SplitDayClientProps } from "@/src/types";

export function useSplitDayClient({ user, day }: Pick<SplitDayClientProps, "user" | "day">) {
  const setExercises = useExerciseStore((s) => s.setExercises);

  useHydrateAuth(user);

  useEffect(() => {
    if (day?.exercises) {
      setExercises(day.exercises);
    }
  }, [day, setExercises]);
}

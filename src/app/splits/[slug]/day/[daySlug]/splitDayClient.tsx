"use client";

import AddExerciseBtn from "@/src/components/addExerciseBtn/addExerciseBtn";
import ExerciseRender from "@/src/components/exerciseRender/exerciseRender";
import { useExerciseStore } from "@/src/store/exerciseStore";
import { SplitDayClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplitDayClient({
  day,
  splitSlug,
  daySlug,
}: SplitDayClientProps) {
  const router = useRouter();

  const setExercises = useExerciseStore((s) => s.setExercises);
  const addExercise = useExerciseStore((s) => s.addExercise);

  // Load exercises into store when component mounts
  useEffect(() => {
    setExercises(day.exercises);
  }, [day.exercises, setExercises]);

  return (
    <div>
      <h1>{day.name}</h1>

      <button onClick={() => router.back()}>← Back</button>

      <h2>Exercises:</h2>
      <ExerciseRender splitSlug={splitSlug} daySlug={daySlug} />

      <AddExerciseBtn dayId={day.id} onExerciseAdded={addExercise} />
    </div>
  );
}

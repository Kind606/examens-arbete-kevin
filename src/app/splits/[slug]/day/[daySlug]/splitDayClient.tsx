"use client";

import AddExerciseBtn from "@/src/components/addExerciseBtn/addExerciseBtn";
import { SplitDayClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SplitDayClient({ day }: SplitDayClientProps) {
  const [exercises, setExercises] = useState(day.exercises);
  const router = useRouter();
  return (
    <div>
      <h1>{day.name}</h1>

      <button onClick={() => router.back()}>← Back</button>
      <h2>Exercises:</h2>
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            {ex.name} — {ex.defaultSets} x {ex.defaultReps}
          </li>
        ))}
      </ul>

      <AddExerciseBtn
        dayId={day.id}
        onExerciseAdded={() => {
          console.log("Exercise added!");
        }}
      />
    </div>
  );
}

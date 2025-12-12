"use client";

import { useExerciseStore } from "@/src/store/exerciseStore";
import Link from "next/link";

export default function ExerciseRender({
  splitSlug,
  daySlug,
}: {
  splitSlug: string;
  daySlug: string;
}) {
  const exercises = useExerciseStore((s) => s.exercises);

  return (
    <ul>
      {exercises.map((ex) => (
        <li key={ex.id}>
          <Link
            href={`/splits/${splitSlug}/day/${daySlug}/exercise/${ex.slug}`}
          >
            {ex.name} — {ex.defaultSets} x {ex.defaultReps}
          </Link>
        </li>
      ))}
    </ul>
  );
}

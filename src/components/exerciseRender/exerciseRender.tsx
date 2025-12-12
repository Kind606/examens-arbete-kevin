"use client";

import { ExerciseRenderProps } from "@/src/types";
import Link from "next/link";
import { useExerciseRender } from "./exerciseRenderHook";


export default function ExerciseRender({
  splitSlug,
  daySlug,
  initialExercises,
}: ExerciseRenderProps) {
  const { exercises, handleDelete } = useExerciseRender(initialExercises);

  return (
    <ul>
      {exercises.map((ex) => (
        <li key={ex.id}>
          <Link
            href={`/splits/${splitSlug}/day/${daySlug}/exercise/${ex.slug}`}
          >
            {ex.name} — {ex.defaultSets} x {ex.defaultReps}
          </Link>
              <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.preventDefault(); 
              handleDelete(ex.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

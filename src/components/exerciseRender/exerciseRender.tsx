"use client";

import { ExerciseRenderProps } from "@/src/types";
import Link from "next/link";
import styles from "./exerciseRender.module.css";
import { useExerciseRender } from "./exerciseRenderHook";

export default function ExerciseRender({
  splitSlug,
  daySlug,
  initialExercises,
}: ExerciseRenderProps) {
  const { exercises, handleDelete } = useExerciseRender(initialExercises);

  if (exercises.length === 0) {
    return <p>Inga övningar tillagda än.</p>;
  }

  return (
    <ul className={styles.exerciseList}>
      {exercises.map((ex) => (
        <li key={ex.id} className={styles.exerciseItem}>
          <Link
            href={`/splits/${splitSlug}/day/${daySlug}/exercise/${ex.slug}`}
            className={styles.exerciseLink}
          >
            <span className={styles.exerciseContent}>
              {ex.name} — {ex.defaultSets} x {ex.defaultReps}
            </span>
          </Link>

          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
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

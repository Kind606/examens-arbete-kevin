"use client";

import { ExerciseRenderProps } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./exerciseRender.module.css";
import { useExerciseRender } from "./exerciseRenderHook";
import Gstyles from "../splitRender/addSplitbtn/addSplitBtn.module.css";

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
            className={Gstyles.button}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(ex.id);
            }}
          >
            <Image src="/delete.svg" alt="Delete" width={24} height={24} />
          </button>
        </li>
      ))}
    </ul>
  );
}

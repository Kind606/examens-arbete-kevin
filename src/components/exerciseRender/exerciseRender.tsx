"use client";

import { ExerciseRenderProps, ExerciseType } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import Gstyles from "../splitRender/addSplitbtn/addSplitBtn.module.css";
import styles from "./exerciseRender.module.css";
import { useExerciseRender } from "./exerciseRenderHook";

export default function ExerciseRender({
  splitSlug,
  daySlug,
  initialExercises,
  userId,
}: ExerciseRenderProps) {
  const { exercises, handleDelete } = useExerciseRender(
    initialExercises,
    userId,
  );

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
              {ex.name}
              {ex.exerciseType === ExerciseType.STRENGTH &&
                ex.defaultSets &&
                ex.defaultReps && (
                  <span>
                    {" "}
                    — {ex.defaultSets} x {ex.defaultReps}
                  </span>
                )}
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
            <Image
              src="/delete.svg"
              alt="Delete"
              width={24}
              height={24}
              className={styles.icon}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

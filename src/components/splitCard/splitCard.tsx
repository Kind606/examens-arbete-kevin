"use client";

import { SplitCardProps } from "@/src/types";
import Link from "next/link";
import styles from "./splitCard.module.css";

export default function SplitCard({
  splitSlug,
  daySlug,
  dayName,
  isEmpty,
  exercises,
}: SplitCardProps) {
  const maxVisible = 4;

  const visibleExercises = exercises?.slice(0, maxVisible) ?? [];
  const hiddenCount = exercises ? exercises.length - maxVisible : 0;

  return (
    <Link
      href={`/splits/${splitSlug}/day/${daySlug}`}
      className={`${styles.card} ${isEmpty ? styles.empty : ""}`}
    >
      <h3>{dayName}</h3>
      {isEmpty ? (
        <>
          <p>Tomt/vila</p>
          <p>+</p>
        </>
      ) : (
        <>
          {visibleExercises.map((e) => (
            <p key={e.id}>{e.name}</p>
          ))}
          {hiddenCount > 0 && <p>... och {hiddenCount} till</p>}
        </>
      )}
    </Link>
  );
}

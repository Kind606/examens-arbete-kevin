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
        exercises?.map((e) => <p key={e.id}>{e.name}</p>)
      )}
    </Link>
  );
}

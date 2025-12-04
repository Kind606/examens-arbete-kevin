"use client";

import SplitCard from "@/src/components/splitCard/splitCard";
import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { SplitClientProps } from "@/src/types";
import Link from "next/link";
import styles from "./splitPage.module.css";

export default function SplitClient({ user, split }: SplitClientProps) {
  useHydrateAuth(user);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.textContainer}>
        <Link href="/">&lt; Tillbaka</Link>
        <h1>{split.title}</h1>
      </div>
      <div className={styles.cardsGrid}>
        {split.days?.map((day) => (
          <SplitCard
            splitSlug={split.slug}
            daySlug={day.slug}
            exercises={day.exercises}
            key={day.slug}
            dayName={day.name}
            isEmpty={day.exercises.length === 0}
          />
        )) ?? []}
      </div>
    </div>
  );
}

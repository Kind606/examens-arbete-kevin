"use client";

import SplitCard from "@/src/components/splitCard/splitCard";
import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { SplitClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import styles from "./splitPage.module.css";

export default function SplitClient({ user, split }: SplitClientProps) {
  const router = useRouter();
  useHydrateAuth(user);


  return (
    <div className={styles.cardContainer}>
      <div className={styles.textContainer}>
        <button onClick={() => router.push(`/`)}>
          <span className={styles.backArrow}>←</span>
          <span className={styles.backText}>← tillbaka</span>
        </button>{" "}
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

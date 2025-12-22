"use client";

import AddExerciseBtn from "@/src/components/addExerciseBtn/addExerciseBtn";
import ExerciseRender from "@/src/components/exerciseRender/exerciseRender";
import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { useExerciseStore } from "@/src/store/exerciseStore";
import { SplitDayClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./splitDayPage.module.css";
import ReturnBtn from "@/src/components/returnBtn/returnBtn";

export default function SplitDayClient({
  user,
  day,
  splitSlug,
  daySlug,
}: SplitDayClientProps) {
  const router = useRouter();

  const setExercises = useExerciseStore((s) => s.setExercises);
  const addExercise = useExerciseStore((s) => s.addExercise);

  useHydrateAuth(user);

  useEffect(() => {
    if (day?.exercises) {
      setExercises(day.exercises);
    }
  }, [day, setExercises]);

  if (!day) return <div>Day not found</div>;

  return (
    <div className={styles.renderContainer}>
      <div className={styles.textContainer}>
        <h1>{day.name}</h1>

       <ReturnBtn onClick={() => router.push(`/splits/${splitSlug}`)} />
      </div>
      <div className={styles.exerciseSection}>
        <ExerciseRender
          initialExercises={day.exercises}
          splitSlug={splitSlug}
          daySlug={daySlug}
        />
        <AddExerciseBtn dayId={day.id} onExerciseAdded={addExercise} />
      </div>
    </div>
  );
}

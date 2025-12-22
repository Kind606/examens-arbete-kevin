"use client";

import AddExerciseBtn from "@/src/components/addExerciseBtn/addExerciseBtn";
import ExerciseRender from "@/src/components/exerciseRender/exerciseRender";
import ReturnBtn from "@/src/components/returnBtn/returnBtn";
import { useSplitDayClient } from "@/src/hooks/splitDayClientHook";
import { useExerciseStore } from "@/src/store/exerciseStore";
import { SplitDayClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import styles from "./splitDayPage.module.css";

export default function SplitDayClient({
  user,
  day,
  splitSlug,
  daySlug,
}: SplitDayClientProps) {
  const router = useRouter();
  const addExercise = useExerciseStore((s) => s.addExercise);

  useSplitDayClient({ user, day });

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

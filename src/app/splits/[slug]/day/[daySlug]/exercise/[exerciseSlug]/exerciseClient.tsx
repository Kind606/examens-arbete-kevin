"use client";

import ExerciseLogBtn from "@/src/components/addExerciseLogsBtn/addExerciseLogsBtn";
import LogList from "@/src/components/logList/logList";
import ReturnBtn from "@/src/components/returnBtn/returnBtn";
import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { ExerciseLogClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./exerciseClient.module.css";

export default function ExerciseClient({
  user,
  exercise,
  splitSlug,
  daySlug,
  prevExercise,
  nextExercise,
}: ExerciseLogClientProps) {
  const router = useRouter();
  useHydrateAuth(user);

  const [logs, setLogs] = useState(exercise.logs ?? []);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = exercise.videoUrl
    ? getYouTubeEmbedUrl(exercise.videoUrl)
    : null;

  const goToExercise = (slug: string) => {
    router.push(`/splits/${splitSlug}/day/${daySlug}/exercise/${slug}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>{exercise.name}</h1>

        <ReturnBtn
          onClick={() => router.push(`/splits/${splitSlug}/day/${daySlug}`)}
        />
      </div>

      <div className={styles.videoContainer}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Exercise video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p>Ingen video till denna övning</p>
        )}
      </div>

      <div className={styles.navigation}>
        {prevExercise && (
          <button
            className={styles.leftButton}
            onClick={() => goToExercise(prevExercise.slug)}
          >
            ← {prevExercise.name}
          </button>
        )}

        {nextExercise && (
          <button
            className={styles.rightButton}
            onClick={() => goToExercise(nextExercise.slug)}
          >
            {nextExercise.name} →
          </button>
        )}
      </div>

      <div className={styles.logsContainer}>
        <ExerciseLogBtn
          exerciseId={exercise.id}
          onLogAdded={(log) => setLogs((prev) => [log, ...prev])}
        />
        <LogList logs={logs} setLogs={setLogs} />
      </div>
    </div>
  );
}

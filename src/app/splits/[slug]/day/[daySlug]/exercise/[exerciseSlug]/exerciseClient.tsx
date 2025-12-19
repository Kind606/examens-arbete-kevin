"use client";

import ExerciseLogBtn from "@/src/components/addExerciseLogsBtn/addExerciseLogsBtn";
import { ExerciseLogClientProps } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./exerciseClient.module.css";

export default function ExerciseClient({
  exercise,
  splitSlug,
  daySlug,
}: ExerciseLogClientProps) {
  const router = useRouter();

  const [logs, setLogs] = useState(exercise.logs ?? []);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = exercise.videoUrl
    ? getYouTubeEmbedUrl(exercise.videoUrl)
    : null;

  return (
    <div>
      <h1>{exercise.name}</h1>

      <button
        onClick={() => router.push(`/splits/${splitSlug}/day/${daySlug}`)}
        className={styles.backButton}
      >
        ← tillbaka
      </button>

      <div className={styles.videoContainer}>
        {embedUrl ? (
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            title="Exercise video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p>Invalid video URL</p>
        )}
      </div>

      <ExerciseLogBtn
        exerciseId={exercise.id}
        onLogAdded={(log) => {
          setLogs((prev) => [log, ...prev]);
        }}
      />

      <div className={styles.exerciseLog}>
        <h2>Exercise Logs</h2>
        {logs.map((log) => (
          <div key={log.id} className={styles.logItem}>
            <p>
              <strong>
                {new Date(log.createdAt).toLocaleDateString("sv-SE")}
              </strong>
            </p>
            <p>Sets: {log.sets ?? "-"}</p>
            <p>Reps: {log.reps ?? "-"}</p>
            <p>Weight: {log.weight ?? "N/A"} Kg</p>
            {log.comments && <p>Comment: {log.comments}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import {
  AddExerciseLogsBtn as ExerciseLogBtn,
  LogList,
  ReturnBtn,
} from "@/src";
import {
  getVideoType,
  getYouTubeEmbedUrl,
} from "@/src/components/addExerciseBtn/utils";
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

  const videoType = exercise.videoUrl ? getVideoType(exercise.videoUrl) : null;
  const embedUrl =
    videoType === "youtube" && exercise.videoUrl
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

      {videoType === "mp4" && exercise.videoUrl ? (
        <div className={styles.videoContainer}>
          <video
            src={exercise.videoUrl}
            controls
            loop
            className={styles.exerciseVideo}
            preload="metadata"
          >
            Din webbläsare stöder inte video.
          </video>
        </div>
      ) : videoType === "gif" && exercise.videoUrl ? (
        <div className={styles.videoContainer}>
          <img
            src={exercise.videoUrl}
            alt={`${exercise.name} demonstration`}
            className={styles.exerciseGif}
          />
        </div>
      ) : embedUrl ? (
        <div className={styles.videoContainer}>
          <iframe
            src={embedUrl}
            title="Exercise video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <></>
      )}

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
          exercise={exercise}
          userId={user.id}
          onLogAdded={(log) => setLogs((prev) => [log, ...prev])}
        />
        <LogList
          exercise={exercise}
          logs={logs}
          setLogs={setLogs}
          userId={user.id}
        />
      </div>
    </div>
  );
}
